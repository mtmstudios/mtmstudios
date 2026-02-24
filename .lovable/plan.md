

## Zwei Aufgaben: Sektionen zentrieren + Channels erweitern

### 1. "So funktioniert's" Sektionen zentrieren (alle 4 Seiten)

Alle vier Prozess-Sektionen werden von links-ausgerichtet auf zentriert umgebaut.

**Neues Layout pro Step:**

```text
         01
   Kunde schreibt
  Ueber WhatsApp, Website-Chat
  oder andere Kanaele...
    ──────────────
         02
   KI versteht und handelt
  Beantwortet Fragen, bucht
  Termine und uebergibt...
```

**Design-Details:**
- Nummer: `text-4xl md:text-5xl lg:text-6xl font-bold text-accent/15`, zentriert ueber dem Text, mit Spring-Scale-Animation (`scale 0.85 -> 1`)
- Titel: `text-lg md:text-xl lg:text-2xl font-bold`, zentriert, Hover -> `text-accent`
- Beschreibung: `text-sm md:text-base text-muted-foreground max-w-md mx-auto`, zentriert
- Trennlinien: kurz und zentriert (`max-w-[120px] mx-auto h-px bg-border/10`)
- Hover: `whileHover={{ y: -4 }}` (leichtes Anheben), `whileTap={{ scale: 0.98 }}`
- Responsive Spacing: `py-20 md:py-28 lg:py-32 px-6`
- Steps: `flex flex-col items-center text-center py-8 md:py-12`

**Betroffene Dateien:**
| Datei | Aenderung |
|---|---|
| `src/components/ProcessSection.tsx` | Zentriertes Layout |
| `src/components/phone-assistant/HowItWorks.tsx` | Zentriertes Layout |
| `src/components/chatbot/ChatbotHowItWorks.tsx` | Zentriertes Layout |
| `src/components/automations/AutomationsHowItWorks.tsx` | Zentriertes Layout |

---

### 2. ChannelsSection: Instagram + Messenger hinzufuegen (4 Karten total)

Aktuell gibt es nur WhatsApp und Website-Chat. Es werden zwei weitere Karten hinzugefuegt:

**Neue Karte 3 -- Instagram DMs:**
- Instagram-Logo (SVG) in Pink (#E1306C)
- Mini-Chat-Mockup im Instagram-Stil (DM-Bubbles)
- Titel: "Instagram DMs"
- Beschreibung: "Antwortet automatisch auf Direktnachrichten -- auch ausserhalb eurer Geschaeftszeiten."

**Neue Karte 4 -- Facebook Messenger:**
- Messenger-Logo (SVG) in Blau (#0084FF)
- Mini-Chat-Mockup im Messenger-Stil
- Titel: "Facebook Messenger"
- Beschreibung: "Euer Bot beantwortet Anfragen direkt im Messenger -- schnell und persoenlich."

**Layout:** Das Grid bleibt `grid-cols-1 md:grid-cols-2` -- damit werden es 2x2 Karten auf Desktop und 4 einzelne auf Mobile. Jede Karte bekommt einen gestaffelten `delay` (0, 0.15, 0.3, 0.45).

**Betroffene Datei:**
| Datei | Aenderung |
|---|---|
| `src/components/chatbot/ChannelsSection.tsx` | 2 neue Channel-Karten (Instagram, Messenger) |

