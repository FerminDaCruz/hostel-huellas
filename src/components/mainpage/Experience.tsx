import Image from "next/image";

const moments = [
  {
    src: "/exp-breakfast.jpg",
    w: 1024,
    h: 1280,
    title: "Desayunos caseros",
    caption: "Pan recién horneado, mate, risas que duran hasta mediodía.",
  },
  {
    src: "/exp-fogon.jpg",
    w: 1024,
    h: 1280,
    title: "Fogones bajo estrellas",
    caption: "Las mejores conversaciones siempre arrancan cerca del fuego.",
  },
  {
    src: "/exp-trek.jpg",
    w: 1280,
    h: 1024,
    title: "Naturaleza a un paso",
    caption: "El bosque andino empieza apenas cruzás el portón.",
  },
];

export function Experience() {
  return (
    <section
      id="experiencia"
      className="relative py-28 md:py-40 overflow-hidden bg-paper"
    >
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-20 max-w-3xl reveal">
          <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
            La experiencia Huellas
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-forest text-balance leading-[1.05] mt-6">
            Algunos lugares se visitan.{" "}
            <em className="text-moss">Otros se recuerdan para siempre.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {moments.map((m, i) => (
            <figure
              key={m.title}
              className={`reveal ${i === 1 ? "md:translate-y-16" : ""}`}
            >
              <div className="overflow-hidden rounded-sm aspect-[3/4] ring-1 ring-black/5">
                <Image
                  src={m.src}
                  alt={m.title}
                  width={m.w}
                  height={m.h}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="mt-5">
                <h3 className="font-serif text-2xl italic text-forest">
                  {m.title}
                </h3>
                <p className="text-ink/70 text-sm mt-2 leading-relaxed">
                  {m.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
