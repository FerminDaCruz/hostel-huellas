import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { habitaciones } from "@/lib/alojamiento";

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

export const metadata = {
  title: "Alojamiento — Hostel Huellas Puelo",
  description:
    "Dorms compartidos, habitaciones privadas con vista a la montaña y departamento en Lago Puelo. Precios y disponibilidad.",
};

export default function AlojamientoPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-36 pb-20 md:pt-52 md:pb-28 bg-forest overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
              Alojamiento
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper mt-6 leading-[0.95] text-balance max-w-3xl">
              Tenemos el lugar para vos,{" "}
              <em>seas como seas</em>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-paper/70 max-w-[52ch] leading-relaxed">
              Dos personas o veinte, solas o en grupo, con presupuesto ajustado
              o buscando más privacidad — hay una opción para cada viajero.
            </p>
          </div>
        </section>

        {/* Habitaciones */}
        <section className="bg-paper py-8 md:py-16 pb-28 md:pb-40">
          <div className="max-w-7xl mx-auto px-6 space-y-16 md:space-y-24">
            {habitaciones.map((h, i) => (
              <article
                key={h.slug}
                id={h.slug}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link
                  href={`/alojamiento/${h.slug}`}
                  className="group overflow-hidden rounded-sm ring-1 ring-black/5 shadow-2xl shadow-black/10 block"
                >
                  <Image
                    src={h.images[0]}
                    alt={h.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </Link>

                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-clay font-semibold">
                      {h.subtitle}
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-forest mt-3 leading-tight">
                      {h.title}
                    </h2>
                  </div>
                  <p className="text-ink/70 leading-relaxed text-lg max-w-[48ch]">
                    {h.descLong}
                  </p>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-moss">
                    {h.capacity}
                  </div>
                  <ul className="space-y-2">
                    {h.includes.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-center gap-3 text-sm text-ink/65"
                      >
                        <span className="text-clay text-xs">▲</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-end gap-4 pt-4 border-t border-ink/8">
                    <div>
                      <div className="font-serif text-4xl text-clay">
                        {h.price}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1">
                        {h.tag}
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <Link
                        href={`/alojamiento/${h.slug}`}
                        className="text-[11px] uppercase tracking-[0.18em] text-forest underline underline-offset-4 decoration-clay decoration-2 hover:text-clay transition-colors font-medium"
                      >
                        Ver detalle →
                      </Link>
                      <a
                        href={`https://wa.me/5492944000000?text=Hola%20Huellas%2C%20quiero%20consultar%20por%20${encodeURIComponent(h.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-forest text-beige px-6 py-3 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:bg-moss hover:-translate-y-0.5 transition-all shadow-md"
                      >
                        Consultar
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Info práctica */}
        <section className="bg-beige py-20 md:py-28 overflow-hidden relative">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="mb-14">
              <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
                Info práctica
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
                  <dd className="text-ink/70 leading-relaxed text-sm">
                    {p.val}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-forest text-beige py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
              ¿Tenés dudas?
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-paper mt-6 leading-tight text-balance">
              Escribinos y armamos el plan a tu medida.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/5492944000000?text=Hola%20Huellas%2C%20quiero%20consultar%20por%20alojamiento"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-clay text-paper px-10 py-4 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl"
              >
                Consultar por WhatsApp
              </a>
              <Link
                href="/contacto"
                className="border border-beige/30 text-beige px-8 py-4 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-beige/10 transition-all"
              >
                Otras formas de contacto
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
