import { Habitacion } from "@/lib/alojamiento";
import Image from "next/image";
import Link from "next/link";

export function DetailsOptions({ otras }: { otras: Habitacion[] }) {
  return (
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
  );
}
