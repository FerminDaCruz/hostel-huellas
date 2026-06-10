import { Actividad } from "@/lib/actividades";

export function Actividades({ actividades }: { actividades: Actividad[] }) {
  return (
    <section className="bg-paper py-20 md:py-28 relative overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Qué hacer
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-forest mt-6 leading-[1.05] text-balance max-w-2xl">
            Seis razones para no salir del parque en todo el viaje.
          </h2>
        </div>

        <div className="space-y-0 divide-y divide-ink/8">
          {actividades.map((a, i) => (
            <article
              key={a.title}
              className="py-10 grid md:grid-cols-[2fr_1fr] gap-8 md:gap-16"
            >
              <div>
                <div className="flex items-start gap-4">
                  <span className="font-serif text-3xl text-clay/25 italic shrink-0 leading-none mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-forest leading-snug">
                      {a.title}
                    </h3>
                    <p className="text-ink/65 leading-relaxed mt-3 max-w-[52ch]">
                      {a.desc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 md:pt-1">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
                    Dificultad:{" "}
                  </span>
                  <span className="text-sm text-moss font-medium">
                    {a.dificultad}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
                    Duración:{" "}
                  </span>
                  <span className="text-sm text-ink/65">{a.duracion}</span>
                </div>
                <div className="text-[11px] text-clay/70 italic leading-snug">
                  {a.llevar}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
