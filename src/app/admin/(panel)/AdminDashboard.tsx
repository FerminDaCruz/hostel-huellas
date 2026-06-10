"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReservaForm } from "@/components/ReservaForm";

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
  creadaPorAdmin: boolean;
};

const TIPO_LABELS: Record<string, string> = {
  dorm: "Dormitorio compartido",
  privada: "Habitación privada",
  departamento: "Departamento",
};

function fmt(date: Date) {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function AdminDashboard({ reservas }: { reservas: Reserva[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("todas");
  const [showModal, setShowModal] = useState(false);

  const filtered =
    filter === "todas"
      ? reservas
      : reservas.filter((r) => r.tipoAlojamiento === filter);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="bg-forest text-paper px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-2xl">Panel de administración — Huellas</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-paper/70 hover:text-paper border border-paper/30 px-4 py-2 rounded-sm transition-colors"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label className="text-sm text-ink/60 font-medium">Filtrar:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border border-ink/15 rounded-sm px-3 py-1.5 bg-white text-ink"
            >
              <option value="todas">Todas</option>
              <option value="dorm">Dormitorio compartido</option>
              <option value="privada">Habitación privada</option>
              <option value="departamento">Departamento</option>
            </select>
          </div>

          <div className="ml-auto">
            <button
              onClick={() => setShowModal(true)}
              className="bg-forest text-paper text-sm px-5 py-2.5 rounded-sm hover:bg-moss transition-colors"
            >
              + Nueva reserva manual
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: reservas.length },
            {
              label: "Dormitorio",
              value: reservas.filter((r) => r.tipoAlojamiento === "dorm").length,
            },
            {
              label: "Privada",
              value: reservas.filter((r) => r.tipoAlojamiento === "privada").length,
            },
            {
              label: "Departamento",
              value: reservas.filter((r) => r.tipoAlojamiento === "departamento").length,
            },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-ink/8 rounded-sm p-4">
              <p className="text-2xl font-serif text-forest">{s.value}</p>
              <p className="text-xs text-ink/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-ink/8 rounded-sm overflow-x-auto">
          {filtered.length === 0 ? (
            <p className="text-center py-16 text-ink/40">No hay reservas.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-forest/5 border-b border-ink/8">
                  {[
                    "Huésped", "Email", "Tel.", "DNI",
                    "Check-in", "Check-out", "Tipo", "Pax", "Origen", "Creada"
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[11px] uppercase tracking-[0.1em] text-ink/50 font-semibold px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-beige/30 transition-colors">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {r.nombre} {r.apellido}
                    </td>
                    <td className="px-4 py-3 text-ink/60">{r.email}</td>
                    <td className="px-4 py-3 text-ink/60 whitespace-nowrap">{r.telefono}</td>
                    <td className="px-4 py-3 text-ink/60">{r.dni}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{fmt(r.checkIn)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{fmt(r.checkOut)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="bg-forest/10 text-forest text-[11px] px-2 py-0.5 rounded-full">
                        {TIPO_LABELS[r.tipoAlojamiento] ?? r.tipoAlojamiento}
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
                    <td className="px-4 py-3 text-ink/40 whitespace-nowrap text-[11px]">
                      {fmt(r.creadoEn)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal nueva reserva */}
      {showModal && (
        <div
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-10 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="bg-paper rounded-sm shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink/8">
              <h2 className="font-serif text-xl text-forest">Nueva reserva manual</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-ink/40 hover:text-ink text-xl leading-none"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>
            <div className="p-6">
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
