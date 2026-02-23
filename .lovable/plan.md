

## Untertitel auf allen Seiten besser sichtbar machen

### Problem
Die Untertitel (`text-muted-foreground` = 60% Weiss) verschwinden im hellen Bereich des Erd-Hintergrundvideos. Der aktuelle `textShadow: '0 2px 20px rgba(0,0,0,0.8)'` reicht nicht aus.

### Loesung
Zwei Aenderungen kombiniert fuer maximale Lesbarkeit ohne das Design zu brechen:

1. **Textfarbe heller**: Von `text-muted-foreground` (60% Weiss) auf `text-foreground/70` (70% Weiss) -- subtil heller, aber deutlich besser lesbar
2. **Staerkerer textShadow**: Von einem einzelnen Shadow auf einen doppelten Shadow mit groesserem Spread -- erzeugt einen sanften dunklen "Halo" hinter dem Text

Neuer Shadow-Wert:
```
textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)'
```

### Betroffene Dateien und Stellen

**1. `src/components/HeroSection.tsx` (Zeile ~60)**
- Subtitle: `className` von `text-muted-foreground` auf `text-foreground/70`
- textShadow verstaerken

**2. `src/pages/AboutUs.tsx` (Zeile ~102)**
- Hero-Subtitle: gleiche Aenderung

**3. `src/components/chatbot/ChatbotHero.tsx` (Zeile ~247)**
- Hero-Subtitle: gleiche Aenderung

**4. `src/components/phone-assistant/PhoneHero.tsx` (Zeile ~220)**
- Hero-Subtitle: gleiche Aenderung

**5. `src/components/automations/AutomationsHero.tsx` (Zeile ~17)**
- Hero-Subtitle: gleiche Aenderung

### Zusammenfassung der Aenderung pro Stelle
- `text-muted-foreground` wird zu `text-foreground/70`
- `textShadow: '0 2px 20px rgba(0,0,0,0.8)'` wird zu `textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)'`

5 Dateien, jeweils 1-2 Zeilen Aenderung. Kein Logik-Change, nur CSS.
