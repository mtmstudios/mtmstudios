

## Analyse der Probleme

Nach Durchsicht aller Seiten und Sektionen identifiziere ich folgende Kernprobleme auf Mobile:

### 1. Hintergrund auf Mobile kaum sichtbar
Das Hintergrundbild (`hero-background-still.jpg`) nutzt `mixBlendMode: 'hard-light'` kombiniert mit `filter: 'brightness(0.5) contrast(2)'`. Hard-light auf schwarzem Hintergrund ergibt nahezu schwarz. Auf Desktop ist das weniger problematisch wegen des Videos mit `brightness(0.7)`, aber auf Mobile wird das Standbild mit `brightness(0.5)` zu dunkel.

### 2. Nummern "blinken" auf Mobile
Die Schritt-Nummern (01, 02, 03) nutzen `motion` Spring-Animationen mit `stiffness: 200, damping: 20`. Spring-Animationen erzeugen Schwingungen (Bounce), die auf Mobile als "Blinken" wahrgenommen werden. Zusätzlich kann `whileInView` bei schnellem Scrollen auf Mobile mehrfach triggern, wenn `viewport: { once: true }` nicht korrekt greift.

### 3. Weitere Performance-Probleme auf Mobile
- `IconCloud` (react-icon-cloud) mit 20 Icons ist GPU-intensiv auf Mobile
- `Starfield` Canvas-Animation laeuft permanent im Hintergrund (200 Sterne, Endlosanimation)
- `willChange: 'opacity'` auf dem fixen Hintergrund-Div erzeugt permanente GPU-Layer
- Mehrere `whileInView`-Animationen mit `filter: blur()` auf Desktop (bereits deaktiviert, aber `useMobileBlur` wird trotzdem aufgerufen)

---

## Plan

### 1. Hintergrundbild auf Mobile heller machen
**Dateien:** `Index.tsx`, `PhoneAssistant.tsx`, `Chatbots.tsx`, `Automations.tsx`, `AboutUs.tsx`, `Partner.tsx`
- Mobile-Bild: `filter: 'brightness(0.5) contrast(2)'` aendern zu `filter: 'brightness(0.7) contrast(1.5)'`
- `mixBlendMode: 'hard-light'` auf Mobile entfernen (zu `'normal'` aendern)
- Dazu pruefen ob `useIsMobile` bereits importiert ist, und den Stil per Inline-Bedingung setzen

### 2. Spring-Animationen auf Mobile durch lineare ersetzen
**Dateien:** `ProcessSection.tsx`, `phone-assistant/HowItWorks.tsx`, `chatbot/ChatbotHowItWorks.tsx`, `automations/AutomationsHowItWorks.tsx`, `Partner.tsx`
- Die Step-Nummern nutzen `transition: { type: "spring", stiffness: 200, damping: 20 }` — das erzeugt Bounce/Blinken
- Auf allen Geraeten: Spring durch `{ duration: 0.6, ease: appleEase }` ersetzen. Das eliminiert den Bounce-Effekt komplett
- `initial: { opacity: 0, scale: 0.85 }` bleibt, aber ohne Overshoot

### 3. IconCloud auf Mobile deaktivieren oder vereinfachen
**Datei:** `IntegrationsSection.tsx`
- Auf Mobile statt des 3D-Icon-Clouds eine einfache Grid-Darstellung der Icons zeigen
- Das spart erheblich GPU-Leistung und verhindert Ruckeln

### 4. Starfield auf Mobile deaktivieren
**Datei:** Starfield.tsx wird aktuell nirgends importiert (kein Import in den Seiten-Dateien gefunden) — kein Handlungsbedarf. Bestaetigen.

### 5. `willChange: 'opacity'` entfernen
**Dateien:** Alle 6 Seiten mit Video-Hintergrund
- `willChange: 'opacity'` entfernen vom festen Hintergrund-Div
- Auf Mobile erzeugt das einen permanenten Compositing-Layer, der Speicher verbraucht

### 6. 404-Icons in Network-Requests fixen
**Datei:** `IntegrationsSection.tsx`
- `microsoftteams` und `microsoft` erzeugen 404-Fehler bei simple-icons
- Ersetzen durch `microsoftoutlook` oder entfernen

---

## Technische Details

```text
Rendering-Pipeline auf Mobile:
┌──────────────────────┐
│ body (bg: black)     │
│ ┌──────────────────┐ │
│ │ fixed bg-div     │ │ ← isolation: isolate, willChange: opacity
│ │ ┌──────────────┐ │ │
│ │ │ img (mobile) │ │ │ ← hard-light auf schwarz = fast unsichtbar
│ │ └──────────────┘ │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Content (z:10)   │ │
│ └──────────────────┘ │
└──────────────────────┘

Nach Fix:
- img: mixBlendMode: normal, brightness(0.7), contrast(1.5)
- willChange entfernt
- Spring → ease fuer Nummern
```

Zusammenfassung: 6 Aenderungen in ca. 10 Dateien. Hauptursachen sind die zu aggressive Bildfilterung auf Mobile und die Spring-Animationen, die optisches Blinken erzeugen.

