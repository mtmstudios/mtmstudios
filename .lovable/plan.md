

## Automations Hero: Premium n8n-Style Workflow Visual

### Problem
Das aktuelle "Neural Flow Network" besteht nur aus abstrakten Kreisen und Linien -- es sieht aus wie ein einfaches Netzwerk-Diagramm, nicht wie ein intelligenter Workflow. Es fehlt Kontext, Persoenlichkeit und visuelle Tiefe. Es kommuniziert nicht "Automatisierung".

### Loesung: Animierter n8n-Style Workflow

Ersetzt `NeuralFlowVisual` komplett durch ein hochwertiges Workflow-Diagramm mit echten Nodes, Icons und animierten Datenfluss-Partikeln.

---

### Visual-Konzept

**Workflow-Nodes (5-6 Stueck):**
Jeder Node ist ein abgerundetes Rechteck (nicht nur ein Kreis) mit:
- Glassmorphism-Hintergrund (`bg-white/[0.06]`, `backdrop-blur` via SVG filter)
- Subtiler neon-farbiger Border
- Ein kleines SVG-Icon oben (Trigger, Mail, Database, AI, Webhook, Output)
- Kurzer Label-Text darunter (z.B. "Trigger", "GPT-4", "CRM", "E-Mail")
- Nodes werden mit staggered Scale+Fade eingeblendet

**Verbindungslinien:**
- Curved Bezier-Pfade (nicht gerade Linien) zwischen den Nodes -- wie in n8n
- Stroke-Animation (pathLength 0 nach 1) mit stagger
- Kleine Pfeilspitzen an den Enden

**Animierte Daten-Partikel:**
- Leuchtende Punkte (mit Glow-Filter) die entlang der Bezier-Kurven wandern
- Nutzen `animateMotion` mit `mpath` auf den Bezier-Pfaden
- Verschiedene Geschwindigkeiten fuer organisches Gefuehl

**Layout (von links nach rechts):**
```text
[Trigger] ---> [Daten laden] ---> [KI verarbeiten] ---> [CRM Update]
                                        |
                                        v
                                  [E-Mail senden]
```

Ein Haupt-Pfad von links nach rechts mit einer Verzweigung -- wie ein echter Workflow.

**Zusaetzliche Details fuer Premium-Look:**
- Subtile Grid-Linien im Hintergrund (wie n8n Canvas) mit sehr niedriger Opacity
- Der "KI"-Node in der Mitte hat einen staerkeren Glow und pulsierenden Ring
- Nodes haben einen minimalen Schatten/Glow nach unten

---

### Technische Details

**Datei: `src/components/automations/AutomationsHero.tsx`**

Die `NeuralFlowVisual` Komponente wird komplett ersetzt durch `WorkflowVisual`:

- Viewbox wird breiter: `0 0 600 300` (um einen horizontalen Flow darzustellen)
- Container wird groesser: `max-w-[600px] h-[300px] sm:h-[380px]`
- Jeder Node wird als `<g>` mit `<rect>` (abgerundet), Icon-Symbol (`<path>` oder simple Shapes) und `<text>` gerendert
- Verbindungen als `<path d="M... C...">` (kubische Bezier-Kurven)
- Daten-Partikel mit `<circle>` + `<animateMotion>` auf den Bezier-Pfaden
- Grid-Hintergrund als wiederholendes `<pattern>` Element
- Alle Animationen mit `motion/react`, `useInView`, und `appleEase`
- Stagger-Reihenfolge: Grid erscheint -> Nodes skalieren rein (links nach rechts) -> Verbindungen werden gezeichnet -> Daten-Partikel starten

### Ergebnis
Ein professionelles, n8n-inspiriertes Workflow-Diagramm das sofort "intelligente Automatisierung" kommuniziert -- mit echten Nodes, Bezier-Verbindungen und fliessenden Daten-Partikeln. Apple-like smooth durch staggered Animationen und weiche Easing-Kurven.
