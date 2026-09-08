/**
 * Demo-Katalog für FASSWERK.
 *
 * ⚠️ PLATZHALTER-DATEN — für die Akquise-Demo.
 *    Preise, Texte und Verfügbarkeiten sind erfunden.
 *
 * ⚠️ ALLE BILDER unter /public/images/ sind KI-generiert (GPT Image 2)
 *    und müssen vor dem Livegang durch echte Produktfotos ersetzt werden.
 *    Siehe /public/images/README.md
 */

export type CategorySlug =
  | "minibars"
  | "stehtische"
  | "sessel-baenke"
  | "deko-geschenke"
  | "ausverkauf";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  /** PLACEHOLDER IMAGE — AI generated, needs replacing */
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: Exclude<CategorySlug, "ausverkauf">;
  price: number;
  /** Gesetzt = Artikel erscheint zusätzlich im Ausverkauf */
  compareAtPrice?: number;
  /** PLACEHOLDER IMAGE — AI generated, needs replacing */
  image: string;
  imageRatio: "portrait" | "landscape" | "square";
  badge?: string;
  bestseller?: boolean;
  leadTime: string;
  stock: number;
  shortDescription: string;
  description: string;
  finishes: { name: string; hex: string }[];
  specs: { label: string; value: string }[];
  highlights: string[];
};

export const categories: Category[] = [
  {
    slug: "minibars",
    name: "Minibars",
    tagline: "Der Mittelpunkt jedes Raums",
    description:
      "Vom 200-Liter-Fass zur Hausbar: innen beleuchtet, außen handlackiert. Jede Minibar ist ein Einzelstück mit eigener Geschichte.",
    image: "/images/p-minibar-kentucky.webp",
  },
  {
    slug: "stehtische",
    name: "Stehtische",
    tagline: "Stehen bleibt, wo es schön ist",
    description:
      "Bartische auf 110 cm mit Glas- oder Eichenplatte, Fußring aus gebürstetem Stahl. Für Loft, Terrasse und Gastronomie.",
    image: "/images/p-stehtisch-chicago.webp",
  },
  {
    slug: "sessel-baenke",
    name: "Sessel & Bänke",
    tagline: "Stahl, der weich wird",
    description:
      "Aufgeschnittene Fässer, gepolstert mit vollnarbigem Leder. Sitzmöbel, die aussehen wie Industrie und sich anfühlen wie Lounge.",
    image: "/images/p-sessel-manhattan.webp",
  },
  {
    slug: "deko-geschenke",
    name: "Deko & Geschenke",
    tagline: "Kleine Stücke, große Wirkung",
    description:
      "Leuchten, Uhren und Servierbretter aus Fassdeckeln. Der einfache Einstieg — und das Geschenk, das niemand doppelt bekommt.",
    image: "/images/p-deko-lampe.webp",
  },
  {
    slug: "ausverkauf",
    name: "Ausverkauf",
    tagline: "Einzelstücke, letzte Chance",
    description:
      "Ausstellungsstücke, Sonderlackierungen und kleine Schönheitsfehler. Gleiche Handarbeit, reduzierter Preis — jeweils nur einmal verfügbar.",
    image: "/images/p-hocker-sale.webp",
  },
];

