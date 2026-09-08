"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { discountPercent, formatPrice, type Product } from "@/lib/shop";
import { cn } from "@/lib/utils";

const ratioClass: Record<Product["imageRatio"], string> = {
  portrait: "aspect-3/4",
  landscape: "aspect-4/3",
  square: "aspect-square",
};

export function ProductCard({
  product,
  className,
  priority = false,
  /** Erzwingt ein einheitliches Bildformat im Raster */
  ratio,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  ratio?: Product["imageRatio"];
}) {
  const cart = useCart();
  const discount = discountPercent(product);
  const soldOutSoon = product.stock <= 3;

  return (
    <article
      data-reveal
      className={cn("group/card relative flex flex-col", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-sm border border-border bg-card transition-colors duration-300 group-hover/card:border-gold/40",
          ratioClass[ratio ?? product.imageRatio],
        )}
      >
        {/* PLACEHOLDER IMAGE — KI-generiert (GPT Image 2), vor Livegang ersetzen */}
        <Image
          src={product.image}
          alt={`${product.name} — ${product.subtitle} aus recyceltem Ölfass`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.06]"
        />

        {/* Verlauf, damit Badges und Hover-Button lesbar bleiben */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 opacity-70 transition-opacity duration-500 group-hover/card:opacity-90"
        />

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount > 0 && (
            <span className="tnum rounded-sm bg-rust px-2 py-1 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-white">
              −{discount}&nbsp;%
            </span>
          )}
          {product.badge && discount === 0 && (
            <span className="rounded-sm bg-background/85 px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-gold backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>

        {soldOutSoon && (
          <span className="absolute right-3 top-3 rounded-sm bg-background/85 px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground backdrop-blur-sm">
            Nur noch {product.stock}
          </span>
        )}

        {/* Schnell-hinzufügen: mobil immer sichtbar, Desktop beim Hover */}
        <button
          type="button"
          onClick={() => cart.add(product.slug, product.finishes[0].name, 1)}
          aria-label={`${product.name} in den Warenkorb legen`}
          className="focus-ring absolute bottom-3 right-3 z-10 flex size-11 cursor-pointer items-center justify-center rounded-sm bg-primary text-primary-foreground shadow-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gold-soft md:translate-y-2 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100 md:group-focus-within/card:translate-y-0 md:group-focus-within/card:opacity-100"
        >
          <Plus className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl leading-none text-foreground">
            <Link
              href={`/produkt/${product.slug}`}
              className="focus-ring rounded-sm outline-offset-4 transition-colors after:absolute after:inset-0 after:content-[''] hover:text-gold"
            >
              {product.name}
            </Link>
          </h3>
          <span className="tnum shrink-0 text-sm font-medium text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="mt-1.5 flex items-baseline justify-between gap-4">
          <p className="truncate text-xs text-muted-foreground">
            {product.subtitle}
          </p>
          {product.compareAtPrice && (
            <span className="tnum shrink-0 text-xs text-steel line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Lackierungen als kleine Farbpunkte */}
        <div className="mt-3 flex items-center gap-1.5">
          {product.finishes.map((f) => (
            <span
              key={f.name}
              title={f.name}
              className="size-2.5 rounded-full border border-white/15"
              style={{ backgroundColor: f.hex }}
            />
          ))}
          <span className="ml-1 text-[0.6875rem] text-steel">
            {product.finishes.length} Ausführungen
          </span>
        </div>
      </div>
    </article>
  );
}
