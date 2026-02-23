

## Automations Hero vereinfachen + Startseite behalten

### Aenderungen

**1. `src/components/automations/AutomationsHero.tsx`**
- Die gesamte `WorkflowVisual` Komponente entfernen (Zeilen 7-248)
- Den Aufruf `<WorkflowVisual />` und den umgebenden motion.div entfernen (Zeilen 272-279)
- Nur Titel + Untertitel bleiben -- clean und minimalistisch, wie die anderen Apple-Seiten
- Die imports fuer `useInView` und `useRef` entfallen ebenfalls

**2. `src/components/FeaturesSection.tsx`**
- Keine Aenderung -- die WorkflowDemo (Gears) auf der Startseite bleibt bestehen als kleine Preview-Animation

### Ergebnis
Die Automatisierungs-Unterseite hat einen cleanen, textfokussierten Hero ohne ablenkende Animation. Die Startseite behaelt ihre kompakte Gear-Animation als Teaser.

