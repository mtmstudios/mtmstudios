
# Beide Funnels aufwerten -- Attraktiver, weniger Tuerkis

## Problem

Aktuell sind beide Funnels funktional, aber visuell etwas flach. Der Accent (Tuerkis) wird zu dominant eingesetzt -- bei selected States, Buttons, Progress-Bar, Check-Badges, Icons. Das wirkt ueberladen. 

## Design-Verbesserungen fuer beide Funnels

### 1. Progress-Bar: Subtiler Gradient statt volles Tuerkis

Statt `bg-accent` bekommt die Progress-Bar einen sanften Gradient von `white/20` zu `white/60`. Dezenter, eleganter, kein Tuerkis-Overkill.

### 2. Selectable Cards: Weissere Hover-Aesthetik

- **Unselected**: Bleibt `bg-foreground/[0.02]` mit `border-border/15`
- **Hover**: Neuer subtiler Glassmorphism-Shine (`bg-foreground/[0.05]`) + leichter Border-Lift
- **Selected**: Border wird `white/30` statt Accent, Hintergrund `white/[0.06]` statt Accent. Nur das Check-Badge bleibt Accent (einziger Tuerkis-Punkt pro Card)
- **Icon bei Selected**: Wird weiss statt Tuerkis

### 3. Buttons: Dezenterer Primaer-Button

- "Weiter"-Buttons: Statt `bg-accent` wird ein `bg-foreground/90` (fast weiss) mit `text-background` (schwarz) verwendet. Cleaner, weniger Tuerkis
- "Zurueck"-Buttons: Bleiben Ghost, kein Aenderungsbedarf
- Nur der finale "Absenden"-Button behalt den Accent als besondere Hervorhebung

### 4. Input-Felder: Subtilerer Focus-State

- Focus-Border: `white/30` statt `accent/50`
- Focus-Shadow: `white/5` statt `accent/10`
- Generell waermere, neutralere Erscheinung

### 5. Success-Screen: Eleganterer Check

- Der grosse Check-Kreis bekommt einen Gradient von Weiss zu `white/70` statt den vollen Accent-Gradient
- Der Pulse-Glow wird `white/10` statt `accent/20`
- Wirkt edler und weniger "schreierisch"

### 6. Step-Headlines: Dezenter Subtext-Stil

- Subtext bekommt `tracking-wide uppercase text-xs` fuer einen moderneren Look (wie "SCHRITT 1 VON 4")
- Optional: Kleine Step-Nummer als Badge ueber der Headline

### 7. Chips (Career Funnel): Subtilere Selection

- Selected: `border-white/25` + `bg-white/[0.08]` + weisse Textfarbe
- Statt Tuerkis-Border und Tuerkis-Text

### 8. Tool-Logo-Cards: Hover-Effekt

- Hover: Leichtes Scale (1.03) + Border-Lift auf `white/20`
- Selected: Behaelt Check-Badge in Accent (einziger Tuerkis-Punkt)

## Zusammenfassung Tuerkis-Einsatz

Tuerkis bleibt NUR an diesen Stellen:
- Check-Badges (kleiner Kreis mit Haekchen)
- Der finale "Absenden"-Button
- Success-Screen Check-Icon (dezent)

Alles andere wird neutral-weiss/grau gehalten. Das gibt dem Accent seine Wirkung zurueck.

## Technische Umsetzung

### Dateien die geaendert werden

**`src/components/ContactFunnel.tsx`**
- SelectableCardGrid: Selected-Styles aendern (weiss statt accent)
- Progress-Bar: Gradient statt bg-accent
- Buttons: bg-foreground/90 statt bg-accent (ausser Absenden)
- Input Focus-Styles: white statt accent
- Success-Screen: Neutralere Farben

**`src/components/career/CareerFunnel.tsx`**
- SelectCard: Gleiche Aenderungen wie oben
- Chip: Selected-Styles neutral
- Tool-Logo-Cards: Hover-Effekt, neutralere Selected-Styles
- Progress-Bar, Buttons, Inputs, Success: Gleich wie ContactFunnel
- Step-Counter Badge hinzufuegen (optional)
