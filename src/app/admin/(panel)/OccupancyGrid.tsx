"use client";

type Reserva = {
  checkIn: Date;
  checkOut: Date;
  tipoAlojamiento: string;
  cantPersonas: number;
};

const DORM_CAP = 10;
const DAYS = 60;
const COL_W = 48;
const LABEL_W = 108;

function isNight(day: Date, checkIn: Date, checkOut: Date): boolean {
  const d = new Date(day).setHours(0, 0, 0, 0);
  const ci = new Date(checkIn).setHours(0, 0, 0, 0);
  const co = new Date(checkOut).setHours(0, 0, 0, 0);
  return ci <= d && d < co;
}

function dormBg(n: number): string {
  if (n === 0) return "#F5F0E8";
  if (n <= 3) return "#C8E6C9";
  if (n <= 6) return "#FFF176";
  if (n <= 8) return "#FFCC80";
  if (n <= 9) return "#FF8A65";
  return "#EF9A9A";
}

function binaryBg(occupied: boolean): string {
  return occupied ? "#EF9A9A" : "#C8E6C9";
}

export function OccupancyGrid({ reservas }: { reservas: Reserva[] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });

  const data = days.map((day) => ({
    day,
    dorm: reservas
      .filter((r) => r.tipoAlojamiento === "dorm" && isNight(day, r.checkIn, r.checkOut))
      .reduce((s, r) => s + r.cantPersonas, 0),
    privada: reservas.some(
      (r) => r.tipoAlojamiento === "privada" && isNight(day, r.checkIn, r.checkOut)
    ),
    depto: reservas.some(
      (r) => r.tipoAlojamiento === "departamento" && isNight(day, r.checkIn, r.checkOut)
    ),
  }));

  const rows = [
    { label: "Dormitorio", key: "dorm" as const },
    { label: "Privada", key: "privada" as const },
    { label: "Depto.", key: "depto" as const },
  ];

  return (
    <div className="bg-white border border-ink/8 rounded-sm p-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-semibold mb-5">
        Ocupación — próximos 60 días
      </p>

      <div className="overflow-x-auto">
        <div style={{ minWidth: `${LABEL_W + DAYS * COL_W}px` }}>

          {/* Month labels */}
          <div className="flex" style={{ marginLeft: LABEL_W }}>
            {days.map((day, i) => {
              const newMonth = i === 0 || day.getMonth() !== days[i - 1].getMonth();
              return (
                <div key={i} style={{ width: COL_W, flexShrink: 0 }}>
                  {newMonth && (
                    <span className="text-[10px] uppercase tracking-widest text-clay font-semibold">
                      {day.toLocaleDateString("es-AR", { month: "short" })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Day numbers */}
          <div className="flex items-end mb-1" style={{ marginLeft: LABEL_W }}>
            {days.map((day, i) => {
              const isToday = day.getTime() === today.getTime();
              const isWeekend = day.getDay() === 0 || day.getDay() === 6;
              return (
                <div
                  key={i}
                  style={{ width: COL_W, flexShrink: 0 }}
                  className="text-center"
                >
                  <div
                    className={`text-[11px] font-bold leading-none ${
                      isToday ? "text-clay" : isWeekend ? "text-forest/70" : "text-ink/35"
                    }`}
                  >
                    {day.getDate()}
                  </div>
                  <div className="text-[9px] text-ink/25 mt-0.5">
                    {day.toLocaleDateString("es-AR", { weekday: "short" }).slice(0, 2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Occupation rows */}
          <div className="space-y-[3px] mt-2">
            {rows.map((row) => (
              <div key={row.key} className="flex items-center">
                {/* Row label */}
                <div
                  style={{ width: LABEL_W, flexShrink: 0 }}
                  className="text-[11px] text-ink/55 font-medium pr-3 truncate"
                >
                  {row.label}
                </div>

                {/* Cells */}
                {data.map((d, i) => {
                  const isToday = d.day.getTime() === today.getTime();

                  let bg: string;
                  let label: string;

                  if (row.key === "dorm") {
                    bg = dormBg(d.dorm);
                    label = d.dorm > 0 ? `${d.dorm}/${DORM_CAP}` : "";
                  } else {
                    const occ = row.key === "privada" ? d.privada : d.depto;
                    bg = binaryBg(occ);
                    label = occ ? "✗" : "✓";
                  }

                  return (
                    <div
                      key={i}
                      title={`${d.day.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}${
                        row.key === "dorm"
                          ? ` — ${d.dorm}/${DORM_CAP} camas`
                          : ""
                      }`}
                      style={{
                        width: COL_W,
                        flexShrink: 0,
                        backgroundColor: bg,
                        outline: isToday ? "2px solid #A0785A" : "1px solid #EDE8DF",
                        outlineOffset: "-1px",
                      }}
                      className="h-8 flex items-center justify-center text-[10px] font-semibold text-ink/60 cursor-default"
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-ink/5"
            style={{ marginLeft: LABEL_W }}
          >
            {[
              { color: "#F5F0E8", label: "Sin reservas" },
              { color: "#C8E6C9", label: "Disponible / baja ocup." },
              { color: "#FFF176", label: "Media (dorm)" },
              { color: "#FFCC80", label: "Alta (dorm)" },
              { color: "#FF8A65", label: "Casi lleno (dorm)" },
              { color: "#EF9A9A", label: "Completo" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm border border-ink/10"
                  style={{ backgroundColor: l.color }}
                />
                <span className="text-[10px] text-ink/45">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
