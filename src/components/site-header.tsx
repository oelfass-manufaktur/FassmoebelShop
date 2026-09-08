"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Wordmark } from "@/components/brand-mark";
import { useCart } from "@/components/cart/cart-provider";
import { categories, countByCategory } from "@/lib/shop";
import { cn } from "@/lib/utils";

const navItems = categories.map((c) => ({
  href: `/kategorie/${c.slug}`,
  label: c.name,
  slug: c.slug,
  tagline: c.tagline,
  image: c.image,
  count: countByCategory(c.slug),
}));

export function SiteHeader() {
  const pathname = usePathname();
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Welches Mega-Menü offen ist. Bewusst State statt reinem CSS-:hover: so wird
  // das Vorschaubild erst beim Öffnen geladen und nicht auf jeder Seite mit.
  const [openNav, setOpenNav] = useState<string | null>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const firstPulse = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sperrt den Body-Scroll, solange das Mobile-Menü offen ist.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Warenkorb-Badge pulsiert beim Hinzufügen.
  useEffect(() => {
    if (firstPulse.current) {
      firstPulse.current = false;
      return;
    }
    if (!badgeRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      badgeRef.current,
      { scale: 1 },
      { scale: 1.45, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" },
    );
  }, [cart.addPulse]);

  return (
    <>
      {/* Ankündigungsleiste */}
      <div className="relative z-50 border-b border-border/60 bg-[#080706]">
        <div className="shell flex h-9 items-center justify-center overflow-hidden">
          {/* Mobil nur die konversionsrelevanteste Aussage, sonst bricht die Zeile ab. */}
          <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground sm:hidden">
            Versandkostenfrei ab 500&nbsp;€
          </p>
          <p className="hidden text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Handgefertigt in Deutschland
            <span className="mx-3 text-gold/40">/</span>
            Versandkostenfrei ab 500&nbsp;€
            <span className="mx-3 hidden text-gold/40 md:inline">/</span>
            <span className="hidden md:inline">Jedes Fass ein Unikat</span>
          </p>
        </div>
      </div>

      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Zum Inhalt springen
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300",
          // Bei offenem Mobile-Menü deckend, sonst schimmert das Hero-Bild durch.
          mobileOpen
            ? "border-b border-border bg-[#0a0908]"
            : scrolled
              ? "border-b border-border bg-background/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="focus-ring shrink-0 rounded-sm">
            <Wordmark />
            <span className="sr-only">Fasswerk Manufaktur — zur Startseite</span>
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li
                    key={item.href}
                    className="group/nav static"
                    onMouseEnter={() => setOpenNav(item.slug)}
                    onMouseLeave={() => setOpenNav(null)}
                    onFocus={() => setOpenNav(item.slug)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setOpenNav(null);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "focus-ring relative flex h-[4.5rem] items-center px-3.5 text-[0.8125rem] font-medium tracking-wide transition-colors",
                        item.slug === "ausverkauf"
                          ? "text-rust hover:text-[#e07b45]"
                          : active
                            ? "text-gold"
                            : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:scale-x-100",
                          active && "scale-x-100",
                        )}
                      />
                    </Link>

                    {/* Mega-Menü-Vorschau */}
                    <div
                      className={cn(
                        "absolute inset-x-0 top-full z-40 border-y border-border bg-[#0c0a08]/97 backdrop-blur-xl transition-[opacity,visibility] duration-200",
                        openNav === item.slug
                          ? "visible opacity-100"
                          : "invisible opacity-0",
                      )}
                    >
                      <div className="shell grid grid-cols-[minmax(0,1fr)_20rem] items-center gap-10 py-8">
                        <div>
                          <p className="eyebrow">{item.label}</p>
                          <p className="mt-3 max-w-xl font-display text-3xl text-foreground">
                            {item.tagline}
                          </p>
                          <p className="mt-4 text-sm text-muted-foreground">
                            {item.count}{" "}
                            {item.count === 1 ? "Modell" : "Modelle"} verfügbar
                            — jedes Stück in Handarbeit gefertigt.
                          </p>
                          <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                            Kategorie ansehen
                            <span aria-hidden="true">→</span>
                          </span>
                        </div>
                        <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-border bg-card">
                          {/* PLACEHOLDER IMAGE — KI-generiert, vor Livegang ersetzen.
                              Erst rendern, wenn das Menü offen ist. */}
                          {openNav === item.slug && (
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="320px"
                              className="object-cover"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Suche öffnen"
              className="focus-ring hidden size-10 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
            >
              <Search className="size-[1.15rem]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={cart.open}
              aria-label={`Warenkorb öffnen, ${cart.count} ${cart.count === 1 ? "Artikel" : "Artikel"}`}
              className="focus-ring relative flex size-10 cursor-pointer items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary"
            >
              <ShoppingBag className="size-[1.15rem]" aria-hidden="true" />
              {cart.ready && cart.count > 0 && (
                <span
                  ref={badgeRef}
                  className="tnum absolute -right-0.5 -top-0.5 flex min-w-[1.15rem] items-center justify-center rounded-full bg-gold px-1 text-[0.625rem] font-bold leading-[1.15rem] text-primary-foreground"
                >
                  {cart.count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileOpen}
              className="focus-ring flex size-10 cursor-pointer items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile-Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[calc(4.5rem+2.25rem)] z-40 bg-[#0a0908] transition-[opacity,visibility] duration-200 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile Navigation" className="shell py-6">
          <ul className="divide-y divide-border">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring flex items-center justify-between gap-4 py-5"
                >
                  <span>
                    <span
                      className={cn(
                        "block font-display text-2xl",
                        item.slug === "ausverkauf" ? "text-rust" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {item.tagline}
                    </span>
                  </span>
                  <span className="tnum text-xs text-steel">{item.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#manufaktur"
            onClick={() => setMobileOpen(false)}
            className="focus-ring mt-8 flex h-12 items-center justify-center rounded-sm border border-border text-xs font-semibold uppercase tracking-[0.16em] text-foreground"
          >
            Die Manufaktur
          </Link>
        </nav>
      </div>
    </>
  );
}
