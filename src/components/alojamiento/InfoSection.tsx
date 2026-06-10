const practico = [
  { label: "Check-in", val: "A partir de las 14:00 hs" },
  { label: "Check-out", val: "Hasta las 11:00 hs" },
  {
    label: "Política de cancelación",
    val: "Cancelaciones con más de 48 hs: reintegro completo. Menos de 48 hs: se retiene el anticipo.",
  },
  {
    label: "Desayuno",
    val: "No incluido. Disponible con cargo adicional — pan casero, mate, fruta.",
  },
  {
    label: "Formas de pago",
    val: "Efectivo, transferencia bancaria, tarjeta.",
  },
  {
    label: "Mascotas",
    val: "Consultanos. En algunos casos son bienvenidas.",
  },
];

export function InfoSection() {
  return (
    <section className="bg-beige py-20 md:py-28 overflow-hidden relative">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Información útil
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-forest mt-6 leading-tight text-balance">
            Todo lo que necesitás saber antes de llegar.
          </h2>
        </div>
        <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {practico.map((p) => (
            <div key={p.label} className="border-t border-ink/10 pt-6">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-clay font-semibold mb-2">
                {p.label}
              </dt>
              <dd className="text-ink/70 leading-relaxed text-sm">{p.val}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
