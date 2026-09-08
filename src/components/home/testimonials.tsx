import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "Die Kentucky steht bei uns im Empfang. Kein Termin, bei dem nicht jemand fragt, wo das Ding herkommt.",
    name: "Marek T.",
    role: "Agenturinhaber, Köln",
    product: "Minibar Kentucky",
  },
  {
    quote:
      "Vier Stehtische für unsere Weinbar. Nach zwei Jahren Gastro-Betrieb sehen sie besser aus als am ersten Tag.",
    name: "Sandra L.",
    role: "Gastronomin, Leipzig",
    product: "Stehtisch Chicago",
  },
  {
    quote:
      "Ich wollte einen Sessel, der nicht aus dem Katalog kommt. Das Leder ist eine Wucht, das Drehlager völlig geräuschlos.",
    name: "Jonas W.",
    role: "Architekt, Hamburg",
    product: "Sessel Manhattan",
  },
];

const stats = [
  { value: "4,9/5", label: "aus 312 Bewertungen" },
  { value: "2.400+", label: "Fässer verarbeitet" },
  { value: "5 Jahre", label: "Garantie auf Lack & Naht" },
  { value: "14 Tage", label: "Rückgaberecht" },
];

export function Testimonials() {
  return (
    <section
      className="border-t border-border py-20 sm:py-28"
      aria-labelledby="stimmen-title"
    >
      <div className="shell">
        <div data-reveal className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1" aria-label="4,9 von 5 Sternen">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-4 fill-gold text-gold"
                aria-hidden="true"
              />
            ))}
          </div>
          <h2
            id="stimmen-title"
            className="display mt-5 text-[clamp(2rem,4.5vw,3.25rem)] text-foreground"
          >
            4,9 von 5 — und alle wollen wissen,
            <br className="hidden sm:block" /> woraus es gemacht ist
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              data-reveal
              className="steel-surface flex flex-col rounded-sm border border-border p-7"
            >
              <div className="flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-foreground">
                „{r.quote}“
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{r.role}</p>
                <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.14em] text-gold/80">
                  {r.product}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              data-reveal
              className="rounded-sm border border-border bg-card px-6 py-7 text-center"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="tnum display block text-3xl text-gold sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 block text-xs text-muted-foreground">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
