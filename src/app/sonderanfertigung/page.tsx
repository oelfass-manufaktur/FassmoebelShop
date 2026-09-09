import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Lightbulb,
  Palette,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CustomConfigurator } from "@/components/custom-configurator";

export const metadata: Metadata = {
  title: "Sonderanfertigung",
  description:
    "Fassmöbel nach Wunsch: RAL-Farben, Sondermaße, Branding, Beleuchtung und Serien für Gastronomie, Empfang und Events.",
  alternates: { canonical: "/sonderanfertigung" },
  openGraph: {
    type: "website",
    title: "Sonderanfertigung — Fasswerk",
    description:
      "RAL-Farben, Sondermaße, Branding, Beleuchtung und kleine Serien aus recycelten Stahlfässern.",
    images: [{ url: "/images/workshop-atelier.webp", alt: "Fasswerk Sonderanfertigung in der Werkstatt" }],
  },
};

const options = [
  {
    icon: Palette,
    title: "Farbe & Oberfläche",
    text: "RAL-Wunschton, Hochglanz, matte Industrielackierung oder konservierte Originalpatina.",
  },
  {
    icon: Ruler,
    title: "Maß & Funktion",
    text: "Höhe, Platte, Innenaufteilung und Mobilität werden auf den konkreten Einsatz abgestimmt.",
  },
  {
    icon: Sparkles,
    title: "Branding & Details",
    text: "Gravur, Firmenlogo, Beschläge, Leder, Holz und Lichttechnik als Teil eines stimmigen Gesamtstücks.",
  },
  {
    icon: Lightbulb,
    title: "Licht & Elektrik",
    text: "Warmweiße LEDs, dimmbare Akzente und verdeckte Kabelführung für Bar, Empfang oder Messe.",
  },
];

const process = [
  ["01", "Briefing", "Sie wählen Einsatz, Möbeltyp, Oberfläche und die wichtigsten Extras."],
  ["02", "Machbarkeit", "Die Werkstatt prüft Proportionen, Material und technische Details."],
  ["03", "Freigabe", "Sie erhalten die konkrete Ausführung als abgestimmtes Angebot."],
  ["04", "Fertigung", "Das Fass wird entkernt, bearbeitet, lackiert, ausgebaut und endgeprüft."],
];

export default function CustomPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/images/workshop-atelier.webp"
          alt="Fassmöbel in der Werkstatt während der Bearbeitung"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center opacity-75"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(8,7,6,0.98)_0%,rgba(8,7,6,0.9)_42%,rgba(8,7,6,0.48)_76%,rgba(8,7,6,0.72)_100%)]"
        />
        <div className="shell py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow">Sonderanfertigung</p>
            <h1 className="display mt-5 text-[clamp(3rem,7vw,5.75rem)] text-foreground">
              Nicht von der Stange.
              <br />
              <span className="text-gold">Nicht einmal vom Fass.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Farbe, Maß, Innenausbau, Logo und Licht werden auf Ihren Raum abgestimmt — für ein Einzelstück genauso wie für eine kleine Serie.
            </p>
            <a
              href="#konfigurator"
              className="focus-ring group mt-9 inline-flex h-13 items-center gap-2.5 rounded-sm bg-primary px-8 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-gold-soft"
            >
              Briefing zusammenstellen
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-28" aria-labelledby="custom-options-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">Spielraum</p>
            <h2 id="custom-options-title" className="display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-foreground">
              Der Katalog ist der Anfang, nicht die Grenze.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Der Charakter des Fasses bleibt sichtbar. Alles andere darf sich Ihrem Raum, Ihrer Marke und der Nutzung unterordnen.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
            {options.map(({ icon: Icon, title, text }) => (
              <article key={title} data-reveal className="bg-card p-6 sm:p-7">
                <Icon className="size-4 text-gold/80" aria-hidden="true" />
                <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.13em] text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="konfigurator" className="scroll-mt-24 border-y border-border bg-[#0e0c0a] py-20 sm:py-28" aria-labelledby="config-title">
        <div className="shell">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">Konfigurator</p>
            <h2 id="config-title" className="display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-foreground">
              In zwei Minuten zum sauberen Briefing.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Noch kein Preisrechner — bewusst. Sonderanfertigungen werden erst sinnvoll, wenn Maße, Material und Einsatz gemeinsam passen.
            </p>
          </div>
          <div className="mt-10" data-reveal>
            <CustomConfigurator />
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-28" aria-labelledby="process-title">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div data-reveal>
            <p className="eyebrow">Ablauf</p>
            <h2 id="process-title" className="display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-foreground">
              Wenig Schleifen. Klare Entscheidungen.
            </h2>
          </div>
          <ol className="border-t border-border">
            {process.map(([number, title, text]) => (
              <li key={number} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-6 sm:grid-cols-[4rem_11rem_1fr] sm:gap-5">
                <span className="tnum font-display text-2xl text-gold/70">{number}</span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.13em] text-foreground">{title}</h3>
                <p className="col-start-2 text-sm leading-relaxed text-muted-foreground sm:col-start-auto">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="b2b" className="scroll-mt-24 border-t border-border bg-card" aria-labelledby="b2b-title">
        <div className="shell grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
          <div data-reveal>
            <div className="flex size-11 items-center justify-center rounded-sm border border-gold/30 bg-gold/5">
              <Building2 className="size-5 text-gold" aria-hidden="true" />
            </div>
            <p className="eyebrow mt-6">Gastronomie & B2B</p>
            <h2 id="b2b-title" className="display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-foreground">
              Serien, die trotzdem nicht nach Serie aussehen.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Für Bars, Restaurants, Hotels, Agenturen, Empfangsbereiche und Events lassen sich Farbwelt, Branding und Proportionen konsistent über mehrere Stücke ziehen — ohne den Unikat-Charakter zu verlieren.
            </p>
            <Link
              href="#konfigurator"
              className="focus-ring group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold"
            >
              B2B-Briefing starten
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div data-reveal className="grid gap-3 sm:grid-cols-2">
            {[
              ["Kleine Serien", "Ab vier Stück mit abgestimmter Ausführung."],
              ["Markenfarben", "RAL-Töne und Beschläge passend zur Raumwelt."],
              ["Branding", "Logo, Gravur oder dezente Kennzeichnung."],
              ["Planungssicherheit", "Abgestimmte Ausführung vor Fertigungsstart."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-sm border border-border bg-background p-5">
                <ShieldCheck className="size-4 text-gold/70" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium text-foreground">{title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
