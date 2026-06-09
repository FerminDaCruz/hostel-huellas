const razones = [
  {
    n: "01",
    t: "No somos hotel",
    d: "Casa familiar transformada en refugio. Sin lobby, sin protocolos fríos. Llegás y ya estás en casa.",
  },
  {
    n: "02",
    t: "Maxi te lleva a la montaña",
    d: "Guía matriculado que creció en la Comarca. Conoce cada arroyo y cada mirador que no aparece en ningún mapa turístico.",
  },
  {
    n: "03",
    t: "Comunidad que se hace familia",
    d: "Los viajeros que llegan solos se van con amigos para toda la vida. Pasa siempre.",
  },
  {
    n: "04",
    t: "El Parque Nacional en la puerta",
    d: "A 5 minutos del ingreso. El bosque andino empieza apenas cruzás el portón. Sin traslados.",
  },
  {
    n: "05",
    t: "Sin formatos genéricos",
    d: "No tenemos recepción fría ni desayuno bufé. Tenemos mate, fogón y conversación real.",
  },
  {
    n: "06",
    t: "Volvés. Todos vuelven.",
    d: "No lo decimos nosotros. Lo dice el muro que sigue creciendo temporada tras temporada.",
  },
];

export function PorQueHuellas() {
  return (
    <section className="relative py-28 md:py-36 bg-paper overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Por qué Huellas
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-forest text-balance leading-[1.05] mt-6">
            No somos para todos.{" "}
            <em className="text-moss">¿Sos para nosotros?</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {razones.map((r) => (
            <article key={r.n} className="border-t border-ink/10 pt-8">
              <span className="font-serif text-4xl text-clay/20 italic">
                {r.n}
              </span>
              <h3 className="font-serif text-2xl text-forest mt-4 mb-3">
                {r.t}
              </h3>
              <p className="text-ink/60 text-sm leading-relaxed">{r.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
