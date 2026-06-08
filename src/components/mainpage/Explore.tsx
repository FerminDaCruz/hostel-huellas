import Image from "next/image";

const activities = [
  "Trekking guiado al Cerro Currumahuida",
  "Travesía en kayak por Lago Puelo",
  "Caminata al Bosque de Arrayanes",
  "Excursión al Río Azul",
  "Cabalgatas en la estepa andina",
  "Visita al Parque Nacional Lago Puelo",
];

export function Explore() {
  return (
    <section id="lago-puelo" className="relative overflow-hidden">
      <div className="relative h-[60vh] md:h-[75vh] min-h-[480px]">
        <Image
          src="/explore-puelo.jpg"
          alt="Vista aérea de Lago Puelo con sus aguas turquesas rodeadas de montañas andinas"
          width={1600}
          height={1024}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
            <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
              Explorá Lago Puelo
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-paper text-balance leading-[1.05] mt-6 max-w-3xl">
              Un parque nacional{" "}
              <em className="text-wood">como patio trasero</em>.
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-forest text-beige py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6 reveal">
            <p className="text-lg leading-relaxed text-beige/90 max-w-[52ch]">
              Maxi no solo es nuestro anfitrión: es guía de montaña matriculado.
              Eso significa que cada salida desde Huellas la pensamos para que
              conozcas los lugares que solo los locales saben encontrar.
            </p>
            <p className="text-lg leading-relaxed text-beige/75 max-w-[52ch]">
              Desde caminatas suaves al amanecer hasta travesías de día
              completo, armamos planes a medida según tu ritmo y tus ganas.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 reveal">
            {activities.map((a) => (
              <li
                key={a}
                className="flex items-start gap-3 border-b border-beige/10 pb-4"
              >
                <span className="text-clay mt-1.5 text-xs">▲</span>
                <span className="text-beige/90 leading-snug">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
