"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { discountPercent, formatPrice, type Product } from "@/lib/shop";
import { cn } from "@/lib/utils";

export function ProductBuyBox({ product }: { product: Product }) {
  const cart = useCart();
  const [finish, setFinish] = useState(product.finishes[0].name);
  const [qty, setQty] = useState(1);
  const [barVisible, setBarVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const discount = discountPercent(product);

  // Mobile Sticky-Leiste erst zeigen, wenn der eigentliche Kaufbereich
  // aus dem Blick gescrollt ist — sonst stehen zwei CTAs übereinander.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setBarVisible(!entry.isIntersecting),
      { rootMargin: "-120px 0px 0px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={boxRef}>
      {/* Preis */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="tnum display text-4xl text-foreground">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="tnum text-base text-steel line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="tnum rounded-sm bg-rust px-2 py-1 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-white">
              −{discount}&nbsp;%
            </span>
          </>
        )}
      </div>
      <p className="mt-1.5 text-xs text-steel">
        inkl. MwSt. · {product.leadTime}
      </p>

      {/* Ausführung */}
      <fieldset className="mt-8">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
          Ausführung
        </legend>
        <p className="mt-1.5 text-xs text-muted-foreground">{finish}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {product.finishes.map((f) => {
            const active = f.name === finish;
            return (
              <button
                key={f.name}
                type="button"
                onClick={() => setFinish(f.name)}
                aria-pressed={active}
                title={f.name}
                className={cn(
                  "focus-ring group/sw relative flex cursor-pointer items-center gap-2.5 rounded-sm border px-3 py-2.5 text-xs transition-colors",
                  active
                    ? "border-gold bg-gold/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-steel hover:text-foreground",
                )}
              >
                <span
                  className="size-4 rounded-full border border-white/20"
                  style={{ backgroundColor: f.hex }}
                  aria-hidden="true"
                />
                {f.name}
                {active && (
                  <Check className="size-3.5 text-gold" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Menge + Warenkorb */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex h-13 items-center rounded-sm border border-border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Menge verringern"
            disabled={qty <= 1}
            className="focus-ring flex size-13 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <span
            className="tnum w-10 text-center text-sm text-foreground"
            aria-live="polite"
            aria-label={`Menge: ${qty}`}
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            aria-label="Menge erhöhen"
            disabled={qty >= product.stock}
            className="focus-ring flex size-13 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => cart.add(product.slug, finish, qty)}
          className="focus-ring group flex h-13 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-sm bg-primary text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-gold-soft"
        >
          <ShoppingBag className="size-4" aria-hidden="true" />
          In den Warenkorb
        </button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {product.stock <= 3 ? (
          <span className="text-gold">
            Nur noch {product.stock}{" "}
            {product.stock === 1 ? "Exemplar" : "Exemplare"} verfügbar
          </span>
        ) : (
          <>Auf Lager · {product.stock} Exemplare verfügbar</>
        )}
      </p>

      {/* Sticky-Kaufleiste für Mobil */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#0e0c0a]/95 px-4 py-3 backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          barVisible ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!barVisible}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-foreground">
              {product.name} · {finish}
            </p>
            <p className="tnum text-sm font-medium text-foreground">
              {formatPrice(product.price * qty)}
            </p>
          </div>
          <button
            type="button"
            tabIndex={barVisible ? 0 : -1}
            onClick={() => cart.add(product.slug, finish, qty)}
            className="focus-ring flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-sm bg-primary px-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
}
