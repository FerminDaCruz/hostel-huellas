import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { actividades } from "@/lib/actividades";
import { CtaComponent } from "@/components/shared/CtaComponent";

export const metadata = {
  title: "Experiencias — Hostel Huellas Puelo",
  description:
    "Trekking al Cerro Currumahuida, kayak, bosques nativos y salidas personalizadas con Maxi, guía de montaña de Lago Puelo.",
};

export default function ExperienciasPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-20 md:pt-52 md:pb-28 bg-forest overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
              Experiencias
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper mt-6 leading-[0.95] text-balance max-w-3xl">
              Maxi te lleva a lugares{" "}
              <em className="text-wood">que no están en ningún mapa</em>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-paper/70 max-w-[52ch] leading-relaxed">
              No es un guía. Es alguien que creció en esta montaña y quiere que
              la conozcas como él la conoce.
            </p>
          </div>
        </section>

        {/* Actividades */}
        <section className="bg-paper py-20 md:py-28">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {actividades.map((a) => (
                <Link
                  key={a.slug}
                  href={`/experiencias/${a.slug}`}
                  className="group bg-beige/50 border border-ink/5 rounded-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <Image
                      src={a.img}
                      alt={a.title}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-clay font-semibold mb-3">
                      {a.tag}
                    </div>
                    <h2 className="font-serif text-2xl text-forest leading-snug mb-3">
                      {a.title}
                    </h2>
                    <p className="text-ink/65 text-sm leading-relaxed flex-1">
                      {a.desc}
                    </p>
                    <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/8 pt-5">
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">
                          Dificultad
                        </dt>
                        <dd className="text-sm text-moss font-medium">
                          {a.dificultad}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">
                          Duración
                        </dt>
                        <dd className="text-sm text-ink/70">{a.duracion}</dd>
                      </div>
                    </dl>
                    <div className="mt-3 text-[11px] text-ink/45 leading-snug">
                      <span className="text-clay font-medium">Llevá: </span>
                      {a.llevar}
                    </div>
                    <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-moss font-semibold group-hover:text-clay transition-colors">
                      Ver detalle →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Maxi — marca personal */}
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
                  Maxi es guía de montaña matriculado y fundador de Huellas
                  Puelo. Antes de transformar la casa familiar en hostel, pasó
                  años recorriendo cada sendero, arroyo y rincón de la Comarca
                  Andina.
                </p>
                <p>
                  Lo que busca que te lleves no es una foto en el cerro — es la
                  sensación de haber conocido un lugar de verdad. Sin filtros,
                  sin grupos masivos, sin itinerarios rígidos.
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

        <CtaComponent
          label="¿Querés que Maxi te lleve?"
          title="Armamos un plan a tu medida."
          desc="Decinos cuántos días tenés, qué nivel de actividad preferís y qué querés ver. Maxi lo resuelve."
        />
      </main>
      <Footer />
    </>
  );
}
