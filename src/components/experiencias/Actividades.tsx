import { Actividad } from "@/lib/actividades";
import Image from "next/image";
import Link from "next/link";

export function Actividades({ actividades }: { actividades: Actividad[] }) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {actividades.map((a) => (
            <Link
              key={a.slug}
              href={`/experiencias/${a.slug}`}
              className="group bg-beige/50 border border-ink/5 rounded-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <Image
                  src={a.img}
                  alt={a.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-[10px] uppercase tracking-[0.25em] text-clay font-semibold mb-3">
                  {a.tag}
                </div>
                <h2 className="font-serif text-2xl text-forest leading-snug mb-3">
                  {a.title}
                </h2>
                <p className="text-ink/65 text-sm leading-relaxed flex-1">
                  {a.desc}
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/8 pt-5">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">
                      Dificultad
                    </dt>
                    <dd className="text-sm text-moss font-medium">
                      {a.dificultad}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">
                      Duración
                    </dt>
                    <dd className="text-sm text-ink/70">{a.duracion}</dd>
                  </div>
                </dl>
                <div className="mt-3 text-[11px] text-ink/45 leading-snug">
                  <span className="text-clay font-medium">Llevá: </span>
                  {a.llevar}
                </div>
                <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-moss font-semibold group-hover:text-clay transition-colors">
                  Ver detalle →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
