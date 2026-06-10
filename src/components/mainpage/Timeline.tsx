import { Footprint } from "../shared/footprint";

const milestones = [
  {
    year: "2017",
    title: "Nacimiento de Huellas",
    text: "Maxi transforma la antigua casa familiar en un refugio para viajeros. Se pinta la primera huella en la pared.",
  },
  {
    year: "2019",
    title: "Primeros viajeros internacionales",
    text: "Llegan los primeros huéspedes de Europa, Asia y Oceanía. El muro empieza a hablar muchos idiomas.",
  },
  {
    year: "2022",
    title: "Más de 1.000 huéspedes",
    text: "La comunidad crece. Se suman trekkings guiados, asados temáticos y noches de fogón regulares.",
  },
  {
    year: "2025",
    title: "La pared sigue creciendo",
    text: "Más de 2.000 huellas, 32 países representados y una familia internacional que vuelve cada temporada.",
  },
];

export function Timeline() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-paper">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-20 reveal">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Línea del tiempo
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-forest text-balance leading-[1.05] mt-6">
            Ocho años, <em>una huella tras otra</em>.
          </h2>
        </div>

        <ol className="relative">
          {/* Center line */}
          <div
            className="absolute left-6 md:left-1/2 top-2 bottom-2 w-px bg-ink/15 md:-translate-x-1/2"
            aria-hidden
          />

          {milestones.map((m, i) => {
            const isRight = i % 2 === 1;
            return (
              <li
                key={m.year}
                className={`relative grid md:grid-cols-2 gap-8 md:gap-16 mb-16 last:mb-0 reveal`}
              >
                {/* Footprint marker */}
                <div
                  className="absolute left-6 md:left-1/2 top-4 -translate-x-1/2 z-10"
                  aria-hidden
                >
                  <div className="w-10 h-14 flex items-center justify-center bg-paper ring-1 ring-ink/15 rounded-full p-1.5 shadow-sm">
                    <Footprint
                      rotate={i % 2 === 0 ? -10 : 12}
                      className="h-full w-full text-clay"
                    />
                  </div>
                </div>

                <div
                  className={`pl-20 md:pl-0 ${isRight ? "md:col-start-2" : "md:text-right md:pr-16"}`}
                >
                  <div className="font-serif text-3xl md:text-4xl text-clay italic">
                    {m.year}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-forest mt-2">
                    {m.title}
                  </h3>
                  <p className="text-ink/75 mt-3 leading-relaxed max-w-[44ch] md:inline-block">
                    {m.text}
                  </p>
                </div>
                <div
                  className={
                    isRight
                      ? "hidden md:block"
                      : "hidden md:block md:col-start-2"
                  }
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
