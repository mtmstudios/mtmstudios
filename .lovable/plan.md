

## 3D-Tiefe für das Smartphone-Visual

Das Problem: Der Phone-Frame ist ein flaches SVG-Rechteck — keine Tiefe, keine Kanten, kein Lichteinfall. Der ContainerScroll rotiert es zwar, aber das Objekt selbst wirkt 2D.

### Ansatz: Visuelle 3D-Cues direkt im SVG

**Datei:** `src/components/phone-assistant/PhoneHero.tsx` (PhoneVisual)
**Datei:** `src/components/chatbot/ChatbotHero.tsx` (WhatsAppPhoneVisual)

Beide Phone-SVGs bekommen dieselben Enhancements:

1. **Seitliche Kante (Bezel)** — Ein zweites, leicht versetztes Rechteck hinter dem Hauptframe, das die "Dicke" des Geräts simuliert:
   - Offset: x+3, y+4
   - Farbe: accent mit niedriger Opacity
   - Erzeugt den Eindruck einer physischen Kante

2. **Gradient auf dem Frame-Stroke** — LinearGradient von oben-links (heller) nach unten-rechts (dunkler) auf dem Rahmen-Stroke, simuliert gerichtetes Licht

3. **Boden-Schatten** — Eine Ellipse unterhalb des Phones mit Gaussian Blur als "Auflagefläche"-Schatten:
   - Position: unter dem Phone-Frame
   - Blur: 25px, accent-Farbe mit ~8% Opacity

4. **Subtiler Screen-Glanz** — Ein diagonaler LinearGradient-Overlay (transparent → weiß 3% → transparent) über dem Bildschirmbereich, simuliert Glasreflexion

### Ergebnis

Das Smartphone wirkt wie ein physisches Objekt mit Dicke, Lichteinfall und Schatten — kombiniert mit der Scroll-Rotation entsteht ein überzeugender 3D-Effekt.

