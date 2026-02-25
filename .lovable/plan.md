

# Feinschliff: ProcessSection "03" Highlight + FeaturesSection Hover-Update

## Aenderungen

### 1. ProcessSection — "03" staerker hervorheben bei Hover

Aktuell wechselt die Nummer bei Hover von `text-accent/15` zu `text-accent/40` — sehr subtil und bei allen drei Schritten gleich.

Aenderung fuer Schritt 03:
- Hover-Zustand der Nummer: `text-accent/60` statt `/40` (deutlich sichtbarer als die anderen)
- Zusaetzlich ein subtiler Text-Glow bei Hover: `text-shadow: 0 0 20px hsl(var(--neon) / 0.3)`
- Der Titel ("Langfristige Partnerschaft") bekommt bei Hover ebenfalls `text-accent` — bei den anderen beiden Schritten passiert das nicht
- Dadurch sticht 03 klar als "Ziel" hervor, ohne das minimalistische Design zu brechen

Technisch: Sonderbehandlung fuer `index === 2` im JSX — eigene Hover-Klassen.

### 2. FeaturesSection — Tuerkis aus Titel entfernen, Hover-Animation verfeinern

**Titel-Farbe bei Hover:** Aktuell wechselt der Titel (`text-4xl`...`text-6xl`) zu `text-accent` (tuerkis). Das ist zu dominant fuer das Editorial-Design.

Aenderung:
- Titel bleibt weiss bei Hover — kein Farbwechsel
- Stattdessen eine dezente **Scale-Animation**: `group-hover:scale-[1.02]` mit `transition-transform duration-500` auf dem gesamten Text-Block
- Die Description fadet leicht heller: `group-hover:text-foreground/80` (von `text-muted-foreground`)
- "Mehr erfahren" behaelt sein Tuerkis — das bleibt der einzige Farbakzent

So bleibt das Tuerkis dezent und nur beim Call-to-Action, waehrend der Hover trotzdem spuerbar ist durch die sanfte Skalierung und den Helligkeitswechsel der Beschreibung.

---

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/ProcessSection.tsx` | Schritt 03: staerkerer Hover mit Glow + Titel-Akzent |
| `src/components/FeaturesSection.tsx` | Tuerkis aus Titel-Hover entfernen, Scale-Animation + Description-Aufhellung hinzufuegen |

Zwei Dateien, minimale Aenderungen, keine neuen Abhaengigkeiten.

