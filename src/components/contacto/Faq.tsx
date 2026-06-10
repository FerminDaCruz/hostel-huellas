const faqs = [
  {
    q: "¿Cómo reservo?",
    a: "Podés usar el formulario de reserva en esta misma página o escribirnos por WhatsApp con tus fechas, la cantidad de personas y el tipo de alojamiento que buscás. Te respondemos en minutos.",
  },
  {
    q: "¿Necesito pagar por adelantado?",
    a: "Pedimos un anticipo para confirmar. El resto lo abonás a tu llegada. Aceptamos transferencia, efectivo y tarjeta.",
  },
  {
    q: "¿Hay mínimo de noches?",
    a: "No requerimos mínimo, aunque recomendamos 3 noches o más para aprovechar de verdad el lugar y las salidas con Maxi.",
  },
  {
    q: "¿Tienen lugar para este fin de semana?",
    a: "Preguntanos directo por WhatsApp — es la forma más rápida de confirmar disponibilidad en tiempo real.",
  },
  {
    q: "¿Se puede ir con perro?",
    a: "En algunos casos sí. Consultanos antes de reservar y lo evaluamos según el tipo de alojamiento y la temporada.",
  },
  {
    q: "¿Qué incluye la estadía?",
    a: "Cama, ropa de cama y acceso a la cocina comunitaria. El desayuno casero es opcional con cargo adicional.",
  },
];

export function Faq() {
  return (
    <section className="bg-beige py-20 md:py-28 relative overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-3xl mx-auto px-6 relative">
        <div className="mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            Preguntas frecuentes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest mt-6 leading-[1.05] text-balance">
            Lo que todos preguntan antes de reservar.
          </h2>
        </div>
        <dl className="divide-y divide-ink/10">
          {faqs.map((f) => (
            <div key={f.q} className="py-8">
              <dt className="font-serif text-xl md:text-2xl text-forest mb-3">
                {f.q}
              </dt>
              <dd className="text-ink/65 leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-14 text-center">
          <p className="text-ink/55 mb-6">
            ¿Tenés otra pregunta? Escribinos directamente.
          </p>
          <a
            href="https://wa.me/5492944000000?text=Hola%20Huellas%2C%20tengo%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-forest text-beige px-10 py-4 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-moss hover:scale-[1.02] transition-all shadow-xl"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
