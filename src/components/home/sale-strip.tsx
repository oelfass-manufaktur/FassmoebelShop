import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { saleProducts } from "@/lib/shop";

export function SaleStrip() {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-[linear-gradient(135deg,#140d08_0%,#0c0a09_55%)] py-20 sm:py-28"
      aria-labelledby="sale-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 size-[34rem] -translate-y-1/2 rounded-full bg-rust/12 blur-[130px]"
      />

      <div className="shell relative">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <p className="flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-rust">
              <Flame className="size-3.5" aria-hidden="true" />
              Ausverkauf
            </p>
            <h2
              id="sale-title"
              className="display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-foreground"
            >
              Ausstellungsstücke,
              <br />
              jeweils nur einmal
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Sonderlackierungen, Messe-Exemplare und Fässer mit kleinen
              Schönheitsfehlern. Gleiche Handarbeit, reduzierter Preis.
            </p>
          </div>
          <Link
            href="/kategorie/ausverkauf"
            data-reveal
            className="focus-ring group inline-flex h-12 shrink-0 items-center gap-2.5 self-start rounded-sm border border-rust/50 bg-rust/10 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#ff9a5c] transition-colors hover:bg-rust/20 md:self-auto"
          >
            Zum Ausverkauf
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {saleProducts.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} ratio="portrait" />
          ))}
        </div>
      </div>
    </section>
  );
}
