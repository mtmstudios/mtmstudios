

## Zwei Fixes: Text-Lesbarkeit + Logo-Ueberlappung

### 1. Text-Shadow fuer alle Unterueberschriften

Alle `motion.p` Subtitles in den Hero-Sektionen bekommen einen subtilen `textShadow`, damit sie vor dem Video-Hintergrund besser lesbar sind. Kein plumpes Overlay -- nur ein weicher schwarzer Schatten hinter dem Text.

**Betroffene Dateien (5 Stellen):**

- `src/components/HeroSection.tsx` (Zeile 72): `text-muted-foreground` Paragraph -- `style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}` hinzufuegen
- `src/components/phone-assistant/PhoneHero.tsx` (Zeile 220): gleicher Fix
- `src/components/chatbot/ChatbotHero.tsx` (Zeile 247): gleicher Fix
- `src/components/automations/AutomationsHero.tsx` (Zeile 112): gleicher Fix
- `src/pages/AboutUs.tsx` (Zeile 98): gleicher Fix

Zusaetzlich bekommt die Hauptueberschrift auf der Startseite (`HeroSection.tsx`, Zeile 12, das `h1`) auch einen dezenten Shadow: `style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}`.

---

### 2. Logo-Slider Ueberlappung mit WhatsApp-Text fixen

Das Problem: `LogosSection` hat `-mt-32`, was sie 128px nach oben zieht -- direkt in den WhatsApp-Link-Bereich. Gleichzeitig hat der leere `motion.div` am Ende von `HeroSection` ein `mt-32` als Spacer.

**Fix:**
- `src/components/LogosSection.tsx` (Zeile 16): `-mt-32` aendern zu `-mt-16` (oder `mt-0`), damit die Logos nicht mehr in den WhatsApp-Text reinragen
- `src/components/HeroSection.tsx` (Zeile 109): Den leeren Spacer-`div` mit `mt-32` auf `mt-16` reduzieren, damit der Abstand zwischen CTA-Bereich und Logos stimmt

Das Ziel: Ca. 16-32px sichtbarer Abstand zwischen dem WhatsApp-Link und dem Logo-Slider.

---

### Ergebnis
- Alle Subtitles haben einen weichen Schatten und sind auch vor hellem Video gut lesbar
- Der Logo-Slider ueberlappt nicht mehr mit dem WhatsApp-Text auf der Startseite
