

## Zwei Aufgaben: Integrationen-Sektion neu + Mobile/Tablet-Optimierung

### Aufgabe 1: Integrationen-Sektion mit neuem Icon-Cloud-Prompt ersetzen

Die bestehende `interactive-icon-cloud.tsx` wird mit der neuen Version aus dem Prompt aktualisiert — mit Theme-Support via `next-themes` (bereits installiert). Die `IntegrationsSection.tsx` behält die bestehenden Slugs und das Mobile-Grid-Fallback, nutzt aber die neue theme-aware `IconCloud`.

**Datei: `src/components/ui/interactive-icon-cloud.tsx`**
- `useTheme` von `next-themes` importieren (bereits installiert)
- `renderCustomIcon` erhält `theme`-Parameter für dynamische Farben (light: `#f3f2ef`/`#6e6e73`, dark: `#080510`/`#ffffff`)
- `IconCloud` nutzt `useTheme()` und gibt `theme` an `renderCustomIcon` weiter
- `paddingTop: 40` in containerProps hinzufügen

**Datei: `src/components/IntegrationsSection.tsx`**
- Keine Änderungen nötig — importiert bereits `IconCloud` aus der UI-Datei
- Mobile Grid-Fallback bleibt bestehen (performant auf Touch-Geräten)
- Desktop zeigt weiterhin die 3D-Cloud

---

### Aufgabe 2: Zahlengrößen vereinheitlichen

**Datei: `src/pages/Partner.tsx`** (Zeile 351)
- Trust-Zahlen von `text-5xl md:text-6xl lg:text-7xl` auf `text-4xl md:text-5xl lg:text-6xl`

**Datei: `src/components/automations/TrustSection.tsx`** (Zeile 58)
- Zahlen von `text-4xl md:text-5xl` auf `text-4xl md:text-5xl lg:text-6xl`
- Farbe von `text-neon` auf `text-accent` (Konsistenz mit Partner-Seite)

---

### Aufgabe 3: Mobile Hover-Effekte entfernen

Touch-Geräte lassen Hover-States "kleben" — Karten wirken anklickbar, sind es aber nicht.

**`hover:border-accent/30` → `md:hover:border-accent/30`** in:
- `src/pages/Partner.tsx` — Benefits-Karten (Zeile 306) und Trust-Karten (Zeile 346)
- `src/pages/AboutUs.tsx` — Werte-Karten (Zeile 161)
- `src/components/regional/RegionalPage.tsx` — Feature-Karten (Zeile 207)

**`group-hover:text-*` → `md:group-hover:text-*`** in:
- `src/pages/Partner.tsx` — Pain-Points `group-hover:text-destructive` (Zeile 202), Steps `group-hover:text-accent/60` (Zeile 252)
- `src/components/ProcessSection.tsx` — `group-hover:text-accent/60` und `group-hover:text-accent` (Zeilen 53-54, 70)
- `src/components/chatbot/ChatbotHowItWorks.tsx` — `group-hover:text-accent/60` (Zeile 48)
- `src/components/phone-assistant/HowItWorks.tsx` — `group-hover:text-accent/60` (Zeile 48)
- `src/components/automations/AutomationsHowItWorks.tsx` — `group-hover:text-accent/60` (Zeile 48)
- `src/pages/AboutUs.tsx` — `group-hover:text-accent/[0.20]` (Zeile 164)

---

### Aufgabe 4: Mobile Spacing optimieren

Section-Padding `py-32` → `py-20 md:py-32` für kompaktere Mobile-Ansicht in:
- `src/pages/Partner.tsx` — Problem-Section (Zeile 177), Benefits (Zeile 289), Trust (Zeile 331)
- `src/components/automations/TrustSection.tsx` (Zeile 36)
- `src/components/IntegrationsSection.tsx` (Zeile 27)

