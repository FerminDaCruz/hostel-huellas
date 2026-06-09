import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const actividades = [
  {
    title: "Trekking al Cerro Currumahuida",
    desc: "La caminata insignia de la zona. Subís por senderos de bosque nativo hasta una cima con vistas 360° del lago, el valle y la cordillera. Media dificultad, 6-8 horas. Maxi te guía.",
    dificultad: "Media",
    costo: "Con guía: consultar",
    tip: "Arrancá temprano para evitar el calor y llegar a la cima antes del mediodía.",
  },
  {
    title: "Kayak en el lago",
    desc: "Paddleando por las aguas turquesas del Parque Nacional. Ideal para tardes tranquilas. No necesitás experiencia previa. El paisaje desde el agua es otro.",
    dificultad: "Fácil",
    costo: "Alquiler: consultar",
    tip: "Los mejores colores están cerca del amanecer o al atardecer.",
  },
  {
    title: "Bosque de Arrayanes",
    desc: "Un bosque único en el mundo, de corteza anaranjada y ambiente de cuento. Corto y accesible. Fue el que inspiró a Walt Disney cuando visitó Bariloche. A 15 km de Lago Puelo.",
    dificultad: "Muy fácil",
    costo: "Entrada al parque incluida con tu pulsera",
    tip: "Andá en día de semana para evitar las multitudes del fin de semana.",
  },
  {
    title: "Mirador del Río Blanco",
    desc: "Caminata familiar con recompensa segura: un mirador sobre el río de aguas glaciares. Ideal para quienes quieren salida de montaña sin esfuerzo extremo.",
    dificultad: "Fácil",
    costo: "Gratuito dentro del parque",
    tip: "Llevá calzado con buena suela. El suelo puede ser resbaladizo en días húmedos.",
  },
  {
    title: "Playa del lago",
    desc: "El lago tiene una playa natural sobre arena de cuarzo. En verano se puede nadar — el agua es fría pero cristalina. El lugar favorito de los huéspedes para leer y descansar.",
    dificultad: "Sin dificultad",
    costo: "Gratuito",
    tip: "Las tardes son el momento ideal. La luz del sol pega de frente al lago.",
  },
  {
    title: "Excursión al Río Azul y Lago Epuyén",
    desc: "Día completo visitando dos joyas escondidas de la Comarca. El Río Azul tiene aguas azul turquesa perfectas para baño. Lago Epuyén es más tranquilo y remoto que Puelo.",
    dificultad: "Fácil",
    costo: "Transporte: consultar",
    tip: "Llevá picnic. No hay servicios en la zona del Río Azul.",
  },
];

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

export const metadata = {
  title: "Lago Puelo — Qué hacer, cómo llegar y cuándo ir",
  description:
    "Guía completa de Lago Puelo, Patagonia. Parque Nacional, trekking, kayak, playa y todo lo que podés hacer cerca de Hostel Huellas Puelo.",
};

