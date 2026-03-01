

## Video-Integration im Smartphone-Hero

### Was wird gemacht

Das Screen-Recording des iPhone-Anrufs wird in den bestehenden SVG-Smartphone-Frame eingebettet. Das Video ersetzt die aktuelle Animation (Avatar, Waveform-Bars, Status-Text). Der grüne Call-Button bleibt darüber und pulsiert als Handlungsaufforderung.

### Änderungen

**1. Video-Datei bereitstellen**
- `user-uploads://ScreenRecording_03-01-2026_14-40-33_1.mp4` → `public/videos/phone-demo.mp4`

**2. `src/components/phone-assistant/PhoneHero.tsx` — PhoneVisual anpassen**

Entfernt wird:
- Avatar-Kreis + Logo-Image (Zeilen ~82-105)
- Name-Text "KI-Telefonassistent" (Zeilen ~108-116)
- Status-Text "Bereit für Anrufe" (Zeilen ~119-127)
- Waveform Glow-Kreis (Zeilen ~130-137)
- Waveform-Bars (Zeilen ~140-160)
- Einladungstext "Teste jetzt live" (Zeilen ~163-170)

Eingefügt wird:
- Ein `<foreignObject>` innerhalb des SVG (x=32, y=50, width=256, height=500) mit einem `<video>`-Element
- Video: `autoPlay`, `loop`, `muted`, `playsInline`, `object-cover`
- Abgerundete Ecken passend zum Phone-Frame (~32px)

Der grüne Call-Button (Zeilen ~173-207) bleibt exakt wie er ist — pulsierend, mit `tel:`-Link, über dem Video positioniert. Position wird leicht nach unten verschoben (cy ~500 statt 420), damit er am unteren Rand des Phone-Screens sitzt.

```text
┌────────────────────────┐
│       Notch             │
│  ┌──────────────────┐  │
│  │                  │  │
│  │  VIDEO           │  │  ← foreignObject mit <video>
│  │  (iPhone-Anruf   │  │     autoPlay, loop, muted
│  │   Screen-        │  │     object-cover, rounded
│  │   Recording)     │  │
│  │                  │  │
│  │                  │  │
│  │    🟢 Anrufen    │  │  ← Grüner pulsierender Button
│  │                  │  │     mit tel:-Link (bleibt)
│  └──────────────────┘  │
└────────────────────────┘
```

### Hinweise
- Video ist `muted` für Browser-Autoplay-Policy
- `object-cover` füllt den Frame, schneidet ggf. Ränder ab — passt gut da iPhone-Recording im Hochformat ist
- Keine weiteren Dateien betroffen

