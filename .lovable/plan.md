

## Anruf-Button im Smartphone-Visual

Ein klickbarer gruener Anruf-Button wird ins bestehende Handy-SVG eingebaut. Die Telefonnummer ist als Prop konfigurierbar.

### Aenderungen

**`src/components/phone-assistant/PhoneHero.tsx`**
- Neue optionale Prop: `testPhoneNumber` (z.B. `"+491234567890"`)
- Im SVG unterhalb des "Anruf laeuft"-Texts (bei y~390-440):
  - Gruener Kreis (r=28) als Anruf-Button mit Telefon-Icon (SVG path)
  - Text "Jetzt testen" darunter (y~445)
  - Pulsierender Glow-Effekt via animiertem aeusseren Kreis
  - `foreignObject` mit `<a href="tel:...">` fuer echte Klickbarkeit
- Animation: Button fadet nach den Waveform-Animationen ein (delay ~3s)

**`src/pages/PhoneAssistant.tsx`**
- Uebergibt die Telefonnummer als Prop:
  ```
  <PhoneHero testPhoneNumber="+491234567890" />
  ```
- Die Nummer laesst sich spaeter einfach austauschen

### Design-Details
- Gruener Kreis im iOS-Anruf-Stil, Farbe: `#22c55e` (green-500)
- Weisses Telefon-Icon im Kreis
- Dezenter Pulse (Opacity 0.3 bis 0.6 auf aeusserem Ring)
- Auf Mobile: `tel:`-Link startet direkt den Anruf
- Auf Desktop: oeffnet die Standard-Telefon-App oder zeigt die Nummer
