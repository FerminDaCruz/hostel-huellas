import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/disponibilidad?tipo=dorm|privada|departamento
export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get("tipo");
  if (!tipo || !["dorm", "privada", "departamento"].includes(tipo)) {
    return NextResponse.json({ error: "Tipo inválido." }, { status: 400 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reservas = await prisma.reserva.findMany({
    where: {
      tipoAlojamiento: tipo,
      checkOut: { gte: today },
    },
    select: { checkIn: true, checkOut: true },
  });

  // Build set of blocked dates (all nights that are occupied)
  const blocked = new Set<string>();
  for (const r of reservas) {
    const cursor = new Date(r.checkIn);
    cursor.setHours(0, 0, 0, 0);
    const end = new Date(r.checkOut);
    end.setHours(0, 0, 0, 0);
    while (cursor < end) {
      blocked.add(cursor.toISOString().slice(0, 10));
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  return NextResponse.json({ blockedDates: Array.from(blocked) });
}
