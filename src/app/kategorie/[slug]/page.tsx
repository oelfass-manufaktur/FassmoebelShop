import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import {
  categories,
  getCategory,
  getProductsByCategory,
  type CategorySlug,
} from "@/lib/shop";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return { title: cat.name, description: cat.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug as CategorySlug);
  const isSale = category.slug === "ausverkauf";

  return (
    <>
      {/* Kategorie-Kopf */}
      <section className="relative isolate overflow-hidden border-b border-border">
        {/* PLACEHOLDER IMAGE — KI-generiert, vor Livegang ersetzen.
            Rechts angeschnitten, damit links Platz für die Typografie bleibt. */}
        <Image
          src={category.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[75%_35%] opacity-70 lg:object-[70%_30%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(9,8,7,0.97)_0%,rgba(9,8,7,0.9)_42%,rgba(9,8,7,0.55)_72%,rgba(9,8,7,0.75)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-background to-transparent"
        />

        <div className="shell pb-14 pt-12 sm:pb-16 sm:pt-16">
          <nav aria-label="Brotkrumen">
            <ol className="flex items-center gap-1.5 text-xs text-steel">
              <li>
                <Link
                  href="/"
                  className="focus-ring rounded-sm transition-colors hover:text-foreground"
                >
                  Start
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li aria-current="page" className="text-muted-foreground">
                {category.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p
                className={
                  isSale
                    ? "text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-rust"
                    : "eyebrow"
                }
              >
                {category.tagline}
              </p>
              <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5rem)] text-foreground">
                {category.name}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {category.description}
              </p>
            </div>

            <p className="tnum shrink-0 text-xs uppercase tracking-[0.18em] text-steel">
              {items.length} {items.length === 1 ? "Modell" : "Modelle"}
            </p>
          </div>
        </div>
      </section>

      {/* Raster */}
      <section className="shell py-14 sm:py-20">
        {items.length === 0 ? (
          <EmptyCategory />
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
            {items.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                ratio="portrait"
                priority={i < 4}
              />
            ))}
          </div>
        )}
      </section>

      {/* Weitere Kategorien */}
      <section className="border-t border-border py-14 sm:py-20">
        <div className="shell">
          <h2 className="eyebrow">Weiter stöbern</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/kategorie/${c.slug}`}
                  data-reveal
                  className="focus-ring rounded-sm border border-border px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

function EmptyCategory() {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border py-24 text-center">
      <PackageSearch className="size-8 text-steel" aria-hidden="true" />
      <p className="mt-5 font-display text-2xl text-foreground">
        Gerade nichts am Lager
      </p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Die Werkstatt arbeitet nach. Melden Sie sich zum Werkstattbrief an, dann
        erfahren Sie es zuerst.
      </p>
    </div>
  );
}
