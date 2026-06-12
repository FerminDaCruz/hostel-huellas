import type { Reserva } from "./types";

type Props = {
  upcoming: Reserva[];
  past: Reserva[];
  totalHuespedes: number;
  avgNights: number;
  nextCheckIn: string;
};

export function KpiCards({ upcoming, past, totalHuespedes, avgNights, nextCheckIn }: Props) {
  const cards = [
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
      sub: upcoming[0] ? `${upcoming[0].nombre} ${upcoming[0].apellido}` : "",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((s) => (
        <div key={s.label} className="bg-white border border-ink/8 rounded-sm p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 font-semibold mb-2">
            {s.label}
          </p>
          <p className="font-serif text-3xl text-forest leading-none mb-1">{s.value}</p>
          <p className="text-[11px] text-ink/40">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
