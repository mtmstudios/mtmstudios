

## ChatbotHero Smartphone-Redesign

### Problem
- Das aktuelle SVG ist nur 320x400 mit max-w-[320px] -- zu klein
- Nur 3 Nachrichten, unrealistisch kurz
- Kein echtes WhatsApp-Feeling (keine gruenen Bubbles, kein WhatsApp-Header)

### Loesung: Realistischer WhatsApp-Chat im grossen Smartphone

Das SVG wird komplett neu gebaut -- aehnlich wie beim PhoneHero mit einem echten Smartphone-Frame (320x560 viewBox), aber statt Waveform ein realistischer WhatsApp-Chatverlauf mit 6 Nachrichten.

### Neuer Chatverlauf (realistisches Terminbuchungs-Szenario)

```text
Kunde:   "Hallo, ich wuerde gerne einen Termin vereinbaren"
Bot:     "Hi! Gerne. Um welchen Service geht es?"
Kunde:   "Haare schneiden + Bart"
Bot:     "Alles klar! Wann passt es dir? Ich habe morgen 
          um 10:00 oder 14:30 Uhr frei."
Kunde:   "14:30 bitte"
Bot:     "Perfekt! Dein Termin ist gebucht:
          Morgen, 14:30 Uhr
          Haare + Bart. Bis dann!"
```

### Design-Details

**Smartphone-Frame:**
- ViewBox: 320x560, max-w auf 380px erhoehen (statt 320px)
- Hoehe: h-[500px] sm:h-[600px] (statt 400/500)
- Gleicher Stil wie PhoneHero: rounded rect mit accent stroke

**WhatsApp-Header:**
- Gruener Balken oben mit Avatar-Kreis und "KI-Assistent" Name
- "Online"-Status darunter in klein

**Nachrichten:**
- Kunden-Bubbles: rechts, hsl(secondary) Hintergrund (wie aktuell)
- Bot-Bubbles: links, leichter gruener Hintergrund (WhatsApp-typisch, accent/10)
- Nachrichten erscheinen nacheinander mit 0.8s Abstand
- Vor jeder Bot-Nachricht: kurze Typing-Dots Animation (0.6s)
- Schriftgroesse: 10px fuer laengere Texte, damit alles reinpasst

**Letzte Nachricht (Bestaetigung):**
- Leichter Glow-Effekt um die finale Termin-Bestaetigung
- Haekchen-Symbol am Ende

**Animation:**
- `once: true` wie aktuell
- Phone-Frame zeichnet sich (0-1.5s)
- Header fadet ein (1.5s)
- Nachrichten erscheinen sequenziell (ab 2s, je 0.8s Abstand)
- Typing-Dots vor Bot-Antworten
- Finale Nachricht mit Glow

### Technische Umsetzung

**Datei:** `src/components/chatbot/ChatbotHero.tsx`

- `ChatBubbleVisual` wird komplett ersetzt durch `WhatsAppPhoneVisual`
- Nachrichten als Array definiert, per `foreignObject` gerendert (fuer Textumbruch)
- Container-Div Groesse angepasst: `max-w-[380px] h-[500px] sm:h-[600px]`
- Verwendet `useInView` mit `once: true` und sequentielle Delays

Keine anderen Dateien betroffen.
