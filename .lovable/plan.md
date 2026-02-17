

## Anführungszeichen-Icon statt Avatar-Kreise

### Aenderung

**`src/components/ui/testimonial-card.tsx`**

- Avatar-Import und `AvatarFallback` entfernen
- Stattdessen ein `Quote`-Icon von `lucide-react` als visuelles Element oben links in der Karte
- Icon-Styling: `text-neon/30` (dezent, passend zum Neon-Design), Groesse `24px`
- Das Quote-Icon steht oberhalb des Textes, nicht neben dem Namen
- Der Autorenbereich unten wird ohne Icon dargestellt -- nur Name, Rolle und Firma als Text

### Vorher
```
[Initialen-Kreis] Name
                  Rolle, Firma
```

### Nachher
```
" (Quote-Icon, neon-gruen, oben)

"Bewertungstext..."

Name
Rolle, Firma
```

### Technische Details
- Import: `import { Quote } from "lucide-react"`
- Avatar-Import wird entfernt (nicht mehr benoetigt)
- `Quote` Icon mit `className="text-neon/30 mb-3"` und `size={24}`
- Autorenbereich bleibt unten, aber ohne Avatar -- nur Text-basiert mit `font-semibold` fuer den Namen

