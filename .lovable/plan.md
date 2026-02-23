

## PhoneHero Redesign -- Gleiches Smartphone, Anruf-Einladung

### Konzept

Das Smartphone sieht exakt gleich aus wie beim ChatbotHero (gleicher Frame, Notch, solider Hintergrund, ViewBox 320x580, max-w-[380px]). Statt eines Chat-Verlaufs zeigt es einen eleganten **"Bereit zum Testen"**-Bildschirm -- wie eine Kontaktkarte mit Waveform-Visualisierung, die den User einlaedt, den KI-Assistenten anzurufen.

### Visueller Aufbau

```text
+---------------------------+
|         [Notch]           |
|                           |
|          (())             |  Avatar-Kreis mit Telefon-Icon
|   KI-Telefonassistent     |  Name (gross, 16px, foreground)
|     Bereit fuer Anrufe    |  Status (klein, accent, pulsierend)
|                           |
|      ~ Waveform ~         |  7 animierte Bars (dezent, "atmet")
|      ~ ~ ~ ~ ~ ~         |  mit Glow dahinter
|                           |
|     "Teste jetzt live"    |  Einladungstext (11px, muted)
|                           |
|        (  CALL  )         |  Grosser gruener Button (r=30)
|      Jetzt anrufen        |  Label darunter
|                           |
+---------------------------+
```

### Technische Details

**Datei:** `src/components/phone-assistant/PhoneHero.tsx`

**1. Gleicher Smartphone-Frame wie ChatbotHero**
- ViewBox: `320 x 580`
- Container: `max-w-[380px] h-[500px] sm:h-[600px]`
- Solider Hintergrund: `rect` mit `fill="hsl(var(--background))"`, rx=40
- Animierter Frame mit `pathLength` (0-1.5s)
- Notch bei y=24
- `useInView({ once: true })` statt direktem `animate`

**2. Kontakt-Bereich (y=100-180)**
- Avatar-Kreis (r=28) bei cy=130 mit Telefon-Emoji drin
- Name "KI-Telefonassistent" (16px, fontWeight 600, foreground)
- Status "Bereit fuer Anrufe" (10px, accent, pulsierend opacity 0.5-1)

**3. Waveform (y=220-280)**
- 7 animierte Bars wie bisher, zentriert bei y=250
- Aber sanfter: "atmet" langsam statt hektisch (duration 4s)
- Glow-Kreis dahinter bei cy=250
- Zeigt visuell: "Der Assistent ist aktiv und wartet"

**4. Einladungstext (y=340)**
- "Teste jetzt live — ruf an und erlebe die KI" (11px, muted-foreground)
- Dezent, zentriert

**5. Grosser Call-Button (y=410)**
- Gruener Kreis r=30 (groesser als vorher)
- Weisses Telefon-Icon drin
- Pulsierender Glow-Ring (repeat Infinity)
- "Jetzt anrufen" Label darunter bei y=460
- Klickbar via `foreignObject` mit `tel:` Link
- Gesamter Button-Bereich ist klickbar (nicht nur der kleine Kreis)

**6. Animations-Reihenfolge**
1. Frame zeichnet sich (0-1.5s)
2. Notch (1.3s)
3. Avatar + Name fade-in (1.6-2.0s)
4. Status pulsiert (2.0s, repeat)
5. Waveform startet (2.2s)
6. Einladungstext (2.5s)
7. Call-Button springt rein mit scale (2.8s)
8. Pulsing Ring startet (3.2s, repeat)

### Was sich aendert vs. aktuell
- ViewBox von 320x500 auf 320x580
- Container von max-w-[320px] auf max-w-[380px]
- Solider Hintergrund (kein Video-Durchscheinen)
- `useInView` statt direktem `animate`
- Neuer Kontakt-Bereich oben (Avatar + Name + Status)
- Einladungstext zwischen Waveform und Button
- Groesserer Call-Button mit besserem klickbaren Bereich
- Konsistentes Design mit der Chatbot-Seite

