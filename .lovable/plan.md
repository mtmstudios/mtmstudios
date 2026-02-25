

# Fix: Video auf Safari Mobile abspielen

## Problem

Der Code sieht korrekt aus — `muted`, `playsInline`, `loop` sind gesetzt und `play()` wird aufgerufen. Aber Safari iOS hat bekannte Eigenheiten:

1. **`autoPlay` Attribut fehlt**: Safari bevorzugt das deklarative `autoPlay` Attribut direkt am `<video>` Element, statt nur `video.play()` im JavaScript.
2. **Timing-Problem**: Der `useEffect` feuert bevor das Video geladen ist. Safari braucht ein `onCanPlay`/`onLoadedData` Event als Fallback.
3. **`webkit-playsinline`**: Aeltere iOS-Versionen brauchen dieses Attribut zusaetzlich.

## Loesung

Auf allen 4 Seiten (`Index.tsx`, `PhoneAssistant.tsx`, `Chatbots.tsx`, `Automations.tsx`):

1. **`autoPlay` Attribut direkt am Video-Element setzen** — Safari vertraut dem deklarativen Attribut mehr als JavaScript
2. **`onLoadedData` Callback hinzufuegen** — als Fallback, falls autoPlay nicht greift, wird `play()` nochmal versucht sobald Daten geladen sind
3. **`webkit-playsinline` Attribut setzen** — fuer aeltere iOS-Versionen

```text
<video
  ref={videoRef}
  autoPlay          // NEU: deklaratives autoplay
  loop
  muted
  playsInline
  // @ts-ignore
  webkit-playsinline=""   // NEU: iOS Kompatibilitaet
  preload="auto"
  src="/videos/hero-background.mp4"
  onLoadedData={(e) => {  // NEU: Fallback wenn autoPlay nicht greift
    const video = e.currentTarget;
    video.play().catch(() => {});
  }}
  ...
/>
```

Der bestehende `useEffect` mit `attemptAutoplay` bleibt als dritte Absicherung.

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/pages/Index.tsx` | `autoPlay`, `onLoadedData`, `webkit-playsinline` hinzufuegen |
| `src/pages/PhoneAssistant.tsx` | Gleiche Aenderung |
| `src/pages/Chatbots.tsx` | Gleiche Aenderung |
| `src/pages/Automations.tsx` | Gleiche Aenderung |

