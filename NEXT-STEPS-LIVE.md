# Nächste Schritte vor einem echten Live-Shop

Priorisiert nach Wirkung und Risiko.

## P0 — vor Verkauf zwingend

1. **Echte Firmendaten und Rechtstexte**
   - Impressum, Datenschutz, AGB, Widerruf, Versandbedingungen.
   - Alle Demo-Aussagen zu Garantie, Rückgabe und Sonderanfertigung juristisch/operativ bestätigen.
2. **Echte Produkt- und Werkstattfotos**
   - Pro Produkt: Front, Innenraum, Detail, Maßstab im Raum, Materialnahaufnahme.
   - KI-Platzhalter vollständig ersetzen.
3. **Checkout / Zahlungsanbieter / Bestellungen**
   - Warenkorb an Backend oder Commerce-System anbinden.
   - Zahlungsarten, Steuerlogik, Bestellbestätigung, Rechnungen, Statusmails.
4. **Bestandsquelle**
   - Demo-Stock in `shop.ts` durch eine echte Quelle ersetzen.
   - Reservierung bzw. Überverkaufsschutz beim Checkout.

## P1 — höchste Conversion-Wirkung

1. **Echte Bewertungen**
   - Produktbezogene Bewertungen statt globalem Demo-Score.
   - Bewertungsquelle und Verifizierung sichtbar machen.
2. **Liefertermin statt nur Lieferfenster**
   - „Voraussichtlich bei Ihnen zwischen …“ anhand Fertigungs- und Speditionszeit.
3. **Sonderanfertigung an CRM / Formular-Backend**
   - Konfigurator nicht mehr per `mailto:`, sondern als Lead mit Upload für Skizzen/Logos.
4. **B2B-Angebotsworkflow**
   - Stückzahl, Projekttermin, Lieferort, Branding-Datei, Ansprechpartner.
5. **Echte Produktgalerie**
   - Thumbnails derzeit bewusst nur Ausschnitte eines Platzhalterbilds.

## P2 — sinnvoll bei wachsendem Sortiment

1. Filter und Sortierung auf Kategorie-Seiten.
2. Merkliste mit eigener Seite und Geräte-Synchronisierung.
3. Zuletzt angesehen.
4. Vergleich von 2–3 Modellen.
5. Suchsynonyme und Fehlertoleranz über einen echten Suchdienst.

## P3 — Marketing / Wachstum

1. Google Merchant Center + strukturierter Produktfeed.
2. Meta-/Pinterest-Katalog für visuelle Retargeting-Kampagnen.
3. E-Mail-Automation: Browse-Abandonment, Cart-Abandonment, Back-in-stock.
4. Content-Landingpages für Gastronomie, Hotellerie, Empfang, Messe und Geschenke.
5. Referenzprojekte als Case Studies mit Raumfotos und konkreter Aufgabenstellung.

## Design-Regel

Neue Funktionen nur ergänzen, wenn sie eine Kaufentscheidung erleichtern. Kein zusätzliches Farbsystem, keine Badge-Flut, keine Gamification. Gold bleibt Akzent — nicht Dekoration.
