import Image from "next/image";

type Foto = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  w: number;
  h: number;
};

type Categoria = {
  id: string;
  label: string;
  fotos: Foto[];
};

const categorias: Categoria[] = [
  {
    id: "habitaciones",
    label: "Habitaciones",
    fotos: [
      {
        src: "/assets/habitaciones/dorm-1.jpg",
        alt: "Habitación compartida en Hostel Huellas Puelo",
        title: "Habitación compartida",
        caption: "Cinco camas, gente de todo el mundo y las mejores historias del viaje.",
        w: 1024,
        h: 768,
      },
      {
        src: "/assets/habitaciones/privada-picos-1.jpg",
        alt: "Habitación 3 Picos — habitación privada en Hostel Huellas Puelo",
        title: "Habitación 3 Picos",
        caption: "Las tres cumbres en el horizonte desde tu propia habitación.",
        w: 1024,
        h: 768,
      },
      {
        src: "/assets/habitaciones/privada-cuevas-1.jpg",
        alt: "Habitación Cuevas — habitación privada en Hostel Huellas Puelo",
        title: "Habitación Cuevas",
        caption: "Rústica, íntima y cálida. Con carácter propio.",
        w: 1024,
        h: 768,
      },
      {
        src: "/assets/habitaciones/privada-huemul-1.jpg",
        alt: "Habitación Huemul — habitación privada en Hostel Huellas Puelo",
        title: "Habitación Huemul",
        caption: "El refugio del viajero que quiere descansar de verdad.",
        w: 1024,
        h: 768,
      },
      {
        src: "/assets/habitaciones/depto-1.jpg",
        alt: "Departamento Currumahuida en Hostel Huellas Puelo",
        title: "Departamento Currumahuida",
        caption: "Living, cocina propia y baño. Tu casa en Lago Puelo.",
        w: 1024,
        h: 768,
      },
    ],
  },
  {
    id: "espacios",
    label: "Espacios comunes",
    fotos: [
      {
        src: "/assets/habitaciones/cocina-1.jpg",
        alt: "Cocina comunitaria en Hostel Huellas Puelo",
        title: "Cocina comunitaria",
        caption: "Equipada para que cocines como en casa. O mejor.",
        w: 1024,
        h: 768,
      },
      {
        src: "/assets/habitaciones/living-1.jpg",
        alt: "Living en Hostel Huellas Puelo",
        title: "Living",
        caption: "Donde los planes del día siguiente se hacen entre mates.",
        w: 1024,
        h: 768,
      },
      {
        src: "/assets/habitaciones/cocina-2.jpg",
        alt: "Cocina comunitaria — detalle",
        title: "Todo lo que necesitás",
        caption: "Garrafa, vajilla, heladera, freezer y los condimentos de siempre.",
        w: 1024,
        h: 768,
      },
      {
        src: "/assets/habitaciones/dorm-bano-1.jpg",
        alt: "Baño compartido en Hostel Huellas Puelo",
        title: "Baños con agua caliente",
        caption: "Limpios, con agua caliente y siempre en orden.",
        w: 1024,
        h: 768,
      },
    ],
  },
  {
    id: "hostel",
    label: "El hostel",
    fotos: [
      {
        src: "/maxi-portrait.jpg",
        alt: "Maxi, fundador de Huellas Puelo, en la cocina del hostel",
        title: "Maxi en casa",
        caption: "El hostel y su fundador son inseparables.",
        w: 1024,
        h: 1280,
      },
      {
        src: "/assets/habitaciones/huellas-exterior.jpg",
        alt: "Exterior e identidad de Hostel Huellas Puelo",
        title: "Las huellas",
        caption: "La identidad del hostel marcada en cada rincón.",
        w: 1024,
        h: 768,
      },
      {
        src: "/exp-breakfast.jpg",
        alt: "Desayuno casero en Hostel Huellas Puelo",
        title: "Desayunos caseros",
        caption: "Pan recién horneado, mate, fruta. El ritual de cada mañana.",
        w: 1024,
        h: 1280,
      },
      {
        src: "/exp-fogon.jpg",
        alt: "Fogón nocturno en el hostel",
        title: "Fogones",
        caption: "Las mejores conversaciones del viaje siempre arrancaron acá.",
        w: 1024,
        h: 1280,
      },
    ],
  },
  {
    id: "naturaleza",
    label: "La naturaleza",
    fotos: [
      {
        src: "/hero-lake.jpg",
        alt: "Lago Puelo al amanecer con montañas reflejadas en el agua",
        title: "Lago Puelo al amanecer",
        caption: "El lago que te recibe cada mañana desde el hostel.",
        w: 1920,
        h: 1280,
      },
      {
        src: "/explore-puelo.jpg",
        alt: "Vista aérea de Lago Puelo y sus aguas turquesas",
        title: "Aguas turquesas",
        caption: "El Parque Nacional Lago Puelo desde las alturas.",
        w: 1600,
        h: 1024,
      },
      {
        src: "/exp-trek.jpg",
        alt: "Trekking en el bosque andino cerca de Lago Puelo",
        title: "Bosque andino",
        caption: "El bosque empieza apenas cruzás el portón del hostel.",
        w: 1280,
        h: 1024,
      },
      {
        src: "/assets/paisaje-brazo-oriental.webp",
        alt: "Brazo oriental del Lago Puelo, Patagonia",
        title: "Brazo Oriental",
        caption: "El lado más salvaje del lago, a horas de caminata del hostel.",
        w: 1600,
        h: 1067,
      },
    ],
  },
];

export function ImagesComponent() {
  return (
    <>
      {categorias.map((cat) => (
        <section key={cat.id} id={cat.id} className="bg-paper py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
                {cat.label}
              </h2>
              <span className="h-px flex-1 bg-ink/10" />
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
              {cat.fotos.map((f) => (
                <figure key={f.src} className="break-inside-avoid">
                  <div className="overflow-hidden rounded-sm ring-1 ring-black/5 shadow-sm">
                    <Image
                      src={f.src}
                      alt={f.alt}
                      width={f.w}
                      height={f.h}
                      loading="lazy"
                      className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <figcaption className="mt-3 px-1">
                    <h3 className="font-serif italic text-lg text-forest">
                      {f.title}
                    </h3>
                    <p className="text-sm text-ink/55 mt-1 leading-relaxed">
                      {f.caption}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
