

# Problem: Play-Button auf dem Handy & Ladezeit

## Ursache

Das Video hat zwar `autoPlay`, `muted` und `playsInline` gesetzt — das ist korrekt. Aber iOS Safari blockiert Autoplay trotzdem manchmal, wenn:

1. **Das Video zu gross ist** und noch nicht geladen wurde, wenn der Browser `play()` aufruft
2. **Der Data-Saver-Modus** aktiv ist
3. **Low Power Mode** aktiv ist

Der sichtbare Play-Button ist der native Browser-Fallback, wenn Autoplay fehlschlaegt.

Zusaetzlich: Das Video wird als `hero-background.mp4` ohne Komprimierung geladen — je nach Dateigroesse (vermutlich mehrere MB) ist das auf Mobilfunk ein Problem fuer die Ladezeit.

## Loesung

### 1. JavaScript-Autoplay-Fallback (alle 4 Seiten)

Statt sich nur auf das HTML-Attribut `autoPlay` zu verlassen, wird per `useEffect` ein expliziter `video.play()` Aufruf gemacht. Falls dieser fehlschlaegt, wird das Video nochmal gemutet und erneut versucht. So wird der native Play-Button vermieden.

### 2. Video-Optimierung fuer Ladezeit

- `preload="auto"` hinzufuegen, damit der Browser das Video sofort laedt
- Das `<source>`-Element durch ein direktes `src`-Attribut ersetzen (zuverlaessiger fuer Autoplay auf iOS)
- CSS `pointer-events: none` auf das Video setzen, damit der native Play-Button nicht klickbar/sichtbar ist

### 3. Optional: Video-Poster als Fallback

Ein statisches Standbild (`poster`) setzen, das sofort angezeigt wird waehrend das Video laedt.

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/pages/Index.tsx` | `useEffect` mit `play()` Fallback, `preload`, `pointer-events: none` |
| `src/pages/PhoneAssistant.tsx` | Gleiche Aenderung |
| `src/pages/Chatbots.tsx` | Gleiche Aenderung |
| `src/pages/Automations.tsx` | Gleiche Aenderung (falls Video dort auch verwendet wird) |

## Technisches Detail

```text
Aktuell:
  <video autoPlay muted playsInline>  ← Browser ignoriert autoPlay manchmal
    <source src="...mp4" />
  </video>

Neu:
  <video ref={ref} muted playsInline preload="auto" src="...mp4"
         style={{ pointerEvents: 'none' }}>   ← kein nativer Play-Button
  </video>

  useEffect → ref.current.play().catch(() => {
    ref.current.muted = true;
    ref.current.play();
  })
```

Die Aenderung wird als wiederverwendbare Logik in allen 4 Seiten-Komponenten angewendet, da sie identischen Video-Code haben.

**Zur Ladezeit**: Das Video selbst sollte idealerweise auf unter 2 MB komprimiert werden (z.B. mit HandBrake oder ffmpeg). Das kann ich im Code nicht machen, aber ich kann `preload="auto"` und `poster` setzen um die wahrgenommene Ladezeit zu verbessern.

