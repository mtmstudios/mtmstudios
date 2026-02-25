

# Plan: Steps-Hover-Fix + Feature-Section Option A

## Teil 1: Steps-Hover-Fix (6 Dateien)

`group-hover:text-accent` wird aus dem `h3`-Titel entfernt, sodass nur die Zahl beim Hover die Farbe wechselt.

### Dateien und Zeilen:

1. **`src/components/ProcessSection.tsx`** (Zeile 64)
   - Entferne `group-hover:text-accent` aus h3 className

2. **`src/components/phone-assistant/HowItWorks.tsx`** (Zeile 64)
   - Entferne `group-hover:text-accent` aus h3 className

3. **`src/components/chatbot/ChatbotHowItWorks.tsx`** (Zeile 64)
   - Entferne `group-hover:text-accent` aus h3 className

4. **`src/components/automations/AutomationsHowItWorks.tsx`** (Zeile 64)
   - Entferne `group-hover:text-accent` aus h3 className

5. **`src/pages/Partner.tsx`** (Zeile 261)
   - Entferne `group-hover:text-accent` aus h3 className

6. **`src/pages/AboutUs.tsx`** (Zeile 250)
   - Entferne `group-hover:text-accent` aus h3 className

---

## Teil 2: Feature-Section -- Option A "Editorial"

**Datei:** `src/components/FeaturesSection.tsx` -- komplett umschreiben

### Design

Maximaler Minimalismus. Kein Glow, kein Gradient, keine Icons, keine Karten-Borders. Nur grosse Typografie und Weissraum.

```text
      Was wir fuer euch tun koennen


      KI-Telefonassistent
      Nimmt Anrufe entgegen, beantwortet Fragen
      und leitet Gespraeche weiter – rund um die
      Uhr, ohne Wartezeit.
      Mehr erfahren →

      ─────────────────────

      WhatsApp & Chatbots
      Automatisierte Chatbots, die Kundenanfragen
      sofort beantworten und euer Team spuerbar
      entlasten.
      Mehr erfahren →

      ─────────────────────

      Automatisierungen
      Workflows optimieren und wertvolle Zeit
      sparen – mit massgeschneiderten KI-Loesungen
      fuer eure Prozesse.
      Mehr erfahren →
```

### Technische Details

- **Layout**: Einfache vertikale Liste, zentriert, `max-w-3xl mx-auto`
- **Titel**: `text-4xl md:text-5xl lg:text-6xl font-bold text-foreground` -- beim Hover wechselt nur der Titel zu `text-accent` (Transition 500ms)
- **Description**: `text-lg text-muted-foreground max-w-xl mx-auto`
- **Link**: `text-accent text-sm`, Pfeil verschiebt sich beim Hover nach rechts
- **Trenner**: Feine horizontale Linie `h-px bg-border/10` zwischen den Eintraegen
- **Animation**: `whileInView` fade-in mit `appleEase`, gestaffelt per Index
- **Hover auf gesamtem Block**: `group` -- nur der Titel faerbt sich ein, sonst passiert nichts
- **Jeder Block ist ein `<Link>`** zu den Detailseiten (`/ki-telefonassistent`, `/ki-chatbot`, `/automatisierungen`)

### Keine weiteren Dateien betroffen

Die alten SVG-Demo-Imports existieren nicht mehr (wurden bereits entfernt). Nur `FeaturesSection.tsx` wird umgeschrieben.

---

## Zusammenfassung

- **7 Dateien** werden geaendert
- **6 Dateien**: Einzeilige Aenderung (Hover-Fix)
- **1 Datei**: Komplett neu (`FeaturesSection.tsx`)

