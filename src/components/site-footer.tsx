import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { BarrelMark, InstagramGlyph } from "@/components/brand-mark";
import { categories } from "@/lib/shop";

const service = [
  "Versand & Lieferung",
  "Pflegehinweise",
  "Rückgabe & Garantie",
  "Sonderanfertigung",
  "Gastronomie & B2B",
];

const company = ["Die Manufaktur", "Nachhaltigkeit", "Presse", "Kontakt", "Jobs"];

export function SiteFooter() {
  return (
    <footer className="relative mt-px border-t border-border bg-[#080706]">
      {/* Newsletter */}
      <section className="border-b border-border">
        <div className="shell grid gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
          <div data-reveal>
            <p className="eyebrow">Werkstattbrief</p>
            <h2 className="display mt-4 text-4xl text-foreground sm:text-5xl">
              Neue Fässer,
              <br />
              bevor sie online gehen.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Etwa einmal im Monat: fertige Einzelstücke aus der Werkstatt,
              Restposten und Einblicke in die Fertigung. Kein Werbelärm.
            </p>
          </div>

          <form
            data-reveal
            className="w-full"
            aria-label="Newsletter abonnieren"
          >
            <label
              htmlFor="newsletter-email"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
            >
              E-Mail-Adresse
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="name@beispiel.de"
                className="focus-ring h-12 w-full flex-1 rounded-sm border border-border bg-card px-4 text-sm text-foreground placeholder:text-steel"
              />
              <button
                type="submit"
                className="focus-ring group inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-gold-soft"
              >
                Abonnieren
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
            <p className="mt-3 text-[0.6875rem] leading-relaxed text-steel">
              Demo-Formular ohne Anbindung. Abmeldung jederzeit möglich.
            </p>
          </form>
        </div>
      </section>

      {/* Spalten */}
      <div className="shell grid gap-12 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <BarrelMark className="size-6 text-gold" />
            <span className="text-[1.0625rem] font-semibold uppercase tracking-[0.3em] text-foreground">
              Fasswerk
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Möbel aus ausgedienten 200-Liter-Stahlfässern. Entkernt, gestrahlt,
            lackiert und montiert in unserer Werkstatt — Stück für Stück.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-steel" aria-hidden="true" />
              Industriestraße 14, 44145 Dortmund
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-steel" aria-hidden="true" />
              <a href="tel:+4923112345678" className="focus-ring rounded-sm hover:text-foreground">
                0231 123 456 78
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-steel" aria-hidden="true" />
              <a
                href="mailto:werkstatt@fasswerk.de"
                className="focus-ring rounded-sm hover:text-foreground"
              >
                werkstatt@fasswerk.de
              </a>
            </li>
          </ul>
        </div>

        <FooterColumn title="Kollektion">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/kategorie/${c.slug}`}
                className="focus-ring rounded-sm transition-colors hover:text-gold"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Service">
          {service.map((s) => (
            <li key={s}>
              <span className="cursor-default">{s}</span>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Unternehmen">
          {company.map((s) => (
            <li key={s}>
              <span className="cursor-default">{s}</span>
            </li>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-steel">
            © {new Date().getFullYear()} Fasswerk Manufaktur — Demo-Shop ohne
            Zahlungsanbindung
          </p>
          <div className="flex items-center gap-5 text-xs text-steel">
            <span className="cursor-default">Impressum</span>
            <span className="cursor-default">Datenschutz</span>
            <span className="cursor-default">AGB</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Fasswerk auf Instagram"
              className="focus-ring rounded-sm transition-colors hover:text-foreground"
            >
              <InstagramGlyph className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}
