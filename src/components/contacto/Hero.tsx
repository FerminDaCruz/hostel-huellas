import { Footprint } from "../shared/footprint";

export function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-52 md:pb-28 bg-forest overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 opacity-8 pointer-events-none"
      >
        <Footprint rotate={10} className="h-full w-64 text-beige" />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
          Contacto
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper mt-6 leading-[0.95] text-balance">
          Hablemos.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-paper/70 max-w-[52ch] mx-auto leading-relaxed">
          Reservá online, escribinos por WhatsApp o mandanos un email.
          Respondemos rápido.
        </p>
      </div>
    </section>
  );
}
