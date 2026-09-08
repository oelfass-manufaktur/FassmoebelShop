import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/lib/shop";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Fehler 404</p>
      <h1 className="display mt-5 text-[clamp(2.5rem,7vw,4.5rem)] text-foreground">
        Dieses Fass ist leer
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
        Die Seite gibt es nicht (mehr). Vielleicht finden Sie in der Kollektion,
        was Sie gesucht haben.
      </p>

      <Link
        href="/"
        className="focus-ring group mt-9 inline-flex h-12 items-center gap-2.5 rounded-sm bg-primary px-7 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-gold-soft"
      >
        <ArrowLeft
          className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Zur Startseite
      </Link>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/kategorie/${c.slug}`}
            className="focus-ring rounded-sm border border-border px-4 py-2.5 text-xs text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
