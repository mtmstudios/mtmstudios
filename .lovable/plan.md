

## Logo-Slider unterhalb des Hero-Bereichs

Ein endlos laufender Logo-Slider (von links nach rechts), der in der Mitte heller wird und an den Raendern ausblendet -- direkt unter dem Hero-Bereich.

### Neue Dateien

**1. `src/components/ui/infinite-slider.tsx`**
- Endlos-Slider-Komponente basierend auf dem bereitgestellten Code
- Anpassung: Import von `motion` statt `framer-motion` (das Projekt nutzt das `motion`-Paket, nicht `framer-motion`)
- Import: `import { useMotionValue, animate, motion } from "motion/react"`

**2. `src/components/ui/logo-cloud.tsx`**
- Wrapper-Komponente fuer den Logo-Slider
- Nutzt `InfiniteSlider` mit einem CSS-Mask-Gradient fuer den Fade-Effekt an den Raendern (Mitte hell, Raender transparent)
- Logos als `img`-Tags mit den bereitgestellten URLs (Nvidia, Supabase, OpenAI, etc.)

**3. `src/components/LogosSection.tsx`**
- Section-Komponente mit "Trusted by"-Text und dem Logo-Cloud darunter
- Styling passend zum dunklen Theme: weisse/graue Logos, dezenter Text

### Aenderung: `src/pages/Index.tsx`

- Import und Einbindung von `LogosSection` direkt nach `<HeroSection />`

### Neue Dependency

- `react-use-measure` -- wird vom InfiniteSlider benoetigt, um die Breite des Containers zu messen

### Technische Details

- Der Fade-Effekt wird ueber CSS `mask-image` realisiert: `linear-gradient(to right, transparent, black 20%, black 80%, transparent)` -- dadurch sind die Raender transparent und die Mitte sichtbar
- Logos laufen endlos in einer Richtung durch, dupliziert fuer nahtloses Looping
- Keine `framer-motion`-Installation noetig -- das bestehende `motion`-Paket wird verwendet
- Logos werden als externe SVGs von `storage.efferd.com` geladen und mit `brightness(0) invert(1)` auf Weiss gefiltert, passend zum dunklen Design

