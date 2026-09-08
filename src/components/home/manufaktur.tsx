import Image from "next/image";

const steps = [
  {
    n: "01",
    title: "Auswählen",
    text: "Wir kaufen ausgediente 200-Liter-Fässer aus Industriebetrieben in der Region und sortieren nach Zustand und Patina.",
  },
  {
    n: "02",
    title: "Entkernen & strahlen",
    text: "Deckel auf, ausgebrannt, sandgestrahlt bis auf den blanken Stahl. Erst danach entscheidet sich, was aus dem Fass wird.",
  },
  {
    n: "03",
    title: "Lackieren",
    text: "Acht Schichten, dazwischen jeweils nass geschliffen. Bei Patina-Modellen versiegeln wir stattdessen die Originaloberfläche.",
  },
  {
    n: "04",
    title: "Ausbauen & montieren",
    text: "Innenausbau aus Massivholz, Beschläge aus Messing oder Kupfer, LED-Technik, Endkontrolle — und eine Chargennummer.",
  },
];

export function Manufaktur() {
  return (
    <section
      id="manufaktur"
      className="relative scroll-mt-24 overflow-hidden border-t border-border py-20 sm:py-28"
      aria-labelledby="manufaktur-title"
    >
      <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        {/* Bild mit dezentem Parallax */}
        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-sm border border-border sm:aspect-3/2 lg:aspect-4/5">
            {/* PLACEHOLDER IMAGE — KI-generiert, vor Livegang ersetzen */}
            <Image
              src="/images/workshop-atelier.webp"
              alt="Altes Ölfass auf einer Werkbank, zur Hälfte auf blanken Stahl geschliffen"
              fill
              sizes="(max-width: 1024px) 92vw, 45vw"
              data-parallax="0.08"
              className="scale-110 object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
            />
          </div>

          {/* Kennzahl-Karte, überlappend */}
          <div
            data-reveal
            className="steel-surface absolute -bottom-7 left-5 rounded-sm border border-border px-6 py-5 shadow-2xl sm:left-8"
          >
            <p className="tnum display text-4xl text-gold">2.400+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Fässer weitergelebt
            </p>
          </div>
        </div>

        <div>
          <p data-reveal className="eyebrow">
            Die Manufaktur
          </p>
          <h2
            id="manufaktur-title"
            data-reveal
            className="display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-foreground"
          >
            Vier Wochen zwischen
            <br />
            Schrottplatz und Wohnzimmer
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Kein Fass verlässt die Werkstatt, ohne durch vier Hände gegangen zu
            sein. Genau deshalb sieht auch kein Fass aus wie das andere.
          </p>

          <ol className="mt-10 space-y-px">
            {steps.map((s) => (
              <li
                key={s.n}
                data-reveal
                className="group/step grid grid-cols-[3.25rem_1fr] gap-4 border-t border-border py-6 transition-colors last:border-b hover:bg-secondary/40"
              >
                <span className="tnum pt-0.5 font-display text-2xl text-gold/70 transition-colors group-hover/step:text-gold">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
