"use client";
import { useEffect, useRef } from "react";
import { Footprint } from "../shared/footprint";

/**
 * Decorative semi-transparent footprints that fade in as the user scrolls.
 * Pure CSS reveal via IntersectionObserver. No layout impact.
 */
export function ScrollFootprints() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els =
      ref.current?.querySelectorAll<HTMLElement>(".scroll-footprint") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.2 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Randomized but deterministic placements
  const marks = [
    { top: "8%", left: "6%", rotate: -18, size: 56 },
    { top: "14%", left: "82%", rotate: 22, size: 44 },
    { top: "26%", left: "12%", rotate: 10, size: 64 },
    { top: "34%", left: "78%", rotate: -14, size: 50 },
    { top: "46%", left: "4%", rotate: 28, size: 60 },
    { top: "52%", left: "88%", rotate: -8, size: 46 },
    { top: "62%", left: "10%", rotate: 16, size: 54 },
    { top: "72%", left: "86%", rotate: -22, size: 58 },
    { top: "82%", left: "6%", rotate: 6, size: 48 },
    { top: "90%", left: "80%", rotate: -12, size: 52 },
  ];

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {marks.map((m, i) => (
        <div
          key={i}
          className="scroll-footprint"
          style={{
            top: m.top,
            left: m.left,
            width: m.size,
            height: m.size * 1.5,
          }}
        >
          <Footprint rotate={m.rotate} className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
