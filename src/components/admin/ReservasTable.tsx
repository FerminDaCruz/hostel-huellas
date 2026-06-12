"use client";

import { Fragment, useState } from "react";
import { FaPencilAlt, FaTrash, FaWallet, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { TIPO_LABELS, TIPO_COLORS, type Reserva, type Huesped } from "./types";
import { PagoSection } from "./PagoSection";

function fmt(date: Date) {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function nightsBetween(a: Date, b: Date) {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24)
  );
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

function estadoPago(total: number | null, pagado: number): "pendiente" | "parcial" | "pagado" {
  if (pagado === 0) return "pendiente";
  if (total !== null && pagado >= total) return "pagado";
  return "parcial";
}

const PAGO_STYLE = {
  pendiente: "bg-ink/8 text-ink/40",
  parcial: "bg-wood/20 text-clay",
  pagado: "bg-moss/15 text-moss",
};

const PAGO_LABEL = {
  pendiente: "Pendiente",
  parcial: "Parcial",
  pagado: "Pagado",
};

type Props = {
  reservas: Reserva[];
  isSearching: boolean;
  today: Date;
  expandedId: string | null;
  onExpandToggle: (id: string) => void;
  onEdit: (reserva: Reserva) => void;
  onDelete: (id: string) => void;
  onReservaUpdated: (updated: Reserva) => void;
};

const HEADERS = [
  "Huésped", "Email", "Tel.", "DNI",
  "Check-in", "Check-out", "Noches",
  "Tipo", "Pax", "Origen", "Pago",
];

export function ReservasTable({
  reservas,
  isSearching,
  today,
  expandedId,
  onExpandToggle,
  onEdit,
  onDelete,
  onReservaUpdated,
}: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta reserva? Esta acción no se puede deshacer.")) return;
    setDeletingId(id);
    await fetch(`/api/admin/reservas/${id}`, { method: "DELETE" });
    onDelete(id);
    setDeletingId(null);
  }

  const colSpan = isSearching ? HEADERS.length + 2 : HEADERS.length + 1;

  return (
    <div className="bg-white border border-ink/8 rounded-sm overflow-x-auto">
      {reservas.length === 0 ? (
        <p className="text-center py-16 text-ink/40 text-sm">No hay reservas.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-forest/5 border-b border-ink/8">
              {[...HEADERS, ...(isSearching ? ["Estado"] : [])].map((h) => (
                <th
                  key={h}
                  className="text-left text-[11px] uppercase tracking-[0.1em] text-ink/50 font-semibold px-4 py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-[11px] uppercase tracking-[0.1em] text-ink/50 font-semibold whitespace-nowrap">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {reservas.map((r) => {
              const huespedes = parseHuespedes(r.huespedes);
              const nights = nightsBetween(r.checkIn, r.checkOut);
              const isExpanded = expandedId === r.id;
              const isFutura = new Date(r.checkIn) >= today;
              const pago = estadoPago(r.montoTotal, r.montoPagado);

              return (
                <Fragment key={r.id}>
                  <tr className={`transition-colors ${isExpanded ? "bg-beige/40" : "hover:bg-beige/20"} ${deletingId === r.id ? "opacity-40" : ""}`}>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {r.nombre} {r.apellido}
                    </td>
                    <td className="px-4 py-3 text-ink/60">{r.email}</td>
                    <td className="px-4 py-3 text-ink/60 whitespace-nowrap">{r.telefono}</td>
                    <td className="px-4 py-3 text-ink/60">{r.dni}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">{fmt(r.checkIn)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink/60">{fmt(r.checkOut)}</td>
                    <td className="px-4 py-3 text-center text-ink/60">{nights}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${TIPO_COLORS[r.tipoAlojamiento] ?? "bg-ink/10 text-ink"}`}>
                        {TIPO_LABELS[r.tipoAlojamiento] ?? r.tipoAlojamiento}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">{r.cantPersonas}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${r.creadaPorAdmin ? "bg-clay/10 text-clay" : "bg-moss/10 text-moss"}`}>
                        {r.creadaPorAdmin ? "Admin" : "Web"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${PAGO_STYLE[pago]}`}>
                        {PAGO_LABEL[pago]}
                      </span>
                    </td>
                    {isSearching && (
                      <td className="px-4 py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${isFutura ? "bg-forest/10 text-forest" : "bg-ink/8 text-ink/40"}`}>
                          {isFutura ? "Futura" : "Pasada"}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3 whitespace-nowrap">
                        {huespedes.length > 0 && (
                          <button
                            onClick={() => onExpandToggle(r.id)}
                            className="text-[11px] text-forest hover:underline"
                          >
                            {isExpanded ? "Ocultar" : `+${huespedes.length} acomp.`}
                          </button>
                        )}
                        <button
                          onClick={() => onExpandToggle(r.id)}
                          className="text-moss hover:text-forest transition-colors"
                          title="Ver pagos"
                          aria-label="Ver pagos"
                        >
                          {isExpanded ? <FaChevronUp size={11} /> : <FaWallet size={11} />}
                        </button>
                        <button
                          onClick={() => onEdit(r)}
                          className="text-ink/35 hover:text-forest transition-colors"
                          title="Editar reserva"
                          aria-label="Editar reserva"
                        >
                          <FaPencilAlt size={11} />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          disabled={deletingId === r.id}
                          className="text-ink/25 hover:text-clay transition-colors disabled:opacity-40"
                          title="Eliminar reserva"
                          aria-label="Eliminar reserva"
                        >
                          <FaTrash size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-beige/20">
                      <td colSpan={colSpan} className="px-8 py-4">
                        {/* Companions */}
                        {huespedes.length > 0 && (
                          <div className="mb-0">
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
                          </div>
                        )}

                        {/* Payment section */}
                        <PagoSection reserva={r} onUpdated={onReservaUpdated} />
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
  );
}
