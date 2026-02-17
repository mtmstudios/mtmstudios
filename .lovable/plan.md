

## Button-Styling Anpassungen

### 1. Navigation: "Kontakt" -> "Jetzt anfragen" + Hover-Fix

**`src/components/Navigation.tsx`**

- Button-Text von "Kontakt" zu "Jetzt anfragen" aendern
- Hover-Styling fixen: `hover:bg-neon hover:text-black` damit die Schrift bei gelbem Hintergrund sichtbar bleibt

### 2. Hero: CTA-Button Text aendern

**`src/components/HeroSection.tsx`**

- "Jetzt anfragen!" aendern zu "Jetzt beraten lassen!"

### 3. Hero: WhatsApp-Button in WhatsApp-Gruen

Gute Idee mit dem WhatsApp-Gruen -- das ist markenkonform und sofort wiedererkennbar.

- Statt dem aktuellen Outline-Style bekommt der Button einen gruenen Rand und gruene Schrift
- Hover: dezent dunkleres Gruen, aber nicht komplett ausgefuellt
- WhatsApp-Gruen: `#25D366` (offizielles WhatsApp-Gruen)
- Klassen: `border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10` -- der Button bleibt transparent mit gruenem Rand und wird beim Hover nur leicht gruen hinterlegt

### Zusammenfassung der Aenderungen

| Element | Vorher | Nachher |
|---|---|---|
| Nav-Button Text | "Kontakt" | "Jetzt anfragen" |
| Nav-Button Hover | Gelb ohne sichtbare Schrift | Gelb mit schwarzer Schrift |
| Hero CTA Text | "Jetzt anfragen!" | "Jetzt beraten lassen!" |
| WhatsApp Button | Weisser Outline, Hover neon-gelb | Gruener Outline (#25D366), dezenter Gruen-Hover |

