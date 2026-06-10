import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const reservas = await prisma.reserva.findMany({
    orderBy: { checkIn: "asc" },
  });

  return <AdminDashboard reservas={reservas} />;
}
