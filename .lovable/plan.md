

## Premium Animation Upgrades -- Chatbot und Phone Assistant

### Ueberblick

Die aktuellen Animationen sind funktional, aber zu einfach fuer eine Premium-Agentur. Hier die konkreten Upgrades fuer jede Animation:

---

### 1. Sofortige Antworten (MessageBurstAnimation)

**Aktuell:** Einfache Chat-Bubbles die nacheinander erscheinen.

**Upgrade:**
- Typing-Indikator (drei pulsierende Punkte) bevor die Bot-Antwort erscheint
- Kleine Avatar-Kreise (Bot-Icon / User-Icon) links/rechts neben den Nachrichten
- Zeitstempel unter jeder Nachricht (z.B. "gerade eben")
- Subtiler Glow-Effekt beim Erscheinen neuer Nachrichten
- Glassmorphism-Hintergrund fuer den gesamten Chat-Container mit feinem Border

---

### 2. Kontextverstaendnis (BrainNetworkAnimation)

**Aktuell:** Statische SVG-Knoten die nacheinander aufleuchten.

**Upgrade:**
- Animierte Datenpartikel (kleine leuchtende Punkte) die entlang der Verbindungslinien wandern
- Labels an den Knoten (z.B. "Absicht", "Kontext", "Antwort", "Verlauf", "Wissen", "Aktion")
- Pulsierender Glow-Ring um den aktiven Knoten
- Verbindungslinien werden als animierte gestrichelte Linien dargestellt (strokeDasharray + strokeDashoffset Animation)
- Zentraler "Gehirn"-Knoten der groesser ist und staerker leuchtet

---

### 3. Nahtlose Uebergabe (HandoffAnimation)

**Aktuell:** Zwei Icons mit einem wandernden Punkt dazwischen -- sehr minimalistisch.

**Upgrade:**
- Drei Phasen-Animation: (1) Bot bearbeitet Anfragen, (2) Erkennung einer komplexen Frage, (3) Uebergabe mit Kontext-Paket
- Mini-Chat-Verlauf der visuell vom Bot zum Menschen "uebergleitet" (Kontext-Karte die sich bewegt)
- Status-Labels unter den Icons die sich aendern ("Aktiv" -> "Uebergibt..." -> "Uebernommen")
- Fortschrittsbalken zwischen den beiden Knoten statt nur eines wandernden Punktes
- Checkmark-Animation beim erfolgreichen Handoff

---

### 4. Multi-Channel (ChannelIconsAnimation)

**Aktuell:** Icons im Kreis um einen Bot, nacheinander hervorgehoben.

**Upgrade:**
- Orbiting-Effekt: Die Channel-Icons rotieren langsam um den zentralen Bot
- Animierte Nachrichtenlinien (gestrichelt, pulsierend) von jedem Kanal zum Zentrum
- Kleine Benachrichtigungs-Badges (z.B. "3", "12") die bei Aktivierung an den Icons aufpoppen
- Der zentrale Bot-Knoten pulsiert rhythmisch
- Beim aktiven Kanal: kurze Mini-Nachricht die eingeblendet wird (z.B. "Neue Nachricht via WhatsApp")

---

### 5. Intelligente Weiterleitung (FlowDotsAnimation -- Phone)

**Aktuell:** Drei Knoten mit Emojis und einem wandernden Punkt.

**Upgrade:**
- Verzweigungsdiagramm: Der Punkt kommt bei "KI" an, eine Entscheidungsanimation zeigt zwei Wege (direkt antworten ODER weiterleiten)
- Animierte Pfade die aufleuchten wenn der Punkt sie passiert
- Die Knoten bekommen Lucide-Icons statt Emojis (Bot, GitBranch, User)
- Pulsierende Ringe am Entscheidungsknoten
- Beschriftete Pfade ("Einfach" / "Komplex") die kurz eingeblendet werden

---

### Betroffene Dateien

| Datei | Aenderung |
|---|---|
| `src/components/chatbot/MessageBurstAnimation.tsx` | Komplett ueberarbeitet -- Typing-Indikator, Avatare, Timestamps, Glow |
| `src/components/chatbot/BrainNetworkAnimation.tsx` | Komplett ueberarbeitet -- Partikel, Labels, animierte Linien, zentraler Knoten |
| `src/components/chatbot/HandoffAnimation.tsx` | Komplett ueberarbeitet -- 3-Phasen-Flow, Kontext-Karte, Status-Labels |
| `src/components/chatbot/ChannelIconsAnimation.tsx` | Komplett ueberarbeitet -- Orbit, Notification-Badges, Mini-Nachrichten |
| `src/components/phone-assistant/FlowDotsAnimation.tsx` | Komplett ueberarbeitet -- Verzweigung, Lucide-Icons, beschriftete Pfade |

### Design-Prinzipien

- Alle Animationen nutzen weiterhin `appleEase` und `motion/react`
- Accent-Farbe als primaere Highlight-Farbe
- Glassmorphism-Stil (bg-white/[0.03], backdrop-blur, feine Borders)
- Smooth, nicht hektisch -- jede Animation laeuft in 4-6 Sekunden Zyklen
- Keine externen Dependencies noetig -- alles mit Framer Motion + SVG + Tailwind

