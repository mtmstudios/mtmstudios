

# Plan: Hintergrundbild vereinheitlichen, Regional-Seiten schwarz, verschwommene Ueberschriften fixen

## Ueberblick

Drei zusammenhaengende Aenderungen:

1. **Regionale Unterseiten: Hintergrundbild komplett entfernen** (schwarzer Hintergrund)
2. **Alle anderen Seiten: Standbild auf Mobil identisch zur Startseite** (bereits der Fall -- nur Konsistenz pruefen)
3. **Verschwommene Ueberschriften auf Mobil fixen** (CSS `filter: blur()` in Framer-Motion-Animationen verursacht das Problem)

---

## Analyse

### Hintergrundbild-Status aller Seiten

| Seite | Mobil-Standbild | Problem |
|---|---|---|
| **Index** (Startseite) | `md:hidden`, kein transform | Referenz -- korrekt |
| **Chatbots** | `md:hidden`, kein transform | Korrekt |
| **PhoneAssistant** | `md:hidden`, kein transform | Korrekt |
| **Automations** | `md:hidden`, kein transform | Korrekt |
| **Karriere** | `md:hidden`, kein transform | Korrekt |
| **AboutUs** | `md:hidden`, kein transform | Korrekt |
| **Partner** | `md:hidden`, kein transform | Korrekt |
| **RegionalPage** | Kein `md:hidden`, hat `transform: translateY(75%) scale(1.3)` | **Problem** -- Bild sichtbar aber verschoben |

Alle Hauptseiten verwenden bereits exakt das gleiche Standbild-Pattern wie die Startseite. Nur die **RegionalPage** weicht ab.

### Verschwommene Ueberschriften auf Mobil

`filter: blur()` in CSS ist auf Mobilgeraeten problematisch -- es verursacht Rendering-Artefakte und Text bleibt manchmal dauerhaft unscharf. Betroffen sind **15 Dateien** mit Framer-Motion-Animationen die `filter: "blur(Xpx)"` verwenden:

- `AutomationsProblem.tsx` -- h2
- `AutomationsHowItWorks.tsx` -- step content
- `AutomationsTestimonial.tsx` -- blockquote
- `TrustSection.tsx` -- h2
- `ChatbotProblem.tsx` -- h2
- `ChatbotHowItWorks.tsx` -- step content
- `ChatbotTestimonial.tsx` -- blockquote
- `PhoneAssistant HowItWorks.tsx` -- step content
- `TestimonialsSection.tsx` -- testimonial cards

Die `BlurText`-Komponente hat bereits einen Mobile-Fix eingebaut (strippt blur auf Mobile). Aber alle anderen Komponenten verwenden `filter: "blur()"` direkt in ihren motion-Props ohne Mobile-Erkennung.

---

## Aenderungen

### 1. RegionalPage.tsx -- Hintergrundbild entfernen

Den gesamten Background-Container (`<div ref={bgRef}>` mit dem `<img>`) entfernen. Der `bg-background` auf dem aeusseren Container sorgt fuer den schwarzen Hintergrund. Auch den `bgRef`, den zugehoerigen scroll-useEffect und den `useRef`-Import entfernen.

**Vorher (Zeile 64-66):**
```tsx
<div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0, willChange: "opacity" }}>
  <img src="/videos/hero-background-still.jpg" ... />
</div>
```

**Nachher:** Komplett entfernt.

Ausserdem den `bgRef` useRef und den zugehoerigen scroll-Effekt (Zeilen 33-45) entfernen.

### 2. Blur-Animationen auf Mobil entfernen (8 Dateien)

In jeder betroffenen Datei die `filter: "blur(Xpx)"` aus den `initial`/`whileInView`/`animate`/`exit`-Props der motion-Elemente entfernen. Die Opacity- und Y-Animationen bleiben erhalten -- nur der blur-Filter wird entfernt.

Betroffene Dateien und Stellen:

- **`src/components/automations/AutomationsProblem.tsx`** (Zeile 33-34): h2 blur entfernen
- **`src/components/automations/AutomationsHowItWorks.tsx`** (Zeile 57-58): step div blur entfernen
- **`src/components/automations/AutomationsTestimonial.tsx`** (Zeile 15-16): blockquote blur entfernen
- **`src/components/automations/TrustSection.tsx`** (Zeile 40-41): h2 blur entfernen
- **`src/components/chatbot/ChatbotProblem.tsx`** (Zeile 33): h2 blur entfernen
- **`src/components/chatbot/ChatbotHowItWorks.tsx`** (Zeile 57-58): step div blur entfernen
- **`src/components/chatbot/ChatbotTestimonial.tsx`** (Zeile 15-16): blockquote blur entfernen
- **`src/components/phone-assistant/HowItWorks.tsx`** (Zeile 57-58): step div blur entfernen
- **`src/components/TestimonialsSection.tsx`** (Zeile 52-54): testimonial blur entfernen

**Beispiel-Aenderung (gleich fuer alle):**

Vorher:
```tsx
initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
```

Nachher:
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
```

---

## Zusammenfassung

- **1 Datei** groessere Aenderung: `RegionalPage.tsx` (Hintergrundbild + scroll-Effekt entfernen)
- **9 Dateien** kleine Aenderungen: blur-Filter aus motion-Animationen entfernen
- Alle Hauptseiten (Index, Chatbots, PhoneAssistant, Automations, Karriere, AboutUs, Partner) behalten ihr Standbild unveraendert -- sie sind bereits identisch zur Startseite

