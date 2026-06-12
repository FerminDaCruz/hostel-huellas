import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";
import { cookies } from "next/headers";

async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value ?? "";
  const secret = process.env.ADMIN_SECRET ?? "";
  return token ? verifySession(token, secret) : false;
}

// ─── POST /api/admin/reservas/[id]/pagos — register a payment ────────────────
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;

  let body: { monto: number; nota?: string; fecha?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const monto = Number(body.monto);
  if (!monto || monto <= 0) {
    return NextResponse.json({ error: "Monto inválido." }, { status: 400 });
  }

  const reserva = await prisma.reserva.findUnique({ where: { id } });
  if (!reserva) return NextResponse.json({ error: "Reserva no encontrada." }, { status: 404 });

  const prevPagos = Array.isArray(reserva.pagos) ? reserva.pagos : [];
  const nuevoPago = {
    fecha: body.fecha ?? new Date().toISOString().slice(0, 10),
    monto,
    ...(body.nota ? { nota: body.nota } : {}),
  };

  const updated = await prisma.reserva.update({
    where: { id },
    data: {
      pagos: [...prevPagos, nuevoPago],
      montoPagado: reserva.montoPagado + monto,
    },
  });

  return NextResponse.json(updated);
}

// ─── DELETE /api/admin/reservas/[id]/pagos — remove last payment ──────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const reserva = await prisma.reserva.findUnique({ where: { id } });
  if (!reserva) return NextResponse.json({ error: "Reserva no encontrada." }, { status: 404 });

  const prevPagos = Array.isArray(reserva.pagos) ? reserva.pagos : [];
  if (prevPagos.length === 0) return NextResponse.json({ error: "Sin pagos para eliminar." }, { status: 400 });

  const lastPago = prevPagos[prevPagos.length - 1] as { monto: number };
  const updated = await prisma.reserva.update({
    where: { id },
    data: {
      pagos: prevPagos.slice(0, -1),
      montoPagado: Math.max(0, reserva.montoPagado - lastPago.monto),
    },
  });

  return NextResponse.json(updated);
}
