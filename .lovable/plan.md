

## Chatbot-Unterseite: WhatsApp und Chatbots

Aufgebaut nach dem gleichen Muster wie die Telefonassistent-Seite -- 8 Sektionen, eigene massgeschneiderte Animationen, Apple-like Premium-Qualitaet.

---

### Seitenstruktur

```text
1. Hero -- Grosser Titel + Subline + animiertes Chat-Visual
2. Problem -- Warum braucht man das?
3. So funktioniert's -- 3 Schritte (inkl. Terminbuchung)
4. Features -- 4 Features mit eigenen Animationen
5. Kanaele -- WhatsApp + Website-Chat als Dual-Ansicht
6. Anwendungsfaelle -- Branchen-Grid
7. Testimonial -- Ein grosses Zitat
8. CTA + Footer -- Wiederverwendet
```

---

### Sektion 1: Hero

- Headline: `Chatbots, die wirklich helfen.` -- BlurText-Animation, `text-3xl sm:text-5xl md:text-7xl font-bold`
- Subline: `WhatsApp und Website-Chat -- automatisiert, intelligent, 24/7 erreichbar.`
- Animiertes Visual: **Chat-Bubble-Visual** -- ein stilisiertes SVG-Chat-Interface mit zwei Sprechblasen die sich nacheinander aufbauen. Eine User-Bubble (rechts, dunkel) und eine Bot-Bubble (links, accent-Farbe) mit Typing-Dots die zu Text werden. Die Bubbles zeichnen sich mit `pathLength`-Animation, danach erscheint der Inhalt.
- Groesse: `max-w-[400px] h-[400px] sm:h-[500px]`
- Kein CTA-Button im Hero

---

### Sektion 2: Problem

- Headline: `Kunden warten nicht.`
- Text: "Langsame Antworten, ueberlastete Service-Teams, immer die gleichen Fragen. Kunden erwarten sofortige Hilfe -- auf dem Kanal, den sie schon nutzen."
- Statistik mit CountUp: `78% der Kunden bevorzugen Messaging gegenueber Telefonieren.`
- Gleicher Stil wie ProblemSection der Telefonassistent-Seite (fade-up mit blur)

---

### Sektion 3: So funktioniert's (mit Terminbuchung)

3 Karten, identischer Stil wie HowItWorks der Telefonassistent-Seite:

| Schritt | Titel | Beschreibung |
|---------|-------|-------------|
| 01 | Kunde schreibt | Ueber WhatsApp, Website-Chat oder andere Kanaele -- der Bot antwortet sofort. |
| 02 | KI versteht und handelt | Beantwortet Fragen, bucht Termine und uebergibt bei Bedarf an euer Team. |
| 03 | Alles dokumentiert | Gespraechsverlauf, gebuchte Termine und Kundendaten -- automatisch in eurem System. |

- Schritt 02 erwaehnt jetzt explizit "bucht Termine"
- Schritt 03 erwaehnt "gebuchte Termine" neben Gespraechsverlauf und Kundendaten
- Letzter Schritt mit Neon-Highlight, gestaggertes fade-up

---

### Sektion 4: Features (4 Features mit eigenen Animationen)

Zweispalter-Layout wie PhoneFeatures, alternierend. Jedes Feature bekommt eine einzigartige Animation:

**Feature 1: Sofortige Antworten**
- Text: "Kein Warten, keine Warteschlange. Der Bot antwortet in Sekunden -- rund um die Uhr, auf jeder Plattform."
- Animation: **MessageBurstAnimation** -- 3-4 Chat-Bubbles die nacheinander von unten einfliegen, abwechselnd links/rechts (User/Bot). Jede Bubble erscheint mit einem sanften Scale + Fade. Die letzte Bot-Bubble hat einen dezenten Accent-Glow. Loop mit Pause.

**Feature 2: Kontextverstaendnis**
- Text: "Der Bot versteht den Kontext -- erkennt Absichten, merkt sich den Gespraechsverlauf und gibt relevante Antworten."
- Animation: **BrainNetworkAnimation** -- 5-6 Punkte (Neuronen) verbunden durch duenne Linien. Zufaellige Punkte leuchten nacheinander auf (accent-glow), und die Verbindungslinien zum naechsten Punkt leuchten kurz mit. Simuliert "Denken/Verstehen". Alles in SVG + motion.

**Feature 3: Nahtlose Uebergabe**
- Text: "Wenn der Bot nicht weiterweiss, uebergibt er an einen echten Menschen -- mit dem kompletten Kontext."
- Animation: **HandoffAnimation** -- Zwei Icons (Bot-Icon links, Person-Icon rechts) mit einer Verbindungslinie. Ein leuchtender Punkt wandert vom Bot zur Person, dann pulsiert das Person-Icon kurz. Aehnlich wie FlowDotsAnimation, aber mit nur 2 Nodes und Bot/Mensch Thematik.

