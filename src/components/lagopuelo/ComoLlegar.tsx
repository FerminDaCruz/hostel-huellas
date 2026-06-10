export function ComoLlegar() {
  return (
    <section className="bg-paper py-20 md:py-28 relative overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Cómo llegar
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest mt-6 leading-[1.05] text-balance">
            Más cerca de lo que pensás.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              desde: "Desde Bariloche",
              como: "120 km por la Ruta 40. Aproximadamente 1h 30min en auto. Hay servicio de ómnibus varias veces al día desde la terminal de Bariloche hasta Lago Puelo.",
              tiempo: "~1h 30min",
            },
            {
              desde: "Desde El Bolsón",
              como: "18 km al sur. 20 minutos en auto. Hay servicio de colectivo frecuente entre El Bolsón y Lago Puelo durante todo el día.",
              tiempo: "~20 min",
            },
            {
              desde: "Desde Buenos Aires",
              como: "Vuelo a Bariloche (2 hs) + traslado por tierra a Lago Puelo. También se puede llegar en bus desde Buenos Aires en unas 22-24 horas.",
              tiempo: "~4 hs (aéreo)",
            },
          ].map((c) => (
            <div key={c.desde} className="border-t border-ink/10 pt-8">
              <h3 className="font-serif text-2xl text-forest mb-2">
                {c.desde}
              </h3>
              <div className="text-[11px] uppercase tracking-[0.2em] text-clay mb-4">
                {c.tiempo}
              </div>
              <p className="text-ink/65 text-sm leading-relaxed">{c.como}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
