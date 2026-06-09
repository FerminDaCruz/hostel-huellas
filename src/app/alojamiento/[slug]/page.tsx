import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { habitaciones } from "@/lib/alojamiento";

export function generateStaticParams() {
  return habitaciones.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = habitaciones.find((x) => x.slug === slug);
  if (!h) return {};
  return {
    title: `${h.title} — Hostel Huellas Puelo`,
    description: h.descLong,
  };
}

export default async function AlojamientoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = habitaciones.find((x) => x.slug === slug);
  if (!h) notFound();

  const otras = habitaciones.filter((x) => x.slug !== slug);

  return (
    <>
      <Header />
      <main>
        {/* Hero imagen */}
        <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
          <Image
            src={h.images[0]}
            alt={h.title}
            width={1920}
            height={1280}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-paper" />
          <div className="absolute top-0 left-0 right-0 bottom-1/3 flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-10 w-full">
              <Link
                href="/alojamiento"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-paper/70 hover:text-paper transition-colors mb-6"
              >
                ← Todas las opciones
              </Link>
              <span className="block text-[11px] uppercase tracking-[0.3em] text-wood font-semibold mb-3">
                {h.subtitle}
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper leading-[0.93] text-balance max-w-2xl">
                {h.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Galería secundaria + descripción */}
        <section className="bg-paper py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
              {/* Galería */}
              <div className="space-y-4">
                {h.images.length > 1 && (
                  <div
                    className={`grid gap-4 ${
                      h.images.length >= 3
                        ? "grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2"
                    }`}
                  >
                    {h.images.slice(1).map((src, i) => (
                      <div
                        key={src}
                        className={`overflow-hidden rounded-sm ring-1 ring-black/5 ${
                          i === 0 && h.images.length >= 3
                            ? "col-span-2 aspect-video"
                            : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${h.title} — imagen ${i + 2}`}
                          width={1024}
                          height={768}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ficha */}
              <div className="lg:sticky lg:top-28 space-y-8">
                {/* Precio */}
                <div className="bg-beige rounded-sm p-8 border border-ink/5">
                  <div className="font-serif text-4xl text-clay">{h.price}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1">
                    {h.tag}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-moss mt-3 font-medium">
                    {h.capacity}
                  </div>
                  <a
                    href={`https://wa.me/5492944000000?text=Hola%20Huellas%2C%20quiero%20consultar%20por%20${encodeURIComponent(h.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 block w-full bg-forest text-beige text-center px-6 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:bg-moss hover:-translate-y-0.5 transition-all shadow-lg"
                  >
                    Consultar disponibilidad
                  </a>
                  <Link
                    href="/contacto"
                    className="mt-3 block w-full text-center text-[11px] uppercase tracking-[0.18em] text-ink/50 hover:text-clay transition-colors py-2"
                  >
                    Otras formas de contacto
                  </Link>
                </div>

                {/* Descripción */}
                <div>
                  <p className="text-ink/75 leading-relaxed text-lg">
                    {h.descLong}
                  </p>
                </div>

                {/* Ideal para */}
                <div className="border-t border-ink/8 pt-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-clay font-semibold mb-2">
                    Ideal para
                  </div>
                  <p className="text-ink/65 text-sm leading-relaxed">
                    {h.ideal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios incluidos */}
        <section className="bg-beige py-16 md:py-20 relative overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
              Qué incluye
            </h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {h.includes.map((inc) => (
                <li
                  key={inc}
                  className="flex items-start gap-3 bg-paper border border-ink/5 rounded-sm px-5 py-4 text-sm text-ink/75 leading-snug"
                >
                  <span className="text-clay text-xs mt-0.5 shrink-0">▲</span>
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Info práctica */}
        <section className="bg-paper py-16 md:py-20 border-t border-ink/6">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-3xl text-forest mb-8">
              Info práctica
            </h2>
            <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Check-in", val: "A partir de las 14:00 hs" },
                { label: "Check-out", val: "Hasta las 11:00 hs" },
                {
                  label: "Cancelación",
                  val: "Reintegro completo con +48 hs de anticipación",
                },
                {
                  label: "Pago",
                  val: "Efectivo, transferencia o tarjeta",
                },
              ].map((p) => (
                <div key={p.label} className="border-t border-ink/10 pt-5">
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-clay font-semibold mb-2">
                    {p.label}
                  </dt>
                  <dd className="text-ink/65 text-sm leading-relaxed">
                    {p.val}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Otras opciones */}
        <section className="bg-forest text-beige py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
                Otras opciones
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-paper mt-4 leading-tight">
                Si este no es el tuyo, probá con alguno de estos.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otras.map((o) => (
                <Link
                  key={o.slug}
                  href={`/alojamiento/${o.slug}`}
                  className="group flex flex-col bg-paper/6 border border-beige/10 rounded-sm overflow-hidden hover:bg-paper/10 hover:border-beige/20 transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={o.img}
                      alt={o.title}
                      width={800}
                      height={450}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl text-paper leading-snug group-hover:text-wood transition-colors">
                      {o.title}
                    </h3>
                    <p className="text-beige/50 text-sm mt-2 leading-relaxed flex-1">
                      {o.desc}
                    </p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="font-serif text-xl text-wood">
                          {o.price}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-beige/35 mt-0.5">
                          {o.tag}
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-wood/70 group-hover:text-wood transition-colors">
                        Ver →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/alojamiento"
                className="inline-block border border-beige/25 text-beige px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-beige/10 transition-all"
              >
                Ver todas las opciones
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
