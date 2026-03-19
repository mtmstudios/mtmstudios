export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  date: string;
  readingTime: number;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ki-telefonassistent-mittelstand",
    title: "KI-Telefonassistent für den Mittelstand: So geht 24/7 Erreichbarkeit",
    metaTitle: "KI-Telefonassistent Mittelstand | 24/7 Erreichbarkeit ohne Mehrkosten | MTM Studios",
    metaDescription: "Wie mittelständische Betriebe mit einem KI-Telefonassistenten jeden Anruf annehmen — ohne zusätzliche Mitarbeiter. Kosten, Funktionen und reale Beispiele.",
    category: "Voice KI",
    date: "2025-03-10",
    readingTime: 6,
    excerpt: "Jeder vierte Anruf bei kleinen Betrieben landet auf der Mailbox — und rund 70 % dieser Anrufer versuchen es nie wieder. Ein KI-Telefonassistent schließt diese Lücke, ohne dass du jemanden neu einstellen musst.",
    tags: ["KI Telefonassistent", "Voice AI", "Mittelstand", "24/7 Erreichbarkeit"],
    content: `## Das Problem: Die Mailbox als Umsatzkiller

Jeder Handwerksbetrieb, jede Arztpraxis, jedes Dienstleistungsunternehmen kennt das Szenario: Du bist beim Kunden, dein Mitarbeiter in der Pause — und das Telefon klingelt. Der Anrufer landet auf der Mailbox. Rund 70 % legen dann einfach auf.

Das ist kein Komfortproblem. Das ist ein Umsatzproblem.

Laut einer Studie des Bitkom verlieren kleine und mittlere Unternehmen in Deutschland durchschnittlich 3–5 qualifizierte Leads pro Woche durch nicht angenommene Anrufe. Bei einem durchschnittlichen Auftragswert von 500 € sind das 1.500–2.500 € entgangener Umsatz — jede Woche.

## Was ein KI-Telefonassistent wirklich kann

Ein moderner KI-Telefonassistent ist kein einfaches IVR-Menü ("Drücken Sie 1 für..."). Er führt echte Gespräche — in natürlichem Deutsch, mit Kontext und ohne starre Gesprächsbäume.

Konkret heißt das:

**Lead-Erfassung:** Der Assistent fragt nach Name, Anliegen und Kontaktdaten — und schreibt alles direkt in dein CRM oder Google Sheet.

**Terminbuchung:** Integration mit Kalender-Tools wie Google Calendar oder Calendly. Der Assistent findet freie Slots und bucht direkt.

**Qualifizierung:** Ist das ein Bestandskunde oder ein Neukunde? Dringlich oder planbar? Der Assistent sortiert vor, damit du nur die wichtigen Rückrufe machst.

**Weiterleitung:** Wenn ein Anruf zu komplex ist, leitet der Assistent an einen menschlichen Mitarbeiter weiter — in Echtzeit.

## Kosten: Was ist realistisch?

Die häufigste Frage, die wir hören: "Was kostet das?"

Ein KI-Telefonassistent über unsere Lösung liegt in der Praxis bei 300–800 € Einrichtung und 150–400 € monatlich — abhängig von Anrufvolumen und Komplexität des Gesprächs.

Zum Vergleich: Eine Teilzeitkraft für die Telefonzentrale kostet 1.500–2.500 € pro Monat, ist nicht 24/7 verfügbar und nimmt Urlaub.

Der ROI-Rechnung ist einfach: Wenn der Assistent pro Monat nur 3–4 zusätzliche Aufträge generiert, die sonst auf der Mailbox geblieben wären, amortisiert sich die Investition in Woche 1.

## Wie die Umsetzung läuft

Unsere Implementierung dauert in der Regel 48–72 Stunden:

1. **Erstgespräch:** Was soll der Assistent können? Welche Fragen stellt er? Was sind No-Gos?
2. **Prompt-Entwicklung:** Wir schreiben das "Gehirn" des Assistenten — seine Persönlichkeit, seine Grenzen, seinen Gesprächsleitfaden.
3. **Integration:** Verbindung mit deiner Nummer (Weiterleitung oder direkte Nummer), CRM, Kalender.
4. **Test & Go-Live:** Echte Testanrufe, Feinjustierung, dann live.

## Fazit

Ein KI-Telefonassistent ist kein Luxus mehr — er ist ein Wettbewerbsvorteil. Während deine Mitbewerber noch Anrufe verpassen, nimmst du jeden an. Und das um 2 Uhr nachts genauso wie um 9 Uhr morgens.`
  },
  {
    slug: "n8n-automatisierung-handwerk",
    title: "n8n Automatisierungen für Handwerksbetriebe: 3 Workflows die sofort sparen",
    metaTitle: "n8n Automatisierung Handwerk | Workflows die Zeit sparen | MTM Studios",
    metaDescription: "Diese 3 n8n Automatisierungen sparen Handwerksbetrieben 5–10 Stunden pro Woche: Anfragebearbeitung, Rechnungsverfolgung und Kundenkommunikation.",
    category: "Automatisierung",
    date: "2025-02-28",
    readingTime: 5,
    excerpt: "Handwerksbetriebe verlieren durchschnittlich 8 Stunden pro Woche mit administrativen Aufgaben, die ein einziger n8n Workflow in Minuten erledigt. Hier sind die drei wirkungsvollsten.",
    tags: ["n8n", "Automatisierung", "Handwerk", "Workflow"],
    content: `## Warum Handwerksbetriebe besonders profitieren

Kein Sektor hat weniger Zeit für Administration — und trotzdem so viel davon. Der Meister ist auf der Baustelle, der Büromitarbeiter hat drei Telefone gleichzeitig am Ohr, und die Angebote stapeln sich.

n8n ist ein Open-Source Workflow-Automatisierungstool, das wir selbst gehostet oder in der Cloud betreiben. Keine monatlichen API-Kosten pro Aktion, keine Limits bei Workflow-Ausführungen. Perfekt für Betriebe, die effizient wirtschaften wollen.

## Workflow 1: Automatische Anfragebearbeitung

**Problem:** Eine neue Anfrage kommt über die Website, WhatsApp oder per E-Mail. Jemand muss sie lesen, kategorisieren und eine erste Antwort schicken.

**Lösung:** n8n Webhook → AI-Analyse (GPT-4o mini) → Automatische Eingangsbestätigung + Eintrag in Google Sheets CRM.

**Ergebnis:** Jede Anfrage wird innerhalb von 30 Sekunden bestätigt, in eine Tabelle eingetragen und nach Priorität sortiert. Kein manueller Schritt nötig.

**Zeitersparnis:** 2–3 Stunden pro Woche.

## Workflow 2: Rechnungsverfolgung & Zahlungserinnerungen

**Problem:** Offene Rechnungen werden vergessen, Nachfassen ist unangenehm, Cashflow leidet.

**Lösung:** n8n liest täglich dein Google Sheet mit offenen Rechnungen. Bei Überschreitung der Zahlungsfrist (z.B. 14 Tage): automatische, höfliche E-Mail-Erinnerung. Nach weiteren 7 Tagen: zweite Erinnerung mit Hinweis auf Mahngebühren.

**Ergebnis:** Zahlungseingang beschleunigt sich um durchschnittlich 8 Tage. Keine unangenehmen manuellen Telefonate.

**Zeitersparnis:** 1–2 Stunden pro Woche, plus verbesserter Cashflow.

## Workflow 3: Auftragsbestätigung & Terminbenachrichtigung

**Problem:** Nach Auftragsbestätigung muss der Kunde Termin, Adresse und Vorbereitungshinweise bekommen. Manuell dauert das 5–10 Minuten pro Auftrag.

**Lösung:** Sobald ein Auftrag in Google Sheets als "bestätigt" markiert wird, schickt n8n automatisch:
- E-Mail mit Termindetails und Anfahrtsbeschreibung
- WhatsApp-Erinnerung 24h vorher
- Optional: SMS am Morgen des Termins

**Ergebnis:** Kein Auftrag fällt durch, keine vergessene Erinnerung, weniger Stornierungen.

**Zeitersparnis:** 3–5 Stunden pro Woche.

## Was die Umsetzung kostet

Alle drei Workflows gemeinsam: 2.000–3.500 € Einrichtung, einmalig. Laufende Kosten bei uns: 100–200 € pro Monat für Hosting und Wartung.

Wenn du alleine 5 Stunden pro Woche sparst und deine Zeit mit 50 € bewertest: 200 € pro Woche × 4 = 800 € pro Monat. Der ROI liegt bei 1:4.`
  },
  {
    slug: "ki-chatbot-kundensupport",
    title: "KI-Chatbot im Kundensupport: Was er kann — und was nicht",
    metaTitle: "KI-Chatbot Kundensupport | Realistische Erwartungen & Kosten | MTM Studios",
    metaDescription: "Ein KI-Chatbot löst bis zu 70 % der Supportanfragen ohne menschliche Eingriffe. Was er wirklich kann, wo er versagt und wie die Integration funktioniert.",
    category: "Chatbot",
    date: "2025-02-15",
    readingTime: 7,
    excerpt: "Der Hype um KI-Chatbots ist groß. Die Realität ist differenzierter — aber trotzdem beeindruckend. Hier ist, was du wirklich erwarten kannst.",
    tags: ["Chatbot", "Kundensupport", "KI", "WhatsApp"],
    content: `## Die ehrliche Wahrheit über KI-Chatbots

Nicht jeder Anbieter sagt dir, was ein KI-Chatbot nicht kann. Wir tun es — weil ein schlecht konfigurierter Chatbot mehr schadet als gar keiner.

Ein KI-Chatbot auf Basis von GPT-4o kann:
- Häufige Fragen beantworten (Öffnungszeiten, Preise, Lieferzeiten)
- Informationen aus einer Wissensdatenbank abrufen
- Formulare ausfüllen und Daten erfassen
- Termine vorschlagen und Leads qualifizieren
- In mehreren Sprachen kommunizieren

Ein KI-Chatbot auf Basis von GPT-4o kann **nicht** (ohne spezielle Anbindung):
- In dein Live-Lagersystem schauen
- Bestellungen wirklich abschließen (ohne Integration)
- Emotionale Eskalationen de-eskalieren wie ein Mensch
- Immer korrekte, aktuelle Fakten nennen (Halluzination ist real)

## Was 70 % Automatisierungsrate bedeutet

In unseren Projekten sehen wir typischerweise: 60–75 % der Anfragen werden vollständig vom Chatbot beantwortet, ohne dass ein Mensch eingreift. Die restlichen 25–40 % werden mit Kontext an einen Mitarbeiter weitergeleitet.

Das bedeutet: Dein Team bearbeitet nicht mehr jede Anfrage ab null — sondern nur noch die komplexen, mit dem kompletten Gesprächsverlauf als Kontext.

## Welche Kanäle sinnvoll sind

**Website-Widget:** Klassisch. Direkte Integration über einen JavaScript-Snippet. Niedrige Einstiegshürde.

**WhatsApp Business:** Hohe Öffnungsraten (>90 %), vertraute Umgebung für Kunden. Benötigt WhatsApp Business API (ca. 50–100 € Setup + Nachrichtenkosten).

**Instagram DM / Facebook Messenger:** Sinnvoll für B2C mit Social-Media-Präsenz.

**E-Mail:** Ja, auch hier gibt es KI-gestützte Antworten — aber für komplexere Setups.

## Realistische Kosten

Ein einfacher FAQ-Chatbot für die Website: 800–1.500 € Einrichtung, 80–150 € monatlich.

Ein komplexerer Chatbot mit WhatsApp-Integration, CRM-Anbindung und Eskalationslogik: 2.500–5.000 € Einrichtung, 200–400 € monatlich.

**Was du in 3 Monaten sieben solltest:**
- Ticket-Volumen für dein Team: -40 bis -60 %
- Antwortzeit: von Stunden auf Sekunden
- Kundenzufriedenheit (NPS): +10–20 Punkte

## Der richtige Rollout

1. Beginne mit den Top-10-Fragen, die dein Team täglich bekommt
2. Integriere zuerst auf einer Seite (z.B. /kontakt) — nicht überall gleichzeitig
3. Baue immer eine Eskalationslogik ein: "Ich leite dich an einen Mitarbeiter weiter"
4. Auswerten nach 30 Tagen: Welche Fragen kann der Bot nicht beantworten? → Wissensdatenbank erweitern`
  },
  {
    slug: "whatsapp-business-api-mittelstand",
    title: "WhatsApp Business API für den Mittelstand: Schritt-für-Schritt-Anleitung",
    metaTitle: "WhatsApp Business API Mittelstand | Setup & Kosten 2025 | MTM Studios",
    metaDescription: "Wie mittelständische Unternehmen WhatsApp Business API einrichten, nutzen und mit KI-Chatbots kombinieren. Kosten, Voraussetzungen und reale Anwendungsfälle.",
    category: "Automatisierung",
    date: "2025-01-30",
    readingTime: 8,
    excerpt: "WhatsApp hat 60 Millionen Nutzer in Deutschland — und eine Öffnungsrate von über 90 %. Warum nutzen das so wenige Unternehmen für ihre Kundenkommunikation?",
    tags: ["WhatsApp Business API", "Kundenkommunikation", "KI", "Automatisierung"],
    content: `## Warum WhatsApp der unterschätzte Kanal ist

E-Mails werden zu 20 % geöffnet. WhatsApp-Nachrichten zu über 90 %. Das ist kein kleiner Unterschied — das ist ein anderes Spiel.

Trotzdem nutzen die meisten Unternehmen WhatsApp entweder gar nicht oder nur mit der kostenlosen App auf einem Privathandy — was DSGVO-rechtlich problematisch ist und keine Automatisierung erlaubt.

Die WhatsApp Business API ändert das. Aber wie kommt man rein?

## Was ist die WhatsApp Business API?

Die normale WhatsApp Business App ist für Einzelpersonen — ein Gerät, ein Nutzer, keine Automatisierung. Die API ist für Unternehmen: mehrere Agenten können gleichzeitig antworten, Bots können Nachrichten senden, und alles läuft über dein eigenes System.

Voraussetzungen:
- Ein Facebook/Meta Business Manager Account (verifiziert)
- Eine dedizierte Telefonnummer (VoIP oder Mobilnummer)
- Einen Zugang über einen offiziellen BSP (Business Solution Provider)

## Kosten 2025

Meta berechnet pro Konversation (24h-Fenster), nicht pro Nachricht. Preise variieren nach Land:

- **Service-Konversation** (Kunde schreibt zuerst): 0,06–0,09 € pro Konversation
- **Marketing-Konversation** (Unternehmen schreibt zuerst): 0,10–0,15 € pro Konversation

Hinzu kommen die Kosten des BSP: 50–200 € monatlich, abhängig vom Anbieter und Volumen.

Für ein Unternehmen mit 200 Kundenkonversationen pro Monat: ca. 70–120 € Gesamtkosten.

## Integration mit n8n und KI

So bauen wir typischerweise einen WhatsApp-Chatbot:

1. **Eingehende Nachricht** → n8n Webhook empfängt sie
2. **Kontext laden** → Vorherige Gespräche, Kundendaten aus Google Sheets
3. **GPT-4o mini** → Generiert die Antwort basierend auf Wissensdatenbank + Kontext
4. **Antwort senden** → Zurück über WhatsApp API
5. **Logging** → Alle Gespräche werden protokolliert

Für komplexe Anfragen: automatische Übergabe an einen menschlichen Agenten mit vollem Gesprächsverlauf.

## DSGVO-Compliance

Das ist der Punkt, den viele Anbieter verschweigen: WhatsApp hat seinen Europasitz in Irland und ist unter dem EU-US Data Privacy Framework zertifiziert. Die Nutzung der offiziellen Business API ist DSGVO-konform, wenn:

- Kunden aktiv in die Kommunikation einwilligen (Opt-In)
- Keine sensiblen Daten (Gesundheit, Finanzen) ohne zusätzliche Maßnahmen übermittelt werden
- Du ein AV-Vertrag mit Meta hast (automatisch beim BSP-Onboarding)

Die kostenlose App auf einem Mitarbeiter-Handy ist hingegen problematisch — Kundendaten landen auf einem Privatgerät.

## Typische Anwendungsfälle

- **Handwerksbetriebe:** Terminbestätigung, Statusupdates, Dokumentenabfrage
- **Dienstleister:** Anfrageerfassung, FAQ, Terminbuchung
- **E-Commerce:** Bestellstatus, Retourenabwicklung, Support
- **Arztpraxen / Gesundheitswesen:** Terminerinnerungen (ohne Gesundheitsdaten!), allgemeine Infos`
  },
  {
    slug: "ki-agentur-kosten-leistungen",
    title: "KI-Agentur beauftragen: Was kostet das wirklich?",
    metaTitle: "KI-Agentur Kosten & Leistungen 2025 | Transparente Preise | MTM Studios",
    metaDescription: "Was kostet eine KI-Agentur? Transparente Preise für Telefonassistenten, Chatbots und Automatisierungen. Einmalige Kosten, monatliche Gebühren und ROI-Rechnung.",
    category: "Beratung",
    date: "2025-01-15",
    readingTime: 5,
    excerpt: "Die meisten KI-Agenturen zeigen keine Preise. Wir schon — weil wir glauben, dass du weißt, was du kaufst, bevor du dich entscheidest.",
    tags: ["KI-Agentur", "Kosten", "Preise", "ROI"],
    content: `## Warum Transparenz wichtig ist

Der KI-Markt boomt. Und mit ihm die Zahl der Anbieter, die mit Buzzwords statt Substanz verkaufen. "AI-powered", "next-gen", "seamless integration" — und dann musst du ein Demo-Call buchen, um überhaupt eine Größenordnung der Kosten zu bekommen.

Wir machen das anders. Hier sind unsere realen Preisbereiche.

## Produkt 1: KI-Telefonassistent

**Einmalige Einrichtung:** 500–1.500 €
- System-Prompt-Entwicklung und Training
- Integration mit deiner Telefonnummer
- CRM/Sheet-Anbindung
- 2 Runden Testanrufe und Feinjustierung

**Monatlich:** 150–400 €
- Voice AI API-Kosten (volumenabhängig)
- Hosting und Monitoring
- Anpassungen und Optimierungen

**Typischer Kunde:** Handwerksbetrieb, Arztpraxis, Immobilienverwaltung, Dienstleister.

## Produkt 2: KI-Chatbot (Website oder WhatsApp)

**Einmalige Einrichtung:** 800–3.000 €
- Wissensdatenbank-Aufbau
- Prompt-Engineering
- Integration (Website-Widget oder WhatsApp Business API)
- CRM-Anbindung und Eskalationslogik

**Monatlich:** 100–400 €
- LLM API-Kosten
- WhatsApp Business API (wenn relevant)
- Hosting, Monitoring, Updates

## Produkt 3: Prozessautomatisierungen (n8n)

**Einmalige Einrichtung pro Workflow:** 500–2.000 €
- Analyse und Konzept
- Implementierung in n8n
- Tests und Go-Live

**Monatlich:** 50–200 €
- n8n Hosting (wahlweise bei uns oder selbst)
- Monitoring und Fehlerbehebung

**Typisches Paket:** 3 Workflows à 1.000 € = 3.000 € einmalig, 150 € monatlich.

## Was du NICHT zahlst

- Stundensätze für Beratung, die nirgendwo hinführt
- "Lizenzgebühren" für Standard-Software
- Versteckte Markup-Kosten auf API-Preise

## ROI-Berechnung — ein echtes Beispiel

**Kunde:** Sanitärbetrieb, 8 Mitarbeiter, Stuttgarter Umland.

**Problem:** 20–30 Anrufe täglich, davon 30 % auf Mailbox. Durchschnittlicher Auftragswert: 350 €.

**Lösung:** KI-Telefonassistent + Terminbuchungs-Workflow.

**Kosten:** 1.200 € Einrichtung + 280 € monatlich.

**Ergebnis nach 90 Tagen:**
- 8 zusätzliche Aufträge durch angenommene Anrufe: +2.800 € Umsatz/Monat
- 6 Stunden Bürozeit gespart: +240 € Wert/Monat
- Gesamtertrag: ~3.040 €/Monat bei 280 € Kosten

**ROI:** ca. 10:1.

## Wie ein Auftrag läuft

1. **Kostenloses Erstgespräch (30 Min):** Was ist das konkrete Problem? Welche Lösung passt?
2. **Konzept und Angebot:** Innerhalb von 48h — konkret, mit Preisen, ohne Hintertüren.
3. **Umsetzung:** 48–72h bis zum Go-Live.
4. **Support:** Du erreichst uns per WhatsApp, nicht über ein Ticket-System.`
  }
];

export const categories = [...new Set(blogPosts.map(p => p.category))];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  blogPosts.find(p => p.slug === slug);
