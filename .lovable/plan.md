

# Plan: E-Mail und WhatsApp-Nummer ueberall aktualisieren

Alle Stellen im Projekt werden auf die korrekten Kontaktdaten umgestellt.

---

## Aenderungen

### E-Mail: `info@mtmstudios.de` wird zu `hallo@mtmstudios.de`

| Datei | Stelle |
|-------|--------|
| `src/components/Footer.tsx` | `mailto:info@mtmstudios.de` |
| `src/pages/Impressum.tsx` | "E-Mail: info@mtmstudios.de" |
| `src/pages/Datenschutz.tsx` | 2x info@mtmstudios.de (Verantwortlicher + Rechte der Betroffenen) |

### WhatsApp-Nummer: alle wa.me-Links auf `4915567077414`

| Datei | Alter Link | Neu |
|-------|-----------|-----|
| `src/components/HeroSection.tsx` | `wa.me/4915123456789` | `wa.me/4915567077414` |
| `src/components/CTASection.tsx` | `wa.me/4915123456789` | `wa.me/4915567077414` |
| `src/components/Footer.tsx` | `wa.me/4912345678` | `wa.me/4915567077414` |
| `src/components/regional/RegionalPage.tsx` | `wa.me/4915510027986` (2x) | `wa.me/4915567077414` |

### Telefon-Testbot (PhoneAssistant)

| Datei | Alter Wert | Neu |
|-------|-----------|-----|
| `src/pages/PhoneAssistant.tsx` | `+491234567890` | `+4915567077414` |

---

## Zusammenfassung

**7 Dateien aendern, 8 Ersetzungen insgesamt.** Keine neuen Dateien.

