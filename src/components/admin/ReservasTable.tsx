"use client";

import { Fragment, useState } from "react";
import { FaPencilAlt, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TIPO_LABELS, TIPO_COLORS, type Reserva, type Huesped } from "./types";
import { PagoSection } from "./PagoSection";

function fmtShort(date: Date) {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function fmtFull(date: Date) {
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

  return (
    <div className="bg-white border border-ink/8 rounded-sm overflow-hidden">
      {reservas.length === 0 ? (
        <p className="text-center py-16 text-ink/40 text-sm">No hay reservas.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-forest/5 border-b border-ink/8">
              {["Huésped", "Fechas", "Tipo", "Pago", ...(isSearching ? ["Estado"] : [])].map((h) => (
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
            {reservas.map((r) => {
              const huespedes = parseHuespedes(r.huespedes);
              const nights = nightsBetween(r.checkIn, r.checkOut);
              const isExpanded = expandedId === r.id;
              const isFutura = new Date(r.checkIn) >= today;
              const pago = estadoPago(r.montoTotal, r.montoPagado);

              return (
                <Fragment key={r.id}>
                  <tr
                    className={`transition-colors cursor-pointer ${isExpanded ? "bg-beige/40" : "hover:bg-beige/20"} ${deletingId === r.id ? "opacity-40" : ""}`}
                    onClick={() => onExpandToggle(r.id)}
                  >
                    {/* Huésped */}
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {r.nombre} {r.apellido}
                    </td>

                    {/* Fechas compactas */}
                    <td className="px-4 py-3 whitespace-nowrap text-ink/70">
                      <span className="font-medium text-ink">{fmtShort(r.checkIn)}</span>
                      <span className="mx-1.5 text-ink/30">→</span>
                      <span>{fmtShort(r.checkOut)}</span>
                      <span className="ml-2 text-[11px] text-ink/40">{nights}n</span>
                    </td>

                    {/* Tipo */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${TIPO_COLORS[r.tipoAlojamiento] ?? "bg-ink/10 text-ink"}`}>
                        {TIPO_LABELS[r.tipoAlojamiento] ?? r.tipoAlojamiento}
                      </span>
                    </td>

                    {/* Pago */}
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${PAGO_STYLE[pago]}`}>
                        {PAGO_LABEL[pago]}
                      </span>
                    </td>

                    {/* Estado (solo en búsqueda) */}
                    {isSearching && (
                      <td className="px-4 py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${isFutura ? "bg-forest/10 text-forest" : "bg-ink/8 text-ink/40"}`}>
                          {isFutura ? "Futura" : "Pasada"}
                        </span>
                      </td>
                    )}

                    {/* Acciones */}
                    <td className="px-4 py-3">
                      <div
                        className="flex items-center justify-end gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                        <span className="text-ink/25">
                          {isExpanded ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Fila expandida */}
                  {isExpanded && (
                    <tr className="bg-beige/20">
                      <td colSpan={isSearching ? 6 : 5} className="px-6 py-5">
                        {/* Datos de contacto */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-3 mb-5">
                          <Detail label="Email" value={r.email} />
                          <Detail label="Teléfono" value={r.telefono} />
                          <Detail label="DNI / Pasaporte" value={r.dni} />
                          <Detail label="Personas" value={String(r.cantPersonas)} />
                          <Detail
                            label="Origen"
                            value={r.creadaPorAdmin ? "Admin" : "Web"}
                          />
                          <Detail label="Check-in" value={fmtFull(r.checkIn)} />
                          <Detail label="Check-out" value={fmtFull(r.checkOut)} />
                          <Detail label="Noches" value={String(nights)} />
                        </div>

                        {/* Acompañantes */}
                        {huespedes.length > 0 && (
                          <div className="mb-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 font-semibold mb-2">
                              Acompañantes
                            </p>
                            <div className="flex flex-wrap gap-2">
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

                        {/* Pagos */}
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-ink/40 font-semibold mb-0.5">
        {label}
      </p>
      <p className="text-sm text-ink/80">{value}</p>
    </div>
  );
}
