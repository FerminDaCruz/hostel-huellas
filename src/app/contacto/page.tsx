import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Footprint } from "@/components/footprint";
import { ReservaForm } from "@/components/ReservaForm";

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

export const metadata = {
  title: "Contacto — Hostel Huellas Puelo",
  description:
    "Reservá online o escribinos por WhatsApp, Instagram o email. Hostel Huellas Puelo, Lago Puelo, Patagonia.",
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
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

        {/* Canales de contacto */}
        <section className="bg-paper py-20 md:py-24 relative overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="grid md:grid-cols-3 gap-5">
              <a
                href="https://wa.me/5492944000000?text=Hola%20Huellas%2C%20quiero%20consultar"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
              >
                <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
                  <span className="text-forest font-serif text-lg">W</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-forest mb-2">
                    WhatsApp
                  </h2>
                  <p className="text-ink/60 leading-relaxed text-sm">
                    La forma más rápida. Respondemos todos los días,
                    generalmente en menos de una hora.
                  </p>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors">
                  Escribir ahora →
                </div>
              </a>

              <a
                href="https://instagram.com/hostelhuellaspuelo"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
              >
                <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
                  <span className="text-forest font-serif text-sm font-medium">
                    IG
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-forest mb-2">
                    Instagram
                  </h2>
                  <p className="text-ink/60 leading-relaxed text-sm">
                    Seguinos para ver la vida del hostel. También podés
                    escribirnos por DM.
                  </p>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors">
                  @hostelhuellaspuelo →
                </div>
              </a>

              <a
                href="mailto:hostelhuellaslp@gmail.com"
                className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
              >
                <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
                  <span className="text-forest font-serif text-sm font-medium">
                    @
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-forest mb-2">
                    Email
                  </h2>
                  <p className="text-ink/60 leading-relaxed text-sm">
                    Para consultas que requieren más detalle o adjuntar
                    documentación.
                  </p>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors break-all">
                  hostelhuellaslp@gmail.com →
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Formulario de reserva */}
        <ReservaForm />

        {/* Ubicación + Mapa */}
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
                  A 5 minutos del acceso al Parque Nacional Lago Puelo y a 18 km
                  de El Bolsón. Te mandamos la ubicación exacta al confirmar tu
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

        {/* FAQs */}
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

        {/* Links internos */}
        <section className="bg-paper py-16 md:py-20 border-t border-ink/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  href: "/alojamiento",
                  label: "Alojamiento",
                  desc: "Ver habitaciones y precios",
                },
                {
                  href: "/experiencias",
                  label: "Experiencias",
                  desc: "Salidas y actividades con Maxi",
                },
                {
                  href: "/lagopuelo",
                  label: "Lago Puelo",
                  desc: "Cómo llegar y qué hacer en la zona",
                },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group border border-ink/8 rounded-sm p-6 hover:border-clay hover:shadow-md transition-all"
                >
                  <h3 className="font-serif text-xl text-forest group-hover:text-clay transition-colors">
                    {l.label}
                  </h3>
                  <p className="text-ink/50 text-sm mt-1">{l.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
