

# Werte-Karten: Hintergrund-Wort groesser, Ueberschrift entfernen

## Analyse

Aktuell gibt es in jeder Karte:
1. Hintergrund-Wort (z.B. "Klarheit") -- klein, kaum sichtbar (opacity 0.06)
2. Akzentlinie
3. **h3-Ueberschrift** (z.B. "Klarheit") -- identischer Text wie Hintergrund
4. Beschreibungstext

Das ist tatsaechlich doppelt. Mein Vorschlag: Die h3-Ueberschrift entfernen und das Hintergrund-Wort die Rolle uebernehmen lassen. Dafuer muss es sichtbarer werden (hoehere Opazitaet), aber nicht so stark, dass es den Beschreibungstext stoert.

## Plan

### Karten-Redesign

**Entfernen:** Die `<h3>` Zeile (Zeile 166) und die Akzentlinie darueber (Zeile 165).

**Hintergrund-Wort anpassen:**
- Opazitaet erhoehen: `text-white/[0.10]` (statt 0.06), hover: `text-accent/[0.15]`
- Schriftgroesse deutlich erhoehen damit es die Karte ausfuellt: `clamp(2.5rem, ${Math.max(8, 42 / v.title.length)}vw, 8rem)`
- `tracking-widest` fuer breitere Wirkung
- Bleibt im Hintergrund (kein z-index), Beschreibungstext bekommt `relative z-10`

**Beschreibungstext:**
- Leicht groessere Schrift: `text-lg`
- Etwas mehr vertikales Padding in der Karte: `p-10` statt `p-8`

```
Ergebnis:
┌───────────────────────────┐
│                           │
│      K L A R H E I T      │  <-- gross, subtle, tracked
│                           │
│   Wir machen Komplexes    │  <-- text vorne, lesbar
│   einfach — in Techno-    │
│   logie und Zusammen-     │
│   arbeit.                 │
│                           │
└───────────────────────────┘
```

### Betroffene Datei
- `src/pages/AboutUs.tsx` -- Zeilen 157-167

