import Link from "next/link";
import { Footprint } from "../shared/footprint";

const navLinks = [
  { href: "/inicio", label: "Inicio" },
  { href: "/alojamiento", label: "Alojamiento" },
  { href: "/experiencias", label: "Experiencias" },
  { href: "/lagopuelo", label: "Lago Puelo" },
  { href: "/galeria", label: "Galería" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper/70">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-paper/10">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <Footprint className="h-7 w-5 text-clay" />
              <span className="font-serif text-xl text-paper font-medium">
                Huellas Puelo
              </span>
            </div>
            <p className="text-sm leading-relaxed text-paper/55 max-w-[34ch]">
              Un hostel con alma andina en el corazón de la Comarca Patagónica.
              Desde 2017 recibiendo viajeros de todo el mundo.
            </p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-paper/30">
              Lago Puelo · Chubut · Argentina
            </p>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-paper/30 mb-6 font-semibold">
              Páginas
            </h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-paper/55 hover:text-clay transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-paper/30 mb-6 font-semibold">
              Contacto
            </h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/5492944000000?text=Hola%20Huellas%2C%20quiero%20reservar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-paper/55 hover:text-clay transition-colors group"
              >
                <span className="w-5 h-5 rounded-full border border-paper/20 flex items-center justify-center text-[10px] group-hover:border-clay transition-colors">
                  W
                </span>
                WhatsApp
              </a>
              <a
                href="https://instagram.com/hostelhuellaspuelo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-paper/55 hover:text-clay transition-colors group"
              >
                <span className="w-5 h-5 rounded-full border border-paper/20 flex items-center justify-center text-[10px] group-hover:border-clay transition-colors">
                  IG
                </span>
                @hostelhuellaspuelo
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-paper/25">
          <span>© 2025 Hostel Huellas Puelo</span>
          <span>Hecho con mate en la Patagonia</span>
        </div>
      </div>
    </footer>
  );
}