export default function LagoPueloPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
          <Image
            src="/explore-puelo.jpg"
            alt="Vista aérea del Lago Puelo con sus aguas turquesas rodeado de montañas de la Patagonia argentina"
            width={1600}
            height={1024}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-forest" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
              <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
                Lago Puelo · Chubut · Patagonia
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper mt-4 leading-[0.93] text-balance max-w-3xl">
                Lago Puelo no es un destino.{" "}
                <em className="text-wood">Es una decisión.</em>
              </h1>
            </div>
          </div>
        </section>

        {/* Intro + datos */}
        <section className="bg-forest text-beige py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-beige/90 max-w-[52ch]">
                Lago Puelo es uno de los secretos mejor guardados de la
                Patagonia argentina. Sus aguas turquesas dentro de un parque
                nacional forman uno de los paisajes más impresionantes del
                continente — sin las multitudes de Bariloche.
              </p>
              <p className="text-lg leading-relaxed text-beige/70 max-w-[52ch]">
                A 18 km de El Bolsón y 120 km de Bariloche, el pueblo combina
                accesibilidad con autenticidad. No hay resorts ni shoppings —
                hay bosque, lago, gente de montaña y el hostel de Maxi a 5
                minutos del parque.
              </p>
              <Link
                href="/contacto"
                className="inline-block mt-4 bg-clay text-paper px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg"
              >
                Reservar en Huellas
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "11.250 ha", l: "Superficie del parque nacional" },
                { n: "800 m", l: "Altitud sobre el nivel del mar" },
                { n: "120 km", l: "Desde Bariloche por ruta" },
                { n: "Todo el año", l: "Abierto para visitar" },
              ].map((f) => (
                <div
                  key={f.l}
                  className="border border-beige/15 rounded-sm p-6"
                >
                  <div className="font-serif text-3xl md:text-4xl text-wood">
                    {f.n}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-beige/45 mt-2 leading-snug">
                    {f.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué hacer */}
        <section className="bg-paper py-20 md:py-28 relative overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="mb-14">
              <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
                Qué hacer
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-medium text-forest mt-6 leading-[1.05] text-balance max-w-2xl">
                Seis razones para no salir del parque en todo el viaje.
              </h2>
            </div>

            <div className="space-y-0 divide-y divide-ink/8">
              {actividades.map((a, i) => (
                <article
                  key={a.title}
                  className="py-10 grid md:grid-cols-[2fr_1fr] gap-8 md:gap-16"
                >
                  <div>
                    <div className="flex items-start gap-4">
                      <span className="font-serif text-3xl text-clay/25 italic shrink-0 leading-none mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl text-forest leading-snug">
                          {a.title}
                        </h3>
                        <p className="text-ink/65 leading-relaxed mt-3 max-w-[52ch]">
                          {a.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 md:pt-1">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
                        Dificultad:{" "}
                      </span>
                      <span className="text-sm text-moss font-medium">
                        {a.dificultad}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
                        Costo:{" "}
                      </span>
                      <span className="text-sm text-ink/65">{a.costo}</span>
                    </div>
                    <div className="text-[11px] text-clay/70 italic leading-snug">
                      💡 {a.tip}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Cuándo ir */}
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
                  <h3 className="font-serif text-xl text-forest mb-2">
                    {t.label}
                  </h3>
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

        {/* Cómo llegar */}
        <section className="bg-paper py-20 md:py-28 relative overflow-hidden">
          <div className="texture-grain absolute inset-0" />
          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="mb-14">
              <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
                Cómo llegar
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest mt-6 leading-[1.05] text-balance">
                Más cerca de lo que pensás.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  desde: "Desde Bariloche",
                  como: "120 km por la Ruta 40. Aproximadamente 1h 30min en auto. Hay servicio de ómnibus varias veces al día desde la terminal de Bariloche hasta Lago Puelo.",
                  tiempo: "~1h 30min",
                },
                {
                  desde: "Desde El Bolsón",
                  como: "18 km al sur. 20 minutos en auto. Hay servicio de colectivo frecuente entre El Bolsón y Lago Puelo durante todo el día.",
                  tiempo: "~20 min",
                },
                {
                  desde: "Desde Buenos Aires",
                  como: "Vuelo a Bariloche (2 hs) + traslado por tierra a Lago Puelo. También se puede llegar en bus desde Buenos Aires en unas 22-24 horas.",
                  tiempo: "~4 hs (aéreo)",
                },
              ].map((c) => (
                <div key={c.desde} className="border-t border-ink/10 pt-8">
                  <h3 className="font-serif text-2xl text-forest mb-2">
                    {c.desde}
                  </h3>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-clay mb-4">
                    {c.tiempo}
                  </div>
                  <p className="text-ink/65 text-sm leading-relaxed">{c.como}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA integrado */}
        <section className="relative overflow-hidden">
          <div className="relative h-[40vh] min-h-[280px]">
            <Image
              src="/hero-lake.jpg"
              alt="Lago Puelo al amanecer"
              width={1920}
              height={1280}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest to-transparent" />
          </div>
          <div className="bg-forest text-beige py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-paper leading-tight text-balance">
                Si ya sabés que querés venir,{" "}
                <em className="text-wood">el hostel te espera.</em>
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contacto"
                  className="bg-clay text-paper px-10 py-4 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl"
                >
                  Reservar en Huellas
                </Link>
                <Link
                  href="/experiencias"
                  className="border border-beige/30 text-beige px-8 py-4 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-beige/10 transition-all"
                >
                  Ver experiencias
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
