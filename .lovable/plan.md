

# 404-Seite -- Apple-Style Redesign

## Konzept

Eine immersive, minimalistische 404-Seite im Apple-Stil mit einer grossen, animierten "404"-Zahl als Mittelpunkt. Kein visueller Ballast -- nur Typografie, Raum und Bewegung.

### Aufbau

```text
+--------------------------------------------------+
|  [Navigation -- wie auf allen Seiten]             |
|                                                   |
|                                                   |
|                                                   |
|              4  0  4                              |
|         (riesig, Blur-In, Accent-Glow)            |
|                                                   |
|      Diese Seite existiert nicht.                  |
|         (fade-in, dezent)                         |
|                                                   |
|      [ Zurueck zur Startseite ]                   |
|         (Glassmorphism-Button, hover-glow)         |
|                                                   |
|                                                   |
|         ~ dezente Partikel im Hintergrund ~       |
|                                                   |
+--------------------------------------------------+
```

### Design-Details

**"404" Typografie**
- Riesige Schriftgroesse: `text-[12rem] md:text-[18rem]`
- `font-bold tracking-tighter`
- Dezenter Accent-Glow per `text-shadow` in Tuerkis
- Einblendung ueber den existierenden `BlurText`-Komponent (Blur-In von oben, Buchstabe fuer Buchstabe)

**Untertitel**
- "Diese Seite existiert nicht."
- `text-lg md:text-xl text-foreground/50`
- Fade-in mit `motion.p` (verzoeert nach der 404-Animation)

**CTA-Button**
- "Zurueck zur Startseite" als `Link` zu `/`
- Glassmorphism: `bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm`
- Hover: `bg-white/[0.12]`, dezenter Glow-Schatten in Accent-Farbe
- Fade-in mit `motion.div` (weitere Verzoegerung)

**Hintergrund**
- Schwarzer Hintergrund (`bg-background`) -- konsistent mit dem Rest der Seite
- 2-3 sanft pulsierende, unscharfe Accent-Kreise (radial gradients) als dekorative Elemente
- Keine Starfield-Animation (zu viel Ablenkung fuer eine Error-Seite)

**Navigation**
- Die Standard-Navigation wird eingebunden (wie auf allen anderen Seiten)

### Animationsablauf (Timeline)

1. **0ms**: Seite laedt, Hintergrund-Glow-Kreise faden sanft ein
2. **100ms**: "404" blendet per BlurText Buchstabe fuer Buchstabe ein (blur-in von oben)
3. **800ms**: Untertitel fadet ein (`opacity: 0 -> 1, y: 10 -> 0`)
4. **1200ms**: Button fadet ein (`opacity: 0 -> 1, y: 10 -> 0`)

### Responsive

- **Desktop**: 404 in `text-[18rem]`, viel vertikaler Raum
- **Tablet**: 404 in `text-[12rem]`
- **Mobil**: 404 in `text-[7rem]`, kompaktere Abstande

## Technische Umsetzung

### Datei: `src/pages/NotFound.tsx`

- Komplettes Rewrite der Komponente
- **Imports**: `Link` aus `react-router-dom`, `motion` aus `motion/react`, `BlurText`, `Navigation`
- **Layout**: `min-h-screen bg-background flex flex-col` mit Navigation oben und zentriertem Content
- **Dekorative Elemente**: 2 `div`-Elemente mit `absolute`, `rounded-full`, `bg-accent/10`, `blur-3xl` als Hintergrund-Glow
- **404-Text**: `BlurText` Komponente mit `animateBy="characters"`
- **Untertitel + Button**: `motion.p` und `motion.div` mit gestaffeltem `delay`
- **Button**: `Link to="/"` mit Glassmorphism-Klassen und `whileHover`-Animation

### Datei: `src/App.tsx`

- Keine Aenderungen noetig (Route `*` zeigt bereits `NotFound`)
