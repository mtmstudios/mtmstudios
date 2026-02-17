

## Hero-Text andern

Der Hero-Text wird geandert zu **"wir bauen KI-Losungen die Zeit sparen"**, wobei **"Zeit sparen"** im gelben Gradient-Stil (GradientText) dargestellt wird.

### Aufbau der neuen Headline

```text
Zeile 1: "wir bauen KI-Losungen"  (weiss, mit BlurText-Animation)
Zeile 2: "die" (weiss, BlurText) + "Zeit sparen" (gelber Gradient, GradientText)
```

### Technische Anderungen

**Datei: `src/components/HeroSection.tsx`**

- Zeile 1 (BlurText): Text von `"Ultimate Motion"` zu `"wir bauen KI-Lösungen"` andern
- Zeile 2: `"Background"` (GradientText) zu `"Zeit sparen"` andern, und `"Gallery"` (BlurText) zu `"die"` andern -- wobei die Reihenfolge umgedreht wird, sodass `"die"` vor dem GradientText steht
- Die Animationen (BlurText, GradientText, motion) bleiben identisch

