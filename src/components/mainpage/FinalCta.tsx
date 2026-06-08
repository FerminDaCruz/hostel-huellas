import Image from "next/image";

export function FinalCta() {
  return (
    <section
      id="reservar"
      className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center"
    >
      <Image
        src="/wall-footprints.jpg"
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-paper/85 backdrop-blur-[1px]" />
      <div className="texture-grain absolute inset-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
        <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
          Tu turno
        </span>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-forest mt-6 leading-[0.95] text-balance">
          ¿Cuál será <em>tu huella</em>?
        </h2>
        <p className="text-lg md:text-xl text-ink/80 mt-8 max-w-xl mx-auto leading-relaxed">
          Miles de historias comenzaron con una reserva.
          <br />
          La próxima puede ser la tuya.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/5492944000000?text=Hola%20Huellas%2C%20quiero%20reservar%20una%20estad%C3%ADa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-forest text-beige px-10 py-4 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-moss hover:scale-[1.03] transition-all shadow-xl"
          >
            Reservar mi estadía
          </a>
          <a
            href="https://instagram.com/hostelhuellaspuelo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest underline underline-offset-4 decoration-clay decoration-2 text-sm uppercase tracking-[0.2em] font-medium px-4 py-2 hover:text-clay transition-colors"
          >
            Ver el hostel en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
