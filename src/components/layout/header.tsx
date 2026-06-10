"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-paper/96 backdrop-blur-md shadow-sm border-b border-ink/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-8">
        <Link href="/inicio" className="flex items-center gap-2.5 shrink-0">
          <Footprint
            className={`h-6 w-4 transition-colors duration-300 ${solid ? "text-clay" : "text-wood"}`}
          />
          <span
            className={`font-serif text-xl font-medium tracking-tight transition-colors duration-300 ${
              solid ? "text-forest" : "text-paper"
            }`}
          >
            Huellas Puelo
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 hover:text-clay ${
                solid ? "text-ink/65" : "text-paper/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contacto"
          className={`hidden lg:inline-flex px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:-translate-y-px ${
            solid
              ? "bg-forest text-beige hover:bg-moss shadow-md"
              : "bg-paper/12 backdrop-blur-sm border border-paper/30 text-paper hover:bg-paper/22"
          }`}
        >
          Reservar
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-sm transition-colors ${
            solid ? "text-forest" : "text-paper"
          }`}
        >
          <span
            className="block w-5 h-0.5 bg-current transition-all duration-300 origin-center"
            style={open ? { transform: "translateY(8px) rotate(45deg)" } : {}}
          />
          <span
            className="block w-5 h-0.5 bg-current transition-all duration-300"
            style={open ? { opacity: 0 } : {}}
          />
          <span
            className="block w-5 h-0.5 bg-current transition-all duration-300 origin-center"
            style={open ? { transform: "translateY(-8px) rotate(-45deg)" } : {}}
          />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 pb-6 pt-2 flex flex-col gap-1 border-t border-ink/6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-ink/65 hover:text-clay transition-colors py-3"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="mt-4 bg-forest text-beige px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium text-center hover:bg-moss transition-all"
          >
            Reservar estadía
          </Link>
        </nav>
      </div>
    </header>
  );
}
