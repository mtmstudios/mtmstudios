

## Header abdunkeln beim Scrollen

### Problem
Die Navigation hat aktuell keinen Hintergrund (`nav` in Zeile 8). Beim Scrollen ueberlagert sich der Content mit den Nav-Links und wird unlesbar.

### Loesung
Einen halbtransparenten, dunklen Hintergrund mit Backdrop-Blur auf die Navigation legen -- passend zum bestehenden Glassmorphism-Stil.

### Aenderung

**`src/components/Navigation.tsx` (Zeile 8)**

Aktuelle Klassen:
```
fixed top-0 left-0 right-0 z-[100] border-b border-border/10
```

Neue Klassen:
```
fixed top-0 left-0 right-0 z-[100] border-b border-border/10 bg-background/80 backdrop-blur-md
```

- `bg-background/80` -- 80% deckender schwarzer Hintergrund (da `--background: 0 0% 0%`)
- `backdrop-blur-md` -- Frosted-Glass-Effekt, konsistent mit den Testimonial- und Feature-Karten

### Ergebnis
- Header ist beim Scrollen immer lesbar
- Content darunter scheint dezent durch (Agentur-Flair)
- Konsistent mit dem bestehenden Glassmorphism-Design
