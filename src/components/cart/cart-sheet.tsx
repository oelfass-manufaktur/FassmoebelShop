"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/shop";
import { cn } from "@/lib/utils";

export function CartSheet() {
  const cart = useCart();
  const {
    lines,
    subtotal,
    shipping,
    total,
    count,
    freeShippingThreshold,
    isOpen,
  } = cart;

  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? cart.open() : cart.close())}>
      <SheetContent
        side="right"
        showCloseButton
        className="w-full gap-0 border-l border-border bg-[#0e0c0a] p-0 sm:max-w-[27rem]"
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-center gap-2.5 font-sans text-sm font-medium uppercase tracking-[0.18em] text-foreground">
            <ShoppingBag className="size-4 text-gold" aria-hidden="true" />
            Warenkorb
            <span className="tnum text-muted-foreground">({count})</span>
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            Unverbindlich zusammengestellt — jederzeit änderbar.
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <EmptyCart onClose={cart.close} />
        ) : (
          <>
            {/* Versandkosten-Fortschritt */}
            <div className="border-b border-border px-6 py-4">
              <p className="mb-2.5 text-xs text-muted-foreground">
                {missingForFreeShipping > 0 ? (
                  <>
                    Noch{" "}
                    <span className="tnum font-medium text-gold">
                      {formatPrice(missingForFreeShipping)}
                    </span>{" "}
                    bis zum kostenlosen Versand
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-medium text-gold">
                    <Truck className="size-3.5" aria-hidden="true" />
                    Versandkostenfrei — geschafft
                  </span>
                )}
              </p>
              <div
                className="h-1 w-full overflow-hidden rounded-full bg-secondary"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Fortschritt bis versandkostenfrei"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8a6a25] to-gold transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Positionen */}
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((line) => (
                <li
                  key={`${line.slug}-${line.finish}`}
                  className="flex gap-4 py-5"
                >
                  <Link
                    href={`/produkt/${line.slug}`}
                    onClick={cart.close}
                    className="focus-ring relative size-[5.5rem] shrink-0 overflow-hidden rounded-sm border border-border bg-card"
                  >
                    {/* PLACEHOLDER IMAGE — KI-generiert, vor Livegang ersetzen */}
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      sizes="88px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/produkt/${line.slug}`}
                          onClick={cart.close}
                          className="focus-ring block truncate text-sm font-medium text-foreground transition-colors hover:text-gold"
                        >
                          {line.product.name}
                        </Link>
                        <p className="truncate text-xs text-muted-foreground">
                          {line.product.subtitle}
                        </p>
                        <p className="mt-1 truncate text-xs text-steel">
                          {line.finish}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.slug, line.finish)}
                        aria-label={`${line.product.name} entfernen`}
                        className="focus-ring -m-2 cursor-pointer p-2 text-steel transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                      <QtyStepper
                        value={line.qty}
                        label={line.product.name}
                        onChange={(q) => cart.setQty(line.slug, line.finish, q)}
                      />
                      <span className="tnum text-sm font-medium text-foreground">
                        {formatPrice(line.product.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summe + Checkout */}
            <div className="mt-auto border-t border-border bg-[#100e0b] px-6 py-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Zwischensumme</dt>
                  <dd className="tnum">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Versand</dt>
                  <dd className="tnum">
                    {shipping === 0 ? "Kostenlos" : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-medium text-foreground">
                  <dt>Gesamt</dt>
                  <dd className="tnum">{formatPrice(total)}</dd>
                </div>
              </dl>
              <p className="mt-1.5 text-[0.6875rem] text-steel">
                inkl. MwSt., zzgl. Speditionszuschlag bei Inselversand
              </p>

              {/* DEMO: Zur Kasse ist absichtlich deaktiviert — keine Zahlungsanbindung.
                  Bewusst weiterhin voll sichtbar, damit die Demo fertig wirkt. */}
              <button
                type="button"
                disabled
                aria-describedby="checkout-demo-hint"
                className="mt-4 flex h-12 w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-sm bg-primary/85 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground"
              >
                <Lock className="size-4" aria-hidden="true" />
                Zur Kasse
              </button>
              <p
                id="checkout-demo-hint"
                className="mt-2.5 flex items-start gap-1.5 text-[0.6875rem] leading-relaxed text-steel"
              >
                <ShieldCheck
                  className="mt-px size-3.5 shrink-0 text-gold/70"
                  aria-hidden="true"
                />
                Demo-Shop: Der Kaufabschluss ist noch nicht angebunden. Warenkorb
                und Konfiguration funktionieren bereits vollständig.
              </p>

              <button
                type="button"
                onClick={cart.clear}
                className="focus-ring mt-3 w-full cursor-pointer text-center text-xs text-steel underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Warenkorb leeren
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function QtyStepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="flex items-center rounded-sm border border-border">
      <StepperButton
        onClick={() => onChange(value - 1)}
        ariaLabel={`Menge von ${label} verringern`}
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </StepperButton>
      <span
        className="tnum w-9 text-center text-sm tabular-nums text-foreground"
        aria-live="polite"
        aria-label={`Menge: ${value}`}
      >
        {value}
      </span>
      <StepperButton
        onClick={() => onChange(value + 1)}
        ariaLabel={`Menge von ${label} erhöhen`}
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </StepperButton>
    </div>
  );
}

function StepperButton({
  children,
  onClick,
  ariaLabel,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "focus-ring flex size-9 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full border border-border bg-card">
        <ShoppingBag className="size-6 text-steel" aria-hidden="true" />
      </div>
      <p className="mt-5 font-display text-2xl text-foreground">
        Noch nichts eingeladen
      </p>
      <p className="mt-2 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
        Jedes Stück ist ein Unikat aus einem echten 200-Liter-Fass.
      </p>
      <Link
        href="/kategorie/minibars"
        onClick={onClose}
        className="focus-ring mt-6 inline-flex h-11 items-center rounded-sm bg-primary px-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-gold-soft"
      >
        Minibars entdecken
      </Link>
    </div>
  );
}
