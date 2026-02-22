

## Telefon-Bild im Hero vergroessern und besser positionieren

Das Bild ist aktuell zu klein (max 380px) und die Struktur weicht von den anderen Hero-Sektionen ab. Hier die Anpassungen:

---

### Aenderungen in `src/components/phone-assistant/PhoneHero.tsx`

**1. Struktur angleichen an ChatbotHero/AutomationsHero:**
- Section bekommt `pb-16` hinzu
- Innerer Wrapper `max-w-4xl mx-auto text-center flex flex-col items-center gap-8` (wie die anderen Heros)
- `mt-6` vom Paragraph und `mt-10 sm:mt-16` vom Bild-Container entfernen (wird durch `gap-8` ersetzt)

**2. Bild deutlich groesser machen:**
- Von `w-[280px] sm:w-[340px] md:w-[380px]` auf `w-[340px] sm:w-[420px] md:w-[480px]`
- Das Bild wird damit ~25% groesser und fuellt den Hero prominenter aus

**3. Glow proportional vergroessern:**
- Von `w-[200px] h-[200px] sm:w-[280px] sm:h-[280px]` auf `w-[280px] h-[280px] sm:w-[380px] sm:h-[380px]`
- Damit der Glow-Effekt zum groesseren Bild passt

**4. Bild-Container als `motion.div` mit gleichem Wrapper-Stil wie ChatbotHero:**
- `w-full` fuer volle Breite im Container

### Ergebnis

Das Telefon-Bild wird deutlich prominenter und zentraler im Hero angezeigt, passend zum Look der anderen Produkt-Seiten.

