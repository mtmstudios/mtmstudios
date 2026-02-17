

## Footer transparent machen

### Aenderung in `src/components/Footer.tsx`

Eine minimale Aenderung: `bg-background` durch `bg-transparent` ersetzen, damit der animierte Video-Hintergrund durch den Footer sichtbar wird.

- Zeile 22: `bg-background` wird zu `bg-transparent`
- Optional auch den Copyright-Bereich (`border-t border-border/10`) leicht anpassen, damit er zum transparenten Look passt

### Technische Details
- Datei: `src/components/Footer.tsx`
- Aenderung: `className="border-t border-border/20 bg-background"` wird zu `className="border-t border-border/20 bg-transparent"`
- Keine neuen Dependencies

