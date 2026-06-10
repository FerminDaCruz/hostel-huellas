import Link from "next/link";
import { Footprint } from "../shared/footprint";

const ecosistema = [
  {
    title: "El hostel",
    desc: "Dorms compartidos, habitaciones privadas y ambientes comunes. El núcleo de Huellas. Donde se hacen las amistades y se toman las mejores decisiones espontáneas.",
    href: "/alojamiento",
  },
  {
    title: "Las habitaciones con vista",
    desc: "Para grupos o familias que quieren privacidad con el paisaje andino en la ventana. Despertarse mirando el bosque cambia algo adentro.",
    href: "/alojamiento",
  },
  {
    title: "El departamento",
    desc: "Cocina propia, baño, independencia total. Para estadías más largas o para quienes quieren su propio ritmo sin alejarse de la comunidad.",
    href: "/alojamiento",
  },
  {
    title: "Las salidas con Maxi",
    desc: "Trekking, kayak, rincones secretos. Maxi guía profesional — no un servicio turístico. Una experiencia de montaña real.",
    href: "/experiencias",
  },
];

export function Ecosistema() {
  return (
    <section className="bg-forest text-beige py-20 md:py-28 relative overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div
        aria-hidden
        className="absolute -right-16 bottom-0 top-0 opacity-8 pointer-events-none"
      >
        <Footprint rotate={20} mirror className="h-full w-56 text-beige" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-2xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
            El ecosistema
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-paper mt-6 leading-[1.05] text-balance">
            Huellas no es solo el hostel.
          </h2>
          <p className="mt-6 text-beige/70 text-lg leading-relaxed max-w-[48ch]">
            Es el departamento, las habitaciones privadas, las salidas a la
            montaña, el agroturismo. Todo bajo el mismo concepto: vivir Lago
            Puelo de verdad.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {ecosistema.map((e) => (
            <Link
              key={e.title}
              href={e.href}
              className="group border border-beige/15 rounded-sm p-8 hover:bg-beige/8 hover:border-beige/30 transition-all"
            >
              <h3 className="font-serif text-2xl text-paper mb-3 group-hover:text-wood transition-colors">
                {e.title}
              </h3>
              <p className="text-beige/60 text-sm leading-relaxed">{e.desc}</p>
              <div className="mt-6 text-[11px] uppercase tracking-[0.2em] text-wood/70 group-hover:text-wood transition-colors">
                Ver más →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
