# FASSWERK — Demo-Shop für Ölfass-Möbel

Visuelle Demo für einen Akquise-Termin. Next.js 16 (App Router) · Tailwind CSS v4 ·
shadcn/ui (Base UI) · GSAP.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Produktionsbuild (alle Seiten statisch vorgerendert)
```

## Was funktioniert

| Bereich | Status |
|---|---|
| Startseite mit Hero, Kategorien, Bestsellern, Manufaktur, Ausverkauf, Bewertungen | fertig |
| 5 Kategorieseiten (`/kategorie/[slug]`) | fertig |
| 16 Produktseiten (`/produkt/[slug]`) mit Ausführungswahl, Menge, Details | fertig |
| Warenkorb: hinzufügen, Menge ändern, entfernen, leeren | fertig |
| Warenkorb bleibt über Reload erhalten (localStorage) | fertig |
| Versandkostenfrei-Fortschritt ab 500 € | fertig |
| Mobile Sticky-Kaufleiste auf der Produktseite | fertig |
| 404-Seite, Brotkrumen, Skip-Link, Tastaturbedienung | fertig |
| **Kaufabschluss / Zahlung** | **bewusst nicht angebunden** |

„Zur Kasse" im Warenkorb ist absichtlich deaktiviert und mit einem Hinweis
versehen — wie abgestimmt. Newsletter- und Suchfeld sind ebenfalls Attrappen.

## Bewusst noch offen

- Kein Backend, keine Zahlungsanbindung, keine Bestellabwicklung
- Suche, Login und Wunschliste sind nur angedeutet
- Rechtstexte (Impressum, AGB, Datenschutz) sind Platzhalter ohne Verlinkung
- Produktdetailfotos sind vier Ausschnitte desselben Bildes

## ⚠️ Bilder sind Platzhalter

Alle Bilder in `public/images/` sind **KI-generiert** (OpenAI GPT Image 2) und
müssen vor einem Livegang durch echte Produktfotos ersetzt werden.
Details und Zuordnung: [`public/images/README.md`](public/images/README.md).

Alle Fundstellen im Code sind markiert:

```bash
grep -rn "PLACEHOLDER IMAGE" src/
```

Auch die Produktdaten in [`src/lib/shop.ts`](src/lib/shop.ts) — Namen, Preise,
Maße, Lieferzeiten, Bewertungen — sind erfunden.

## Wenn der Dev-Server spinnt

Meldet die Seite `Jest worker encountered ... child process exceptions` oder
zeigt das Log `write EPIPE`, läuft meist noch ein alter `next dev` im
Hintergrund, dessen Konsole weg ist. Next nennt die PID beim Start
(„Another next dev server is already running"). Aufräumen:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen |
  ForEach-Object { taskkill /PID $_.OwningProcess /F }
Remove-Item -Recurse -Force .next
npm run dev
```

## Aufbau

```
src/
  app/
    layout.tsx              Fonts, Warenkorb-Provider, Kopf-/Fußzeile, Motion
    page.tsx                Startseite
    kategorie/[slug]/       Kategorieseiten
    produkt/[slug]/         Produktseiten
    globals.css             Design-Tokens (Farben, Typo, Effekte)
  components/
    cart/                   Warenkorb-Logik (Context) + Sheet
    home/                   Abschnitte der Startseite
    motion/motion-root.tsx  zentrale GSAP-Steuerung
    ui/                     shadcn-Primitives
  lib/shop.ts               Demo-Katalog (Kategorien + Produkte)
scripts/convert-images.mjs  PNG → webp für neue Bilder
```

## Design-System

„Industrial Luxury": dunkle Werkstatt-Basis (`#0b0a09`), Gold als einziger
Akzent (`#c79a3e`), Rost für den Ausverkauf (`#c2571f`). Cormorant Garamond für
Überschriften, Inter für die Oberfläche. Alle Farben liegen als CSS-Variablen in
`globals.css` — ein Rebranding braucht nur diesen einen Block.

## Animation

Zentral gesteuert in `src/components/motion/motion-root.tsx`. Server-Komponenten
setzen nur Attribute:

- `data-reveal` — Einblenden beim Scrollen, benachbarte Elemente laufen gestaffelt
- `data-parallax="0.08"` — dezenter Parallax-Versatz (nur dekorative Ebenen)

Die Hero-Timeline und das Laufband bringen eigene GSAP-Kontexte mit.
`prefers-reduced-motion` wird überall respektiert; ohne JavaScript ist der
gesamte Inhalt trotzdem sichtbar.
