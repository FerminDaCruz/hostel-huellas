import Image from "next/image";

export function MaxiSection() {
  return (
    <section className="bg-beige py-20 md:py-28 overflow-hidden relative">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
        <div className="space-y-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Tu guía
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest leading-[1.05] text-balance">
            Creció en esta montaña. <em>Ahora quiere mostrártela.</em>
          </h2>
          <div className="space-y-5 text-ink/75 leading-relaxed text-lg max-w-[48ch]">
            <p>
              Maxi es guía de montaña matriculado y fundador de Huellas Puelo.
              Antes de transformar la casa familiar en hostel, pasó años
              recorriendo cada sendero, arroyo y rincón de la Comarca Andina.
            </p>
            <p>
              Lo que busca que te lleves no es una foto en el cerro — es la
              sensación de haber conocido un lugar de verdad. Sin filtros, sin
              grupos masivos, sin itinerarios rígidos.
            </p>
          </div>
          <div className="p-6 bg-paper ring-1 ring-black/5 rounded-sm max-w-md">
            <p className="font-serif italic text-lg text-forest leading-snug">
              "Quiero que la gente se vaya con algo que no pueden comprar:
              conocer la montaña desde adentro."
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] mt-4 text-moss font-semibold">
              Maxi · Guía & Fundador
            </p>
          </div>
          <a
            href="https://wa.me/5492944000000?text=Hola%20Maxi%2C%20quiero%20consultar%20por%20las%20salidas%20y%20actividades"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-forest text-beige px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-moss hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Consultar con Maxi
          </a>
        </div>
        <div className="relative">
          <Image
            src="/maxi-portrait.jpg"
            alt="Maxi, guía de montaña matriculado y fundador de Hostel Huellas Puelo"
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-square w-full object-cover rounded-sm shadow-2xl ring-1 ring-black/5"
          />
          <div className="absolute -bottom-6 -left-6 md:-left-10 p-5 bg-forest text-beige rounded-sm shadow-xl">
            <div className="font-serif text-3xl text-wood">+8</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-beige/60 mt-1">
              Años de experiencia
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
