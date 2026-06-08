"use client";
import Image from "next/image";

export function Story() {
  return (
    <section id="historia" className="relative py-28 md:py-40 overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative">
        <div className="relative order-2 lg:order-1 reveal">
          <Image
            src="/maxi-portrait.jpg"
            alt="Maxi, fundador y guía de montaña de Hostel Huellas Puelo, sonriendo con un mate en la cocina del hostel"
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover rounded-sm shadow-2xl shadow-black/15 ring-1 ring-black/5"
          />
          <div className="absolute -bottom-8 -right-6 md:-right-12 p-7 md:p-9 bg-paper ring-1 ring-black/5 rounded-sm max-w-xs shadow-xl">
            <p className="font-serif italic text-lg md:text-xl text-forest leading-snug">
              "Huellas no es un lugar. Es la suma de todas las personas que
              pasaron por acá."
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] mt-5 text-moss font-semibold">
              Maxi · Fundador & Guía
            </p>
          </div>
        </div>

        <div className="space-y-8 order-1 lg:order-2 reveal">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Nuestra historia
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-forest text-balance leading-[1.05] max-w-[16ch]">
            Un hostel nacido de un <em>sueño andino</em>.
          </h2>
          <div className="space-y-6 text-pretty max-w-[52ch] leading-relaxed text-ink/85 text-lg">
            <p>
              Maxi creció caminando los senderos de la Comarca Andina. Guía de
              montaña y conocedor de cada arroyo y cada lenga, decidió en 2017
              transformar la antigua casa de su familia en un refugio para
              viajeros que buscan algo más que una cama.
            </p>
            <p>
              La primera huella pintada en la pared marcó el comienzo de una
              tradición que hoy guarda{" "}
              <strong className="text-forest">miles de relatos</strong>. Huellas
              Puelo es el resultado de manos que construyen comunidad y pies que
              recorren senderos.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-6 max-w-md">
            {[
              { n: "2017", l: "Año de inicio" },
              { n: "+2k", l: "Huellas pintadas" },
              { n: "32", l: "Países visitantes" },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-serif text-3xl md:text-4xl text-forest">
                  {s.n}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink/50 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
