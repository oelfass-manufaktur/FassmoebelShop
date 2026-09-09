"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        data-reveal
        className="rounded-sm border border-gold/25 bg-gold/5 px-5 py-5"
        role="status"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-gold/30">
            <Check className="size-3.5 text-gold" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">Vorgemerkt — zumindest in der Demo.</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Es wurden keine Daten übertragen oder gespeichert. Bei einer echten Newsletter-Anbindung kann dieses Feedback unverändert bleiben.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setEmail("");
              }}
              className="focus-ring mt-3 rounded-sm text-[0.6875rem] uppercase tracking-[0.14em] text-gold"
            >
              Andere Adresse testen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form data-reveal className="w-full" aria-label="Newsletter abonnieren" onSubmit={onSubmit}>
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
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
        Demo-Formular ohne Anbindung. Es werden keine Daten gesendet.
      </p>
    </form>
  );
}
