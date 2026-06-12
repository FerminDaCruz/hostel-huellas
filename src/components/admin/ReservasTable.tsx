import { Fragment } from "react";
import { TIPO_LABELS, TIPO_COLORS, type Reserva, type Huesped } from "./types";

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

type Props = {
  reservas: Reserva[];
  isSearching: boolean;
  today: Date;
  expandedId: string | null;
  onExpandToggle: (id: string) => void;
};

const HEADERS = [
  "Huésped", "Email", "Tel.", "DNI",
  "Check-in", "Check-out", "Noches",
  "Tipo", "Pax", "Origen",
];

export function ReservasTable({ reservas, isSearching, today, expandedId, onExpandToggle }: Props) {
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
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {reservas.map((r) => {
              const huespedes = parseHuespedes(r.huespedes);
              const nights = nightsBetween(r.checkIn, r.checkOut);
              const isExpanded = expandedId === r.id;
              const isFutura = new Date(r.checkIn) >= today;

              return (
                <Fragment key={r.id}>
                  <tr className={`transition-colors ${isExpanded ? "bg-beige/40" : "hover:bg-beige/20"}`}>
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
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full ${
                          TIPO_COLORS[r.tipoAlojamiento] ?? "bg-ink/10 text-ink"
                        }`}
                      >
                        {TIPO_LABELS[r.tipoAlojamiento] ?? r.tipoAlojamiento}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">{r.cantPersonas}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full ${
                          r.creadaPorAdmin ? "bg-clay/10 text-clay" : "bg-moss/10 text-moss"
                        }`}
                      >
                        {r.creadaPorAdmin ? "Admin" : "Web"}
                      </span>
                    </td>
                    {isSearching && (
                      <td className="px-4 py-3">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full ${
                            isFutura ? "bg-forest/10 text-forest" : "bg-ink/8 text-ink/40"
                          }`}
                        >
                          {isFutura ? "Futura" : "Pasada"}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      {huespedes.length > 0 && (
                        <button
                          onClick={() => onExpandToggle(r.id)}
                          className="text-[11px] text-forest hover:underline whitespace-nowrap"
                        >
                          {isExpanded ? "Ocultar" : `+${huespedes.length} acomp.`}
                        </button>
                      )}
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-beige/20">
                      <td colSpan={colSpan} className="px-8 py-3">
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
  );
}
