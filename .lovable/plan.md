

## About Us Seite -- Komplett-Redesign (Apple-Level)

### Probleme die behoben werden

1. **Doppelter Text**: Hero-Subtitle und Mission-Section haben exakt den gleichen Satz
2. **Doppelte Nummern**: Kleine "01" UND grosse "01" in den Cards -- redundant
3. **Trust-Zahlen zu simpel**: Nur Zahlen ohne visuellen Rahmen
4. **Gesamtbild**: Sections wirken noch zu gleichfoermig und generisch

---

### Neues Seitenkonzept

**1. Hero -- Neuer Subtitle**

Der aktuelle Subtitle ist identisch mit dem Mission-Text. Neuer, kuerzerer Hero-Subtitle:

> "Euer Partner fuer KI-Loesungen, die wirklich funktionieren."

Kurz, selbstbewusst, kein Duplikat.

**2. Mission-Section -- Cleaner Look**

- Text bleibt (der Leitsatz gehoert hierhin, nicht in den Hero)
- Die horizontalen Linien oben/unten bleiben als elegante Trenner
- Keine Aenderung noetig, da der Hero-Text sich jetzt unterscheidet

**3. Werte-Section -- Nur grosse dekorative Nummer**

Die kleine Accent-Nummer (`<span className="text-sm text-accent">01</span>`) wird entfernt. Nur die grosse dekorative Hintergrund-Nummer bleibt -- aber deutlich sichtbarer als visuelles Statement (von `text-white/[0.03]` auf `text-white/[0.04]`). Titel bekommt eine feine Accent-Linie darueber als visuellen Anker.

Ausserdem: Section bekommt eine Subtitle-Zeile unter der Ueberschrift fuer mehr Kontext.

**4. Warum-Wir-Section -- Komplett neu**

Statt 3 Cards die fast gleich aussehen wie die Values-Cards, wird das Layout komplett anders:
- Grosses fortlaufendes Layout statt Grid
- Jeder Punkt besteht aus: grosse Nummer links (Accent-Farbe, `text-6xl`), Titel + Beschreibung rechts
- Getrennt durch subtile Linien
- Kein Card-Hintergrund, kein Border -- bewusster Kontrast zur Values-Section
- Hover-Effekt: Text slidet leicht nach rechts

**5. Trust-Zahlen -- Premium Upgrade**

- Section bekommt einen eigenen Titel: "In Zahlen."
- Jede Zahl steht in einem glassmorphen Container mit Border
- Zahlen werden deutlich groesser (`text-6xl md:text-7xl`)
- Dezenter Glow-Ring um jede Zahl auf Hover
- Trennlinie zwischen Label und Zahl

---

### Technische Details

**Datei:** `src/pages/AboutUs.tsx` (einzige Datei)

**Hero (Zeilen 144-152):**
- Subtitle-Text aendern zu: "Euer Partner fuer KI-Loesungen, die wirklich funktionieren."

**Values Cards (Zeilen 188-206):**
- Zeile 202 entfernen (kleine `<span>` mit Nummer)
- Grosse Hintergrund-Nummer von `text-white/[0.03]` auf `text-white/[0.04]` aendern
- Accent-Linie als `<div>` vor dem Titel hinzufuegen (`w-8 h-[2px] bg-accent/40 mb-4`)
- Subtitle unter Section-Titel hinzufuegen

**Reasons Section (Zeilen 211-243):**
- Grid-Layout komplett ersetzen durch vertikales Flex-Layout
- Jeder Reason: `flex items-start gap-8` mit grosser Nummer links
- Cards entfernen, stattdessen cleane Zeilen mit Divider
- Grosse dekorative Hintergrund-Nummer und kleine Nummer beide entfernen
- Stattdessen eine prominente Accent-farbene Nummer als eigenstaendiges Element

**Trust Section (Zeilen 246-266):**
- Titel "In Zahlen." hinzufuegen mit Blur-Animation
- Jede Stat bekommt eigene glassmorphe Card: `bg-white/[0.03] backdrop-blur-sm border border-border/10 rounded-2xl p-8`
- Zahlen groesser: `text-6xl md:text-7xl`
- Hover-Glow wie bei den Values-Cards
- Grid bleibt `grid-cols-3` aber mit `gap-6`

