import { Footprint } from "../footprint";

type Mark = {
  name: string;
  origin: string;
  year: string;
  quote: string;
  color: "clay" | "moss" | "wood" | "forest";
  rotate: number;
  scale: number;
  mirror?: boolean;
};

const marks: Mark[] = [
  {
    name: "Lucas",
    origin: "Buenos Aires, AR",
    year: "2022",
    quote:
      "Casi un mes viviendo acá y terminé sintiéndome parte de una familia.",
    color: "clay",
    rotate: -12,
    scale: 1,
  },
  {
    name: "Marina",
    origin: "São Paulo, BR",
    year: "2023",
    quote: "Las risas nunca faltaron en los fogones nocturnos.",
    color: "moss",
    rotate: 8,
    scale: 0.9,
    mirror: true,
  },
  {
    name: "Hans",
    origin: "Berlin, DE",
    year: "2021",
    quote: "The most authentic hostel experience in South America.",
    color: "wood",
    rotate: -6,
    scale: 1.05,
  },
  {
    name: "Chloé",
    origin: "Lyon, FR",
    year: "2024",
    quote: "Vuelvo a Francia con el corazón lleno y muchas ganas de regresar.",
    color: "clay",
    rotate: 14,
    scale: 0.95,
  },
  {
    name: "Sofía",
    origin: "Madrid, ES",
    year: "2023",
    quote: "Me hicieron sentir en casa desde el primer día. Una familia.",
    color: "forest",
    rotate: -18,
    scale: 1,
    mirror: true,
  },
  {
    name: "Tomás & Vale",
    origin: "Rosario, AR",
    year: "2024",
    quote: "Volveríamos sin dudar. La mejor experiencia del viaje.",
    color: "moss",
    rotate: -20,
    scale: 0.92,
  },
  {
    name: "James",
    origin: "Bristol, UK",
    year: "2019",
    quote: "Maxi made us feel like we'd known each other for years.",
    color: "clay",
    rotate: -8,
    scale: 1.08,
    mirror: true,
  },
  {
    name: "Elena",
    origin: "Milano, IT",
    year: "2022",
    quote: "Una experiencia única para conocer Lago Puelo de verdad.",
    color: "wood",
    rotate: 16,
    scale: 0.94,
  },
  {
    name: "Diego",
    origin: "Santiago, CL",
    year: "2023",
    quote:
      "Salí con amigos para toda la vida. Eso vale más que el alojamiento.",
    color: "moss",
    rotate: -10,
    scale: 1,
  },
  {
    name: "Anna",
    origin: "Praga, CZ",
    year: "2024",
    quote:
      "Felt like coming home, even though it was the other side of the world.",
    color: "clay",
    rotate: 6,
    scale: 1.02,
    mirror: true,
  },
  {
    name: "Pedro",
    origin: "Lima, PE",
    year: "2022",
    quote: "El desayuno casero, los trekkings, los fogones. Todo.",
    color: "forest",
    rotate: -14,
    scale: 0.96,
  },
  {
    name: "Sarah",
    origin: "Melbourne, AU",
    year: "2024",
    quote: "I left part of my heart on that wall. Will be back.",
    color: "clay",
    rotate: 12,
    scale: 1.04,
    mirror: true,
  },
];

const colorClass: Record<Mark["color"], string> = {
  clay: "text-clay",
  moss: "text-moss",
  wood: "text-wood",
  forest: "text-forest",
};

export function WallOfFootprints() {
  return (
    <section id="muro" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[oklch(0.93_0.015_75)]" />
      <div className="texture-grain absolute inset-0" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-3xl mb-16 md:mb-20 reveal">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            El muro de Huellas
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-forest text-balance leading-[1.05] mt-6">
            Cada huella cuenta <em>una historia</em>.
          </h2>
          <p className="mt-6 text-lg text-ink/75 max-w-[56ch] leading-relaxed">
            Desde 2017, cada viajero deja literalmente su huella pintada en una
            pared del hostel. Una obra colectiva, viva, hecha de pies, pigmentos
            y recuerdos. Pasá el cursor sobre cualquier huella para leer su
            historia.
          </p>
        </div>

        <div className="relative bg-[oklch(0.96_0.015_80)] ring-1 ring-black/5 rounded-sm p-6 md:p-10 shadow-inner">
          <div className="texture-grain absolute inset-0 rounded-sm" />
          <div className="relative grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {marks.map((m, i) => (
              <button
                key={i}
                type="button"
                className="group relative aspect-2/3 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-clay rounded-sm"
                aria-label={`Huella de ${m.name}, ${m.origin}, ${m.year}`}
              >
                <Footprint
                  rotate={m.rotate}
                  mirror={m.mirror}
                  className={`h-3/4 w-3/4 ${colorClass[m.color]} opacity-50 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105`}
                />
                {/* Hover/focus testimonial */}
                <div className="absolute z-20 left-1/2 bottom-full mb-3 -translate-x-1/2 w-64 p-5 bg-paper ring-1 ring-black/10 rounded-sm shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-300">
                  <p className="font-serif italic text-sm leading-snug text-ink">
                    "{m.quote}"
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
                    <span className="font-semibold text-forest">{m.name}</span>
                    <span className="text-moss">{m.origin}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] mt-1 text-ink/40">
                    Huella · {m.year}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-sm italic text-ink/60 max-w-xl mx-auto">
          La pared sigue creciendo. La próxima huella podría ser la tuya.
        </p>
      </div>
    </section>
  );
}
