

## Karten-Texte zentrieren und Automatisierungs-Animation verbessern

### 1. Texte in den Karten zentrieren

Der Content-Bereich (Zeilen 357-373) wird von links-ausgerichtet auf zentriert umgestellt:
- Icon und Titel werden vertikal gestapelt statt nebeneinander (`flex-col items-center`)
- Beschreibungstext bekommt `text-center`

### 2. Automatisierungs-Animation ersetzen

Die aktuelle SVG-Workflow-Animation mit Nodes und fliegenden Punkten wirkt unpoliert. Vorschlag: **Drei simple Icons die nacheinander aufleuchten und durch eine animierte Linie verbunden sind** -- ein minimalistischer, linearer Flow statt dem komplizierten Netzwerk-Graph.

Konkret: Drei kleine Icons in einer Reihe (Eingang, Zahnrad/Verarbeitung, Ausgang) mit einer dezenten Neon-Linie dazwischen. Ein einzelner leuchtender Punkt wandert einmal von links nach rechts durch -- fertig. Schlicht, elegant, sofort verstaendlich.

### 3. Performance

Die Animationen sind rein CSS/Framer Motion und laufen auf der GPU (transform, opacity). Kein Performance-Problem. Die einzige Optimierung: den `setInterval`-Timer beim Telefon-Demo stoppen, wenn die Komponente aus dem Viewport scrollt, und die Anzahl der `repeat: Infinity`-Animationen minimieren. Die neue Workflow-Animation wird bewusst simpler und damit leichter.

### Technische Aenderungen

Alles in `src/components/FeaturesSection.tsx`:

**Content-Bereich (Zeilen 357-373):**
- `flex items-center gap-3` wird zu `flex flex-col items-center gap-2`
- Icon-Box bleibt, Titel darunter zentriert
- Beschreibung bekommt `text-center`

**WorkflowDemo (Zeilen 172-279):**
- Komplett ersetzt durch eine einfache horizontale 3-Step-Animation
- Drei Kreise mit Icons (Pfeil-rein, Zahnrad, Pfeil-raus) in einer Reihe
- Eine durchgehende Linie verbindet sie
- Ein einzelner leuchtender Punkt (motion.div) wandert wiederholt von links nach rechts
- Nodes erscheinen nacheinander mit kurzem Delay (staggered fade-in)
- Viel weniger DOM-Elemente und Animationen als vorher

