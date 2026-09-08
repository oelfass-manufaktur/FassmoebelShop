"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Hammer, Recycle, Truck } from "lucide-react";

const trust = [
  { icon: Hammer, label: "In Handarbeit gefertigt" },
  { icon: Recycle, label: "100 % recycelte Fässer" },
  { icon: Truck, label: "Versandkostenfrei ab 500 €" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.15,
        });

        tl.from(".hero-media", {
          scale: 1.12,
          opacity: 0,
          duration: 1.6,
          ease: "power2.out",
        })
          .from(
            ".hero-eyebrow",
            { yPercent: 120, opacity: 0, duration: 0.7 },
            "-=1.1",
          )
          .from(
            ".hero-line",
            { yPercent: 115, opacity: 0, duration: 0.9, stagger: 0.09 },
            "-=0.5",
          )
          .from(".hero-copy", { y: 18, opacity: 0, duration: 0.7 }, "-=0.5")
          .from(
            ".hero-cta",
            { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 },
            "-=0.45",
          )
          .from(
            ".hero-trust li",
            { y: 12, opacity: 0, duration: 0.5, stagger: 0.07 },
            "-=0.35",
          )
          .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.3");
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="grain relative isolate -mt-[4.5rem] flex min-h-[calc(100svh-2.25rem)] items-end overflow-hidden pt-[4.5rem]"
    >
      {/* PLACEHOLDER IMAGE — KI-generiert (GPT Image 2), vor Livegang ersetzen */}
      <div className="hero-media absolute inset-0 -z-10">
        <Image
          src="/images/hero-barrel-lounge.webp"
          alt="Handgefertigte Minibar aus einem recycelten Ölfass in einem Industrieloft bei Abendlicht"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,7,6,0.94)_0%,rgba(8,7,6,0.78)_38%,rgba(8,7,6,0.25)_68%,rgba(8,7,6,0.55)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent"
        />
      </div>

      <div className="shell w-full pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="max-w-4xl">
          <div className="overflow-hidden">
            <p className="hero-eyebrow eyebrow">
              Manufaktur seit 2011 — Dortmund
            </p>
          </div>

          <h1 className="display mt-5 text-[clamp(2.5rem,6vw,4.75rem)] text-foreground [text-shadow:0_2px_28px_rgba(6,5,4,0.65)]">
            <span className="block overflow-hidden">
              <span className="hero-line block">Aus 200 Litern Stahl</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">
                wird <em className="not-italic text-gold">Ihr Lieblingsstück</em>
              </span>
            </span>
          </h1>

          <p className="hero-copy mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ausgediente Ölfässer, entkernt und in acht Schichten von Hand
            lackiert. Minibars, Stehtische und Sessel, die niemand ein zweites
            Mal genau so besitzt.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/kategorie/minibars"
              className="hero-cta focus-ring group inline-flex h-13 items-center justify-center gap-2.5 rounded-sm bg-primary px-8 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-gold-soft"
            >
              Kollektion entdecken
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="#manufaktur"
              className="hero-cta focus-ring inline-flex h-13 items-center justify-center rounded-sm border border-border/80 bg-background/25 px-8 text-xs font-semibold uppercase tracking-[0.16em] text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-gold/50 hover:bg-background/50"
            >
              So entsteht ein Fass
            </Link>
          </div>

          <ul className="hero-trust mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {trust.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-xs text-muted-foreground"
              >
                <Icon className="size-4 text-gold/80" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="hero-scroll absolute bottom-7 right-6 hidden items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="text-[0.625rem] uppercase tracking-[0.28em] text-steel">
          Scrollen
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-border">
          <span className="absolute inset-x-0 top-0 block h-4 animate-[scrollhint_2s_ease-in-out_infinite] bg-gold" />
        </span>
      </div>

      <style>{`
        @keyframes scrollhint {
          0%   { transform: translateY(-100%); }
          60%  { transform: translateY(300%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
