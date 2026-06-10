import Image from "next/image";
import Link from "next/link";

export function CtaFinal() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center">
      <Image
        src="/wall-footprints.jpg"
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-paper/87 backdrop-blur-[1px]" />
      <div className="texture-grain absolute inset-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
          ¿Todavía pensando?
        </span>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-forest mt-6 leading-[0.95] text-balance">
          Las paredes <em>te esperan</em>.
        </h2>
        <p className="text-lg md:text-xl text-ink/75 mt-8 max-w-xl mx-auto leading-relaxed">
          Más de 2.000 huellas en las paredes. La próxima puede ser la tuya.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contacto"
            className="bg-forest text-beige px-10 py-4 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-moss hover:scale-[1.03] transition-all shadow-xl"
          >
            Reservar mi estadía
          </Link>
          <a
            href="https://instagram.com/hostelhuellaspuelo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest underline underline-offset-4 decoration-clay decoration-2 text-sm uppercase tracking-[0.2em] font-medium px-4 py-2 hover:text-clay transition-colors"
          >
            Ver en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
