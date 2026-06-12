"use client";

import { useState } from "react";
import { Footprint } from "../shared/footprint";
import { resenas, type Resena } from "@/lib/resenas";

const colorClass: Record<Resena["color"], string> = {
  clay: "text-clay",
  moss: "text-moss",
  wood: "text-wood",
  forest: "text-forest",
};

export function WallOfFootprints() {
  const [openId, setOpenId] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenId((prev) => (prev === i ? null : i));
  }

  return (
    <section id="muro" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[oklch(0.93_0.015_75)]" />
      <div className="texture-grain absolute inset-0" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-3xl mb-16 md:mb-20 reveal">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Reseñas de huéspedes
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-forest text-balance leading-[1.05] mt-6">
            Cada huella cuenta <em>una historia</em>.
          </h2>
          <p className="mt-6 text-lg text-ink/75 max-w-[56ch] leading-relaxed">
            Desde 2017, cada viajero deja literalmente su huella pintada en una
            pared del hostel. Una obra colectiva, viva, hecha de pies, pigmentos
            y recuerdos. Tocá o pasá el cursor sobre cualquier huella para leer
            la reseña.
          </p>
        </div>

        <div className="relative bg-[oklch(0.96_0.015_80)] ring-1 ring-black/5 rounded-sm p-6 md:p-10 shadow-inner">
          <div className="texture-grain absolute inset-0 rounded-sm" />
          <div className="relative grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {resenas.map((m, i) => {
              const isPinned = openId === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggle(i)}
                  className="group relative aspect-2/3 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-clay rounded-sm"
                  aria-label={`Reseña de ${m.name}, ${m.origin}, ${m.year}`}
                  aria-expanded={isPinned}
                >
                  <Footprint
                    rotate={m.rotate}
                    mirror={m.mirror}
                    className={`h-3/4 w-3/4 ${colorClass[m.color]} transition-all duration-500 ${
                      isPinned
                        ? "opacity-90 scale-105"
                        : "opacity-50 group-hover:opacity-90 group-hover:scale-105"
                    }`}
                  />
                  {/* Testimonial card — shown on hover (desktop) or click/tap (mobile) */}
                  <div
                    className={`absolute z-20 left-1/2 bottom-full mb-3 -translate-x-1/2 w-64 p-5 bg-paper ring-1 ring-black/10 rounded-sm shadow-2xl transition-all duration-300 ${
                      isPinned
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                    }`}
                  >
                    <p className="font-serif italic text-sm leading-snug text-ink">
                      "{m.quote}"
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
                      <span className="font-semibold text-forest">{m.name}</span>
                      <span className="text-moss">{m.origin}</span>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] mt-1 text-ink/40">
                      Reseña · {m.year}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-center text-sm italic text-ink/60 max-w-xl mx-auto">
          La pared sigue creciendo. La próxima huella podría ser la tuya.
        </p>
      </div>
    </section>
  );
}
