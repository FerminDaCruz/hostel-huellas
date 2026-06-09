import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Footprint } from "@/components/footprint";

const ecosistema = [
  {
    title: "El hostel",
    desc: "Dorms compartidos, habitaciones privadas y ambientes comunes. El núcleo de Huellas. Donde se hacen las amistades y se toman las mejores decisiones espontáneas.",
    href: "/alojamiento",
  },
  {
    title: "Las habitaciones con vista",
    desc: "Para grupos o familias que quieren privacidad con el paisaje andino en la ventana. Despertarse mirando el bosque cambia algo adentro.",
    href: "/alojamiento",
  },
  {
    title: "El departamento",
    desc: "Cocina propia, baño, independencia total. Para estadías más largas o para quienes quieren su propio ritmo sin alejarse de la comunidad.",
    href: "/alojamiento",
  },
  {
    title: "Las salidas con Maxi",
    desc: "Trekking, kayak, rincones secretos. Maxi guía profesional — no un servicio turístico. Una experiencia de montaña real.",
    href: "/experiencias",
  },
];

export const metadata = {
  title: "Nosotros — Hostel Huellas Puelo",
  description:
    "La historia de Maxi y cómo nació Huellas Puelo en Lago Puelo, Patagonia. Conocé al fundador y guía de montaña detrás del hostel.",
};

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-0 md:pt-52 bg-forest overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-7xl mx-auto px-6 relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            <div className="space-y-8 pb-16 md:pb-24">
              <span className="text-[11px] uppercase tracking-[0.3em] text-wood  font-semibold">
                Nosotros
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper leading-[0.95] text-balance">
                El hostel tiene alma porque <em>Maxi la puso ahí</em>.
              </h1>
              <p className="text-lg md:text-xl text-paper/70 max-w-[48ch] leading-relaxed">
                Huellas no es un proyecto de negocios. Es la extensión de una
                persona, un lugar y una forma de entender la hospitalidad.
              </p>
            </div>
          </div>
        </section>

        {/* Historia de Maxi */}

        <section className="bg-beige py-20 md:py-28 relative overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
                  La historia
                </span>
                <div className="mt-6 space-y-6">
                  <div className="border-l-2 border-clay pl-6">
                    <div className="font-serif text-2xl text-clay italic">
                      1990s
                    </div>
                    <p className="text-ink/60 text-sm mt-1">
                      Crece en la Comarca Andina
                    </p>
                  </div>
                  <div className="border-l-2 border-clay/50 pl-6">
                    <div className="font-serif text-2xl text-clay/70 italic">
                      2010s
                    </div>
                    <p className="text-ink/60 text-sm mt-1">
                      Se forma como guía de montaña
                    </p>
                  </div>
                  <div className="border-l-2 border-clay pl-6">
                    <div className="font-serif text-2xl text-clay italic">
                      2017
                    </div>
                    <p className="text-ink/60 text-sm mt-1">
                      Nace Huellas Puelo
                    </p>
                  </div>
                  <div className="border-l-2 border-clay/40 pl-6">
                    <div className="font-serif text-2xl text-clay/60 italic">
                      Hoy
                    </div>
                    <p className="text-ink/60 text-sm mt-1">
                      +2.000 huellas, 32 países, temporada a temporada
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-lg text-ink/80 leading-relaxed">
                <p>
                  Maxi creció en la Comarca Andina. No como turista de verano —
                  como habitante que conoce cada sendero, cada arroyo, cada
                  nombre de cerro que no aparece en los mapas oficiales. La
                  montaña no es su negocio: es su idioma.
                </p>
                <p>
                  Estudió guía de turismo y guía de montaña. Pasó años llevando
                  grupos por el Parque Nacional, aprendiendo a leer el tiempo,
                  el bosque, el ritmo de cada persona. Después eligió hacer algo
                  más permanente.
                </p>
                <p>
                  En 2017, la casa familiar de Lago Puelo se convirtió en
                  Huellas. Sin presupuesto de marketing, sin diseño pensado. Con
                  ganas de compartir el lugar que más quería. Los primeros
                  huéspedes empezaron a dejar sus huellas pintadas en una pared.
                  El nombre llegó solo.
                </p>
                <blockquote className="border-l-2 border-clay pl-6 my-8">
                  <p className="font-serif italic text-xl text-forest leading-snug">
                    "Huellas no es un lugar. Es la suma de todas las personas
                    que pasaron por acá."
                  </p>
                  <cite className="text-[10px] uppercase tracking-[0.25em] mt-4 block text-moss font-semibold not-italic">
                    Maxi · Fundador & Guía
                  </cite>
                </blockquote>
                <p>
                  Hoy Maxi recibe a cada huésped en persona, sabe cómo tomás el
                  café, recuerda tu nombre cuando volvés. Eso no se automatiza.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* El ecosistema Huellas */}
        <section className="bg-forest text-beige py-20 md:py-28 relative overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div
            aria-hidden
            className="absolute -right-16 bottom-0 top-0 opacity-8 pointer-events-none"
          >
            <Footprint rotate={20} mirror className="h-full w-56 text-beige" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="max-w-2xl mb-16">
              <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
                El ecosistema
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-paper mt-6 leading-[1.05] text-balance">
                Huellas no es solo el hostel.
              </h2>
              <p className="mt-6 text-beige/70 text-lg leading-relaxed max-w-[48ch]">
                Es el departamento, las habitaciones privadas, las salidas a la
                montaña, el agroturismo. Todo bajo el mismo concepto: vivir Lago
                Puelo de verdad.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {ecosistema.map((e) => (
                <Link
                  key={e.title}
                  href={e.href}
                  className="group border border-beige/15 rounded-sm p-8 hover:bg-beige/8 hover:border-beige/30 transition-all"
                >
                  <h3 className="font-serif text-2xl text-paper mb-3 group-hover:text-wood transition-colors">
                    {e.title}
                  </h3>
                  <p className="text-beige/60 text-sm leading-relaxed">
                    {e.desc}
                  </p>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.2em] text-wood/70 group-hover:text-wood transition-colors">
                    Ver más →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Foto + frase de cierre */}
        <section className="bg-paper py-20 md:py-28 relative overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-7xl mx-auto px-6 relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <Image
                src="/wall-footprints.jpg"
                alt="El muro de huellas pintadas en Hostel Huellas Puelo"
                width={1920}
                height={1080}
                loading="lazy"
                className="w-full aspect-video object-cover rounded-sm shadow-2xl ring-1 ring-black/5"
              />
            </div>
            <div className="space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest leading-[1.05] text-balance">
                Cada huella en esa pared es{" "}
                <em>una persona que pasó por acá</em>.
              </h2>
              <p className="text-ink/70 text-lg leading-relaxed max-w-[48ch]">
                Más de 2.000 huellas de 32 países. Algunos volvieron cuatro o
                cinco temporadas. Algunos se mudaron cerca. Algunos conocieron
                acá a sus mejores amigos.
              </p>
              <p className="text-ink/70 text-lg leading-relaxed max-w-[48ch]">
                Eso no es una estrategia de marketing. Es lo que pasa cuando un
                lugar está hecho con cariño de verdad.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contacto"
                  className="bg-forest text-beige px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-moss hover:-translate-y-0.5 transition-all shadow-lg"
                >
                  Reservar mi visita
                </Link>
                <Link
                  href="/galeria"
                  className="text-forest underline underline-offset-4 decoration-clay decoration-2 text-sm uppercase tracking-[0.2em] font-medium hover:text-clay transition-colors"
                >
                  Ver la galería
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
