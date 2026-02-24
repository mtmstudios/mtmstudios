

## Funnel-Upgrade: Labels, Icons und neuer Herausforderungs-Schritt

### 1. Aenderungen an Step 1 (Service-Auswahl)

**"Ich weiss es noch nicht" wird zu "Vollumfaengliche Beratung":**
- Label: `"Vollumfängliche Beratung"`
- Icon: `Compass` (aus lucide-react) -- steht fuer Orientierung und ganzheitliche Begleitung

**"Automatisierungen" bekommt ein n8n-Icon:**
- Da n8n kein Lucide-Icon hat, wird ein inline-SVG des n8n-Logos verwendet (der bekannte gruene Knoten-Stil)
- Alternativ wird `Workflow` aus lucide-react genutzt, das dem n8n-Look sehr nahe kommt (verbundene Knoten)
- Empfehlung: `Workflow`-Icon, da es sauber ins bestehende Lucide-System passt und visuell an n8n erinnert

### 2. Neuer Step 2: "Was ist eure Herausforderung?" (zwischen Service-Wahl und Kontaktformular)

Der Funnel wird von 3 auf 4 Schritte erweitert:

```text
Step 1: Was braucht ihr? (Services)
Step 2: Was ist eure Herausforderung? (NEU)
Step 3: Kontaktdaten
Step 4: Erfolg
```

**6 Herausforderungen zur Auswahl (Multi-Select, wie Step 1):**

| Herausforderung | Icon | Warum relevant |
|---|---|---|
| "Zu viele manuelle Aufgaben" | `Repeat` | Passt zu Automatisierung + Chatbot |
| "Kundenanfragen gehen verloren" | `MessageSquareOff` (oder `MessagesSquare`) | Passt zu Chatbot + Telefon |
| "Kein 24/7 Erreichbarkeit" | `Clock` | Passt zu Telefon + Chatbot |
| "Skalierung ohne mehr Personal" | `TrendingUp` | Passt zu allen drei Services |
| "Daten und Systeme nicht verbunden" | `Unplug` | Passt zu Automatisierung |
| "Zu langsame Reaktionszeiten" | `Timer` | Passt zu Chatbot + Telefon |

**Design:** Gleicher Stil wie Step 1 -- 2x3 Grid auf Desktop, 2-Spalten auf Mobile. Multi-Select mit Checkmark-Badges. Ueberschrift: "Was ist aktuell eure groesste Herausforderung?" mit Untertitel "Waehlt alles aus, was zutrifft."

### 3. Technische Anpassungen

**Progress Bar:** Von 3 auf 4 Segmente erweitern (`[1, 2, 3, 4].map(...)`)

**State:** Neuer State `selectedChallenges: string[]` fuer die Herausforderungs-Auswahl

**Step-Navigation:**
- Step 1 -> "Weiter" -> Step 2
- Step 2 -> "Weiter" -> Step 3 (Kontaktformular)
- Step 2 -> "Zurueck" -> Step 1
- Step 3 -> "Absenden" -> Step 4 (Erfolg)
- Step 3 -> "Zurueck" -> Step 2

**Submission:** `console.log` wird um `challenges: selectedChallenges` erweitert

**Container-Hoehe:** `min-h-[400px]` wird zu `min-h-[440px]` damit der neue Step mit 6 Karten genug Platz hat

### Betroffene Datei

| Datei | Aenderung |
|---|---|
| `src/components/ContactFunnel.tsx` | Service-Labels/Icons aendern, neuen Herausforderungs-Step einfuegen, Progress Bar auf 4 Schritte, State erweitern |

