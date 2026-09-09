import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Service & Lieferung",
  description:
    "Informationen zu Speditionsversand, Rückgabe, Garantie und Pflege der Fasswerk-Möbel.",
  alternates: { canonical: "/service" },
};

const serviceCards = [
  {
    id: "lieferung",
    icon: Truck,
    label: "Lieferung",
    value: "Spedition",
    text: "Möbelstücke reisen geschützt per Spedition bis Bordsteinkante. Ab 500 € Bestellwert ist der Versand im Demo-Modell kostenfrei.",
  },
  {
    id: "rueckgabe",
    icon: RotateCcw,
    label: "Rückgabe",
    value: "14 Tage",
    text: "Innerhalb des Demo-Shops ist eine Rückgabe innerhalb von 14 Tagen vorgesehen. Vor Livegang müssen die finalen Bedingungen rechtlich geprüft werden.",
  },
  {
    id: "garantie",
    icon: ShieldCheck,
    label: "Garantie",
    value: "5 Jahre",
    text: "Die Demo kommuniziert fünf Jahre auf Lack, Naht und Beschläge. Diese Zusage muss vor dem Livegang an die realen Leistungen angepasst werden.",
  },
  {
    id: "pflege",
    icon: Sparkles,
    label: "Pflege",
    value: "Wenig Aufwand",
    text: "Lackierte Stahlflächen feucht und ohne Scheuermittel reinigen. Holz und Leder werden abhängig von der jeweiligen Oberfläche gepflegt.",
  },
];

export default function ServicePage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="shell py-16 sm:py-24">
          <p className="eyebrow">Service</p>
          <h1 className="display mt-4 max-w-4xl text-[clamp(3rem,7vw,5.5rem)] text-foreground">
            Ein Unikat darf besonders sein.
            <br />
            <span className="text-gold">Der Ablauf nicht.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Lieferung, Rückgabe, Garantie und Pflege auf einen Blick. Die Angaben sind Bestandteil des Demo-Shops und müssen vor einem realen Verkauf an die finalen Geschäftsbedingungen angepasst werden.
          </p>
        </div>
      </section>

      <section className="shell py-16 sm:py-24" aria-label="Serviceleistungen">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
          {serviceCards.map(({ id, icon: Icon, label, value, text }) => (
            <article key={id} id={id} data-reveal className="scroll-mt-24 bg-card p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <Icon className="size-4 text-gold/80" aria-hidden="true" />
                <span className="text-[0.625rem] uppercase tracking-[0.16em] text-steel">{label}</span>
              </div>
              <p className="display mt-6 text-3xl text-foreground sm:text-4xl">{value}</p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-[#0e0c0a] py-16 sm:py-24" aria-labelledby="delivery-title">
        <div className="shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">Lieferung im Detail</p>
            <h2 id="delivery-title" className="display mt-4 text-[clamp(2.2rem,4.5vw,3.5rem)] text-foreground">
              Von der Werkbank bis vor die Tür.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Fertigmeldung", "Nach der Endkontrolle wird das Stück für den Versand freigegeben."],
              ["02", "Termin", "Die Spedition stimmt den Liefertermin mit dem Empfänger ab."],
              ["03", "Anlieferung", "Standardmäßig erfolgt die Übergabe frei Bordsteinkante."],
            ].map(([number, title, text]) => (
              <article key={number} data-reveal className="rounded-sm border border-border bg-card p-5">
                <span className="tnum font-display text-2xl text-gold/70">{number}</span>
                <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">{title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-24" aria-labelledby="service-faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="service-faq-title" className="display mt-4 text-[clamp(2.2rem,4.5vw,3.5rem)] text-foreground">
              Kurz geklärt.
            </h2>
          </div>
          <Accordion className="border-t border-border" multiple={false}>
            {[
              ["Kann die Spedition das Möbel in die Wohnung tragen?", "Im Demo-Setup ist nur die Lieferung frei Bordsteinkante vorgesehen. Zusatzleistungen wie Zwei-Mann-Handling können später als echte Versandoption ergänzt werden."],
              ["Wie pflege ich lackierte Stahlflächen?", "Mit einem weichen, leicht feuchten Tuch. Aggressive Reiniger, Scheuermittel und harte Schwämme vermeiden."],
              ["Wie läuft eine Rückgabe bei einem großen Möbelstück?", "Bei einer realen Shop-Anbindung sollte die Rückholung über einen abgestimmten Speditionstermin organisiert werden. Die konkrete Kostenregel muss in den finalen AGB stehen."],
              ["Gilt die Garantie auch bei Gastro-Nutzung?", "Das hängt von den finalen Garantiebedingungen ab. Für den Demo-Shop wird die Aussage noch nicht zwischen privater und gewerblicher Nutzung unterschieden."],
            ].map(([question, answer], index) => (
              <AccordionItem key={question} value={`service-faq-${index}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left text-sm font-medium text-foreground">{question}</AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="shell flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-gold">
              <PackageCheck className="size-4" aria-hidden="true" />
              <span className="uppercase tracking-[0.16em]">Noch etwas offen?</span>
            </div>
            <p className="display mt-3 text-2xl text-foreground sm:text-3xl">Für Sonderfälle lieber einmal sauber abstimmen.</p>
          </div>
          <Link
            href="/sonderanfertigung"
            className="focus-ring group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-sm border border-gold/40 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/10"
          >
            Sonderanfertigung
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
