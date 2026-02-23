

## Logo-Ueberlappung endgueltig fixen

### Problem
Die Logos werden durch `-mt-16` auf `LogosSection` immer noch nach oben in den WhatsApp-Text gezogen. Der Spacer-`div` am Ende der HeroSection mit `mt-16` reicht nicht aus.

### Loesung

**1. `src/components/LogosSection.tsx` (Zeile 16)**
- `-mt-16` komplett entfernen, stattdessen `mt-0 mb-16` setzen
- Die Logos sollen unter dem Hero-Inhalt sitzen, nicht darueber

**2. `src/components/HeroSection.tsx` (Zeile 109)**
- Den leeren Spacer-`div` mit `mt-16` entfernen oder auf `mt-8` reduzieren -- er ist nicht mehr noetig, wenn die Logos keinen negativen Margin mehr haben

### Ergebnis
Klarer Abstand zwischen WhatsApp-Link und Logo-Slider, keine Ueberlappung mehr.

