import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DORM_CAPACITY = 10;

const VALID_TIPOS = [
  "dorm",
  "privada-picos",
  "privada-cuevas",
  "privada-huemul",
  "departamento",
];

// GET /api/disponibilidad?tipo=dorm|privada-picos|privada-cuevas|privada-huemul|departamento
export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get("tipo");
  if (!tipo || !VALID_TIPOS.includes(tipo)) {
    return NextResponse.json({ error: "Tipo inválido." }, { status: 400 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reservas = await prisma.reserva.findMany({
    where: {
      tipoAlojamiento: tipo,
      checkOut: { gte: today },
    },
    select: { checkIn: true, checkOut: true, cantPersonas: true },
  });

  const blocked = new Set<string>();

  if (tipo === "dorm") {
    // For dorm: sum cantPersonas per night; block only when capacity is full
    const capacityMap = new Map<string, number>();
    for (const r of reservas) {
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
    for (const [date, used] of capacityMap) {
      if (used >= DORM_CAPACITY) blocked.add(date);
    }
  } else {
    // privada-* / departamento: any reservation on that specific room blocks the dates
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
  }

  return NextResponse.json({ blockedDates: Array.from(blocked) });
}
