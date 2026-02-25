

# Design-Audit: KI-Telefonassistent & KI-Chatbot Leistungsseiten

## Befunde nach Durchsicht beider Seiten

Beide Seiten folgen demselben Aufbau: Hero → Problem → HowItWorks → Features → UseCases → Testimonial → CTA → Regional → Footer. Die Grundstruktur ist solide, aber es gibt mehrere Stellen, die nicht zum neuen Premium-Standard passen.

---

## 1. UseCases-Karten: `whileHover={{ y: -4 }}` auf nicht-klickbaren Elementen

**Betrifft:** `src/components/phone-assistant/UseCases.tsx` (Zeile 53) und `src/components/chatbot/ChatbotUseCases.tsx` (Zeile 53)

Genau das gleiche Problem, das wir bei den Prozess-Steps behoben haben. Die UseCases-Karten haben `whileHover={{ y: -4 }}`, obwohl sie nirgendwo hinlinken. Muss entfernt werden -- konsistent mit den bereits umgesetzten Aenderungen.

**Aenderung:** `whileHover={{ y: -4 }}` entfernen in beiden Dateien.

---

## 2. AutomationsSpectrum: `hover:translate-y-[-2px]` auf nicht-klickbaren Karten

**Betrifft:** `src/components/automations/AutomationsSpectrum.tsx` (Zeile 72)

Gleiches Problem, CSS-basiert statt Framer Motion. Die Tier-Karten sind nicht klickbar, haben aber `hover:translate-y-[-2px]` und `hover:bg-white/[0.06]`.

**Aenderung:** `hover:translate-y-[-2px]` entfernen, `hover:bg-white/[0.06]` kann bleiben (subtil genug).

---

## 3. Features-Sections: Demo-Boxen haben keine sichtbare Abgrenzung

**Betrifft:** `PhoneFeatures.tsx` und `ChatbotFeatures.tsx` (und `AutomationsFeatures.tsx`)

Die Demo-Animations-Boxen nutzen `bg-white/[0.03]` -- das ist so subtil, dass die Boxen auf dem dunklen Hintergrund fast unsichtbar wirken (wie im Screenshot zu sehen). Eine feine Border wuerde die Abgrenzung verbessern, ohne den cleanen Stil zu brechen.

**Aenderung:** `border border-white/[0.06]` zu den Demo-Boxen hinzufuegen, konsistent mit dem Rest der Seite (ChannelsSection, UseCases nutzen das bereits).

---

## 4. ChannelsSection Karten: koennte konsistenter sein

Die 4 Kanal-Karten in `ChannelsSection.tsx` sind bereits gut gestaltet -- sie haben Border, Backdrop-Blur, Chat-Previews. Kein Problem hier.

---

## 5. Testimonial-Section: doppeltes Anfuehrungszeichen

**Betrifft:** `PhoneTestimonial.tsx` und `ChatbotTestimonial.tsx`

Das dekorative „ (grosses Anfuehrungszeichen) steht als absolut positioniertes Element oben, und dann beginnt das Zitat nochmal mit „. Das ergibt ein doppeltes Anfuehrungszeichen. Entweder das dekorative entfernen oder das „ im Text entfernen.

**Aenderung:** Das fuehrende „ im blockquote-Text entfernen (das dekorative bleibt).

---

## Zusammenfassung der Aenderungen

| # | Datei | Aenderung |
|---|-------|-----------|
| 1 | `phone-assistant/UseCases.tsx` | `whileHover={{ y: -4 }}` entfernen |
| 2 | `chatbot/ChatbotUseCases.tsx` | `whileHover={{ y: -4 }}` entfernen |
| 3 | `automations/AutomationsSpectrum.tsx` | `hover:translate-y-[-2px]` entfernen |
| 4 | `phone-assistant/PhoneFeatures.tsx` | `border border-white/[0.06]` zur Demo-Box |
| 5 | `chatbot/ChatbotFeatures.tsx` | `border border-white/[0.06]` zur Demo-Box |
| 6 | `automations/AutomationsFeatures.tsx` | `border border-white/[0.06]` zur Demo-Box |
| 7 | `phone-assistant/PhoneTestimonial.tsx` | Doppeltes „ im Zitat-Text fixen |
| 8 | `chatbot/ChatbotTestimonial.tsx` | Doppeltes „ im Zitat-Text fixen |

8 Dateien, jeweils minimale Einzeiler-Aenderungen. Alles dient der Konsistenz mit dem neuen Premium-Standard.

