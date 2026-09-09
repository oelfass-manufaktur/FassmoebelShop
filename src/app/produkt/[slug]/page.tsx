import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Fingerprint,
  Recycle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductBuyBox } from "@/components/product-buy-box";
import { ProductCard } from "@/components/product-card";
import {
  categories,
  getProduct,
  products,
  relatedProducts,
} from "@/lib/shop";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.subtitle}`,
    description: p.shortDescription,
    alternates: { canonical: `/produkt/${p.slug}` },
    openGraph: {
      type: "website",
      title: `${p.name} — ${p.subtitle}`,
      description: p.shortDescription,
      images: [{ url: p.image, alt: `${p.name} — ${p.subtitle}` }],
    },
  };
}

const services = [
  { icon: Truck, title: "Speditionsversand", text: "Frei Bordsteinkante, ab 500 € kostenlos" },
  { icon: RotateCcw, title: "14 Tage Rückgabe", text: "Auch bei Sonderlackierung" },
  { icon: ShieldCheck, title: "5 Jahre Garantie", text: "Auf Lack, Naht und Beschläge" },
  { icon: Recycle, title: "100 % Upcycling", text: "Echtes Industriefass, kein Nachbau" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category)!;
  const related = relatedProducts(product);
  const productUrl = `https://fassmoebel-shop.vercel.app/produkt/${product.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${product.name} — ${product.subtitle}`,
      description: product.shortDescription,
      image: [`https://fassmoebel-shop.vercel.app${product.image}`],
      sku: product.slug,
      brand: { "@type": "Brand", name: "Fasswerk" },
      offers: {
        "@type": "Offer",
        url: productUrl,
        priceCurrency: "EUR",
        price: product.price,
        availability:
          product.stock > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Start",
          item: "https://fassmoebel-shop.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category.name,
          item: `https://fassmoebel-shop.vercel.app/kategorie/${category.slug}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.name,
          item: productUrl,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="shell pt-8">
        <nav aria-label="Brotkrumen">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-steel">
            <li>
              <Link href="/" className="focus-ring rounded-sm hover:text-foreground">
                Start
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <li>
              <Link
                href={`/kategorie/${category.slug}`}
                className="focus-ring rounded-sm hover:text-foreground"
              >
                {category.name}
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <li aria-current="page" className="text-muted-foreground">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <section className="shell grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
        {/* Bildbereich */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-3/4 overflow-hidden rounded-sm border border-border bg-card">
            {/* PLACEHOLDER IMAGE — KI-generiert (GPT Image 2), vor Livegang ersetzen */}
            <Image
              src={product.image}
              alt={`${product.name} — ${product.subtitle}`}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-sm bg-background/85 px-2.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-gold backdrop-blur-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Miniatur-Leiste (Demo: dasselbe Bild in Ausschnitten) */}
          <div className="mt-3 grid grid-cols-4 gap-3">
            {["object-top", "object-center", "object-bottom", "object-left"].map(
              (pos, i) => (
                <div
                  key={pos}
                  className={`relative aspect-square overflow-hidden rounded-sm border bg-card ${
                    i === 0 ? "border-gold/50" : "border-border"
                  }`}
                >
                  {/* PLACEHOLDER IMAGE — Demo-Ausschnitt, vor Livegang durch echte Detailfotos ersetzen.
                      Alle Miniaturen zeigen dieselbe Quelle wie das priorisierte
                      Hauptbild — `priority` kostet hier also keine Extra-Anfrage,
                      verhindert aber, dass eine Miniatur als unpriorisiertes
                      LCP-Element gemessen wird. */}
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    priority
                    sizes="120px"
                    className={`scale-150 object-cover ${pos}`}
                  />
                </div>
              ),
            )}
          </div>

          <p className="mt-5 flex items-start gap-2.5 rounded-sm border border-border bg-card px-4 py-3.5 text-xs leading-relaxed text-muted-foreground">
            <Fingerprint
              className="mt-px size-4 shrink-0 text-gold/70"
              aria-hidden="true"
            />
            Fotos zeigen ein gefertigtes Exemplar. Da jedes Fass eine eigene
            Vorgeschichte hat, weichen Patina, Dellen und Schriftreste
            geringfügig ab — das ist gewollt.
          </p>
        </div>

        {/* Kaufbereich */}
        <div>
          <p className="eyebrow">{category.name}</p>
          <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4rem)] text-foreground">
            {product.name}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            {product.subtitle}
          </p>
          <a
            href="#bewertungen"
            className="focus-ring mt-4 inline-flex items-center gap-2 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-3.5 fill-gold text-gold" />
              ))}
            </span>
            <span className="tnum font-medium text-foreground">4,9/5</span>
            <span>· 312 Manufaktur-Bewertungen</span>
          </a>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="mt-8 h-px w-full bg-border" />

          <div className="mt-8">
            <ProductBuyBox product={product} />
          </div>

          {/* Highlights */}
          <ul className="mt-9 space-y-2.5">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <Sparkles
                  className="mt-0.5 size-4 shrink-0 text-gold/70"
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>

          {/* Details */}
          <Accordion
            className="mt-10 border-t border-border"
            multiple={false}
            defaultValue={["beschreibung"]}
          >
            <AccordionItem
              value="beschreibung"
              className="border-b border-border"
            >
              <AccordionTrigger className="py-5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                Beschreibung
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="specs" className="border-b border-border">
              <AccordionTrigger className="py-5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                Abmessungen & Material
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <dl className="divide-y divide-border">
                  {product.specs.map((s) => (
                    <div
                      key={s.label}
                      className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm"
                    >
                      <dt className="text-steel">{s.label}</dt>
                      <dd className="tnum text-muted-foreground">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem id="versand" value="versand" className="scroll-mt-24 border-b border-border">
              <AccordionTrigger className="py-5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                Versand & Rückgabe
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                Der Versand erfolgt per Spedition frei Bordsteinkante, ab
                500&nbsp;€ Bestellwert kostenlos. {product.leadTime}. Innerhalb
                von 14 Tagen können Sie ohne Angabe von Gründen zurückgeben —
                auch bei Sonderlackierungen.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Service-Icons */}
          <ul className="mt-10 grid grid-cols-2 gap-4">
            {services.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="rounded-sm border border-border bg-card p-4"
              >
                <Icon className="size-4 text-gold/80" aria-hidden="true" />
                <p className="mt-2.5 text-xs font-medium text-foreground">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-steel">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="bewertungen"
        className="scroll-mt-24 border-t border-border bg-card py-16 sm:py-20"
        aria-labelledby="reviews-title"
      >
        <div className="shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">Manufaktur-Bewertungen</p>
            <div className="mt-5 flex items-end gap-3">
              <span className="tnum display text-6xl text-foreground">4,9</span>
              <span className="pb-2 text-sm text-muted-foreground">von 5</span>
            </div>
            <div className="mt-3 flex items-center gap-1" aria-label="4,9 von 5 Sternen">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-gold text-gold" aria-hidden="true" />
              ))}
            </div>
            <p className="mt-3 text-xs text-steel">312 Bewertungen im Demo-Datenbestand</p>
          </div>

          <blockquote data-reveal className="border-l border-gold/40 pl-6 sm:pl-8">
            <p id="reviews-title" className="font-display text-[clamp(1.6rem,3vw,2.35rem)] leading-snug text-foreground">
              „Die Verarbeitung wirkt nicht wie Dekoration aus einem Fass, sondern wie ein Möbelstück, das zufällig einmal ein Fass war.“
            </p>
            <footer className="mt-5 text-xs text-muted-foreground">
              Demo-Kundenstimme · verifizierte Bewertungen vor Livegang anbinden
            </footer>
          </blockquote>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-border py-16 sm:py-20" aria-labelledby="faq-title">
        <div className="shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">Vor dem Kauf</p>
            <h2 id="faq-title" className="display mt-4 text-[clamp(2rem,4vw,3rem)] text-foreground">
              Fragen, die bei echten Fässern dazugehören.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Noch spezieller? Wunschmaß, RAL-Farbe oder Branding lassen sich über die Sonderanfertigung direkt als Briefing zusammenstellen.
            </p>
            <Link
              href="/sonderanfertigung"
              className="focus-ring mt-6 inline-flex rounded-sm text-xs font-semibold uppercase tracking-[0.16em] text-gold hover:text-gold-soft"
            >
              Sonderanfertigung öffnen →
            </Link>
          </div>

          <Accordion className="border-t border-border" multiple={false}>
            {[
              {
                q: "Riecht das Möbel noch nach Öl oder Industrie?",
                a: "Nein. Das Fass wird vollständig entkernt, gereinigt und vor dem Ausbau oberflächenbehandelt. Was bleibt, ist die sichtbare Geschichte im Stahl — nicht der frühere Inhalt.",
              },
              {
                q: "Sind Kanten und Öffnungen sicher bearbeitet?",
                a: "Geschnittene Kanten werden entgratet und je nach Konstruktion eingefasst oder verdeckt. Vor der Auslieferung erfolgt eine Endkontrolle von Kanten, Beschlägen und beweglichen Teilen.",
              },
              {
                q: "Wie stark unterscheidet sich mein Exemplar vom Foto?",
                a: "Form und Ausbau entsprechen dem Modell. Kleine Dellen, Patina, Schweißspuren und vorhandene Schriftreste können sich unterscheiden, weil der ursprüngliche Stahl nicht künstlich vereinheitlicht wird.",
              },
              {
                q: "Kann ich Farbe, Maße oder Details ändern?",
                a: "Ja. RAL-Farbe, Innenausbau, Logo, Beleuchtung und je nach Modell auch Maße lassen sich als Sonderanfertigung abstimmen.",
              },
              {
                q: "Wann ist das Stück versandbereit?",
                a: `${product.leadTime}. Bei Sonderanfertigungen wird der Termin nach der technischen Freigabe konkret bestätigt.`,
              },
            ].map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left text-sm font-medium text-foreground">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Ähnliche Produkte */}
      <section
        className="border-t border-border py-16 sm:py-24"
        aria-labelledby="related-title"
      >
        <div className="shell">
          <h2 id="related-title" className="eyebrow">
            Passt dazu
          </h2>
          <p className="display mt-4 text-[clamp(1.75rem,4vw,2.75rem)] text-foreground">
            Aus derselben Werkstatt
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} ratio="portrait" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
