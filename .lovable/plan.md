

# Partner-Seite: Design-Differenzierung und Animationen

## Aktuelles Problem
Alle drei Sektionen (Schritte, "Wir uebernehmen", "Was ihr davon habt") nutzen dasselbe Glassmorphism-Card-Design. Das wirkt repetitiv und langweilig.

## Aenderungen

### 1. Schritte-Sektion ("Wir uebernehmen. Ihr glaenzt.") -- Anpassen an "So funktioniert's"-Design
Aktuell: 3 Glassmorphism-Cards im Grid.
Neu: Vertikales zentriertes Layout wie in `HowItWorks.tsx` und `AutomationsHowItWorks.tsx`:
- Grosse halbtransparente Nummern (01, 02, 03) zentriert ueber dem Text
- Titel und Beschreibung zentriert darunter
- Feine Trennlinien zwischen den Schritten
- Spring-Animation auf den Nummern, blur-in auf dem Text
- Hover: `y: -4` und Nummer-Farbe wechselt zu `accent/40`
- `whileInView` statt `useInView`-Ref (konsistent mit den anderen Seiten)

### 2. "Was ihr davon habt" -- Neues horizontales Fullwidth-Design
Aktuell: 2x2 Glassmorphism-Card-Grid (identisch zu Schritte).
Neu: Fullwidth gestapelte Bloecke mit animiertem Akzent-Streifen:
- Jeder Benefit ist ein volle-Breite-Block mit linkem Accent-Border
- Links ein animierter vertikaler Accent-Streifen (2px), der sich auf Hover verbreitert
- Titel gross und prominent, Beschreibung darunter
- Zentrierter Text, subtiler Background-Gradient auf Hover
- Staggered fade-in von links (`x: -20` statt `y: 30`)
- Trennlinien zwischen den Bloecken (aehnlich Problem-Sektion, aber mit anderem Feel)

### 3. Zusaetzliche smooth Animationen
- **Hero**: Subtiler Scale-Effekt auf der Subline (von 0.98 auf 1)
- **Problem-Nummern**: Sanfter Puls auf den Nummern beim ersten Einblenden (opacity pulse)
- **Trust-Zahlen**: Leichter rotate3d auf Hover fuer Tiefe (`rotateX: 2deg`)
- **Sektions-Uebergaenge**: Sanfte Divider-Animation -- die Trennlinien wachsen von der Mitte nach aussen (`scaleX: 0 -> 1`)

## Technische Details

### Datei: `src/pages/Partner.tsx`

**Schritte-Sektion (Zeilen 210-253)**: Komplett ersetzen mit dem vertikalen HowItWorks-Layout:
- `whileInView` / `viewport={{ once: true }}` statt `useInView`-Ref
- Vertikale Liste statt Grid
- `bg-muted/20` als Section-Background fuer visuelle Trennung
- Nummer mit `type: "spring"` Animation

**Benefits-Sektion (Zeilen 255-290)**: Komplett ersetzen mit neuem horizontal-gestapeltem Design:
- Volle Breite, keine Cards, kein Grid
- Linker Accent-Border pro Item
- `initial: { opacity: 0, x: -20 }` statt `y: 30`
- Hover-Effekt: Border verbreitert sich, subtiler Background-Shift

**Refs bereinigen**: `solutionRef` und `solutionInView` koennen entfernt werden (ersetzt durch `whileInView`). `benefitsRef` bleibt fuer die Headline-Animation.
