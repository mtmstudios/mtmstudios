

## FeaturesSection aufwerten -- Animationen und N8N-Icon

### Uebersicht
Die "Unsere Loesungen"-Sektion wird visuell aufgewertet mit Scroll-Animationen (staggered Einblendungen) und einem N8N-Logo anstelle des Blitz-Icons bei "Automatisierungen". Ausserdem wird ein alter gelber Shadow-Farbwert korrigiert.

### Aenderungen in `src/components/FeaturesSection.tsx`

**1. N8N-Icon statt Blitz**
- Das Zap-Icon bei "Automatisierungen" wird durch ein inline-SVG des N8N-Logos ersetzt (das bekannte orange-rote N8N-Knoten-Symbol)
- Die anderen zwei Icons (Phone, MessageSquare) bleiben

**2. Scroll-Animationen mit motion/react**
- Import von `motion` aus `motion/react`
- Jede Feature-Card bekommt eine staggered Animation beim Scrollen (viewport-triggered):
  - Fade-in von unten mit leichtem Blur
  - Versetzt um je 0.15s pro Card
  - Nur einmal ausgeloest (`once: true`)
- Die Ueberschrift und das Badge ebenfalls mit Fade-in-Animation

**3. Hover-Effekte verbessern**
- Beim Hover: Icon skaliert leicht hoch (`group-hover:scale-110`)
- Karte hebt sich leicht an (`hover:-translate-y-1`)
- Subtiler Neon-Glow-Rand wird staerker

**4. Bugfix: Alter Farbwert**
- Zeile 41: `hover:shadow-[0_0_30px_hsl(72_100%_60%/0.15)]` wird zu `hover:shadow-[0_0_30px_hsl(174_72%_48%/0.15)]` (Tuerkis statt Gelb)

### Technische Details

- Keine neuen Dependencies (motion/react ist bereits installiert)
- N8N-Logo als inline SVG (kein externer Asset noetig)
- Scroll-Animation nutzt `whileInView` von Framer Motion
- 1 Datei betroffen: `src/components/FeaturesSection.tsx`

