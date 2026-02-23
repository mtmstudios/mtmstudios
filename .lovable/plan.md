

## Schritt-Karten im "Warum wir"-Stil anpassen

### Was sich aendert

Die 01/02/03-Karten auf allen Seiten bekommen das gleiche Design wie die "Warum wir"-Sektion auf der About-Seite: grosse Zahl links, Titel und Beschreibung rechts, getrennt durch feine Linien, mit Hover-Slide-Effekt.

### Vorher vs. Nachher

**Vorher:** Drei separate Karten mit Glassmorphism-Hintergrund, kleiner Monospace-Nummer oben, Titel und Text darunter.

**Nachher:** Vertikale Liste mit feinen Trennlinien. Grosse, fette Nummer (01, 02, 03) in Accent-Farbe links, Titel und Beschreibung rechts daneben. Beim Hover gleitet die Zeile leicht nach rechts und die Nummer wird heller.

### Betroffene Dateien

| Datei | Aenderung |
|---|---|
| `src/components/ProcessSection.tsx` | Karten-Grid durch Zeilen-Layout mit grossen Nummern ersetzen |
| `src/components/phone-assistant/HowItWorks.tsx` | Gleiches Redesign |
| `src/components/chatbot/ChatbotHowItWorks.tsx` | Gleiches Redesign |
| `src/components/automations/AutomationsHowItWorks.tsx` | Gleiches Redesign |

### Design-Details

Jede Sektion bekommt dieses Layout (identisch zur "Warum wir"-Sektion):

- Container: `max-w-4xl mx-auto`
- Jede Zeile: `border-t border-border/10` als Trenner oben
- Letzte Zeile: zusaetzlich `border-b` unten
- Nummer: `text-5xl md:text-6xl font-bold text-accent/20` mit Hover-Uebergang zu `text-accent/50`
- Titel: `text-xl md:text-2xl font-bold`, wechselt bei Hover zu `text-accent`
- Beschreibung: `text-muted-foreground leading-relaxed`
- Hover-Animation: `whileHover={{ x: 8 }}` mit `appleEase`
- Staggered Blur-in Animation beim Reinscollen (`whileInView`)

Die Section-Ueberschriften ("Von der Idee zur Loesung", "So funktionierts") bleiben wie sie sind -- nur die Karten darunter aendern sich.

