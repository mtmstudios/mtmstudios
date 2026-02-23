

## Zentrierung und einheitliches Layout

### Aenderungen im ContactFunnel (`src/components/ContactFunnel.tsx`)

**Schritt 1 -- Service-Karten zentrieren:**
- Karten-Layout von `text-left` auf `text-center` aendern
- Icons zentriert (`mx-auto`) statt links
- Text zentriert unter dem Icon
- Check-Indikator bleibt oben-rechts (als visuelle Bestaetigung)

**Schritt 1 -- Ueberschriften zentrieren:**
- "Was braucht ihr?" und Untertitel auf `text-center` setzen

**Schritt 2 -- Formular-Ueberschriften zentrieren:**
- "Wie erreichen wir euch?" und Untertitel auf `text-center` setzen
- Die Labels und Inputs bleiben links-ausgerichtet (das ist Standard fuer Formulare und gut lesbar)

**Schritt 2 -- Buttons zentrieren:**
- Die Button-Reihe (Zurueck + Absenden) bekommt `justify-center`

### Betroffene Dateien

| Datei | Aenderung |
|---|---|
| `src/components/ContactFunnel.tsx` | Karten-Icons und -Text zentrieren, Ueberschriften zentrieren, Button-Reihe zentrieren |

Alle anderen Sections (Features, Process, Integrations, Testimonials, CTA, Footer) sind bereits zentriert und brauchen keine Aenderungen.

