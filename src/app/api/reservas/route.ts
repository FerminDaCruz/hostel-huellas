import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";
import { sendReservationEmails } from "@/lib/email-sender";
import { cookies } from "next/headers";

// ─── Rate limiting ────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const prev = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  if (prev.length >= RATE_MAX) {
    rateLimitMap.set(ip, prev);
    return false;
  }
  prev.push(now);
  rateLimitMap.set(ip, prev);
  return true;
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ─── Capacity per type ────────────────────────────────────────────────────────
const MAX_PERSONAS: Record<string, number> = {
  dorm: 10,
  privada: 2,
  departamento: 3,
};

// ─── POST /api/reservas ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getIp(req);

  // Check if request comes from admin (skip rate limit for admin)
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value ?? "";
  const adminSecret = process.env.ADMIN_SECRET ?? "";
  const isAdmin = sessionToken ? verifySession(sessionToken, adminSecret) : false;

  if (!isAdmin && !checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Esperá unos minutos y volvé a intentar." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  // Honeypot — fingir éxito sin guardar
  if (body._hp) {
    return NextResponse.json({ ok: true });
  }

  // Validate required fields
  const required = [
    "nombre", "apellido", "email", "telefono", "dni",
    "checkin", "checkout", "cantPersonas", "tipoAlojamiento",
  ];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `El campo "${field}" es requerido.` },
        { status: 400 }
      );
    }
  }

  const tipo = String(body.tipoAlojamiento);
  if (!["dorm", "privada", "departamento"].includes(tipo)) {
    return NextResponse.json({ error: "Tipo de alojamiento inválido." }, { status: 400 });
  }

  const cantPersonas = Number(body.cantPersonas);
  const maxCap = MAX_PERSONAS[tipo] ?? 0;
  if (cantPersonas < 1 || cantPersonas > maxCap) {
    return NextResponse.json(
      { error: `Capacidad máxima para ${tipo}: ${maxCap} personas.` },
      { status: 400 }
    );
  }

  const checkIn = new Date(String(body.checkin));
  const checkOut = new Date(String(body.checkout));
  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime()) || checkIn >= checkOut) {
    return NextResponse.json({ error: "Fechas inválidas." }, { status: 400 });
  }

  // Real-time availability check
  if (tipo === "dorm") {
    // Dorm has shared capacity: check that no night in the range exceeds DORM_CAPACITY
    const overlapping = await prisma.reserva.findMany({
      where: {
        tipoAlojamiento: "dorm",
        AND: [{ checkIn: { lt: checkOut } }, { checkOut: { gt: checkIn } }],
      },
      select: { checkIn: true, checkOut: true, cantPersonas: true },
    });

    // Build a capacity map for the requested nights
    const capacityMap = new Map<string, number>();
    for (const r of overlapping) {
      const cursor = new Date(r.checkIn);
      cursor.setHours(0, 0, 0, 0);
      const end = new Date(r.checkOut);
      end.setHours(0, 0, 0, 0);
      while (cursor < end) {
        const key = cursor.toISOString().slice(0, 10);
        capacityMap.set(key, (capacityMap.get(key) ?? 0) + r.cantPersonas);
        cursor.setDate(cursor.getDate() + 1);
      }
    }

    // Verify each requested night has enough remaining capacity
    const cursor = new Date(checkIn);
    cursor.setHours(0, 0, 0, 0);
    const endDate = new Date(checkOut);
    endDate.setHours(0, 0, 0, 0);
    while (cursor < endDate) {
      const key = cursor.toISOString().slice(0, 10);
      const used = capacityMap.get(key) ?? 0;
      if (used + cantPersonas > MAX_PERSONAS["dorm"]) {
        return NextResponse.json(
          { error: "No hay suficientes camas disponibles para esas fechas." },
          { status: 409 }
        );
      }
      cursor.setDate(cursor.getDate() + 1);
    }
  } else {
    // privada / departamento: any overlap is a conflict
    const conflict = await prisma.reserva.findFirst({
      where: {
        tipoAlojamiento: tipo,
        AND: [{ checkIn: { lt: checkOut } }, { checkOut: { gt: checkIn } }],
      },
    });
    if (conflict) {
      return NextResponse.json(
        { error: "Esas fechas no están disponibles para el tipo de alojamiento seleccionado." },
        { status: 409 }
      );
    }
  }

  const huespedes = (body.huespedes as { nombre: string; apellido: string }[]) ?? [];

  const reserva = await prisma.reserva.create({
    data: {
      nombre: String(body.nombre),
      apellido: String(body.apellido),
      email: String(body.email),
      telefono: String(body.telefono),
      dni: String(body.dni),
      checkIn,
      checkOut,
      tipoAlojamiento: tipo,
      cantPersonas,
      huespedes,
      creadaPorAdmin: isAdmin,
    },
  });

  // Fire-and-forget: do not await so the API responds immediately
  sendReservationEmails({
    id: reserva.id,
    nombre: reserva.nombre,
    apellido: reserva.apellido,
    email: reserva.email,
    checkIn: reserva.checkIn,
    checkOut: reserva.checkOut,
    tipoAlojamiento: reserva.tipoAlojamiento,
    cantPersonas: reserva.cantPersonas,
  }).catch((err) => console.error("[email] failed:", err));

  return NextResponse.json({ ok: true, id: reserva.id });
}
