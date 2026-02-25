

## Analyse

Vier Aufgaben:

1. **AboutUs Werte-Karten Schriftgröße**: Die `clamp()`-Formel erzeugt unterschiedliche Größen je nach Wortlänge ("Klarheit" vs "Geschwindigkeit"). Im Screenshot sieht man, dass die Titel-Wörter sehr unterschiedlich groß sind. Lösung: einheitliche Schriftgröße für alle Karten.

2. **Schritt-Nummern auf Mobile fast unsichtbar**: Alle Schritte-Sektionen (ProcessSection, HowItWorks Phone, HowItWorks Chatbot, HowItWorks Automations) nutzen `text-accent/15` — auf dem dunklen Hintergrund ist 15% Opacity auf Mobile kaum sichtbar. Lösung: auf Mobile höhere Opacity.

3. **Testimonials Swipe auf Mobile**: Aktuell nur Dots zum Klicken. Auf Mobile soll man swipen können. Lösung: Touch-Events (touchstart/touchmove/touchend) für Swipe-Erkennung hinzufügen.

4. **Scroll-Abdunklung auf Mobile heller**: Aktuell geht die Opacity auf allen Geräten bis 0.1 runter. Auf Mobile soll sie nicht ganz so dunkel werden. Lösung: `useIsMobile` Hook nutzen und auf Mobile `Math.max(0.25, ...)` statt `Math.max(0.1, ...)` verwenden.

---

## Plan

### 1. AboutUs Werte-Karten — einheitliche Schriftgröße
**Datei:** `src/pages/AboutUs.tsx`
- Die dynamische `clamp()`-Formel (Zeile 161) durch eine feste responsive Klasse ersetzen
- Neue Klasse: `text-3xl md:text-5xl lg:text-6xl` — gleich groß auf allen Karten

### 2. Schritt-Nummern auf Mobile sichtbarer
**Dateien:** `ProcessSection.tsx`, `phone-assistant/HowItWorks.tsx`, `chatbot/ChatbotHowItWorks.tsx`, `automations/AutomationsHowItWorks.tsx`
- `text-accent/15` → `text-accent/30 md:text-accent/15`
- Hover-Zustände bleiben unverändert (nur Desktop relevant)

### 3. Testimonials Swipe auf Mobile
**Datei:** `src/components/TestimonialsSection.tsx`
- Touch-Event-Handler hinzufügen (touchStart X speichern, touchEnd X vergleichen)
- Swipe-Threshold von 50px
- Links swipen → nächste Bewertung, rechts → vorherige

### 4. Scroll-Abdunklung auf Mobile heller
**Dateien:** Alle 6 Seiten mit Video-Hintergrund (Index, PhoneAssistant, Chatbots, Automations, AboutUs, Partner)
- `useIsMobile` importieren
- Mobile: `Math.max(0.25, 1 - (scrollPosition / maxScroll) * 0.75)`
- Desktop: bleibt bei `Math.max(0.1, 1 - (scrollPosition / maxScroll) * 0.9)`

