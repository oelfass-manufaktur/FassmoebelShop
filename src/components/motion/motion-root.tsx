"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Ein einziger Motion-Controller für die ganze Seite.
 *
 * Server-Komponenten müssen dadurch nichts über GSAP wissen — sie setzen nur
 * Attribute:
 *   data-reveal            → sanftes Einblenden beim Scrollen (gebatcht = Stagger)
 *   data-parallax="0.12"   → dezenter Parallax-Versatz (nur dekorative Ebenen)
 *
 * Das Verstecken passiert in CSS unter `.js-ready` (siehe globals.css), damit es
 * ohne JS und bei `prefers-reduced-motion` gar nicht erst greift.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // Sicherheitsnetz: sollte GSAP scheitern, wird der Inhalt trotzdem sichtbar.
    const failsafe = window.setTimeout(() => root.classList.remove("js-ready"), 2500);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        if (targets.length) {
          gsap.set(targets, { y: 22, opacity: 0 });

          ScrollTrigger.batch(targets, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
                stagger: 0.07,
                overwrite: true,
              }),
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
          const strength = Number(layer.dataset.parallax || 0.1);
          gsap.to(layer, {
            yPercent: strength * 100,
            ease: "none",
            scrollTrigger: {
              trigger: layer.parentElement ?? layer,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });

        return () => {
          gsap.set("[data-reveal]", { clearProps: "all" });
        };
      });

      // Reduced motion: alles sofort im Endzustand.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    });

    // Setup lief durch — das Sicherheitsnetz wird nicht mehr gebraucht.
    // (Würde es feuern, verlöre der nächste Seitenwechsel sein Vor-Verstecken.)
    window.clearTimeout(failsafe);

    // Layout kann sich nach dem Laden der Produktbilder verschieben.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [pathname]);


  return null;
}
