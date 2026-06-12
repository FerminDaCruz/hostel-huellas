"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Reserva } from "@/components/admin/types";
import {
  KpiCards,
  OccupancyGrid,
  ReservasToolbar,
  ReservasTable,
  NuevaReservaModal,
  Header,
} from "@/components/admin";

function nightsBetween(a: Date, b: Date) {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24),
  );
}

function fmt(date: Date) {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function AdminDashboard({ reservas }: { reservas: Reserva[] }) {
  const router = useRouter();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = reservas.filter((r) => new Date(r.checkIn) >= today);
  const past = reservas.filter((r) => new Date(r.checkIn) < today).reverse();

  const [tab, setTab] = useState<"proximas" | "pasadas">("proximas");
  const [filterTipo, setFilterTipo] = useState("todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const isSearching = searchQuery.trim().length > 0;

  const source = tab === "proximas" ? upcoming : past;
  const filtered = isSearching
    ? reservas.filter((r) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          r.nombre.toLowerCase().includes(q) ||
          r.apellido.toLowerCase().includes(q) ||
          `${r.nombre} ${r.apellido}`.toLowerCase().includes(q)
        );
      })
    : filterTipo === "todas"
      ? source
      : source.filter((r) => r.tipoAlojamiento === filterTipo);

  // ── KPI derived data ────────────────────────────────────────────────────────
  const totalHuespedes = upcoming.reduce((s, r) => s + r.cantPersonas, 0);
  const avgNights =
    upcoming.length === 0
      ? 0
      : Math.round(
          upcoming.reduce(
            (s, r) => s + nightsBetween(r.checkIn, r.checkOut),
            0,
          ) / upcoming.length,
        );
  const nextCheckIn = upcoming[0] ? fmt(upcoming[0].checkIn) : "—";

  // ── Chart derived data ──────────────────────────────────────────────────────
  const byTipo = ["dorm", "privada", "departamento"].map((t) => ({
    tipo: t,
    count: reservas.filter((r) => r.tipoAlojamiento === t).length,
    upcoming: upcoming.filter((r) => r.tipoAlojamiento === t).length,
  }));
  const maxByTipo = Math.max(...byTipo.map((b) => b.count), 1);

  const monthsData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setMonth(d.getMonth() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("es-AR", {
      month: "short",
      year: "2-digit",
    });
    const count = upcoming.filter((r) => {
      const ci = new Date(r.checkIn);
      return (
        `${ci.getFullYear()}-${String(ci.getMonth() + 1).padStart(2, "0")}` ===
        key
      );
    }).length;
    return { label, count };
  });
  const maxMonthCount = Math.max(...monthsData.map((m) => m.count), 1);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header handleLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <KpiCards
          upcoming={upcoming}
          past={past}
          totalHuespedes={totalHuespedes}
          avgNights={avgNights}
          nextCheckIn={nextCheckIn}
        />

        <OccupancyGrid reservas={reservas} />

        <div>
          <ReservasToolbar
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              setExpandedId(null);
            }}
            tab={tab}
            onTabChange={(t) => {
              setTab(t);
              setFilterTipo("todas");
              setExpandedId(null);
            }}
            filterTipo={filterTipo}
            onFilterTipoChange={setFilterTipo}
            isSearching={isSearching}
            resultCount={filtered.length}
            upcomingCount={upcoming.length}
            pastCount={past.length}
            onNewReserva={() => setShowModal(true)}
          />
          <ReservasTable
            reservas={filtered}
            isSearching={isSearching}
            today={today}
            expandedId={expandedId}
            onExpandToggle={(id) =>
              setExpandedId(expandedId === id ? null : id)
            }
          />
        </div>
      </main>

      {showModal && (
        <NuevaReservaModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
