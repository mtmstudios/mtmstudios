

# Video-Optimierung: WebM-Fallback und Mobile-Komprimierung

## Aktuelle Situation

Alle 4 Hauptseiten laden eine einzelne MP4-Datei (`/videos/hero-background.mp4`). WebM ist typischerweise 30-50% kleiner bei gleicher Qualitaet und wird von allen modernen Browsern unterstuetzt (Safari seit iOS 15 / macOS Big Sur).

## Loesung

### 1. Neue Video-Dateien erstellen (manuell)

Du musst das Originalvideo in zwei zusaetzliche Formate konvertieren (z.B. mit FFmpeg oder einem Online-Tool wie CloudConvert):

```text
/public/videos/
  hero-background.mp4       (bestehend)
  hero-background.webm      (NEU: VP9, ~30-50% kleiner)
  hero-background-mobile.mp4 (NEU: niedrigere Aufloesung, z.B. 720p, hoehere Kompression)
```

Empfohlene FFmpeg-Befehle:

```text
# WebM (VP9)
ffmpeg -i hero-background.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -an hero-background.webm

# Mobile MP4 (720p, staerker komprimiert)
ffmpeg -i hero-background.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -an hero-background-mobile.mp4
```

### 2. Code-Aenderung: `<source>` statt `src`

Auf allen 4 Seiten das `src`-Attribut durch `<source>`-Elemente ersetzen. Der Browser waehlt automatisch das erste unterstuetzte Format:

```text
<video ref={videoRef} autoPlay loop muted playsInline ...>
  <source
    src="/videos/hero-background.webm"
    type="video/webm"
    media="(min-width: 768px)"
  />
  <source
    src="/videos/hero-background-mobile.mp4"
    type="video/mp4"
    media="(max-width: 767px)"
  />
  <source
    src="/videos/hero-background.mp4"
    type="video/mp4"
  />
</video>
```

- Desktop-Browser die WebM unterstuetzen → laden die kleinere WebM
- Mobile Geraete → laden die komprimierte 720p-Version
- Fallback → die bestehende MP4

### 3. Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/pages/Index.tsx` | `src` durch `<source>` Elemente ersetzen |
| `src/pages/PhoneAssistant.tsx` | Gleiche Aenderung |
| `src/pages/Chatbots.tsx` | Gleiche Aenderung |
| `src/pages/Automations.tsx` | Gleiche Aenderung |

### Wichtig

Die Code-Aenderung allein reicht nicht — du musst die WebM- und Mobile-MP4-Dateien zuerst erstellen und in `/public/videos/` ablegen. Ohne die Dateien faellt der Browser auf die bestehende MP4 zurueck (funktioniert also trotzdem, nur ohne Optimierung).

