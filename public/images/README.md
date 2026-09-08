# Bilder — PLATZHALTER

**Alle Dateien in diesem Ordner sind KI-generiert (OpenAI GPT Image 2 über kie.ai)
und dienen ausschließlich der Akquise-Demo. Vor einem Livegang müssen sie
vollständig durch echte Produktfotos ersetzt werden.**

Im Code sind alle Fundstellen mit dem Kommentar
`PLACEHOLDER IMAGE — KI-generiert` markiert (`grep -rn "PLACEHOLDER IMAGE" src/`).

| Datei | Verwendung | Format |
|---|---|---|
| `hero-barrel-lounge.webp` | Startseite, Hero | 16:9 |
| `workshop-atelier.webp` | Startseite, Abschnitt „Die Manufaktur“ | 3:2 |
| `p-minibar-kentucky.webp` | Produkt Kentucky + Kategoriekachel Minibars | 3:4 |
| `p-minibar-havanna.webp` | Produkt Havanna | 3:4 |
| `p-stehtisch-chicago.webp` | Produkt Chicago + Kategoriekachel Stehtische | 3:4 |
| `p-stehtisch-detroit.webp` | Produkt Detroit | 3:4 |
| `p-sessel-manhattan.webp` | Produkt Manhattan + Kategoriekachel Sessel & Bänke | 3:4 |
| `p-bank-route66.webp` | Produkt Route 66 + Hintergrund „Sonderanfertigung“ | 3:2 |
| `p-hocker-sale.webp` | Produkt Rust + Kategoriekachel Ausverkauf | 3:4 |
| `p-deko-lampe.webp` | Produkt Halo + Kategoriekachel Deko & Geschenke | 1:1 |
| `p-deko-tablett.webp` | Produkt Deckel | 1:1 |
| `p-deko-uhr.webp` | Produkt Zeitfass | 1:1 |

| `p-minibar-tennessee.webp` | Produkt Tennessee | 3:4 |
| `p-minibar-brooklyn.webp` | Produkt Brooklyn | 3:4 |
| `p-stehtisch-berlin.webp` | Produkt Berlin | 3:4 |
| `p-stehtisch-portland.webp` | Produkt Portland | 3:4 |
| `p-sessel-bronx.webp` | Produkt Bronx | 3:4 |
| `p-deko-weinregal.webp` | Produkt Fasskeller | 3:4 |

## Ersetzen

1. Echtes Foto mit gleichem Seitenverhältnis unter gleichem Dateinamen ablegen
   (oder Pfad in `src/lib/shop.ts` anpassen).
2. Optional optimieren: `node scripts/convert-images.mjs <ordner-mit-pngs>`
   (skaliert auf max. 1800 px Breite und schreibt webp nach `public/images/`).

Hinweis: Die Detailfotos auf der Produktseite sind derzeit vier Ausschnitte
desselben Bildes — dort gehören später echte Detailaufnahmen hin.
