import Link from "next/link";
import { Footprint } from "../shared/footprint";

export function HuellaConcepto() {
  return (
    <section className="relative py-24 md:py-32 bg-forest overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div
        aria-hidden
        className="absolute -right-12 -bottom-12 opacity-8 pointer-events-none"
      >
        <Footprint rotate={-15} className="h-[28rem] w-52 text-beige" />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
          El concepto
        </span>
        <h2 className="font-serif text-4xl md:text-6xl font-medium text-paper mt-6 leading-[1.05] text-balance">
          Tu huella no es decoración.{" "}
          <em className="text-wood">Es tu identidad acá.</em>
        </h2>
        <p className="mt-8 text-lg md:text-xl text-paper/70 max-w-[56ch] mx-auto leading-relaxed">
          Cada huésped puede dejar literalmente la huella de su pie pintada en
          las paredes del hostel. Una obra colectiva que crece desde 2017.
          Cuando te vayas, una parte tuya se queda.
        </p>
        <Link
          href="/nosotros"
          className="inline-block mt-10 bg-paper/12 border border-paper/25 text-paper px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:bg-paper/22 hover:-translate-y-0.5 transition-all"
        >
          Ver el muro en detalle
        </Link>
      </div>
    </section>
  );
}
