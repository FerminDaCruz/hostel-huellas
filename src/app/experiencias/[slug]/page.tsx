import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { actividades } from "@/lib/actividades";

export function generateStaticParams() {
  return actividades.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = actividades.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: `${a.title} en Lago Puelo — Hostel Huellas Puelo`,
    description: a.descLong,
    alternates: { canonical: `/experiencias/${slug}` },
    openGraph: {
      title: `${a.title} en Lago Puelo — Hostel Huellas`,
      description: a.descLong,
      url: `/experiencias/${slug}`,
      images: [{ url: a.img, width: 1200, height: 630, alt: `${a.title} — Lago Puelo, Patagonia` }],
    },
    twitter: {
      title: `${a.title} en Lago Puelo — Hostel Huellas`,
      description: a.descLong,
      images: [a.img],
    },
  };
}

export default async function ExperienciaDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = actividades.find((x) => x.slug === slug);
  if (!a) notFound();

  const otras = actividades.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
          <Image
            src={a.img}
            alt={a.title}
            width={1920}
            height={1280}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-paper" />
          <div className="absolute top-0 left-0 right-0 bottom-1/3 flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-10 w-full">
              <Link
                href="/experiencias"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-paper/70 hover:text-paper transition-colors mb-6"
              >
                ← Todas las experiencias
              </Link>
              <span className="block text-[11px] uppercase tracking-[0.3em] text-wood font-semibold mb-3">
                {a.tag}
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper leading-[0.93] text-balance max-w-3xl">
                {a.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Descripción + ficha práctica */}
        <section className="bg-paper py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
              {/* Descripción larga */}
              <div className="space-y-6">
                <p className="text-ink/75 leading-relaxed text-lg md:text-xl max-w-[60ch]">
                  {a.descLong}
                </p>

                <div className="pt-6 border-t border-ink/8">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-clay font-semibold mb-3">
                    Qué llevarte
                  </p>
                  <p className="text-ink/65 leading-relaxed">{a.llevar}</p>
                </div>
              </div>

              {/* Ficha sticky */}
              <div className="lg:sticky lg:top-28 space-y-0 bg-beige rounded-sm border border-ink/5 overflow-hidden">
                <div className="p-8 space-y-6">
                  <div className="border-b border-ink/8 pb-6">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-clay font-semibold mb-1">
                      Dificultad
                    </div>
                    <div className="font-serif text-2xl text-forest">
                      {a.dificultad}
                    </div>
                  </div>
                  <div className="border-b border-ink/8 pb-6">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-clay font-semibold mb-1">
                      Duración estimada
                    </div>
                    <div className="font-serif text-2xl text-forest">
                      {a.duracion}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-clay font-semibold mb-1">
                      Tipo de actividad
                    </div>
                    <div className="font-serif text-2xl text-forest">
                      {a.tag}
                    </div>
                  </div>
                </div>

                <div className="bg-forest px-8 py-6 space-y-3">
                  <a
                    href={`https://wa.me/5492323334671?text=Hola%20Maxi%21%20Quiero%20consultar%20por%20la%20actividad%20${encodeURIComponent(a.title)}%20%F0%9F%8C%BF`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-clay text-paper text-center px-6 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg"
                  >
                    Consultar con Maxi
                  </a>
                  <Link
                    href="/contacto"
                    className="block w-full text-center text-[11px] uppercase tracking-[0.18em] text-beige/50 hover:text-beige transition-colors py-2"
                  >
                    Otras formas de contacto
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Galería secundaria (si hay images[]) */}
        {a.images && a.images.length > 0 && (
          <section className="bg-beige py-12 md:py-16 overflow-hidden relative">
            <div className="texture-grain absolute inset-0" />
            <div className="max-w-7xl mx-auto px-6 relative">
              <div
                className={`grid gap-4 ${
                  a.images.length >= 3
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {a.images.map((src, i) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-sm ring-1 ring-black/5 aspect-[4/3]"
                  >
                    <Image
                      src={src}
                      alt={`${a.title} — imagen ${i + 1}`}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Info práctica Maxi */}
        <section className="bg-paper py-16 md:py-20 border-t border-ink/6">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-3xl text-forest mb-8">
              Info práctica
            </h2>
            <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  label: "Punto de encuentro",
                  val: "En el hostel o en el ingreso al parque — coordinamos según la actividad",
                },
                {
                  label: "Idioma",
                  val: "Español. Inglés básico disponible para orientación general",
                },
                {
                  label: "Grupos",
                  val: "Salidas individuales o grupales. Máximo 8 personas para actividades guiadas",
                },
                {
                  label: "Reserva",
                  val: "Consultamos disponibilidad por WhatsApp. Sin cargo previo en la mayoría de las actividades",
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

        {/* Otras experiencias */}
        <section className="bg-forest text-beige py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
                Otras experiencias
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-paper mt-4 leading-tight">
                Si esta no es la tuya, hay más.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otras.map((o) => (
                <Link
                  key={o.slug}
                  href={`/experiencias/${o.slug}`}
                  className="group flex flex-col bg-paper/6 border border-beige/10 rounded-sm overflow-hidden hover:bg-paper/10 hover:border-beige/20 transition-all"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <Image
                      src={o.img}
                      alt={o.title}
                      width={800}
                      height={533}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-wood/70 font-semibold mb-2">
                      {o.tag}
                    </div>
                    <h3 className="font-serif text-xl text-paper leading-snug group-hover:text-wood transition-colors flex-1">
                      {o.title}
                    </h3>
                    <div className="mt-4 flex items-end justify-between">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-beige/40">
                        {o.dificultad} · {o.duracion}
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
                href="/experiencias"
                className="inline-block border border-beige/25 text-beige px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-beige/10 transition-all"
              >
                Ver todas las experiencias
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
