

## Hero-Sektionen auf gleiche Hoehe bringen

### Problem
Die "Das sind Wir"-Seite hat `min-h-[70vh]` -- die Ueberschrift sitzt dadurch hoeher und die Unterueberschrift ist besser sichtbar vor dem Video-Hintergrund. Alle anderen Hero-Sektionen nutzen `min-h-screen` (100vh), wodurch die Ueberschrift tiefer sitzt und die Unterueberschrift im dunkleren Bereich des Hintergrunds verschwindet.

### Aenderungen

Alle 4 Hero-Sektionen bekommen `min-h-[70vh]` statt `min-h-screen`, damit die Ueberschriften auf der gleichen Hoehe sitzen wie bei "Das sind Wir".

**1. `src/components/HeroSection.tsx`** (Index/Startseite)
- Zeile 10: `min-h-screen` aendern zu `min-h-[70vh]`
- `py-32` auf `py-16` reduzieren, damit der Inhalt nicht zu weit nach unten gedrückt wird

**2. `src/components/phone-assistant/PhoneHero.tsx`**
- Zeile 209: `min-h-screen` aendern zu `min-h-[70vh]`

**3. `src/components/chatbot/ChatbotHero.tsx`**
- Zeile 238: `min-h-screen` aendern zu `min-h-[70vh]`

**4. `src/components/automations/AutomationsHero.tsx`**
- Zeile 103: `min-h-screen` aendern zu `min-h-[70vh]`

### Ergebnis
Alle Seiten haben die Ueberschrift auf der gleichen Hoehe. Die Unterueberschriften sind besser lesbar, da sie hoeher im sichtbaren Bereich sitzen, wo der Video-Hintergrund heller ist. Die visuellen Elemente (Smartphone, Gears etc.) rutschen entsprechend mit nach oben.
