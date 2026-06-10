import { Habitacion } from "@/lib/alojamiento";

export function DetailsServices({ h }: { h: Habitacion }) {
  return (
    <section className="bg-beige py-16 md:py-20 relative overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
          Qué incluye
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {h.includes.map((inc) => (
            <li
              key={inc}
              className="flex items-start gap-3 bg-paper border border-ink/5 rounded-sm px-5 py-4 text-sm text-ink/75 leading-snug"
            >
              <span className="text-clay text-xs mt-0.5 shrink-0">▲</span>
              {inc}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
