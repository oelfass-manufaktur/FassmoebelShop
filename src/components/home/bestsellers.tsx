import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { bestsellers } from "@/lib/shop";

export function Bestsellers() {
  return (
    <section
      className="border-t border-border bg-[#0d0b09] py-20 sm:py-28"
      aria-labelledby="bestseller-title"
    >
      <div className="shell">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <p className="eyebrow">Meistverkauft</p>
            <h2
              id="bestseller-title"
              className="display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-foreground"
            >
              Die Klassiker der Werkstatt
            </h2>
          </div>
          <Link
            href="/kategorie/minibars"
            data-reveal
            className="focus-ring group inline-flex shrink-0 items-center gap-2 self-start rounded-sm text-xs font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-soft md:self-auto"
          >
            Alle Möbel ansehen
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} ratio="portrait" />
          ))}
        </div>
      </div>
    </section>
  );
}
