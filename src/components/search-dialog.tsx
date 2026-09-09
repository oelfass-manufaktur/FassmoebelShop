"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { categories, formatPrice, products } from "@/lib/shop";

const categoryName = new Map(categories.map((category) => [category.slug, category.name]));

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("de-DE");
    const source = normalized
      ? products.filter((product) => {
          const haystack = [
            product.name,
            product.subtitle,
            product.shortDescription,
            categoryName.get(product.category) ?? "",
          ]
            .join(" ")
            .toLocaleLowerCase("de-DE");
          return haystack.includes(normalized);
        })
      : products.filter((product) => product.bestseller);

    return source.slice(0, 6);
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Suche öffnen"
        className="focus-ring flex size-10 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Search className="size-[1.15rem]" aria-hidden="true" />
      </button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) setQuery("");
        }}
      >
        <DialogContent
          showCloseButton
          className="max-h-[min(46rem,calc(100dvh-2rem))] w-full max-w-2xl gap-0 overflow-hidden rounded-sm border border-border bg-[#0c0a08] p-0 shadow-2xl ring-0"
        >
          <div className="border-b border-border px-6 pb-5 pt-6 sm:px-8 sm:pt-7">
            <p className="eyebrow">Kollektion durchsuchen</p>
            <DialogTitle className="display mt-2 font-display text-3xl font-medium text-foreground sm:text-4xl">
              Was darf es werden?
            </DialogTitle>
            <DialogDescription className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Suche nach Modell, Möbelart oder Material.
            </DialogDescription>

            <label htmlFor="site-search" className="sr-only">
              Produkte durchsuchen
            </label>
            <div className="mt-5 flex h-13 items-center gap-3 rounded-sm border border-border bg-card px-4 focus-within:border-gold/60">
              <Search className="size-4 shrink-0 text-gold/70" aria-hidden="true" />
              <input
                id="site-search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="z. B. Minibar, Kentucky oder Kupfer"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-steel"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="focus-ring rounded-sm px-2 py-1 text-[0.6875rem] uppercase tracking-[0.12em] text-steel transition-colors hover:text-foreground"
                >
                  Löschen
                </button>
              )}
            </div>
          </div>

          <div className="overflow-y-auto px-6 py-5 sm:px-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {query.trim() ? "Treffer" : "Bestseller"}
              </p>
              <span className="tnum text-xs text-steel">{results.length}</span>
            </div>

            {results.length > 0 ? (
              <ul className="divide-y divide-border border-y border-border">
                {results.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/produkt/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="focus-ring group flex items-center gap-4 py-4"
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-sm border border-border bg-card sm:size-20">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.625rem] uppercase tracking-[0.16em] text-gold/80">
                          {categoryName.get(product.category)}
                        </p>
                        <div className="mt-1 flex items-baseline justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate font-display text-xl text-foreground transition-colors group-hover:text-gold sm:text-2xl">
                              {product.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {product.subtitle}
                            </p>
                          </div>
                          <span className="tnum shrink-0 text-sm font-medium text-foreground">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="hidden size-4 shrink-0 text-steel transition-colors group-hover:text-gold sm:block"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-sm border border-dashed border-border px-6 py-12 text-center">
                <p className="font-display text-2xl text-foreground">Noch kein Treffer.</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Versuchen Sie einen allgemeineren Begriff wie „Bar“, „Tisch“, „Leder“ oder „Kupfer“.
                </p>
              </div>
            )}

            <Link
              href="/sonderanfertigung"
              onClick={() => setOpen(false)}
              className="focus-ring mt-5 flex items-center justify-between rounded-sm border border-border px-4 py-3 text-xs text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground"
            >
              Nicht gefunden? Wunschstück konfigurieren
              <ArrowUpRight className="size-4 text-gold/70" aria-hidden="true" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
