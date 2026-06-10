import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
      <Image
        src="/explore-puelo.jpg"
        alt="Vista aérea del Lago Puelo con sus aguas turquesas rodeado de montañas de la Patagonia argentina"
        width={1600}
        height={1024}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-forest" />
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
          <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
            Lago Puelo · Chubut · Patagonia
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-medium text-paper mt-4 leading-[0.93] text-balance max-w-3xl">
            Lago Puelo no es un destino.{" "}
            <em className="text-wood">Es una decisión.</em>
          </h1>
        </div>
      </div>
    </section>
  );
}
