

## Änderungen

**1. Scroll-Animation dunkler machen** — auf allen Seiten mit Video-Hintergrund den Minimalwert von `0.3` auf `0.1` senken:

Betroffene Dateien mit `Math.max(0.3, ...)`:
- `src/pages/Index.tsx`
- `src/pages/PhoneAssistant.tsx`
- `src/pages/Chatbots.tsx`
- `src/pages/Automations.tsx`
- `src/pages/AboutUs.tsx`

Neue Formel jeweils:
```
const opacity = Math.max(0.1, 1 - (scrollPosition / maxScroll) * 0.9);
```

**2. PhoneAssistant Hero-Text ändern**

In `src/components/phone-assistant/PhoneHero.tsx`:
- „Euer KI-Telefonassistent" → „Dein KI-Telefonassistent"

