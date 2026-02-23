

## "Das sind Wir" Seite -- Sections aufwerten

### Ueberblick
Die Mission-Section bekommt einen lockereren, moderneren Text. Die "Wofuer wir stehen" und "Warum wir" Sections bekommen ein visuell aufgewertetes Design mit Glassmorphism-Effekten, Hover-Animationen und Neon-Akzenten -- passend zum Premium-Look der Seite.

### 1. Mission-Section -- Text ersetzen

Der aktuelle Text klingt zu foermlich/IT-maessig. Er wird komplett ersetzt durch eine lockere, moderne Version basierend auf dem Hero-Leitsatz:

**Erster Absatz (neu):**
> "Technologie schafft Moeglichkeiten, Vertrauen entscheidet. Wir sorgen dafuer, dass KI dir vor allem eines bringt: Zeit fuer deine Kunden."

**Zweiter Absatz (neu):**
> "Kein Fachchinesisch, keine leeren Versprechen. Wir bauen Loesungen, die sich gut anfuehlen -- fuer euch und fuer eure Kunden. Auf Augenhoehe, mit Klarheit und echtem Interesse an eurem Erfolg."

### 2. "Wofuer wir stehen" -- Premium Cards

Aktuell: Schlichte Karten mit `border border-border/10 rounded-2xl p-8` -- zu flach und langweilig.

**Neu:**
- Glassmorphism-Hintergrund: `bg-white/[0.03] backdrop-blur-sm`
- Subtiler Neon-Border auf Hover: `hover:border-accent/30` mit Transition
- Groesserer Titel mit Accent-Farbe fuer die Nummer
- Dezenter Glow-Effekt auf Hover via `box-shadow`
- Scale-Animation auf Hover (`whileHover={{ scale: 1.02 }}`)
- Ein grosses dekoratives Zitat/Icon pro Karte als visuelles Element (die Nummer wird gross und semi-transparent als Hintergrund-Element dargestellt)

### 3. "Warum wir" -- Premium Layout

Aktuell: Einfache Textzeilen mit Divider -- zu minimalistisch.

**Neu:**
- Jeder Reason bekommt eine eigene Card mit Glassmorphism-Hintergrund
- Horizontales Layout bleibt, aber mit mehr visueller Tiefe
- Grosse Nummer als dekoratives Element (halbtransparent, ueberlappt den Content leicht)
- Neon-Akzent-Linie links an jeder Karte statt oben (`border-l-2 border-accent/40`)
- Hover-Effekt mit leichtem Glow
- Beschreibungstexte etwas laenger und lockerer formuliert:
  - "Persoenlich statt anonym" -- "Bei uns landet ihr nicht in einer Warteschleife. Ihr arbeitet direkt mit den Leuten, die eure Loesung bauen."
  - "Ergebnisorientiert" -- "Wir zaehlen keine Features -- wir messen, wie viel Zeit ihr zurueckbekommt."
  - "Langfristig gedacht" -- "Unsere Loesungen wachsen mit euch. Kein Vendor Lock-in, keine boesen Ueberraschungen."

### Technische Details

**Datei:** `src/pages/AboutUs.tsx` -- einzige Datei

**Mission (Zeilen 165-170):**
- Beide `<p>` Texte ersetzen durch die neuen lockeren Formulierungen

**Values Cards (Zeilen 188-202):**
- Card-Klassen erweitern: `bg-white/[0.03] backdrop-blur-sm border border-border/10 rounded-2xl p-8 hover:border-accent/30 transition-all duration-500 relative overflow-hidden group`
- `motion.div` bekommt `whileHover={{ scale: 1.02, y: -4 }}`
- Grosse dekorative Nummer als Hintergrund-Element: `<span className="absolute -top-4 -right-2 text-[8rem] font-bold text-white/[0.03] select-none pointer-events-none group-hover:text-accent/[0.05] transition-colors duration-500">`
- Kleine Nummer bekommt `text-accent` statt nur `text-accent`

**Reasons (Zeilen 218-235):**
- Von Divider-Layout zu Card-Layout wechseln: `grid grid-cols-1 md:grid-cols-3 gap-6`
- Jede Reason-Card: `bg-white/[0.03] backdrop-blur-sm border border-border/10 rounded-2xl p-8 border-l-2 border-l-accent/40 hover:border-accent/30 transition-all duration-500 relative overflow-hidden group`
- `whileHover={{ scale: 1.02, y: -4 }}`
- Grosse dekorative Nummer im Hintergrund wie bei Values
- Beschreibungstexte aktualisieren (lockerer, laenger)
- `reasons`-Array (Zeilen 33-49) mit neuen Texten aktualisieren

