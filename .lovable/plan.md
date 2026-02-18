

## FeaturesSection Redesign -- Animated Demo Cards

### Konzept

Statt statischer Icon+Text-Karten bekommt jede Loesung eine **groessere Karte mit einer animierten Mini-Simulation**, die das Produkt zum Leben erweckt. Der dunkle Neon-Glow-Stil der Seite wird verstaerkt genutzt.

### Die drei Karten im Detail

**1. KI-Telefonassistent**
- Animierte Darstellung eines eingehenden Anrufs: pulsierende Telefon-Wellen (konzentrischen Ringe in Neon), eine kleine "Anruf laeuft..."-Anzeige mit laufender Zeitanzeige
- Beim Hover: die Wellen verstaerken sich, ein kleiner Chat-Bubble erscheint mit "Wie kann ich Ihnen helfen?"

**2. WhatsApp und Chatbots**
- Simulierter Chat-Verlauf: 2-3 Chat-Bubbles die nacheinander eingeblendet werden (wie eine echte Konversation)
- Kunde fragt etwas, Bot antwortet -- mit Typing-Indikator-Animation (drei pulsierende Punkte)
- Neon-gruene WhatsApp-Akzente gemischt mit dem Tuerkis der Seite

**3. Automatisierungen**
- Animiertes Workflow-Diagramm: 3-4 Nodes (kleine Kreise/Boxen) die durch animierte Linien verbunden werden
- Daten "fliessen" als kleine leuchtende Punkte entlang der Verbindungslinien von Node zu Node
- N8N-Icon bleibt als zentraler Node erhalten

### Layout

- Weiterhin 3 Spalten auf Desktop, 1 Spalte auf Mobile
- Karten sind hoeher als vorher (ca. 400px) um Platz fuer die Animationen zu schaffen
- Oben: die animierte Demo-Area (ca. 60% der Karte)
- Unten: Titel, kurze Beschreibung und ein subtiler "Mehr erfahren"-Link

### Animationen und Interaktionen

- Alle Animationen starten beim Scrollen in den Viewport (einmalig)
- Hover verstaerkt die Animationen und fuegt einen intensiveren Neon-Glow hinzu
- Die Karten bekommen einen subtilen Glassmorphism-Effekt (schon vorhanden, wird verstaerkt)
- Staggered Einblendung bleibt (0.2s versetzt)

### Technische Umsetzung

- Alles in `src/components/FeaturesSection.tsx`
- Animationen mit `motion/react` (bereits installiert)
- Chat-Bubbles, Telefon-Wellen und Workflow-Nodes als reine CSS/SVG + Framer Motion Animationen
- Keine neuen Dependencies noetig
- Typing-Indikator als CSS-Animation mit `@keyframes`
- Workflow-Datenpunkte als animierte SVG-Circles mit `motion.circle`

### Vorteil

Die Besucher **sehen sofort**, was jedes Produkt macht, statt es nur zu lesen. Das erzeugt einen "Wow-Effekt" und passt perfekt zum futuristischen KI-Agentur-Vibe der Seite.

