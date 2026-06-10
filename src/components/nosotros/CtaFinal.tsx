import Image from "next/image";
import Link from "next/link";

export function CtaFinal() {
  return (
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
            Cada huella en esa pared es <em>una persona que pasó por acá</em>.
          </h2>
          <p className="text-ink/70 text-lg leading-relaxed max-w-[48ch]">
            Más de 2.000 huellas de 32 países. Algunos volvieron cuatro o cinco
            temporadas. Algunos se mudaron cerca. Algunos conocieron acá a sus
            mejores amigos.
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
  );
}
