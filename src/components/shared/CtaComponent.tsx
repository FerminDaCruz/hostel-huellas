import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
type CtaComponentProps = {
  label: string;
  title: string;
  desc?: string;
};

export function CtaComponent({ label, title, desc }: CtaComponentProps) {
  return (
    <section className="bg-forest text-beige py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-wood font-semibold">
          {label}
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-medium text-paper mt-6 leading-tight text-balance">
          {title}
        </h2>
        <p className="mt-6 text-paper/65 max-w-[44ch] mx-auto leading-relaxed">
              {desc}
            </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contacto"
            className="bg-clay text-paper px-8 py-4 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl w-full max-w-sm"
          >
            Reservar estadía
          </Link>
          <a
            href="https://wa.me/+542323334671?text=Hola!%20Queria%20reservar%20en%20Hostel%20Huellas%20Puelo"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-beige/30 text-beige px-6 py-3 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-beige/10 transition-all flex items-center justify-center gap-3 w-full max-w-sm"
          >
            <FaWhatsapp className="h-6 w-auto aspect-square" />
            Consultar por Whatsapp
          </a>
        </div>
      </div>
    </section>
  );
}
