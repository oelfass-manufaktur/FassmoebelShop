"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const words = [
  "Minibars",
  "Stehtische",
  "Sessel & Bänke",
  "Sonderlackierung",
  "Gastronomie",
  "Unikate",
  "Handarbeit",
  "Upcycling",
];

/** Endlos laufendes Band — läuft bei prefers-reduced-motion nicht an. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(el, {
          xPercent: -50,
          duration: 34,
          ease: "none",
          repeat: -1,
        });
        // Beim Hovern verlangsamen, damit man mitlesen kann.
        const slow = () => gsap.to(tween, { timeScale: 0.25, duration: 0.4 });
        const normal = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
        el.parentElement?.addEventListener("pointerenter", slow);
        el.parentElement?.addEventListener("pointerleave", normal);
        return () => {
          el.parentElement?.removeEventListener("pointerenter", slow);
          el.parentElement?.removeEventListener("pointerleave", normal);
        };
      });
      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative overflow-hidden border-y border-border bg-[#0e0c0a] py-5"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0e0c0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0e0c0a] to-transparent" />
      <div ref={track} className="flex w-max items-center gap-10 will-change-transform">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-2xl text-muted-foreground sm:text-3xl">
              {w}
            </span>
            <span className="size-1.5 shrink-0 rotate-45 bg-gold/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
