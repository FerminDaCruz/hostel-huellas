import Link from "next/link";

export function Links() {
  return (
    <section className="bg-paper py-16 md:py-20 border-t border-ink/6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-5">
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
  );
}