**Feature 4: Multi-Channel**
- Text: "Ein Bot, alle Kanaele. WhatsApp, Website-Chat, Instagram, Facebook Messenger -- alles zentral gesteuert."
- Animation: **ChannelIconsAnimation** -- 4 kleine Icons (WhatsApp, Web, Instagram, Messenger) die in einem Kreis angeordnet sind. In der Mitte ein zentraler Punkt (Bot). Duenne Linien verbinden den Mittelpunkt mit allen Icons. Die Icons leuchten nacheinander auf, mit einer Pulse-Welle die vom Zentrum ausgeht.

---

### Sektion 5: Kanaele

Zwei grosse Karten nebeneinander die WhatsApp und Website-Chat als die beiden Haupt-Kanaele hervorheben.

- **WhatsApp-Karte:** Glassmorphism-Card mit einem stilisierten WhatsApp-Chat-Mockup (2-3 Bubbles in WhatsApp-Gruen als dezenter Akzent). Titel: "WhatsApp Business". Kurzer Text: "Erreicht eure Kunden dort, wo sie taeglich kommunizieren."
- **Website-Chat-Karte:** Glassmorphism-Card mit einem stilisierten Chat-Widget-Mockup (kleines Chatfenster-Outline, accent-Farbe). Titel: "Website-Chat". Kurzer Text: "Besucher direkt auf eurer Website betreuen -- ohne Wartezeit."

Beide Karten: `bg-white/[0.03] backdrop-blur-md rounded-2xl`, mit sanftem fade-up, `grid grid-cols-1 md:grid-cols-2 gap-8`.

---

### Sektion 6: Anwendungsfaelle

Gleicher Stil wie UseCases der Telefonassistent-Seite:

- **E-Commerce** -- Bestellstatus, Retouren und Produktberatung automatisieren
- **Gesundheitswesen** -- Terminbuchung und Rezeptanfragen per WhatsApp
- **Immobilien** -- Besichtigungstermine und Objektinfos automatisch beantworten
- **Gastronomie** -- Reservierungen und Speisekarten-Anfragen rund um die Uhr

---

### Sektion 7: Testimonial

> "Unser WhatsApp-Bot beantwortet 80% der Kundenanfragen automatisch. Das Team kann sich endlich auf die komplexen Faelle konzentrieren."

-- **Markus Schneider**, Head of Customer Service

Gleicher Stil wie PhoneTestimonial (dekoratives Anfuehrungszeichen, fade-up mit blur).

---

### Sektion 8: CTA + Footer

Bestehende Komponenten importiert. Keine Aenderungen.

---

### Technische Umsetzung

**Neue Dateien:**
- `src/pages/Chatbots.tsx` -- Hauptseite (Video-Hintergrund, scroll-to-top wie PhoneAssistant.tsx)
- `src/components/chatbot/ChatbotHero.tsx` -- Hero mit SVG-Chat-Bubble-Visual
- `src/components/chatbot/ChatbotProblem.tsx` -- Zentrierter Text mit CountUp
- `src/components/chatbot/ChatbotHowItWorks.tsx` -- 3-Schritt-Grid (inkl. Terminbuchung)
- `src/components/chatbot/ChatbotFeatures.tsx` -- 4 Features mit Animationen
- `src/components/chatbot/MessageBurstAnimation.tsx` -- Chat-Bubbles Animation
- `src/components/chatbot/BrainNetworkAnimation.tsx` -- Neuronen-Netz Animation
- `src/components/chatbot/HandoffAnimation.tsx` -- Bot-zu-Mensch Uebergabe
- `src/components/chatbot/ChannelIconsAnimation.tsx` -- Multi-Channel Kreis
- `src/components/chatbot/ChannelsSection.tsx` -- WhatsApp + Website-Chat Dual-Karten
- `src/components/chatbot/ChatbotUseCases.tsx` -- Branchen-Grid
- `src/components/chatbot/ChatbotTestimonial.tsx` -- Einzelnes Zitat

**Aenderungen an bestehenden Dateien:**
- `src/App.tsx` -- Route `/chatbots` hinzufuegen
- `src/components/Navigation.tsx` -- "WhatsApp & Chatbots" Link auf `/chatbots` aendern
- `src/components/FeaturesSection.tsx` -- Zweite Karte `href` von `#chatbot` zu `/chatbots`
- `src/components/Footer.tsx` -- Link von `#chatbot` zu `/chatbots`

**Animations-Patterns:**
- Alle Animationen mit `motion/react`, `appleEase: [0.16, 1, 0.3, 1]`
- `whileInView` mit `once: true` fuer alle Sektionen
- SVG-basierte Animationen fuer Hero, BrainNetwork und ChannelIcons
- `useInView` Hook fuer Demo-Animationen
- WhatsApp-Gruen (`#25D366`) nur als dezenter Akzent auf Icons/Hover, nicht als Flaechenfarbe

