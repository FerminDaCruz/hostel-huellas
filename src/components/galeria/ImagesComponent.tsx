import Image from "next/image";

type Categoria = {
  id: string;
  label: string;
  fotos: any[];
};

const categorias: Categoria[] = [
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
    id: "huellas",
    label: "Las huellas",
    fotos: [
      {
        src: "/wall-footprints.jpg",
        alt: "Muro de huellas pintadas en Hostel Huellas Puelo",
        title: "El muro de huellas",
        caption:
          "Más de 2.000 historias pintadas. Una obra colectiva que crece sola.",
        w: 1920,
        h: 1080,
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
