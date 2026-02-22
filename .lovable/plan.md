

## Bild als Hero-Visual mit Apple-Animationen

Das hochgeladene iPhone-Bild (KI-Telefonassistent Anruf-Screen) ersetzt die aktuelle SVG-Animation im PhoneHero.

---

### Aenderungen

**Kopiert:**
- `user-uploads://KITELEFON-2.png` nach `src/assets/ki-telefon.png`

**Geaendert:**
- `src/components/phone-assistant/PhoneHero.tsx`

---

### Animationskonzept (Apple-Vibe)

Der gesamte SVG-Block (Zeilen 27-127) wird entfernt und durch das Bild ersetzt. Drei gestaffelte Animationsschichten erzeugen den Apple-Effekt:

1. **Bild-Einblendung** (Hauptelement)
   - Scale von 0.9 auf 1 (leichtes "Heranzoomen")
   - Opacity von 0 auf 1
   - Y-Translate von +50px auf 0 (schwebt nach oben)
   - Dauer: 1.2s, Delay: 0.8s (nach Headline), Apple-Easing `[0.16, 1, 0.3, 1]`

2. **Glow-Ring** (hinter dem Bild)
   - Ein weiches, unscharfes Neon-Tuerkis-Licht hinter dem Telefon
   - Fadet mit leichter Verzoegerung ein (Delay: 1.2s)
   - Pulsiert sanft (Opacity zwischen 0.3 und 0.6) in einer Endlosschleife
   - Erzeugt durch ein absolut positioniertes `motion.div` mit `blur` und `rounded-full`

3. **Subtiler Float-Effekt** (nach Einblendung)
   - Das Bild schwebt leicht auf und ab (Y: -8px bis +8px)
   - Sehr langsam (6s Zyklus), endlos
   - Gibt dem Bild eine lebendige, schwebende Qualitaet

### Groesse und Responsive

- Mobile: max-width ~280px
- Desktop: max-width ~360px
- Das Bild behaelt seinen transparenten Hintergrund, sodass es nahtlos auf dem dunklen Hintergrund sitzt

### Struktur im Code

```text
<motion.div>  (Container: relative, flex-center)
  |
  +-- <motion.div>  (Glow: absolute, centered, blur, neon bg, pulsing)
  |
  +-- <motion.img>  (Bild: scale+fade+translateY entry, then float)
```

