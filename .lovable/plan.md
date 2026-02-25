

# Video auf Mobile ersetzen & Scroll-Blinken beheben

## Probleme

1. **Video spielt auf Mobile nicht ab** — iOS Safari blockiert Autoplay trotz aller Fixes. Das fuehrt zu einem schwarzen Hintergrund oder einem sichtbaren Play-Button.
2. **Sections blinken beim Scrollen** — Der Scroll-Handler aendert die Video-Opacity per `style.opacity` bei jedem Scroll-Event. Das verursacht Repaints auf dem `fixed`-Video-Layer, was auf Mobilgeraeten zu Flickering fuehrt.

## Loesung

### 1. Bedingtes Video vs. Standbild

Den bestehenden `useIsMobile()` Hook nutzen, um auf Mobile ein statisches Hintergrundbild (`earth-hero.jpg`, bereits vorhanden) statt des Videos anzuzeigen. Video nur auf Tablet/Desktop laden.

```text
Mobile (<768px):
  <img src="/assets/earth-hero.jpg" /> mit gleichen Filtern

Tablet/Desktop (≥768px):
  <video ... /> wie bisher
```

Vorteil: Kein Video-Download auf Mobile (spart mehrere MB), kein Play-Button-Problem, sofortige Anzeige.

### 2. Scroll-Blinken beheben

Das Flickering entsteht durch direkte DOM-Manipulation (`element.style.opacity`) im Scroll-Handler. Fix:

- `requestAnimationFrame` um den Scroll-Handler wrappen — verhindert mehrfache Repaints pro Frame
- `will-change: opacity` auf den Hintergrund-Container setzen — GPU-Compositing aktivieren

### Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/pages/Index.tsx` | `useIsMobile()` → Video oder Bild, rAF im Scroll-Handler |
| `src/pages/PhoneAssistant.tsx` | Gleiche Aenderung |
| `src/pages/Chatbots.tsx` | Gleiche Aenderung |
| `src/pages/Automations.tsx` | Gleiche Aenderung |

### Technisches Detail

```text
// Hintergrund-Container (alle 4 Seiten):

const isMobile = useIsMobile();

<div className="fixed inset-0 ..." style={{ willChange: 'opacity' }}>
  {isMobile ? (
    <img src="/assets/earth-hero.jpg"
         className="w-full h-full object-cover"
         style={{ filter: 'brightness(0.7) contrast(2)' }} />
  ) : (
    <video ref={videoRef} loop muted playsInline
           preload="auto" src="/videos/hero-background.mp4" ... />
  )}
</div>

// Scroll-Handler mit rAF:
useEffect(() => {
  let rafId: number;
  const handleScroll = () => {
    rafId = requestAnimationFrame(() => {
      // opacity-Berechnung
    });
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', handleScroll);
    cancelAnimationFrame(rafId);
  };
}, []);
```

Das Bild `earth-hero.jpg` wird aus `src/assets/` importiert (bereits im Projekt vorhanden). Es wird mit denselben CSS-Filtern (`brightness(0.7) contrast(2)`) versehen, damit der Look konsistent bleibt.

