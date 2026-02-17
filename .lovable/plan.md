
## Hero-Bereich: Mobile-Fix + Deutsche CTA-Buttons

### 1. WhatsApp-Logo als Asset speichern
- Das hochgeladene Bild (`WhatsApp.svg.png`) wird als `src/assets/whatsapp-logo.png` gespeichert

### 2. Mobile Text-Fix
- Headline-Schriftgroesse von `text-5xl` auf `text-4xl` reduzieren (mobile)
- Zweite Zeile ("die Zeit sparen") bekommt `flex-wrap justify-center` damit der Text auf kleinen Bildschirmen zentriert umbricht

### 3. CTA-Buttons ersetzen
- **Button 1**: "Jetzt anfragen!" -- gelber Neon-Button mit ArrowRight-Icon, Link zu `#kontakt`
- **Button 2**: "WhatsApp schreiben" -- schwarzer Outline-Button mit WhatsApp-Logo davor, Link zu `https://wa.me/4915123456789` (Platzhalter-Nummer)

### Technische Aenderungen

**Neues Asset:**
- `src/assets/whatsapp-logo.png` (aus Upload)

**Datei: `src/components/HeroSection.tsx`**
- Import hinzufuegen: `import whatsappLogo from "@/assets/whatsapp-logo.png"`
- Zeile 14: `text-5xl` zu `text-4xl` aendern
- Zeile 30: `flex items-baseline` zu `flex flex-wrap justify-center items-baseline` aendern
- Zeilen 93-103: Beide Buttons ersetzen durch deutsche Versionen mit WhatsApp-Logo
