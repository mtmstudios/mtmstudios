

# Video auf Mobile pausiert anzeigen (erster Frame)

## Idee

Das Video auf Mobile laden, aber sofort pausieren — so wird der erste Frame als Standbild angezeigt und sieht identisch zum Desktop aus.

## Wichtiger Hinweis zur Ladezeit

Das Video wird trotzdem teilweise heruntergeladen, auch wenn es nicht abgespielt wird. Mit `preload="metadata"` laed der Browser nur die ersten paar KB (Header + erster Frame), nicht die gesamte Datei. Das ist ein guter Kompromiss.

## Umsetzung

Auf allen 4 Seiten wird der Mobile-Branch geaendert:

- Statt `<img>` wird das gleiche `<video>` verwendet
- Kein `autoPlay`, kein `loop`
- `preload="metadata"` statt `preload="auto"` — laedt nur den ersten Frame
- Der `useEffect` fuer `play()` wird nur auf Desktop ausgefuehrt (durch `if (isMobile) return;`)
- Gleiche CSS-Filter wie auf Desktop (`mixBlendMode`, `brightness`, `contrast`)

```text
Mobile:
  <video muted playsInline preload="metadata"
         src="/videos/hero-background.mp4"
         style={{ mixBlendMode: 'hard-light', filter: '...', pointerEvents: 'none' }} />
  // Kein play() — zeigt ersten Frame als Standbild

Desktop:
  <video ... preload="auto" />
  // useEffect → play()
```

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/pages/Index.tsx` | Mobile: Video mit `preload="metadata"`, kein play() |
| `src/pages/PhoneAssistant.tsx` | Gleiche Aenderung |
| `src/pages/Chatbots.tsx` | Gleiche Aenderung |
| `src/pages/Automations.tsx` | Gleiche Aenderung |

Der `earth-hero.jpg` Import kann danach entfernt werden, da er nicht mehr gebraucht wird.

