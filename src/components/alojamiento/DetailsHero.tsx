import { Habitacion } from "@/lib/alojamiento";
import Image from "next/image";
import Link from "next/link";

export function DetailsHero({ h }: { h: Habitacion }) {
  return (
    <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
      <Image
        src={h.images[0]}
        alt={h.title}
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-paper" />
      <div className="absolute top-0 left-0 right-0 bottom-1/3 flex items-end">
        <div className="max-w-7xl mx-auto px-6 pb-10 w-full">
          <Link
            href="/alojamiento"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-paper/70 hover:text-paper transition-colors mb-6"
          >
            ← Todas las opciones
          </Link>
          <span className="block text-[11px] uppercase tracking-[0.3em] text-wood font-semibold mb-3">
            {h.subtitle}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper leading-[0.93] text-balance max-w-2xl">
            {h.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
