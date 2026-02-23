
## Logo im Avatar verkleinern

### Problem
Das Logo (56x56) fuellt den Clip-Kreis (r=28, Durchmesser 56) exakt aus und wird dadurch an den Raendern abgeschnitten.

### Loesung
Das Logo von 56x56 auf 40x40 verkleinern und zentriert im Kreis positionieren. So bleibt ein schoener Rand zwischen Logo und Kreiskante.

**Datei:** `src/components/phone-assistant/PhoneHero.tsx`

- `width` und `height` von `56` auf `40` aendern
- `x` von `132` auf `140` (160 - 40/2 = 140)
- `y` von `102` auf `110` (130 - 40/2 = 110)
- `preserveAspectRatio` auf `xMidYMid meet` aendern (statt `slice`), damit das Logo komplett sichtbar bleibt statt abgeschnitten zu werden

### Ergebnis
Das Logo sitzt zentriert im Kreis mit ca. 8px Rand rundherum — nichts wird abgeschnitten.
