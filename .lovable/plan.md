
# Partner werden -- Neue Seite

## Konzept
Eine Apple-style Seite, die Agenturen und Dienstleister anspricht, die KI-Leistungen (Telefonassistenten, Chatbots, Automatisierungen) nicht selbst umsetzen koennen -- und MTM Studios als White-Label-Partner im Hintergrund nutzen moechten. Alles zentriert, mobile-first, im bestehenden Design-System.

## Seitenstruktur (Sektionen)

### 1. Hero
- BlurText-Headline: "Euer Angebot. Unsere Technologie."
- Subline: "Wir sind der Partner, den eure Kunden nie sehen -- aber immer spueren."
- Minimalistisch, viel Whitespace, zentriert

### 2. Problem-Sektion
- Headline: "Nicht jede Agentur kann alles."
- 3 Pain-Points als zentrierte Text-Bloecke mit Nummern (01, 02, 03):
  - KI-Kompetenz aufbauen kostet Zeit und Geld
  - Kunden erwarten fertige Loesungen, nicht Experimente
  - Chancen gehen verloren, weil das Know-how fehlt
- Gleicher Stil wie "Warum wir"-Sektion auf AboutUs (nummerierte Divider-Bloecke)

### 3. Loesung / So funktioniert es
- Headline: "Wir uebernehmen. Ihr glaenzt."
- 3 Schritte als glassmorphism-Cards (wie Werte-Cards auf AboutUs):
  - 01: Ihr bringt den Kunden -- wir analysieren den Bedarf
  - 02: Wir bauen die Loesung -- unter eurem Namen
  - 03: Ihr liefert Ergebnisse -- wir bleiben im Hintergrund
- Hover-Effekte mit accent-glow, staggered blur-in Animation

### 4. Vorteile / Was ihr bekommt
- Headline: "Was ihr davon habt."
- 2x2 Grid (mobile: 1 Spalte) glassmorphism-Cards:
  - Neue Umsatzquelle ohne Invest
  - White-Label -- euer Branding, unsere Technik
  - Schnelle Umsetzung -- keine Wartezeiten
  - Persoenlicher Ansprechpartner

### 5. Trust-Zahlen
- Aehnlich wie AboutUs Trust-Sektion mit CountUp-Animationen
- z.B.: "X+ Partner-Projekte", "100% White-Label", "< 48h Reaktionszeit"

### 6. CTA
- Bestehende CTASection mit angepasstem Text oder Standard-CTA
- Plus Footer

## Technische Umsetzung

### Neue Dateien
1. **`src/pages/Partner.tsx`** -- Hauptseite, gleiche Struktur wie AboutUs.tsx:
   - Video-Background, Navigation, Content-Sektionen, CTASection, Footer
   - Alle Sektionen inline (keine separaten Komponenten noetig, da einmalig)
   - motion/react fuer Animationen (useInView, staggered blur-in)
   - BlurText fuer Hero-Headline
   - CountUp-Logik fuer Trust-Zahlen (aus AboutUs uebernommen)

### Aenderungen an bestehenden Dateien
2. **`src/App.tsx`** -- Neue Route `/partner` mit Import der Partner-Seite

### Design-Prinzipien
- Alles `text-center` und zentriert
- Mobile-first: `grid-cols-1 md:grid-cols-2` fuer Cards
- Glassmorphism-Cards: `bg-white/[0.03] backdrop-blur-sm border border-border/10 rounded-2xl`
- Apple-Ease `[0.16, 1, 0.3, 1]` fuer alle Animationen
- Blur-in als Signature-Effekt
- Accent-Glow auf Hover
