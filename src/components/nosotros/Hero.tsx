export function Hero() {
  return (
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
  );
}
