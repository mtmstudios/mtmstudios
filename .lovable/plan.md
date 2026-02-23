

## Zwei Upgrades: Demo-Karten-Styling + Automations Hero Visual

### 1. Subtiler Border + Glow auf den Demo-Bereichen (Startseite)

Die drei Demo-Container in `FeaturesSection.tsx` (Zeile 467) haben aktuell nur `bg-white/[0.03] backdrop-blur-md` -- sie verschmelzen mit dem dunklen Hintergrund und wirken "schwebend ohne Rahmen".

**Aenderung an der Container-CSS-Klasse (Zeile 467):**

Aktuell:
```
h-[280px] md:h-[340px] rounded-2xl bg-white/[0.03] backdrop-blur-md overflow-hidden relative
```

Neu:
```
h-[280px] md:h-[340px] rounded-2xl bg-white/[0.03] backdrop-blur-md overflow-hidden relative
border border-white/[0.06] shadow-[0_0_40px_-10px_hsl(var(--neon)/0.15)]
```

Das gibt jedem Demo-Bereich:
- Einen hauchduennen weissen Border (6% Opacity)
- Einen subtilen Neon-Glow als Box-Shadow (15% Opacity, 40px Spread)

---

### 2. Automations Hero: Zahnraeder durch ein hochwertiges "Neural Network / Flow" Visual ersetzen

Die Zahnraeder sehen altmodisch und billig aus -- sie passen nicht zum modernen KI-Thema. Stattdessen ein abstraktes, animiertes Netzwerk-Visual das "intelligente Automatisierung" kommuniziert.

**Neues Visual -- "Neural Flow Network":**

Ersetzt `GearFlowVisual` in `AutomationsHero.tsx` komplett. Das neue Visual zeigt:

- **Animierte Knoten (Nodes)**: 6-8 leuchtende Kreise, die sich in einem organischen Netzwerk-Muster anordnen
- **Verbindungslinien**: Duenne Linien zwischen den Nodes mit Stroke-Animation (pathLength 0 -> 1)
- **Pulsierende Datenpunkte**: Leuchtende Punkte die entlang der Verbindungen wandern (wie Daten die durch ein System fliessen)
- **Zentrale Hub-Node**: Ein groesserer Kreis in der Mitte mit staerkerem Glow -- repraesentiert die KI
- **Pulsierender Ring-Effekt**: Der zentrale Hub hat einen sanft pulsierenden Ring (aehnlich dem Call-Button auf der Telefon-Seite)
- **Staggered Einblendung**: Nodes erscheinen nacheinander (wie ein Netzwerk das sich aufbaut), Verbindungen werden danach gezeichnet

Viewbox bleibt bei 320x200, Groesse des Containers bleibt gleich. Alle Animationen nutzen die `appleEase` Kurve und `useInView`.

---

### Technische Details

**Datei 1: `src/components/FeaturesSection.tsx`**
- Zeile 467: CSS-Klasse des Demo-Containers um `border` und `shadow` erweitern
- Nur 1 Zeile aendern, kein Logik-Change

**Datei 2: `src/components/automations/AutomationsHero.tsx`**
- `Gear`, `DataDot` und `GearFlowVisual` Komponenten komplett entfernen (Zeilen 8-98)
- Neue `NeuralFlowVisual` Komponente einfuegen mit:
  - Array von Node-Positionen (x, y, radius)
  - Array von Connection-Paaren (index-basiert)
  - SVG mit `<defs>` fuer Glow-Filter
  - `motion.circle` fuer jeden Node mit staggered scale-in
  - `motion.line` fuer jede Connection mit pathLength-Animation
  - `animateMotion` Datenpunkte auf den Verbindungspfaden
  - Zentraler Hub-Node mit pulsierendem Ring

### Ergebnis
- Die Demo-Karten auf der Startseite heben sich sauber vom Hintergrund ab mit elegantem Glow
- Die Automations-Seite hat ein modernes, KI-wuerdiges Hero-Visual statt billiger Zahnraeder
