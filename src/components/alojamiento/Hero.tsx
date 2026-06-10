export function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-52 md:pb-28 bg-forest overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
          Alojamiento
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper mt-6 leading-[0.95] text-balance max-w-3xl">
          Tenemos el lugar para vos, <em>seas como seas</em>.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-paper/70 max-w-[52ch] leading-relaxed">
          Dos personas o veinte, solas o en grupo, con presupuesto ajustado o
          buscando más privacidad — hay una opción para cada viajero.
        </p>
      </div>
    </section>
  );
}
