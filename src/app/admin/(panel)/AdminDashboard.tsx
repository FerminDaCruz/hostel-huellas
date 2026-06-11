"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { ReservaForm } from "@/components/shared/ReservaForm";
import { OccupancyGrid } from "./OccupancyGrid";

// ─── Types ────────────────────────────────────────────────────────────────────
type Huesped = { nombre: string; apellido: string };

type Reserva = {
  id: string;
  creadoEn: Date;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  checkIn: Date;
  checkOut: Date;
  tipoAlojamiento: string;
  cantPersonas: number;
  huespedes: unknown; // JsonValue from Prisma
  creadaPorAdmin: boolean;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const TIPO_LABELS: Record<string, string> = {
  dorm: "Dormitorio",
  privada: "Privada",
  departamento: "Departamento",
};

const TIPO_COLORS: Record<string, string> = {
  dorm: "bg-moss/15 text-moss",
  privada: "bg-clay/15 text-clay",
  departamento: "bg-forest/15 text-forest",
};

const TIPO_BAR_COLORS: Record<string, string> = {
  dorm: "bg-moss",
  privada: "bg-clay",
  departamento: "bg-forest",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(date: Date) {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function parseHuespedes(raw: unknown): Huesped[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (h): h is Huesped =>
      typeof h === "object" &&
      h !== null &&
      typeof (h as Huesped).nombre === "string" &&
      typeof (h as Huesped).apellido === "string"
  );
}

function nightsBetween(a: Date, b: Date) {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24)
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function AdminDashboard({ reservas }: { reservas: Reserva[] }) {
  const router = useRouter();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Split into upcoming / past
  const upcoming = reservas.filter((r) => new Date(r.checkIn) >= today);
  const past = reservas.filter((r) => new Date(r.checkIn) < today).reverse(); // most recent first

  const [tab, setTab] = useState<"proximas" | "pasadas">("proximas");
  const [filterTipo, setFilterTipo] = useState<string>("todas");
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

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalHuespedes = upcoming.reduce((s, r) => s + r.cantPersonas, 0);
  const avgNights =
    upcoming.length === 0
      ? 0
      : Math.round(
          upcoming.reduce(
            (s, r) => s + nightsBetween(r.checkIn, r.checkOut),
            0
          ) / upcoming.length
        );
  const nextCheckIn = upcoming[0]
    ? fmt(upcoming[0].checkIn)
    : "—";

  const byTipo = ["dorm", "privada", "departamento"].map((t) => ({
    tipo: t,
    count: reservas.filter((r) => r.tipoAlojamiento === t).length,
    upcoming: upcoming.filter((r) => r.tipoAlojamiento === t).length,
  }));
  const maxByTipo = Math.max(...byTipo.map((b) => b.count), 1);

  // Reservas por mes (últimos 6 meses, solo upcoming + hoy)
  const monthsData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setMonth(d.getMonth() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("es-AR", { month: "short", year: "2-digit" });
    const count = upcoming.filter((r) => {
      const ci = new Date(r.checkIn);
      const rKey = `${ci.getFullYear()}-${String(ci.getMonth() + 1).padStart(2, "0")}`;
      return rKey === key;
    }).length;
    return { label, count };
  });
  const maxMonthCount = Math.max(...monthsData.map((m) => m.count), 1);

  return (
    <div className="min-h-screen bg-paper">
      {/* ── Header ── */}
      <header className="bg-forest text-paper px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-2xl">Panel — Huellas Puelo</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-paper/70 hover:text-paper border border-paper/30 px-4 py-2 rounded-sm transition-colors"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* ── KPI cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Próximas reservas",
              value: upcoming.length,
              sub: `${past.length} pasadas`,
            },
            {
              label: "Huéspedes próximos",
              value: totalHuespedes,
              sub: "suma de personas",
            },
            {
              label: "Prom. noches",
              value: avgNights || "—",
              sub: "reservas activas",
            },
            {
              label: "Próximo check-in",
              value: nextCheckIn,
              sub: upcoming[0] ? upcoming[0].nombre + " " + upcoming[0].apellido : "",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-ink/8 rounded-sm p-5"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 font-semibold mb-2">
                {s.label}
              </p>
              <p className="font-serif text-3xl text-forest leading-none mb-1">
                {s.value}
              </p>
              <p className="text-[11px] text-ink/40">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Charts row ── */}
        <div className="grid lg:grid-cols-2 gap-4">

          {/* Check-ins por mes */}
          <div className="bg-white border border-ink/8 rounded-sm p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-semibold mb-5">
              Check-ins por mes (próximos 6 meses)
            </p>
            <div className="flex items-end gap-2 h-28">
              {monthsData.map((m) => (
                <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-ink/50 font-medium">
                    {m.count > 0 ? m.count : ""}
                  </span>
                  <div className="w-full bg-ink/5 rounded-t-sm overflow-hidden flex items-end" style={{ height: "80px" }}>
                    <div
                      className="w-full bg-forest/70 rounded-t-sm transition-all"
                      style={{
                        height: `${Math.max((m.count / maxMonthCount) * 80, m.count > 0 ? 6 : 0)}px`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-ink/40">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Por tipo */}
          <div className="bg-white border border-ink/8 rounded-sm p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-semibold mb-5">
              Reservas por tipo (total / próximas)
            </p>
            <div className="space-y-4">
              {byTipo.map((b) => (
                <div key={b.tipo}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-ink/60 font-medium">
                      {TIPO_LABELS[b.tipo]}
                    </span>
                    <span className="text-ink/40">
                      {b.count} total · {b.upcoming} próx.
                    </span>
                  </div>
                  <div className="h-2 bg-ink/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${TIPO_BAR_COLORS[b.tipo]}`}
                      style={{
                        width: `${(b.count / maxByTipo) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-ink/5">
              {byTipo.map((b) => (
                <div key={b.tipo} className="text-center">
                  <p className="font-serif text-2xl text-forest">{b.upcoming}</p>
                  <p className="text-[10px] text-ink/40 mt-0.5">{TIPO_LABELS[b.tipo]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Occupancy grid ── */}
        <OccupancyGrid reservas={reservas} />

        {/* ── Table section ── */}
        <div>
          {/* Tabs + Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setExpandedId(null);
                }}
                className="text-sm border border-ink/15 rounded-sm pl-8 pr-8 py-1.5 bg-white text-ink w-52 focus:outline-none focus:border-forest"
              />
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink/35 pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              {isSearching && (
                <button
                  onClick={() => { setSearchQuery(""); setExpandedId(null); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink text-base leading-none"
                  aria-label="Limpiar búsqueda"
                >
                  ×
                </button>
              )}
            </div>

            {/* Tabs — dimmed while searching */}
            <div className={`flex rounded-sm border border-ink/10 overflow-hidden transition-opacity ${isSearching ? "opacity-40 pointer-events-none" : ""}`}>
              {[
                { key: "proximas", label: `Próximas (${upcoming.length})` },
                { key: "pasadas", label: `Pasadas (${past.length})` },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key as "proximas" | "pasadas");
                    setFilterTipo("todas");
                    setExpandedId(null);
                  }}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    tab === t.key
                      ? "bg-forest text-paper"
                      : "bg-white text-ink/60 hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tipo filter — dimmed while searching */}
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              disabled={isSearching}
              className={`text-sm border border-ink/15 rounded-sm px-3 py-1.5 bg-white text-ink transition-opacity ${isSearching ? "opacity-40" : ""}`}
            >
              <option value="todas">Todos los tipos</option>
              <option value="dorm">Dormitorio compartido</option>
              <option value="privada">Habitación privada</option>
              <option value="departamento">Departamento</option>
            </select>

            {/* Search results label */}
            {isSearching && (
              <span className="text-xs text-ink/50">
                {filtered.length === 0
                  ? "Sin resultados"
                  : `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""} en todas las reservas`}
              </span>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="ml-auto bg-forest text-paper text-sm px-5 py-2 rounded-sm hover:bg-moss transition-colors"
            >
              + Nueva reserva manual
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border border-ink/8 rounded-sm overflow-x-auto">
            {filtered.length === 0 ? (
              <p className="text-center py-16 text-ink/40 text-sm">
                No hay reservas.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest/5 border-b border-ink/8">
                    {[
                      "Huésped",
                      "Email",
                      "Tel.",
                      "DNI",
                      "Check-in",
                      "Check-out",
                      "Noches",
                      "Tipo",
                      "Pax",
                      "Origen",
                      ...(isSearching ? ["Estado"] : []),
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] uppercase tracking-[0.1em] text-ink/50 font-semibold px-4 py-3 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {filtered.map((r) => {
                    const huespedes = parseHuespedes(r.huespedes);
                    const nights = nightsBetween(r.checkIn, r.checkOut);
                    const isExpanded = expandedId === r.id;
                    const hasCompanions = huespedes.length > 0;

                    return (
                      <Fragment key={r.id}>
                        <tr
                          className={`transition-colors ${
                            isExpanded ? "bg-beige/40" : "hover:bg-beige/20"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium whitespace-nowrap">
                            {r.nombre} {r.apellido}
                          </td>
                          <td className="px-4 py-3 text-ink/60">{r.email}</td>
                          <td className="px-4 py-3 text-ink/60 whitespace-nowrap">
                            {r.telefono}
                          </td>
                          <td className="px-4 py-3 text-ink/60">{r.dni}</td>
                          <td className="px-4 py-3 whitespace-nowrap font-medium">
                            {fmt(r.checkIn)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-ink/60">
                            {fmt(r.checkOut)}
                          </td>
                          <td className="px-4 py-3 text-center text-ink/60">
                            {nights}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`text-[11px] px-2 py-0.5 rounded-full ${
                                TIPO_COLORS[r.tipoAlojamiento] ??
                                "bg-ink/10 text-ink"
                              }`}
                            >
                              {TIPO_LABELS[r.tipoAlojamiento] ??
                                r.tipoAlojamiento}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">{r.cantPersonas}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-[11px] px-2 py-0.5 rounded-full ${
                                r.creadaPorAdmin
                                  ? "bg-clay/10 text-clay"
                                  : "bg-moss/10 text-moss"
                              }`}
                            >
                              {r.creadaPorAdmin ? "Admin" : "Web"}
                            </span>
                          </td>
                          {isSearching && (
                            <td className="px-4 py-3">
                              <span
                                className={`text-[11px] px-2 py-0.5 rounded-full ${
                                  new Date(r.checkIn) >= today
                                    ? "bg-forest/10 text-forest"
                                    : "bg-ink/8 text-ink/40"
                                }`}
                              >
                                {new Date(r.checkIn) >= today ? "Futura" : "Pasada"}
                              </span>
                            </td>
                          )}
                          <td className="px-4 py-3">
                            {hasCompanions && (
                              <button
                                onClick={() =>
                                  setExpandedId(isExpanded ? null : r.id)
                                }
                                className="text-[11px] text-forest hover:underline whitespace-nowrap"
                              >
                                {isExpanded
                                  ? "Ocultar"
                                  : `+${huespedes.length} acomp.`}
                              </button>
                            )}
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr className="bg-beige/20">
                            <td colSpan={isSearching ? 12 : 11} className="px-8 py-3">
                              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 font-semibold mb-2">
                                Acompañantes
                              </p>
                              <div className="flex flex-wrap gap-3">
                                {huespedes.map((h, i) => (
                                  <span
                                    key={i}
                                    className="text-sm text-ink/70 bg-white border border-ink/8 px-3 py-1 rounded-sm"
                                  >
                                    {h.nombre} {h.apellido}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* ── Modal nueva reserva ── */}
      {showModal && (
        <div
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          {/* max-h + flex col = sticky header + scrollable body */}
          <div className="bg-paper rounded-sm shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Sticky header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink/8 flex-shrink-0">
              <h2 className="font-serif text-xl text-forest">
                Nueva reserva manual
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-ink/40 hover:text-ink text-xl leading-none"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>
            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-6">
              <ReservaForm
                isAdmin
                onSuccess={() => {
                  setShowModal(false);
                  router.refresh();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
