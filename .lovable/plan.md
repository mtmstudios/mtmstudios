

## ContainerScroll + PhoneHero — Machbarkeitscheck & Plan

### Kurz: Ja, das funktioniert — mit Anpassungen

Der Effekt: Das Smartphone startet leicht 3D-rotiert (20°) und skaliert sich beim Scrollen flach — ein Apple-typischer "reveal". Passt gut zum Phone-Visual.

### Nötige Anpassungen am Component

1. **Import-Pfad**: `"framer-motion"` → `"motion/react"` (unser Stack)
2. **`"use client"`**: Entfernen (kein Next.js)
3. **JSX fehlt im kopierten Code** — die Template-Strings wurden nicht korrekt übertragen, ich rekonstruiere die JSX-Struktur aus dem Original (Aceternity UI)

### Integration

**Neue Datei:** `src/components/ui/container-scroll-animation.tsx`
- Bereinigte Version mit `motion/react`-Imports

**Geänderte Datei:** `src/components/phone-assistant/PhoneHero.tsx`
- `PhoneVisual` wird als `children` in `<ContainerScroll>` gewrappt
- `titleComponent` bekommt den bestehenden Titel + Subtitle
- Die bestehenden Entry-Animationen (`initial/animate`) auf dem PhoneVisual-Wrapper entfallen (ContainerScroll übernimmt)

### Abhängigkeiten

- **Keine neuen NPM-Pakete nötig** — `motion` (= framer-motion v11+) ist bereits installiert

### Risiko / Einschränkung

- Die inneren SVG-Animationen (Waveform, Puls) laufen weiter — kein Konflikt
- Auf Mobile wird der Scale-Effekt dezenter (0.7→0.9 statt 1.05→1), das ist im Component eingebaut
- Der `tel:`-Link im SVG bleibt klickbar

### Ergebnis

Beim Scrollen dreht sich das Smartphone elegant von einer leichten 3D-Perspektive in die Frontansicht — premium Apple-Keynote-Feeling.

