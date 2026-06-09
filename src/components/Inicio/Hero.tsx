"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Footprint } from "../footprint";

export function Hero() {
  const stampRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (stampRef.current) {
        stampRef.current.style.transform = `translate3d(${x * 14}px, ${y * 14}px, 0) rotate(${6 + x * 3}deg)`;
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${x * -10}px, ${y * -6}px, 0) scale(1.05)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
        >
          <Image
            src="/assets/paisaje-kayak.webp"
            alt="Lago Puelo en la Comarca Andina al amanecer, con montañas reflejadas en el agua turquesa"
            width={1920}
            height={1280}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-paper" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="md:max-w-xl space-y-8">
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-beige/90">
            <span className="h-px w-8 bg-beige/60" /> Lago Puelo · Patagonia ·
            Desde 2017
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.93] text-balance font-medium tracking-tight text-paper">
            No vengas solo a hospedarte.{" "}
            <em className="text-wood">Vení a dejar tu huella.</em>.
          </h1>
          <p className="text-lg md:text-xl text-pretty max-w-[52ch] leading-relaxed text-paper/85 font-light">
            Hostel en Lago Puelo con alma de aventura y gente de verdad. Un
            lugar donde la montaña y las personas te reciben por igual.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contacto"
              className="bg-clay text-paper px-7 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-xl shadow-black/20"
            >
              Quiero reservar
            </Link>
            <Link
              href="#historia"
              className="bg-paper/10 backdrop-blur-md border border-paper/30 text-paper px-7 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:bg-paper/20 hover:-translate-y-0.5 transition-all"
            >
              Conocé el hostel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
