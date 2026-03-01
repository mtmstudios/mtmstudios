

## Call-Button im Smartphone nach unten verschieben

Der grüne Call-Button sitzt aktuell bei `cy="420"` in einer ViewBox von 320x600 (Phone-Frame endet bei y=570). Er wird ca. 60px nach unten verschoben auf `cy="480"`.

### Änderungen in `src/components/phone-assistant/PhoneHero.tsx`

Alle Button-Elemente von `cy="420"` auf `cy="480"` verschieben:

- **Glow-Ring** (Zeile 183): `cy="420"` → `cy="480"`
- **Grüner Kreis** (Zeile 193): `cy="420"` → `cy="480"`
- **Phone-Icon Pfad** (Zeile 201): y-Koordinaten im `d`-Attribut um +60 verschieben (413→473, 424→484, etc.)
- **"Jetzt anrufen" Label** (Zeile 209): `y="468"` → `y="528"`
- **Clickable foreignObject** (Zeile 219): `y="385"` → `y="445"`

