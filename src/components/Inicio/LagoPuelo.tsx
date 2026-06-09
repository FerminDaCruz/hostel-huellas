import Image from "next/image";
import Link from "next/link";

export function LagoPueloTeaser() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[50vh] min-h-[380px]">
        <Image
          src="/explore-puelo.jpg"
          alt="Vista aérea de Lago Puelo con sus aguas turquesas rodeadas de montañas"
          width={1600}
          height={1024}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent" />
      </div>
      <div className="bg-forest text-beige py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
              Lago Puelo
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-paper mt-4 leading-tight max-w-2xl text-balance">
              Lago Puelo no es un destino.{" "}
              <em className="text-wood">Es una decisión.</em>
            </h2>
          </div>
          <Link
            href="/lagopuelo"
            className="shrink-0 bg-paper/10 border border-paper/25 text-paper px-7 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:bg-paper/20 hover:-translate-y-0.5 transition-all"
          >
            Explorar la zona
          </Link>
        </div>
      </div>
    </section>
  );
}
