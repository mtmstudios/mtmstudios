

# "Was ihr davon habt" -- Redesign als Bento-Grid mit Glassmorphism-Cards

## Problem
Die aktuelle Benefits-Sektion ist eine einfache vertikale Liste mit feinen Trennlinien und kleinen Akzent-Strichen. Das wirkt zu dezent und geht zwischen der Problem-Sektion (ebenfalls vertikale Liste) und den Trust-Zahlen (Cards) unter. Partner-Agenturen muessen die Vorteile sofort erkennen.

## Vorschlag: Bento-Grid Layout

Ein asymmetrisches Bento-Grid mit Glassmorphism-Cards, bei dem die ersten zwei Vorteile groesser dargestellt werden (sie sind die wichtigsten: "Neue Umsatzquelle" und "100% White-Label") und die unteren zwei kompakter daneben stehen.

### Desktop (ab md)
```text
+-------------------------------+-------------------------------+
|                               |                               |
|     Neue Umsatzquelle         |     100% White-Label          |
|     (grosse Card, Icon)       |     (grosse Card, Icon)       |
|                               |                               |
+---------------+---------------+-------------------------------+
|               |               |                               |
|   Schnelle    |  Persoenl.    |                               |
|   Umsetzung   |  Ansprechp.   |                               |
|               |               |                               |
+---------------+---------------+-------------------------------+
```
- 2 Spalten oben (je 50%), 2 Spalten unten (je 50%)
- Glassmorphism-Background: `bg-white/[0.03] backdrop-blur-sm border border-border/10`
- Hover: Border wird `accent/30`, subtiler Glow-Schatten, Card hebt sich leicht (`y: -6, scale: 1.02`)
- Jede Card hat einen grossen Accent-farbenen Icon-Kreis oben
- Titel in `text-2xl font-bold`, Beschreibung darunter

### Tablet (md)
- 2x2 Grid gleichmaessig
- Etwas kompakter, aber gleiche Card-Struktur

### Mobil (unter md)
- Volle Breite, vertikal gestapelt
- Jede Card nimmt die volle Breite ein
- Kompaktere Innenabstaende (`p-6` statt `p-8`)

### Animationen
- Staggered fade-in von unten (`y: 30`) mit blur
- Hover: `scale: 1.02`, `y: -6`, Border-Farbe wechselt zu `accent/30`
- Subtiler Glow-Effekt auf Hover (box-shadow mit accent-Farbe)
- Icons haben einen sanften Pulse beim ersten Erscheinen

### Icons (Lucide)
- Neue Umsatzquelle: `TrendingUp`
- 100% White-Label: `Eye` (oder `EyeOff` fuer "unsichtbar")
- Schnelle Umsetzung: `Zap`
- Persoenlicher Ansprechpartner: `UserCheck`

## Technische Details

### Datei: `src/pages/Partner.tsx`

**Imports ergaenzen**: `TrendingUp, EyeOff, Zap, UserCheck` aus `lucide-react`

**Benefits-Array erweitern**: Jedes Benefit-Objekt bekommt ein `icon`-Feld mit der entsprechenden Lucide-Komponente.

**Sektion (Zeilen 276-327)**: Komplett ersetzen mit:
- `max-w-5xl` Container statt `max-w-4xl`
- CSS Grid: `grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6`
- Jede Card: Glassmorphism-Styling mit `rounded-2xl`, `p-6 md:p-8`
- Icon in einem `w-12 h-12 rounded-xl bg-accent/10` Container
- Hover-Interaktion ueber `motion.div` mit `whileHover`
- `onMouseEnter/Leave` fuer den Glow-Effekt (wie bei Trust-Zahlen)

