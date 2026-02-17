
## Akzentfarbe von Neongelb zu Tuerkis (#22D3C5) aendern

### Uebersicht
Die gesamte Akzentfarbe der Seite wird von Neongelb/Gruen auf Tuerkis (#22D3C5) umgestellt. Die Farbe ist zentral als CSS-Variable definiert, daher wirkt sich die Aenderung automatisch auf fast alle Elemente aus (Buttons, Hover-Effekte, Badges, Glows, Borders etc.).

### Aenderung 1: `src/index.css` - CSS-Variablen

| Variable | Aktuell | Neu |
|---|---|---|
| `--accent` | `72 100% 60%` | `174 72% 48%` |
| `--ring` | `72 100% 60%` | `174 72% 48%` |
| `--neon` | `72 100% 60%` | `174 72% 48%` |
| `--neon-glow` | `72 100% 70%` | `174 72% 60%` |
| `--sidebar-primary` | `72 100% 60%` | `174 72% 48%` |
| `--sidebar-ring` | `72 100% 60%` | `174 72% 48%` |

### Aenderung 2: `src/components/GradientText.tsx` - Default-Gradient-Farben

Die hartcodierten Default-Farben im Gradient-Text aendern:
- Von: `['#d4ff50', '#b8ff70', '#d4ff50', '#c8ff60', '#d4ff50']`
- Zu: `['#22D3C5', '#1ABEBD', '#22D3C5', '#28E0D0', '#22D3C5']`

### Aenderung 3: `src/components/ProcessSection.tsx` - Hartcodierter HSL-Wert

In Zeile 79 steht ein hartcodierter Shadow-Wert `hsl(72 100% 60%/0.1)` der auf `hsl(174 72% 48%/0.1)` geaendert wird.

### Was sich automatisch aendert (ohne Code-Aenderung)
Alle Tailwind-Klassen wie `text-neon`, `bg-neon`, `hover:text-neon`, `border-neon`, `hover:bg-neon`, `neon-glow` etc. greifen automatisch auf die neuen CSS-Variablen zu. Betroffen sind:
- Navigation (Hover-Farben, Button)
- Hero-Section (CTA-Button)
- Process-Section (Badges, Borders)
- Features-Section
- Testimonials
- CTA-Section
- Footer (Hover-Farben)

### Zusammenfassung
- 3 Dateien betroffen
- Keine neuen Dependencies
- Sofort auf der gesamten Seite sichtbar
