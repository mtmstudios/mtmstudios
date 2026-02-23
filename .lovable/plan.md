

## Feature-Demos auf der Startseite aufwerten

### Problem
Die drei Demo-Animationen in der "Was wir fuer euch tun koennen"-Sektion sehen billig und generisch aus:
- **Telefon**: Ein pulsierender Kreis mit Phone-Icon und Timer -- wirkt wie ein Platzhalter
- **Chatbot**: Flache Chat-Blasen ohne Kontext -- kein Bezug zu WhatsApp oder einem echten Geraet
- **Automatisierungen**: Drei Kreise mit Unicode-Pfeilen (Input/Process/Output) -- wirkt wie ein Wireframe

Auf den Unterseiten gibt es dagegen hochwertige SVG-Smartphone-Mockups (PhoneHero, ChatbotHero) und animierte Gear-Visuals (AutomationsHero), die deutlich professioneller wirken.

### Loesung

Die drei Demo-Komponenten in `src/components/FeaturesSection.tsx` werden komplett ersetzt durch Mini-Versionen der Unterseiten-Visuals. Keine neuen Dateien noetig -- alles bleibt in FeaturesSection.tsx.

---

**1. PhoneDemo -- Mini-Smartphone mit Waveform**

Statt dem pulsierenden Kreis: Ein schlankes SVG-Smartphone (aehnlich wie auf `/telefonassistent`), mit:
- Gezeichnetem Phone-Frame (abgerundetes Rechteck mit Stroke-Animation)
- Notch oben
- Avatar-Kreis + "KI-Telefonassistent" Text
- Animierte Waveform-Bars in der Mitte (wie auf der Unterseite)
- Kleiner pulsierender Status-Text "Bereit fuer Anrufe"

Kein Call-Button noetig (ist ja nur eine Vorschau). Kompaktere Viewbox (z.B. 200x360 statt 320x580).

---

**2. ChatDemo -- Mini-Smartphone mit WhatsApp-Chat**

Statt den flachen Blasen: Ein SVG-Smartphone (aehnlich wie auf `/chatbots`), mit:
- Phone-Frame mit Stroke-Animation
- WhatsApp-aehnlicher Header (Avatar + "KI-Assistent" + Online-Status)
- 3-4 Chat-Nachrichten die nacheinander eingeblendet werden (mit Typing-Dots vor Bot-Antworten)
- Gleicher Stil wie die ChatbotHero-Komponente, nur kompakter

---

**3. WorkflowDemo -- Animierte Gears mit Datenpunkten**

Statt den drei Kreisen mit Unicode-Zeichen: Eine kompakte Version der Gear-Animation von `/automatisierungen`, mit:
- 3 ineinandergreifende SVG-Zahnraeder die sich langsam drehen
- Leuchtende Datenpunkte die entlang der Verbindungslinien wandern
- Subtiler Glow-Effekt
- Gleicher technischer Ansatz wie GearFlowVisual in AutomationsHero

---

### Technische Details

Alle Aenderungen in einer einzigen Datei: `src/components/FeaturesSection.tsx`

Die drei bestehenden Komponenten (`PhoneDemo`, `ChatDemo`, `WorkflowDemo`) werden durch neue ersetzt. Die Feature-Daten und das Layout der Section bleiben identisch.

Verwendete Technologien:
- SVG fuer die Smartphone-Frames und Gear-Shapes
- `motion/react` (Framer Motion) fuer alle Animationen (pathLength, opacity, y-Transforms, rotate)
- `useInView` fuer Scroll-getriggerte Animationen
- Die `appleEase` Easing-Kurve `[0.16, 1, 0.3, 1]` fuer butterweiche Uebergaenge

### Ergebnis
Alle drei Demos sehen wie hochwertige Previews der jeweiligen Unterseite aus -- konsistent im Stil, Apple-like in der Animation, und ein klarer visueller Anreiz zum Weiterklicken.
