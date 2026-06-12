import Image from "next/image";
import Link from "next/link";

export function Historia() {
  return (
    <section
      id="historia"
      className="relative py-28 md:py-40 overflow-hidden bg-paper"
    >
      <div className="texture-grain absolute inset-0" />
      <div className=" max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative">
        <div className="relative order-2 lg:order-1">
          <Image
            src="/maxi-portrait.jpg"
            alt="Maxi, fundador de Hostel Huellas Puelo, en la cocina del hostel"
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover rounded-sm shadow-2xl shadow-black/15 ring-1 ring-black/5"
          />
          <div className="absolute -bottom-8 -right-6 md:-right-12 p-7 md:p-9 bg-paper ring-1 ring-black/5 rounded-sm max-w-xs shadow-xl">
            <p className="font-serif italic text-lg md:text-xl text-forest leading-snug">
              "Hoy esas paredes son el mapa de todos los que pasaron por acá."
            </p>
          </div>
        </div>

        <div className="space-y-8 order-1 lg:order-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Nuestra historia
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-forest text-balance leading-[1.05] max-w-[18ch]">
            Un hostel nacido de un <em>sueño andino.</em>
          </h2>
          <div className="space-y-5 text-pretty max-w-[52ch] leading-relaxed text-ink/80 text-lg">
            <p>
              En 2017, Maxi transformó la antigua casa familiar en un refugio
              para viajeros. Desde el primer día, los huéspedes empezaron a
              dejar su huella pintada en una pared. Sin planificarlo, el nombre
              llegó solo.
            </p>
            <p>
              Hoy esas paredes son el mapa de todos los que pasaron por acá: una
              comunidad que vuelve temporada tras temporada.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-6 max-w-md">
            {[
              { n: "2017", l: "Año de inicio" },
              { n: "+100", l: "Huellas pintadas" },
              { n: "20", l: "Países visitantes" },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-serif text-3xl md:text-4xl text-forest">
                  {s.n}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink/45 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/nosotros"
            className="inline-block text-[11px] uppercase tracking-[0.2em] font-medium text-forest underline underline-offset-4 decoration-clay decoration-2 hover:text-clay transition-colors pt-2"
          >
            Conocer la historia completa →
          </Link>
        </div>
      </div>
    </section>
  );
}
