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

  return (
    <>
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

            <AccordionItem value="versand" className="border-b border-border">
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
