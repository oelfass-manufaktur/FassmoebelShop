"use client";

import { useMemo, useState } from "react";
import { Check, Mail, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const usageOptions = ["Privat", "Gastronomie", "Empfang / Büro", "Messe / Event"];
const productOptions = ["Minibar", "Stehtisch", "Sitzmöbel", "Deko / Geschenk"];
const finishOptions = ["RAL-Wunschfarbe", "Originalpatina", "Hochglanz", "Roher Stahl"];
const extraOptions = ["Logo / Gravur", "Sondermaß", "LED-Beleuchtung", "Rollen / Mobilität"];

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={cn(
                "focus-ring inline-flex min-h-10 items-center gap-2 rounded-sm border px-3.5 py-2 text-xs transition-colors",
                active
                  ? "border-gold/70 bg-gold/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-steel hover:text-foreground",
              )}
            >
              {active && <Check className="size-3.5 text-gold" aria-hidden="true" />}
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function CustomConfigurator() {
  const [usage, setUsage] = useState(usageOptions[0]);
  const [product, setProduct] = useState(productOptions[0]);
  const [finish, setFinish] = useState(finishOptions[0]);
  const [extras, setExtras] = useState<string[]>(["Sondermaß"]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const toggleExtra = (extra: string) => {
    setExtras((current) =>
      current.includes(extra)
        ? current.filter((item) => item !== extra)
        : [...current, extra],
    );
  };

  const mailHref = useMemo(() => {
    const subject = `Sonderanfertigung: ${product} (${quantity}×)`;
    const body = [
      "Hallo Fasswerk-Team,",
      "",
      "ich interessiere mich für eine Sonderanfertigung mit folgendem Briefing:",
      `• Einsatz: ${usage}`,
      `• Möbeltyp: ${product}`,
      `• Oberfläche: ${finish}`,
      `• Extras: ${extras.length ? extras.join(", ") : "keine ausgewählt"}`,
      `• Stückzahl: ${quantity}`,
      notes.trim() ? `• Notizen: ${notes.trim()}` : "",
      "",
      "Bitte melden Sie sich mit einer Einschätzung zu Machbarkeit, Lieferzeit und Preisrahmen.",
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:werkstatt@fasswerk.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [usage, product, finish, extras, quantity, notes]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
      <div className="steel-surface rounded-sm border border-border p-6 sm:p-8">
        <div className="space-y-8">
          <ChoiceGroup label="01 · Einsatz" options={usageOptions} value={usage} onChange={setUsage} />
          <ChoiceGroup label="02 · Möbeltyp" options={productOptions} value={product} onChange={setProduct} />
          <ChoiceGroup label="03 · Oberfläche" options={finishOptions} value={finish} onChange={setFinish} />

          <fieldset>
            <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              04 · Extras
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {extraOptions.map((extra) => {
                const active = extras.includes(extra);
                return (
                  <button
                    key={extra}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleExtra(extra)}
                    className={cn(
                      "focus-ring inline-flex min-h-10 items-center gap-2 rounded-sm border px-3.5 py-2 text-xs transition-colors",
                      active
                        ? "border-gold/70 bg-gold/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-steel hover:text-foreground",
                    )}
                  >
                    {active && <Check className="size-3.5 text-gold" aria-hidden="true" />}
                    {extra}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-[10rem_1fr]">
            <div>
              <label className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                05 · Stückzahl
              </label>
              <div className="mt-3 flex h-11 items-center rounded-sm border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  disabled={quantity <= 1}
                  aria-label="Stückzahl verringern"
                  className="focus-ring flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-35"
                >
                  <Minus className="size-3.5" aria-hidden="true" />
                </button>
                <span className="tnum flex-1 text-center text-sm text-foreground" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                  disabled={quantity >= 99}
                  aria-label="Stückzahl erhöhen"
                  className="focus-ring flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-35"
                >
                  <Plus className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="custom-notes"
                className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
              >
                06 · Notiz / Wunschmaß
              </label>
              <textarea
                id="custom-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                placeholder="z. B. RAL 6005, 105 cm Gesamthöhe, Logo auf der Front …"
                className="focus-ring mt-3 w-full resize-none rounded-sm border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-steel"
              />
            </div>
          </div>
        </div>
      </div>

      <aside className="rounded-sm border border-border bg-card p-6 sm:p-8 lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">Ihr Briefing</p>
        <h3 className="display mt-3 text-3xl text-foreground">Ein Fass, nur für Sie.</h3>
        <dl className="mt-7 divide-y divide-border border-y border-border text-sm">
          {[
            ["Einsatz", usage],
            ["Möbeltyp", product],
            ["Oberfläche", finish],
            ["Extras", extras.length ? extras.join(", ") : "—"],
            ["Stückzahl", String(quantity)],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
              <dt className="text-steel">{label}</dt>
              <dd className="text-right text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Das Briefing öffnet sich fertig formuliert in Ihrem E-Mail-Programm. Eine endgültige Machbarkeits- und Preisprüfung erfolgt erst in der Werkstatt.
        </p>

        <a
          href={mailHref}
          className="focus-ring mt-6 flex h-13 w-full items-center justify-center gap-2.5 rounded-sm bg-primary px-5 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-gold-soft"
        >
          <Mail className="size-4" aria-hidden="true" />
          Briefing senden
        </a>

        <p className="mt-3 text-center text-[0.6875rem] text-steel">
          Demo-Anfrage · keine Daten werden auf der Website gespeichert
        </p>
      </aside>
    </div>
  );
}
