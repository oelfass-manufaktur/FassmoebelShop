import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Palette, Ruler, Users } from "lucide-react";

const perks = [
  { icon: Palette, label: "Jeder RAL-Farbton" },
  { icon: Ruler, label: "Maße nach Aufmaß" },
  { icon: Users, label: "Ab 4 Stück für Gastronomie" },
];

export function CustomCta() {
  return (
    <section
      className="relative isolate overflow-hidden border-t border-border"
      aria-labelledby="sonder-title"
    >
      {/* PLACEHOLDER IMAGE — KI-generiert, vor Livegang ersetzen */}
      <Image
        src="/images/p-bank-route66.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,6,0.97)_0%,rgba(8,7,6,0.88)_45%,rgba(8,7,6,0.45)_100%)]"
      />

      <div className="shell py-24 sm:py-32">
        <div className="max-w-2xl">
          <p data-reveal className="eyebrow">
            Sonderanfertigung
          </p>
          <h2
            id="sonder-title"
            data-reveal
            className="display mt-4 text-[clamp(2.25rem,5.5vw,4rem)] text-foreground"
          >
            Ihre Farbe. Ihr Logo.
            <br />
            Ihr Fass.
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Firmenfarbe, graviertes Logo, Sondermaß für die Bartheke: Wir bauen
            auch außerhalb des Katalogs. Schicken Sie uns eine Skizze — die
            Machbarkeitsantwort kommt innerhalb von zwei Werktagen.
          </p>

          <ul data-reveal className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {perks.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-xs text-muted-foreground"
              >
                <Icon className="size-4 text-gold/80" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <Link
            href="/sonderanfertigung"
            data-reveal
            className="focus-ring group mt-10 inline-flex h-13 items-center gap-2.5 rounded-sm bg-primary px-8 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-gold-soft"
          >
            Konfiguration starten
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
