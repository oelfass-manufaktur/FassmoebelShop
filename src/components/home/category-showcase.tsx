import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, countByCategory } from "@/lib/shop";
import { cn } from "@/lib/utils";

/** Asymmetrisches Raster: zwei große Kacheln oben, drei schmale darunter. */
const layout: Record<string, string> = {
  minibars: "lg:col-span-3 lg:row-span-2",
  stehtische: "lg:col-span-3 lg:row-span-2",
  "sessel-baenke": "lg:col-span-2",
  "deko-geschenke": "lg:col-span-2",
  ausverkauf: "lg:col-span-2",
};

export function CategoryShowcase() {
  return (
    <section className="shell py-20 sm:py-28" aria-labelledby="kategorien-title">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">Kollektion</p>
          <h2
            id="kategorien-title"
            className="display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-foreground"
          >
            Fünf Wege, ein Fass
            <br />
            neu zu denken
          </h2>
        </div>
        <p
          data-reveal
          className="max-w-sm text-sm leading-relaxed text-muted-foreground"
        >
          Vom kleinen Servierbrett bis zur beleuchteten Hausbar — jedes Stück
          beginnt als dasselbe ausgediente 200-Liter-Fass.
        </p>
      </header>

      <div className="mt-12 grid auto-rows-[16.5rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((cat, i) => {
          const isSale = cat.slug === "ausverkauf";
          const large = i < 2;
          return (
            <Link
              key={cat.slug}
              href={`/kategorie/${cat.slug}`}
              data-reveal
              className={cn(
                "group/tile focus-ring relative isolate flex flex-col justify-end overflow-hidden rounded-sm border border-border bg-card p-6 transition-colors duration-300 hover:border-gold/40 sm:p-7",
                layout[cat.slug],
              )}
            >
              {/* PLACEHOLDER IMAGE — KI-generiert, vor Livegang ersetzen */}
              <Image
                src={cat.image}
                alt=""
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 50vw"
                className="-z-10 object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-[1.07]"
              />
              <div
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 -z-10 transition-opacity duration-500",
                  isSale
                    ? "bg-[linear-gradient(0deg,rgba(10,8,7,0.95)_0%,rgba(120,45,12,0.45)_55%,rgba(10,8,7,0.35)_100%)]"
                    : "bg-[linear-gradient(0deg,rgba(9,8,7,0.94)_0%,rgba(9,8,7,0.5)_45%,rgba(9,8,7,0.2)_100%)]",
                )}
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={cn(
                      "text-[0.625rem] font-medium uppercase tracking-[0.22em]",
                      isSale ? "text-[#ff9a5c]" : "text-gold",
                    )}
                  >
                    {countByCategory(cat.slug)} Modelle
                  </p>
                  <h3
                    className={cn(
                      "display mt-2.5 text-foreground",
                      large ? "text-4xl sm:text-[2.75rem]" : "text-3xl",
                    )}
                  >
                    {cat.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    {cat.tagline}
                  </p>
                </div>
                <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/40 text-foreground backdrop-blur-sm transition-all duration-300 group-hover/tile:border-gold group-hover/tile:bg-gold group-hover/tile:text-primary-foreground">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
