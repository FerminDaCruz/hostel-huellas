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

// ─── PATCH /api/admin/reservas/[id] — edit reservation ───────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  if (body.nombre !== undefined) data.nombre = String(body.nombre);
  if (body.apellido !== undefined) data.apellido = String(body.apellido);
  if (body.email !== undefined) data.email = String(body.email);
  if (body.telefono !== undefined) data.telefono = String(body.telefono);
  if (body.dni !== undefined) data.dni = String(body.dni);
  if (body.cantPersonas !== undefined) data.cantPersonas = Number(body.cantPersonas);
  if (body.tipoAlojamiento !== undefined) data.tipoAlojamiento = String(body.tipoAlojamiento);
  if (body.montoTotal !== undefined) {
    data.montoTotal = body.montoTotal === null ? null : Number(body.montoTotal);
  }

  if (body.checkIn !== undefined) {
    const d = new Date(String(body.checkIn));
    if (isNaN(d.getTime())) return NextResponse.json({ error: "checkIn inválido." }, { status: 400 });
    data.checkIn = d;
  }
  if (body.checkOut !== undefined) {
    const d = new Date(String(body.checkOut));
    if (isNaN(d.getTime())) return NextResponse.json({ error: "checkOut inválido." }, { status: 400 });
    data.checkOut = d;
  }

  const updated = await prisma.reserva.update({ where: { id }, data });
  return NextResponse.json(updated);
}

// ─── DELETE /api/admin/reservas/[id] — delete reservation ────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  await prisma.reserva.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
