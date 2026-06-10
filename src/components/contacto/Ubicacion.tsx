export function Ubicacion() {
  return (
    <section className="bg-paper py-20 md:py-24 border-t border-ink/6">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Texto */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
              Dónde estamos
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-forest mt-6 mb-6 leading-tight">
              Lago Puelo, Patagonia.
            </h2>
            <p className="text-ink/65 leading-relaxed mb-8 max-w-[44ch]">
              A 5 minutos del acceso al Parque Nacional Lago Puelo y a 18 km de
              El Bolsón. Te mandamos la ubicación exacta al confirmar tu
              reserva.
            </p>
            <dl className="space-y-4 text-sm">
              {[
                ["Localidad", "Lago Puelo, Chubut"],
                ["Referencia", "A 5 min del ingreso al Parque Nacional"],
                [
                  "Cómo llegar",
                  "En auto, remis desde El Bolsón, o en bici desde el centro del pueblo",
                ],
                ["Coordenadas", "-42.051° S, -71.598° O"],
              ].map(([label, val]) => (
                <div key={label} className="flex gap-4">
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-clay font-semibold shrink-0 pt-0.5 w-24">
                    {label}
                  </dt>
                  <dd className="text-ink/65 leading-relaxed">{val}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Mapa */}
          <div className="overflow-hidden rounded-sm ring-1 ring-black/5 shadow-xl h-80 lg:h-full min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2962.6188355707504!2d-71.59838812321728!3d-42.05135318789868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961beb42ac729895%3A0xd58bcea19a240428!2sHOSTEL%20HUELLAS%20-%20Alojamiento%20en%20Lago%20Puelo!5e0!3m2!1ses!2sar!4v1781013431706!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Hostel Huellas Puelo en Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
