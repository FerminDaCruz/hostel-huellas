"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { actividades } from "@/lib/actividades";

export function ExperienciasPreview() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const check = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    check();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [check]);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 300) + 20;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
    setTimeout(check, 450);
  };

  return (
    <section className="relative py-28 md:py-36 bg-paper overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
              Experiencias
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest mt-6 leading-[1.05] text-balance">
              Más que un hostel. <em>Una forma de estar en la montaña.</em>
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("prev")}
              disabled={!canPrev}
              aria-label="Ver experiencia anterior"
              className="w-11 h-11 rounded-full border border-ink/20 bg-beige/80 flex items-center justify-center text-forest text-lg hover:border-clay hover:text-clay transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <button
              onClick={() => scroll("next")}
              disabled={!canNext}
              aria-label="Ver siguiente experiencia"
              className="w-11 h-11 rounded-full border border-ink/20 bg-beige/80 flex items-center justify-center text-forest text-lg hover:border-clay hover:text-clay transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            >
              →
            </button>
            <Link
              href="/experiencias"
              className="ml-2 text-[11px] uppercase tracking-[0.2em] font-medium text-forest underline underline-offset-4 decoration-clay decoration-2 hover:text-clay transition-colors"
            >
              Ver todas →
            </Link>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          onScroll={check}
          className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {actividades.map((e) => (
            <article
              key={e.slug}
              className="snap-start shrink-0 w-[82vw] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <Link
                href={`/experiencias/${e.slug}`}
                className="group flex flex-col h-full bg-beige/50 border border-ink/5 rounded-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={e.img}
                    alt={e.title}
                    width={800}
                    height={1067}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-clay font-semibold mb-2">
                    {e.tag}
                  </div>
                  <h3 className="font-serif text-xl italic text-forest leading-snug">
                    {e.title}
                  </h3>
                  <p className="text-ink/60 text-sm mt-2 leading-relaxed flex-1">
                    {e.desc}
                  </p>
                  <div className="mt-5 border-t border-ink/8 pt-4 flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
                      {e.dificultad} · {e.duracion}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-moss font-semibold group-hover:text-clay transition-colors">
                      Ver →
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Dots — mobile only */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {actividades.map((e) => (
            <button
              key={e.slug}
              aria-label={`Ir a ${e.title}`}
              onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                const idx = actividades.findIndex((x) => x.slug === e.slug);
                const card = el.children[idx] as HTMLElement | undefined;
                card?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "start",
                });
                setTimeout(check, 450);
              }}
              className="w-1.5 h-1.5 rounded-full bg-ink/20 hover:bg-clay transition-colors"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
