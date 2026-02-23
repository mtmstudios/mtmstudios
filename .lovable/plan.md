

## Multi-Step Anfrage-Funnel -- Implementierung

### Ueberblick
Ein hochwertiger, mehrstufiger Kontakt-Funnel als Dialog-Overlay mit Premium-Animationen. Der Funnel oeffnet sich von allen "Jetzt anfragen" / "Jetzt beraten lassen" Buttons auf der gesamten Seite.

---

### Neue Dateien

**1. `src/contexts/ContactFunnelContext.tsx`**
- React Context mit `isOpen` / `setIsOpen` State
- `useContactFunnel()` Hook fuer globalen Zugriff
- `ContactFunnelProvider` Wrapper-Komponente

**2. `src/components/ContactFunnel.tsx`**
Drei-Schritte-Dialog mit hochwertigen Animationen:

**Schritt 1 -- "Was braucht ihr?"**
- 4 Auswahl-Karten im Glassmorphism-Design (Mehrfachauswahl moeglich):
  - KI-Telefonassistent
  - WhatsApp und Chatbots
  - Automatisierungen
  - Ich weiss es noch nicht
- Jede Karte hat ein Lucide-Icon, Accent-Border bei Selektion, Hover-Glow-Effekt
- AnimatePresence mit staggered Blur-in fuer die Karten
- "Weiter"-Button unten, aktiviert sobald mindestens 1 Option gewaehlt

**Schritt 2 -- "Wie erreichen wir euch?"**
- Formular mit: Name (Pflicht), E-Mail (Pflicht), Telefon (optional), Nachricht (optional)
- Zod-Validierung fuer Name und E-Mail
- Inputs mit dunklem Glassmorphism-Styling passend zum Design
- Slide-in Animation von rechts beim Uebergang von Schritt 1
- "Zurueck"- und "Absenden"-Buttons

**Schritt 3 -- "Geschafft!"**
- Animierter Checkmark (scale-in mit Glow-Effekt)
- Bestaetigunstext: "Wir melden uns innerhalb von 24h bei euch."
- "Schliessen"-Button
- Konfetti-artiger Accent-Glow-Pulse im Hintergrund

**Dialog-Design:**
- Radix Dialog als Basis
- Overlay: `bg-black/60 backdrop-blur-sm`
- Content: `bg-background/95 backdrop-blur-xl border border-border/20 rounded-3xl`
- Max-Width: `max-w-xl`, zentriert
- Fortschrittsanzeige: 3 kleine Striche oben, aktiver Schritt in Accent-Farbe mit animierter Breite
- Alle Step-Transitions via `AnimatePresence` mit `mode="wait"`, Slide + Blur-Effekt
- Close-Button oben rechts (X), dezent

---

### Aenderungen an bestehenden Dateien

**3. `src/App.tsx`**
- Import und Einbindung von `ContactFunnelProvider` (umschliesst alles)
- `ContactFunnel` Komponente einmal global rendern (innerhalb des Providers, ausserhalb der Routes)

**4. `src/components/Navigation.tsx`**
- Import von `useContactFunnel`
- Desktop: "Jetzt anfragen" Link (Zeile 131-133) wird zu `<button>` mit `onClick={() => setIsOpen(true)}`
- Mobile Sheet: "Jetzt anfragen" (Zeile 68-74) wird zu `<button>` mit Funnel-Open und Sheet-Close
- Tablet: "Jetzt anfragen" (Zeile 99-101) wird zu `<button>` mit Funnel-Open

**5. `src/components/CTASection.tsx`**
- Import von `useContactFunnel`
- "Jetzt beraten lassen" Button (Zeile 50-57): `<a href="#kontakt">` wird zu `<button onClick={() => setIsOpen(true)}>` mit dem gleichen Button-Styling

**6. `src/components/HeroSection.tsx`**
- Import von `useContactFunnel`
- "Jetzt beraten lassen" Button (Zeile 89-92): `<a href="#kontakt">` wird zu `<button onClick={() => setIsOpen(true)}>` mit dem gleichen Button-Styling

---

### Animations-Details

- **Step-Uebergaenge**: `initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}` / `animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}` / `exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}` mit `appleEase`
- **Karten-Selektion**: Border animiert von `border-border/10` zu `border-accent/60`, innerer Glow `boxShadow: "0 0 20px hsl(174 72% 48% / 0.15)"`
- **Fortschrittsbalken**: `layoutId` Animation fuer smooth width-Transition
- **Checkmark (Schritt 3)**: `scale: [0, 1.2, 1]` mit `spring`-Physik, umgeben von einem pulsierenden Accent-Ring
- **Dialog-Open**: `animate-in fade-in zoom-in-95` (Radix default, erweitert mit Blur)

### Formular-Handling

Vorerst kein Backend -- das Formular:
- Validiert client-seitig mit Zod (Name + E-Mail Pflichtfelder)
- Zeigt Erfolgs-Screen bei Submit
- Loggt Daten in die Console (spaeter einfach an Supabase/E-Mail-API anschliessbar)

