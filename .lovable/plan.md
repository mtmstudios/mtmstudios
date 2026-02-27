

## ContainerScroll-Effekt auf ChatbotHero übertragen

**Datei:** `src/components/chatbot/ChatbotHero.tsx`

### Änderungen

1. **Import hinzufügen:** `ContainerScroll` aus `@/components/ui/container-scroll-animation`

2. **Section-Wrapper vereinfachen** (Zeile 238): Padding/min-height entfernen — ContainerScroll bringt eigene Höhe mit
   - `<section className="min-h-[70vh] flex flex-col items-center justify-start px-6 pt-[15vh] pb-16">` → `<section className="flex flex-col items-center justify-start">`

3. **Struktur umbauen** (Zeilen 238-265): Gleiche Struktur wie PhoneHero:
   - `<ContainerScroll titleComponent={...}>` bekommt den BlurText-Titel + Subtitle als `titleComponent`
   - `<WhatsAppPhoneVisual />` wird als `children` übergeben
   - Der bisherige `motion.div`-Wrapper (Zeile 256-263) mit eigenem fade-in entfällt — ContainerScroll übernimmt die Animation

4. **Chat-Animationen bleiben erhalten**: `useInView` + sequentielle Message-Delays + TypingDots laufen unabhängig vom Scroll-Transform weiter — kein Eingriff in WhatsAppPhoneVisual nötig

Ergebnis: Gleicher 3D-Reveal wie beim Telefonassistenten, Chat-Nachrichten animieren sich wie gewohnt ein sobald sichtbar.

