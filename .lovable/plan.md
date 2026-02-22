

## Phone Hero: Bild-basiertes iPhone-Mockup mit Apple-like Animationen

Das aktuelle SVG-Telefon wird durch das hochgeladene Bild ersetzt und mit hochwertigen Animationen versehen.

---

### Konzept

Das Bild wird als zentrales Hero-Element eingebunden und mit mehreren layered Animationen versehen, die an Apple-Produktpraesentationen erinnern:

1. **Einblendung**: Das Phone fadet von unten ein mit einem sanften Blur-to-Sharp-Effekt (wie bei Apple Keynotes)
2. **Floating-Effekt**: Subtiles, kontinuierliches Schweben (translateY) fuer ein schwereloses Gefuehl
3. **Glow-Ring**: Ein pulsierender, weicher Neon-Glow hinter dem Phone, der Tiefe erzeugt
4. **Schatten**: Ein dynamischer Schatten unter dem Phone, der sich mit dem Floating synchron bewegt

### Animations-Details

| Animation | Beschreibung | Timing |
|-----------|-------------|--------|
| Fade-in + Blur | `opacity: 0 -> 1`, `blur(20px) -> blur(0)`, `y: 60 -> 0` | 1.2s, delay 0.8s |
| Float | `translateY(0px) -> -12px -> 0px` | 6s, infinite, ease-in-out |
| Glow pulse | Neon-Kreis hinter dem Phone pulsiert in Opazitaet | 4s, infinite |
| Shadow | Schatten wird groesser/kleiner synchron zum Float | 6s, infinite |

### Technische Umsetzung

**Geaenderte Datei:**
- `src/components/phone-assistant/PhoneHero.tsx` -- SVG komplett entfernen, durch `<img>` mit motion-Wrapper ersetzen

**Neue Asset-Datei:**
- `src/assets/phone-mockup.png` -- Das hochgeladene Bild wird hierhin kopiert

**Aufbau der Komponente:**

```text
<motion.div>  (Container mit Float-Animation)
  |
  +-- <div>  (Glow-Ring, absolut positioniert, pulsierend)
  |
  +-- <motion.img>  (Das Phone-Bild, fade-in + blur)
  |
  +-- <motion.div>  (Schatten-Ellipse, synchron zum Float)
</motion.div>
```

Die Bildgroesse wird responsiv angepasst: `max-w-[280px] sm:max-w-[340px] md:max-w-[380px]` -- etwas groesser als das bisherige SVG, damit das detaillierte Bild gut zur Geltung kommt.