export const products: Product[] = [
  {
    slug: "minibar-kentucky",
    name: "Kentucky",
    subtitle: "Minibar mit Flügeltüren",
    category: "minibars",
    price: 1290,
    image: "/images/p-minibar-kentucky.webp",
    imageRatio: "portrait",
    badge: "Bestseller",
    bestseller: true,
    leadTime: "Lieferzeit 3–4 Wochen",
    stock: 4,
    shortDescription:
      "Zwei Flügeltüren, warm beleuchteter Nussbaum-Innenraum, Messingbeschläge.",
    description:
      "Die Kentucky ist unsere meistverkaufte Bar. Das originale 200-Liter-Ölfass wird entkernt, sandgestrahlt und in acht Schichten anthrazit lackiert. Der Innenraum ist mit massivem Nussbaum ausgekleidet und über einen versteckten Dimmer warmweiß beleuchtet. Der Deckelring bleibt roher Stahl — von Hand poliert und klarlackiert, damit die Schweißnaht des Originals sichtbar bleibt.",
    finishes: [
      { name: "Anthrazit matt", hex: "#262421" },
      { name: "Tiefschwarz glänzend", hex: "#0f0f0f" },
      { name: "Roher Stahl", hex: "#8d8880" },
    ],
    specs: [
      { label: "Maße", value: "Ø 59 × 89 cm" },
      { label: "Gewicht", value: "42 kg" },
      { label: "Material", value: "Recyceltes Stahlfass, Nussbaum massiv" },
      { label: "Beleuchtung", value: "LED 2700 K, dimmbar" },
      { label: "Fassung", value: "6 Flaschen, 8 Gläser" },
    ],
    highlights: [
      "Handlackiert in 8 Schichten",
      "Dimmbare Innenbeleuchtung inklusive",
      "Jedes Fass ein Unikat mit Chargennummer",
    ],
  },
  {
    slug: "minibar-havanna",
    name: "Havanna",
    subtitle: "Barschrank auf Stahlbeinen",
    category: "minibars",
    price: 1490,
    image: "/images/p-minibar-havanna.webp",
    imageRatio: "portrait",
    badge: "Neu",
    bestseller: true,
    leadTime: "Lieferzeit 4–5 Wochen",
    stock: 2,
    shortDescription:
      "Tiefgrüner Hochglanzlack, Kupferring und Kupfergriffe, schlanke Stahlbeine.",
    description:
      "Die Havanna hebt das Fass buchstäblich auf ein anderes Level: schlanke, pulverbeschichtete Stahlbeine tragen den Korpus auf Sideboard-Höhe. Der tiefgrüne Hochglanzlack wird nass geschliffen und poliert, bis sich der Raum darin spiegelt. Deckelring und Griffe sind massives Kupfer und dürfen mit den Jahren Patina ansetzen.",
    finishes: [
      { name: "Waldgrün Hochglanz", hex: "#1f3b2c" },
      { name: "Bordeaux Hochglanz", hex: "#4a1420" },
      { name: "Nachtblau Hochglanz", hex: "#132038" },
    ],
    specs: [
      { label: "Maße", value: "Ø 59 × 112 cm (inkl. Beine)" },
      { label: "Gewicht", value: "48 kg" },
      { label: "Material", value: "Recyceltes Stahlfass, Kupfer, Stahl" },
      { label: "Beleuchtung", value: "LED 2700 K, dimmbar" },
      { label: "Fassung", value: "8 Flaschen, 12 Gläser" },
    ],
    highlights: [
      "Nass geschliffener Hochglanzlack",
      "Massive Kupferbeschläge",
      "Höhenverstellbare Bodengleiter",
    ],
  },
  {
    slug: "stehtisch-chicago",
    name: "Chicago",
    subtitle: "Stehtisch mit Rauchglasplatte",
    category: "stehtische",
    price: 690,
    image: "/images/p-stehtisch-chicago.webp",
    imageRatio: "portrait",
    bestseller: true,
    leadTime: "Lieferzeit 2–3 Wochen",
    stock: 9,
    shortDescription:
      "Mattschwarzer Korpus, überstehende Rauchglasplatte, Fußring aus Edelstahl.",
    description:
      "Der Chicago ist der Bartisch für Räume, die keinen Platz verschenken. Die 12 mm starke Rauchglasplatte steht rundum über und lässt den Korpus optisch schweben. Der gebürstete Edelstahl-Fußring ist innen verschraubt — keine sichtbaren Nieten, keine Kanten an der Hose.",
    finishes: [
      { name: "Mattschwarz", hex: "#181818" },
      { name: "Betongrau", hex: "#6a6862" },
      { name: "Roher Stahl", hex: "#8d8880" },
    ],
    specs: [
      { label: "Maße", value: "Ø 70 × 110 cm" },
      { label: "Gewicht", value: "36 kg" },
      { label: "Platte", value: "Rauchglas 12 mm, ESG" },
      { label: "Fußring", value: "Edelstahl gebürstet" },
      { label: "Einsatz", value: "Innen & überdacht außen" },
    ],
    highlights: [
      "ESG-Sicherheitsglas",
      "Standfest ohne Bodenverankerung",
      "Auch als 4er-Set für Gastronomie",
    ],
  },
  {
    slug: "stehtisch-detroit",
    name: "Detroit",
    subtitle: "Stehtisch mit Eichenplatte",
    category: "stehtische",
    price: 590,
    compareAtPrice: 740,
    image: "/images/p-stehtisch-detroit.webp",
    imageRatio: "portrait",
    badge: "−20 %",
    leadTime: "Sofort verfügbar",
    stock: 3,
    shortDescription:
      "Originalpatina, klarlackiert. Massive Eichenplatte, geölt. Kein Fass wie das andere.",
    description:
      "Beim Detroit bleibt die Geschichte sichtbar: Rost, verblasste Schrift, Dellen aus dem ersten Leben des Fasses. Wir reinigen, stabilisieren und versiegeln die Oberfläche mit mattem Klarlack — konserviert, nicht kaschiert. Darauf sitzt eine massive, geölte Eichenplatte. Weil jedes Fass anders altert, ist jedes Exemplar ein Original.",
    finishes: [
      { name: "Originalpatina", hex: "#7c5230" },
      { name: "Patina hell", hex: "#a58054" },
    ],
    specs: [
      { label: "Maße", value: "Ø 70 × 110 cm" },
      { label: "Gewicht", value: "38 kg" },
      { label: "Platte", value: "Eiche massiv 40 mm, geölt" },
      { label: "Oberfläche", value: "Klarlack matt, versiegelt" },
      { label: "Einsatz", value: "Innenbereich" },
    ],
    highlights: [
      "Echte Originalpatina, kein Kunstrost",
      "Sofort ab Lager lieferbar",
      "Ausstellungsstück — nur 3 Exemplare",
    ],
  },
  {
    slug: "sessel-manhattan",
    name: "Manhattan",
    subtitle: "Loungesessel mit Drehfuß",
    category: "sessel-baenke",
    price: 980,
    image: "/images/p-sessel-manhattan.webp",
    imageRatio: "portrait",
    badge: "Bestseller",
    bestseller: true,
    leadTime: "Lieferzeit 4–6 Wochen",
    stock: 5,
    shortDescription:
      "Fassschale in Gunmetal, cognacfarbenes Vollnarbenleder, 360°-Drehfuß.",
    description:
      "Für den Manhattan wird das Fass zur hohen, geschwungenen Rückenschale geschnitten. Außen mattes Gunmetal, innen getuftetes Vollnarbenleder auf Kaltschaum. Der Drehfuß läuft auf einem gekapselten Kugellager — leise, spielfrei und auf 120 kg geprüft.",
    finishes: [
      { name: "Gunmetal / Cognac", hex: "#4c4a47" },
      { name: "Schwarz / Schwarz", hex: "#141414" },
      { name: "Creme / Karamell", hex: "#c9bda6" },
    ],
    specs: [
      { label: "Maße", value: "Ø 62 × 118 cm, Sitzhöhe 44 cm" },
      { label: "Gewicht", value: "31 kg" },
      { label: "Polster", value: "Vollnarbenleder auf Kaltschaum" },
      { label: "Fuß", value: "Drehfuß 360°, gekapseltes Lager" },
      { label: "Belastbarkeit", value: "bis 120 kg geprüft" },
    ],
    highlights: [
      "Vollnarbenleder, pflanzlich gegerbt",
      "Geräuschloser 360°-Drehfuß",
      "Lederfarbe frei wählbar",
    ],
  },
  {
    slug: "bank-route-66",
    name: "Route 66",
    subtitle: "Zweisitzer-Bank",
    category: "sessel-baenke",
    price: 1180,
    image: "/images/p-bank-route66.webp",
    imageRatio: "landscape",
    leadTime: "Lieferzeit 5–6 Wochen",
    stock: 2,
    shortDescription:
      "Zwei längs geschnittene Fässer, Petrol lackiert, durchgehendes Lederpolster.",
    description:
      "Zwei Fässer werden längs geteilt, verschweißt und zur Bank vereint. Die Schweißnaht bleibt sichtbar und wird nur gebürstet — sie ist das Detail, das jeden fragen lässt, woraus das Möbel gemacht ist. Das durchgehende Sitzpolster und die beiden Rückenkissen sind abnehmbar und neu beziehbar.",
    finishes: [
      { name: "Petrol matt", hex: "#1d4450" },
      { name: "Olivgrün matt", hex: "#3d4429" },
      { name: "Mattschwarz", hex: "#181818" },
    ],
    specs: [
      { label: "Maße", value: "168 × 62 × 82 cm" },
      { label: "Gewicht", value: "58 kg" },
      { label: "Polster", value: "Leder tan, abnehmbar" },
      { label: "Naht", value: "Sichtbar gebürstet" },
      { label: "Einsatz", value: "Innen & überdacht außen" },
    ],
    highlights: [
      "Sitzpolster abnehmbar & neu beziehbar",
      "Sichtbare Handschweißnaht",
      "Auch als Dreisitzer auf Anfrage",
    ],
  },
  {
    slug: "hocker-rust",
    name: "Rust",
    subtitle: "Barhocker",
    category: "sessel-baenke",
    price: 249,
    compareAtPrice: 349,
    image: "/images/p-hocker-sale.webp",
    imageRatio: "portrait",
    badge: "−29 %",
    leadTime: "Sofort verfügbar",
    stock: 6,
    shortDescription:
      "Gekürztes Fass in Brandorange, gepolstertes Ledersitzkissen, Fußring.",
    description:
      "Der kleine Bruder unserer Bartische: ein auf Hockerhöhe gekürztes Fass mit den originalen Rollrippen, lackiert in kräftigem Brandorange. Das runde Sitzkissen aus schwarzem Leder ist mit vier verdeckten Schrauben gesetzt und in zwei Minuten getauscht. Restposten aus einer Sonderlackierung — solange der Vorrat reicht.",
    finishes: [
      { name: "Brandorange", hex: "#b45715" },
      { name: "Mattschwarz", hex: "#181818" },
    ],
    specs: [
      { label: "Maße", value: "Ø 40 × 76 cm" },
      { label: "Gewicht", value: "14 kg" },
      { label: "Sitz", value: "Leder schwarz, gepolstert" },
      { label: "Fußring", value: "Stahl gebürstet" },
      { label: "Stapelbar", value: "Nein" },
    ],
    highlights: [
      "Restposten Sonderlackierung",
      "Sofort ab Lager lieferbar",
      "Sitzkissen werkzeugarm tauschbar",
    ],
  },
  {
    slug: "minibar-tennessee",
    name: "Tennessee",
    subtitle: "Minibar mit Eichenmantel",
    category: "minibars",
    price: 1690,
    image: "/images/p-minibar-tennessee.webp",
    imageRatio: "portrait",
    leadTime: "Lieferzeit 5–6 Wochen",
    stock: 2,
    shortDescription:
      "Geflammte Eichendauben in Stahlbändern, aufklappbarer Deckel, beleuchtetes Innenfach.",
    description:
      "Die Tennessee kombiniert zwei Handwerke: unten Fassdauben aus geflammter Eiche, gehalten von zwei breiten, brünierten Stahlbändern, oben der blank gebürstete Originalstahl. Der Deckel klappt über ein gedämpftes Scharnier auf und gibt den beleuchteten Flaschenhalter frei. Unser aufwendigstes Modell — und das mit der längsten Wartezeit.",
    finishes: [
      { name: "Geflammte Eiche / Stahl", hex: "#4a3225" },
      { name: "Räuchereiche / Schwarz", hex: "#2b1f18" },
    ],
    specs: [
      { label: "Maße", value: "Ø 59 × 94 cm" },
      { label: "Gewicht", value: "54 kg" },
      { label: "Material", value: "Recyceltes Stahlfass, Eiche geflammt" },
      { label: "Beleuchtung", value: "LED 2700 K, dimmbar" },
      { label: "Fassung", value: "5 Flaschen, 6 Gläser" },
    ],
    highlights: [
      "Geflammte Eichendauben, von Hand gesetzt",
      "Gedämpftes Deckelscharnier",
      "Zwei Wochen Trocknungszeit pro Stück",
    ],
  },
  {
    slug: "minibar-brooklyn",
    name: "Brooklyn",
    subtitle: "Rollbare Barwagen-Minibar",
    category: "minibars",
    price: 890,
    compareAtPrice: 1090,
    image: "/images/p-minibar-brooklyn.webp",
    imageRatio: "portrait",
    badge: "−18 %",
    leadTime: "Sofort verfügbar",
    stock: 3,
    shortDescription:
      "Cremeweiß lackiert, Schiebedeckel aus Stahl, Industrierollen und Schubbügel.",
    description:
      "Die Brooklyn geht dahin, wo gefeiert wird: vier gebremste Industrierollen, ein schwarzer Schubbügel und ein Schiebedeckel aus gebürstetem Stahl, der die Arbeitsfläche freigibt. Innen zwei Ebenen für Flaschen und Zubehör. Aus einer Sonderserie in Cremeweiß — deshalb reduziert.",
    finishes: [
      { name: "Cremeweiß matt", hex: "#ded6c6" },
      { name: "Mattschwarz", hex: "#181818" },
    ],
    specs: [
      { label: "Maße", value: "Ø 59 × 88 cm (inkl. Rollen)" },
      { label: "Gewicht", value: "39 kg" },
      { label: "Material", value: "Recyceltes Stahlfass, Stahl" },
      { label: "Rollen", value: "4 Industrierollen, 2 gebremst" },
      { label: "Fassung", value: "6 Flaschen, 8 Gläser" },
    ],
    highlights: [
      "Schiebedeckel als Arbeitsfläche",
      "Gebremste Rollen für sicheren Stand",
      "Restposten Sonderserie",
    ],
  },
  {
    slug: "stehtisch-berlin",
    name: "Berlin",
    subtitle: "Stehtisch mit LED-Lichtring",
    category: "stehtische",
    price: 790,
    image: "/images/p-stehtisch-berlin.webp",
    imageRatio: "portrait",
    bestseller: true,
    leadTime: "Lieferzeit 2–3 Wochen",
    stock: 7,
    shortDescription:
      "Betongrau lackiert, umlaufender LED-Ring unter der Platte, Fußring aus Stahl.",
    description:
      "Unter der überstehenden schwarzen Tischplatte läuft ein warmweißer LED-Ring, der das Fass nach unten hin auslaufen lässt — abends steht der Tisch in seinem eigenen Lichtkegel. Die Steuerung sitzt versteckt im Korpus, das Kabel wird innen geführt und tritt bodennah aus.",
    finishes: [
      { name: "Betongrau matt", hex: "#6a6862" },
      { name: "Mattschwarz", hex: "#181818" },
      { name: "Reinweiß matt", hex: "#e4e1da" },
    ],
    specs: [
      { label: "Maße", value: "Ø 70 × 110 cm" },
      { label: "Gewicht", value: "37 kg" },
      { label: "Platte", value: "HPL schwarz, 25 mm" },
      { label: "Beleuchtung", value: "LED-Ring 2700 K, dimmbar" },
      { label: "Anschluss", value: "230 V, Kabel 3 m" },
    ],
    highlights: [
      "Umlaufender LED-Ring, dimmbar",
      "Kabelführung im Korpus",
      "Beliebt für Messe und Empfang",
    ],
  },
  {
    slug: "stehtisch-portland",
    name: "Portland",
    subtitle: "Stehtisch mit Kupferplatte",
    category: "stehtische",
    price: 850,
    image: "/images/p-stehtisch-portland.webp",
    imageRatio: "portrait",
    badge: "Neu",
    leadTime: "Lieferzeit 3–4 Wochen",
    stock: 5,
    shortDescription:
      "Tiefes Marineblau, Tischplatte aus gehämmertem Kupfer mit lebendiger Patina.",
    description:
      "Die Platte des Portland wird von Hand gehämmert — jede Delle ein Schlag, keine zwei Platten gleich. Das Kupfer bleibt unversiegelt und dunkelt mit den Jahren nach; wer den hellen Ton behalten will, bekommt auf Wunsch eine Klarlackversiegelung dazu.",
    finishes: [
      { name: "Marineblau matt", hex: "#1b2a44" },
      { name: "Waldgrün matt", hex: "#22392c" },
    ],
    specs: [
      { label: "Maße", value: "Ø 70 × 110 cm" },
      { label: "Gewicht", value: "41 kg" },
      { label: "Platte", value: "Kupfer gehämmert, 3 mm" },
      { label: "Fußring", value: "Stahl schwarz" },
      { label: "Einsatz", value: "Innenbereich" },
    ],
    highlights: [
      "Von Hand gehämmerte Kupferplatte",
      "Patina entwickelt sich mit der Zeit",
      "Versiegelung auf Wunsch",
    ],
  },
  {
    slug: "sessel-bronx",
    name: "Bronx",
    subtitle: "Tub-Sessel, niedrig",
    category: "sessel-baenke",
    price: 640,
    image: "/images/p-sessel-bronx.webp",
    imageRatio: "portrait",
    leadTime: "Lieferzeit 3–4 Wochen",
    stock: 8,
    shortDescription:
      "Breite Fassschale in Mattschwarz, gestepptes schwarzes Leder, kurze Stahlbeine.",
    description:
      "Der Bronx ist der niedrige Bruder des Manhattan: breitere Schale, tiefere Sitzposition, vier kurze, leicht ausgestellte Stahlbeine statt Drehfuß. Gedacht für Leseecke, Kaminplatz und alle Räume, in denen ein Sessel nicht dominieren soll.",
    finishes: [
      { name: "Schwarz / Schwarz", hex: "#141414" },
      { name: "Gunmetal / Cognac", hex: "#4c4a47" },
    ],
    specs: [
      { label: "Maße", value: "Ø 72 × 74 cm, Sitzhöhe 40 cm" },
      { label: "Gewicht", value: "27 kg" },
      { label: "Polster", value: "Vollnarbenleder, gesteppt" },
      { label: "Beine", value: "Stahl schwarz, ausgestellt" },
      { label: "Belastbarkeit", value: "bis 120 kg geprüft" },
    ],
    highlights: [
      "Tiefe, entspannte Sitzposition",
      "Gestepptes Vollnarbenleder",
      "Auch im 2er-Set erhältlich",
    ],
  },
  {
    slug: "weinregal-fasskeller",
    name: "Fasskeller",
    subtitle: "Wandweinregal",
    category: "deko-geschenke",
    price: 189,
    image: "/images/p-deko-weinregal.webp",
    imageRatio: "square",
    leadTime: "Lieferzeit 1–2 Wochen",
    stock: 9,
    shortDescription:
      "Drei Fassringe aus gebürstetem Stahl, sechs Flaschen liegend, Wandmontage.",
    description:
      "Aus drei Fassringen entsteht ein Weinregal, das an der Wand aussieht wie ein Ausschnitt aus dem Original. Sechs geschweißte Stahlwiegen halten die Flaschen liegend. Montagematerial für Massiv- und Ständerwand liegt bei.",
    finishes: [
      { name: "Gebürsteter Stahl", hex: "#9a958c" },
      { name: "Schwarz brüniert", hex: "#2a2724" },
    ],
    specs: [
      { label: "Maße", value: "62 × 58 × 14 cm" },
      { label: "Gewicht", value: "6,8 kg" },
      { label: "Kapazität", value: "6 Flaschen" },
      { label: "Oberfläche", value: "Klarlack matt" },
      { label: "Montage", value: "Material beiliegend" },
    ],
    highlights: [
      "Sechs Flaschen liegend gelagert",
      "Montagematerial inklusive",
      "Erweiterbar durch Nebeneinandersetzen",
    ],
  },
  {
    slug: "leuchte-halo",
    name: "Halo",
    subtitle: "Pendelleuchte",
    category: "deko-geschenke",
    price: 249,
    image: "/images/p-deko-lampe.webp",
    imageRatio: "square",
    leadTime: "Lieferzeit 1–2 Wochen",
    stock: 14,
    shortDescription:
      "Fasskuppe als Schirm, innen goldbeschichtet, Textilkabel schwarz.",
    description:
      "Aus der abgetrennten Fasskuppe entsteht ein Schirm mit perfekter Wölbung. Außen mattschwarz, innen warm goldbeschichtet — das Licht bekommt dadurch einen weichen, messingfarbenen Ton statt kalter Reflexion. Geliefert mit 2 m schwarzem Textilkabel und Baldachin.",
    finishes: [
      { name: "Schwarz / Gold", hex: "#141414" },
      { name: "Weiß / Gold", hex: "#e8e4dd" },
      { name: "Rost / Gold", hex: "#8a4a1e" },
    ],
    specs: [
      { label: "Maße", value: "Ø 44 × 26 cm" },
      { label: "Gewicht", value: "3,2 kg" },
      { label: "Fassung", value: "E27, max. 60 W" },
      { label: "Kabel", value: "Textil schwarz, 2 m" },
      { label: "Leuchtmittel", value: "Nicht enthalten" },
    ],
    highlights: [
      "Innen goldbeschichtet für warmes Licht",
      "Baldachin und Kabel inklusive",
      "Auch als 3er-Reihe erhältlich",
    ],
  },
  {
    slug: "servierbrett-deckel",
    name: "Deckel",
    subtitle: "Servierbrett",
    category: "deko-geschenke",
    price: 89,
    compareAtPrice: 119,
    image: "/images/p-deko-tablett.webp",
    imageRatio: "square",
    badge: "−25 %",
    leadTime: "Sofort verfügbar",
    stock: 21,
    shortDescription:
      "Originaler Fassdeckel, gebürstet und versiegelt, zwei Stahlgriffe.",
    description:
      "Der Deckel bleibt Deckel — nur eben in der Küche. Gebürstet, entgratet, lebensmittelecht versiegelt und mit zwei angeschweißten Stahlgriffen versehen. Das perfekte Einstiegsstück und unser meistverschenkter Artikel.",
    finishes: [
      { name: "Gebürsteter Stahl", hex: "#9a958c" },
      { name: "Schwarz brüniert", hex: "#2a2724" },
    ],
    specs: [
      { label: "Maße", value: "Ø 58 × 4 cm" },
      { label: "Gewicht", value: "2,4 kg" },
      { label: "Oberfläche", value: "Lebensmittelecht versiegelt" },
      { label: "Griffe", value: "Stahl schwarz, angeschweißt" },
      { label: "Pflege", value: "Feucht abwischen" },
    ],
    highlights: [
      "Lebensmittelechte Versiegelung",
      "Geschenkverpackung auf Wunsch",
      "Gravur gegen Aufpreis möglich",
    ],
  },
  {
    slug: "wanduhr-zeitfass",
    name: "Zeitfass",
    subtitle: "Wanduhr",
    category: "deko-geschenke",
    price: 149,
    image: "/images/p-deko-uhr.webp",
    imageRatio: "square",
    leadTime: "Lieferzeit 1–2 Wochen",
    stock: 11,
    shortDescription:
      "Fassdeckel mit tief gravierten Ziffern, mattschwarze Zeiger, Funkwerk.",
    description:
      "Ein Fassdeckel, gebürstet auf Hochglanz-Silber, mit tief gravierten Industrieziffern. Die schlanken mattschwarzen Zeiger laufen auf einem lautlosen Funkuhrwerk — kein Ticken, keine Zeitumstellung. Der genietete Rand bleibt original.",
    finishes: [
      { name: "Silber gebürstet", hex: "#9a958c" },
      { name: "Anthrazit", hex: "#262421" },
    ],
    specs: [
      { label: "Maße", value: "Ø 58 × 5 cm" },
      { label: "Gewicht", value: "2,9 kg" },
      { label: "Uhrwerk", value: "Funk, lautlos" },
      { label: "Batterie", value: "1 × AA, enthalten" },
      { label: "Montage", value: "Aufhängung rückseitig" },
    ],
    highlights: [
      "Lautloses Funkuhrwerk",
      "Ziffern tief graviert, nicht gedruckt",
      "Aufhängung vormontiert",
    ],
  },
];

/* ------------------------------------------------------------------ */

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const isOnSale = (p: Product) => typeof p.compareAtPrice === "number";

export const getProductsByCategory = (slug: CategorySlug): Product[] =>
  slug === "ausverkauf"
    ? products.filter(isOnSale)
    : products.filter((p) => p.category === slug);

export const countByCategory = (slug: CategorySlug) =>
  getProductsByCategory(slug).length;

/** Genau vier — damit das 4er-Raster auf der Startseite aufgeht. */
export const bestsellers = products
  .filter((p) => p.bestseller)
  .slice(0, 4);

export const saleProducts = products.filter(isOnSale);

export const relatedProducts = (p: Product) =>
  products
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 4);

export const discountPercent = (p: Product) =>
  p.compareAtPrice
    ? Math.round((1 - p.price / p.compareAtPrice) * 100)
    : 0;
