"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Footprint } from "../shared/footprint";

export function Hero() {
  const stampRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Mouse-reactive footprint + subtle parallax on the lake
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
    <section
      id="top"
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden "
    >
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
        >
          <Image
            src="/hero-lake.jpg"
            alt="Lago Puelo en la Comarca Andina al amanecer, con montañas y bosque reflejados en el agua"
            width={1920}
            height={1280}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-paper" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="md:max-w-lg space-y-8 animate-fade-up">
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-beige/90">
            <span className="h-px w-8 bg-beige/60" /> Desde 2017 · Lago Puelo,
            Chubut
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] text-balance font-medium tracking-tight text-paper">
            No vengas solo a hospedarte.{" "}
            <span className="italic text-wood">Vení a dejar tu huella.</span>
          </h1>
          <p className="text-lg md:text-xl text-pretty max-w-[52ch] leading-relaxed text-paper/85 font-light">
            Desde 2017 compartiendo historias, encuentros y experiencias en el
            corazón de la Comarca Andina. Un hostel hecho a mano por Maxi, guía
            de montaña y anfitrión.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#reservar"
              className="bg-clay text-paper px-7 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-xl shadow-black/20"
            >
              Reservar estadía
            </a>
            <a
              href="#historia"
              className="bg-paper/10 backdrop-blur-md border border-paper/30 text-paper px-7 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:bg-paper/20 hover:-translate-y-0.5 transition-all"
            >
              Conocer la experiencia
            </a>
          </div>
          <div className="flex items-center gap-4 pt-6 text-paper/85">
            <div
              className="text-clay text-lg tracking-widest"
              aria-label="5 de 5 estrellas"
            >
              ★★★★★
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] opacity-80">
              Más de 8 años recibiendo viajeros
            </span>
          </div>
        </div>
      </div>

      {/* Floating 3D footprint stamp — mouse reactive */}
      <div
        ref={stampRef}
        className="hidden md:flex absolute right-[6%] top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out will-change-transform"
        aria-hidden
      >
        <div className="relative w-72 h-80">
          <div className="absolute -inset-6 rounded-full bg-clay/30 blur-3xl animate-drift" />
          <div className="relative w-full h-full rounded-3xl bg-beige/85 backdrop-blur-sm ring-1 ring-paper/40 shadow-2xl shadow-black/30 flex items-center justify-center overflow-hidden">
            <div className="texture-grain absolute inset-0" />
            <Footprint
              variant="filled"
              rotate={8}
              className="h-56 w-40 text-clay/85 drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)]"
            />
            <span className="absolute bottom-6 left-6 font-serif italic text-forest/70 text-sm">
              Est. 2017
            </span>
            <span className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.25em] text-forest/50">
              · Huella nº 2.487
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-paper/70">
        <span className="text-[10px] uppercase tracking-[0.3em]">Recorrer</span>
        <div className="w-px h-12 bg-paper/40 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4 bg-paper animate-[float-y_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
