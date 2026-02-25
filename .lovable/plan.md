

# Fix: Dunkler Bildschirm auf Safari Mobile & WhatsApp-Button

## Probleme

1. **Dunkler Bildschirm auf Safari**: Der Code ueberspringt `play()` auf Mobile (`if (isMobile) return;` in Zeile 21). Das Video wird mit `preload="metadata"` geladen, zeigt aber auf iOS Safari keinen ersten Frame — nur schwarzen Hintergrund.

2. **WhatsApp-Button geht nicht**: Der WhatsApp-Link in `HeroSection.tsx` und `CTASection.tsx` liegt auf `zIndex: 10`, aber das Video-Overlay mit `pointerEvents: 'none'` koennte trotzdem Klicks blockieren, oder der Link wird durch ein anderes Element ueberdeckt.

## Loesung

### 1. Video auf Mobile abspielen

Den `if (isMobile) return;` Guard entfernen. Stattdessen auf allen Geraeten `play()` versuchen — mit `muted` und `playsInline` funktioniert Autoplay auf iOS Safari zuverlaessig.

Aenderungen in allen 4 Seiten (`Index.tsx`, `PhoneAssistant.tsx`, `Chatbots.tsx`, `Automations.tsx`):

```text
// VORHER:
ref={isMobile ? undefined : videoRef}   // Mobile bekommt keine ref
loop={!isMobile}                         // Mobile kein loop
preload={isMobile ? "metadata" : "auto"} // Mobile nur metadata

useEffect(() => {
  if (isMobile) return;  // <-- Blockiert play() auf Mobile
  ...
});

// NACHHER:
ref={videoRef}          // Immer ref setzen
loop                    // Immer loopen
muted
playsInline
preload="auto"          // Immer preloaden

useEffect(() => {
  // Kein isMobile-Guard mehr
  const video = videoRef.current;
  if (!video) return;
  const attemptAutoplay = async () => {
    try { await video.play(); } catch {
      video.muted = true;
      try { await video.play(); } catch {}
    }
  };
  attemptAutoplay();
}, []);
```

### 2. WhatsApp-Button klickbar machen

Der WhatsApp-Link (`<a href="https://wa.me/...">`) liegt innerhalb von `zIndex: 10`. Das sollte ueber dem Video-Layer (`zIndex: 0`) liegen. Zur Sicherheit `position: relative` und `zIndex` auf die Links setzen, falls ein Overlay sie blockiert.

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/pages/Index.tsx` | `isMobile`-Guards entfernen, Video immer abspielen |
| `src/pages/PhoneAssistant.tsx` | Gleiche Aenderung |
| `src/pages/Chatbots.tsx` | Gleiche Aenderung |
| `src/pages/Automations.tsx` | Gleiche Aenderung |
| `src/components/HeroSection.tsx` | WhatsApp-Link: `position: relative; zIndex: 20` sicherstellen |
| `src/components/CTASection.tsx` | WhatsApp-Link: gleiche Absicherung |

