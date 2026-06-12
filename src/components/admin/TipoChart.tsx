import { TIPO_LABELS, TIPO_BAR_COLORS, type TipoData } from "./types";

type Props = {
  byTipo: TipoData[];
  maxByTipo: number;
};

export function TipoChart({ byTipo, maxByTipo }: Props) {
  return (
    <div className="bg-white border border-ink/8 rounded-sm p-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-semibold mb-5">
        Reservas por tipo (total / próximas)
      </p>
      <div className="space-y-4">
        {byTipo.map((b) => (
          <div key={b.tipo}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-ink/60 font-medium">{TIPO_LABELS[b.tipo]}</span>
              <span className="text-ink/40">{b.count} total · {b.upcoming} próx.</span>
            </div>
            <div className="h-2 bg-ink/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${TIPO_BAR_COLORS[b.tipo]}`}
                style={{ width: `${(b.count / maxByTipo) * 100}%` }}
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
  );
}
