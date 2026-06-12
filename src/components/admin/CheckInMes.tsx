import type { MonthData } from "./types";

type Props = {
  monthsData: MonthData[];
  maxMonthCount: number;
};

export function CheckInMes({ monthsData, maxMonthCount }: Props) {
  return (
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
            <div
              className="w-full bg-ink/5 rounded-t-sm overflow-hidden flex items-end"
              style={{ height: "80px" }}
            >
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
  );
}
