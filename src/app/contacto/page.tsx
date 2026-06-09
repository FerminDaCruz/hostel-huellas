import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Footprint } from "@/components/footprint";

const faqs = [
  {
    q: "¿Cómo reservo?",
    a: "La forma más rápida es WhatsApp. Mandanos un mensaje con tus fechas, la cantidad de personas y el tipo de alojamiento que buscás. Te respondemos en minutos.",
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
    "Escribinos por WhatsApp o Instagram para reservar o consultar por disponibilidad en Hostel Huellas Puelo, Lago Puelo.",
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
              Si tenés dudas, querés reservar o simplemente querés saber más de
              Lago Puelo, escribinos. Respondemos rápido.
            </p>
          </div>
        </section>

        {/* Opciones de contacto */}
        <section className="bg-paper py-20 md:py-28 relative overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <a
                href="https://wa.me/5492944000000?text=Hola%20Huellas%2C%20quiero%20consultar"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-beige border border-ink/5 rounded-sm p-10 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center">
                  <span className="text-forest font-serif text-xl">W</span>
                </div>
                <div>
                  <h2 className="font-serif text-3xl text-forest mb-2">
                    WhatsApp
                  </h2>
                  <p className="text-ink/60 leading-relaxed">
                    La forma más rápida de hablar con nosotros. Respondemos
                    todos los días, generalmente en menos de una hora.
                  </p>
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors">
                  Escribir ahora →
                </div>
              </a>

              <a
                href="https://instagram.com/hostelhuellaspuelo"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-beige border border-ink/5 rounded-sm p-10 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center">
                  <span className="text-forest font-serif text-sm font-medium">
                    IG
                  </span>
                </div>
                <div>
                  <h2 className="font-serif text-3xl text-forest mb-2">
                    Instagram
                  </h2>
                  <p className="text-ink/60 leading-relaxed">
                    Seguinos para ver la vida cotidiana del hostel. También
                    podés escribirnos por DM — respondemos por ahí también.
                  </p>
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors">
                  @hostelhuellaspuelo →
                </div>
              </a>
            </div>

            {/* Ubicación */}
            <div className="bg-beige border border-ink/5 rounded-sm p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-forest mb-4">
                    Dónde estamos
                  </h2>
                  <p className="text-ink/65 leading-relaxed mb-6">
                    Hostel Huellas Puelo se encuentra en el ejido de Lago Puelo,
                    Chubut — a 5 minutos del acceso al Parque Nacional y a 18 km
                    de El Bolsón.
                  </p>
                  <dl className="space-y-2 text-sm">
                    <div className="flex gap-3">
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-clay font-semibold shrink-0 pt-0.5">
                        Localidad
                      </dt>
                      <dd className="text-ink/65">Lago Puelo, Chubut</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-clay font-semibold shrink-0 pt-0.5">
                        Referencia
                      </dt>
                      <dd className="text-ink/65">
                        A 5 min del ingreso al Parque Nacional Lago Puelo
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-clay font-semibold shrink-0 pt-0.5">
                        Indicaciones
                      </dt>
                      <dd className="text-ink/65">
                        Te mandamos la ubicación exacta al confirmar tu reserva
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="bg-forest/8 rounded-sm h-48 md:h-full min-h-[180px] flex items-center justify-center border border-forest/10">
                  <div className="text-center">
                    <Footprint
                      rotate={-8}
                      className="h-16 w-12 text-forest/25 mx-auto mb-3"
                    />
                    <p className="text-[11px] uppercase tracking-[0.2em] text-forest/40">
                      Lago Puelo · Patagonia
                    </p>
                  </div>
                </div>
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

        {/* Cómo responden */}
        <section className="bg-paper py-16 md:py-20 border-t border-ink/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-ink/50 text-sm leading-relaxed max-w-[52ch] mx-auto">
              Respondemos por WhatsApp todos los días. En temporada alta (dic–feb)
              puede demorar hasta 2–3 horas. Por Instagram respondemos también,
              pero un poco más lento.
            </p>
          </div>
        </section>

        {/* Links internos */}
        <section className="bg-paper pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-ink/8 pt-12 grid sm:grid-cols-3 gap-6">
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
