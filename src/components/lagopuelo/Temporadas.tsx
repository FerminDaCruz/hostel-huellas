const temporadas = [
  {
    label: "Verano (dic–feb)",
    ventajas:
      "Temperatura ideal para kayak y playa. Días largos con sol hasta las 21 hs. Temporada alta — reservá con anticipación.",
    temp: "20°–28°C",
  },
  {
    label: "Otoño (mar–may)",
    ventajas:
      "Los colores del bosque andino son espectaculares. Mucho menos turismo. Los senderos están en perfecto estado.",
    temp: "10°–20°C",
  },
  {
    label: "Invierno (jun–ago)",
    ventajas:
      "El pueblo es casi tuyo. Algunos senderos se cierran por nieve. Para quienes quieren el pueblo sin gente.",
    temp: "0°–10°C",
  },
  {
    label: "Primavera (sep–nov)",
    ventajas:
      "El bosque despierta. Los ríos vienen con deshielo. Temperatura perfecta para trekking sin el calor del verano.",
    temp: "10°–20°C",
  },
];

export function Temporadas() {
  return (
    <section className="bg-beige py-20 md:py-28 relative overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Cuándo ir
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest mt-6 leading-[1.05] text-balance">
            Cada temporada tiene su magia.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {temporadas.map((t) => (
            <div
              key={t.label}
              className="bg-paper border border-ink/5 rounded-sm p-7"
            >
              <h3 className="font-serif text-xl text-forest mb-2">{t.label}</h3>
              <div className="text-[11px] uppercase tracking-[0.2em] text-clay mb-4">
                {t.temp}
              </div>
              <p className="text-ink/60 text-sm leading-relaxed">
                {t.ventajas}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
