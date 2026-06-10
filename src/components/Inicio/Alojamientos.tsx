"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { habitaciones } from "@/lib/alojamiento";

export function AlojamientoPreview() {
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
    <section className="relative py-28 md:py-36 bg-beige overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
              Alojamiento
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest mt-6 leading-[1.05] text-balance">
              Tenemos el lugar para vos,{" "}
              <em>seas como seas</em>.
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("prev")}
              disabled={!canPrev}
              aria-label="Ver opción anterior"
              className="w-11 h-11 rounded-full border border-ink/20 bg-paper/80 flex items-center justify-center text-forest text-lg hover:border-clay hover:text-clay transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <button
              onClick={() => scroll("next")}
              disabled={!canNext}
              aria-label="Ver siguiente opción"
              className="w-11 h-11 rounded-full border border-ink/20 bg-paper/80 flex items-center justify-center text-forest text-lg hover:border-clay hover:text-clay transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            >
              →
            </button>
            <Link
              href="/alojamiento"
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
          {habitaciones.map((h) => (
            <article
              key={h.slug}
              className="snap-start shrink-0 w-[82vw] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
            >
              <Link
                href={`/alojamiento/${h.slug}`}
                className="group flex flex-col h-full bg-paper border border-ink/5 rounded-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={h.img}
                    alt={h.title}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl text-forest leading-snug">
                    {h.title}
                  </h3>
                  <p className="text-ink/60 text-sm mt-2 leading-relaxed flex-1">
                    {h.desc}
                  </p>
                  <div className="mt-6 border-t border-ink/8 pt-5">
                    <div className="font-serif text-2xl text-clay">
                      {h.price}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1">
                      {h.tag}
                    </div>
                    <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-moss font-semibold group-hover:text-clay transition-colors">
                      Ver detalle →
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Dots — mobile only */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {habitaciones.map((h) => (
            <button
              key={h.slug}
              aria-label={`Ir a ${h.title}`}
              onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                const idx = habitaciones.findIndex((x) => x.slug === h.slug);
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
