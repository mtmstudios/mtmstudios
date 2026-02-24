export interface RegionalFAQ {
  question: string;
  answer: string;
}

export interface RegionalPainPoint {
  title: string;
  description: string;
}

export interface RegionalFeature {
  title: string;
  description: string;
}

export interface RegionalAdvantage {
  title: string;
  description: string;
}

export interface RegionalContentData {
  title: string;
  description: string;
  h1: string;
  subtext: string;
  localContext: string;
  painPoints: RegionalPainPoint[];
  features: RegionalFeature[];
  advantages: RegionalAdvantage[];
  faqs: RegionalFAQ[];
}

type ServiceKey = "ki-agentur" | "ki-telefonassistent" | "ki-chatbot" | "automatisierungen";
type CityKey = "stuttgart" | "ulm";

const content: Record<ServiceKey, Record<CityKey, RegionalContentData>> = {
  "ki-agentur": {
    stuttgart: {
      title: "KI-Agentur Stuttgart | Telefonassistenten, Chatbots & Automatisierungen | MTM Studios",
      description: "MTM Studios ist eure KI-Agentur in Stuttgart. Wir entwickeln Telefonassistenten, Chatbots und Automatisierungen für Unternehmen in der Region Stuttgart.",
      h1: "KI-Agentur für Stuttgart",
      subtext: "Telefonassistenten, Chatbots und Automatisierungen — maßgeschneidert für Stuttgarter Unternehmen.",
      localContext: "Stuttgart ist ein Zentrum für Innovation und Industrie. Unternehmen in der Region stehen vor der Herausforderung, wachsende Kundenanfragen effizient zu bearbeiten und gleichzeitig wettbewerbsfähig zu bleiben. Als KI-Agentur verstehen wir die Anforderungen des Stuttgarter Marktes und entwickeln Lösungen, die genau hierhin passen.",
      painPoints: [
        { title: "Fachkräftemangel in der Region", description: "Qualifizierte Mitarbeiter für Kundenservice sind in Stuttgart schwer zu finden. KI-Lösungen entlasten euer Team nachhaltig." },
        { title: "Hohe Betriebskosten", description: "Stuttgart gehört zu den teuersten Standorten Deutschlands. Automatisierung senkt eure Kosten ohne Qualitätsverlust." },
        { title: "Wachsende Kundenerwartungen", description: "Stuttgarter Kunden erwarten schnelle, professionelle Kommunikation — rund um die Uhr." },
      ],
      features: [
        { title: "KI-Telefonassistenten", description: "Automatisierte Anrufannahme und Terminbuchung für Unternehmen in Stuttgart und Umgebung." },
        { title: "Intelligente Chatbots", description: "WhatsApp- und Website-Chatbots, die eure Kunden sofort bedienen — auf Deutsch, 24/7." },
        { title: "Prozessautomatisierung", description: "Wiederkehrende Abläufe automatisieren und euer Team für wichtigere Aufgaben freimachen." },
        { title: "Nahtlose Integrationen", description: "Anbindung an eure bestehenden Systeme — von CRM bis Kalender, alles verbunden." },
      ],
      advantages: [
        { title: "Regionaler Partner", description: "Wir kennen den Stuttgarter Markt und seine Besonderheiten — persönlich und nah." },
        { title: "Schnelle Umsetzung", description: "Von der Erstberatung zur fertigen Lösung in wenigen Tagen, nicht Monaten." },
        { title: "Langfristiger Support", description: "Wir betreuen eure KI-Lösungen dauerhaft und optimieren kontinuierlich." },
      ],
      faqs: [
        { question: "Für welche Branchen in Stuttgart sind eure KI-Lösungen geeignet?", answer: "Unsere Lösungen sind branchenübergreifend einsetzbar — von Automotive-Zulieferern über Handwerksbetriebe bis zu Arztpraxen und Kanzleien in Stuttgart." },
        { question: "Wie schnell kann eine KI-Lösung in Stuttgart live gehen?", answer: "Je nach Komplexität sind erste Ergebnisse innerhalb von 3–7 Tagen möglich. Einfache Telefonassistenten können sogar in 48 Stunden starten." },
        { question: "Bietet ihr persönliche Beratung in Stuttgart an?", answer: "Ja, wir bieten persönliche Termine in Stuttgart und der Region an. Alternativ arbeiten wir auch remote — ganz wie es euch passt." },
        { question: "Was kostet eine KI-Lösung für mein Unternehmen?", answer: "Die Kosten hängen vom Umfang ab. Wir erstellen euch ein individuelles Angebot nach einem kostenlosen Erstgespräch." },
      ],
    },
    ulm: {
      title: "KI-Agentur Ulm | Telefonassistenten, Chatbots & Automatisierungen | MTM Studios",
      description: "MTM Studios ist eure KI-Agentur in Ulm. Wir entwickeln Telefonassistenten, Chatbots und Automatisierungen für Unternehmen in Ulm und Umgebung.",
      h1: "KI-Agentur für Ulm",
      subtext: "Telefonassistenten, Chatbots und Automatisierungen — maßgeschneidert für Ulmer Unternehmen.",
      localContext: "Ulm verbindet Tradition mit Innovation. Die Stadt an der Donau ist Heimat zahlreicher mittelständischer Unternehmen, die von KI-Automatisierung profitieren können. Als Partner vor Ort verstehen wir die lokalen Bedürfnisse und liefern Lösungen, die euren Alltag spürbar erleichtern.",
      painPoints: [
        { title: "Kleine Teams, große Aufgaben", description: "Viele Ulmer Unternehmen haben kompakte Teams, die täglich unzählige Anfragen stemmen müssen." },
        { title: "Wettbewerb mit der Großstadt", description: "Im Wettbewerb mit Stuttgart und München braucht ihr smarte Lösungen, die euch effizienter machen." },
        { title: "Erreichbarkeit sicherstellen", description: "Kunden erwarten ständige Erreichbarkeit — auch außerhalb der Geschäftszeiten." },
      ],
      features: [
        { title: "KI-Telefonassistenten", description: "Verpasst keinen Anruf mehr — euer KI-Assistent nimmt Anrufe an und bucht Termine automatisch." },
        { title: "Chatbots für Website & WhatsApp", description: "Beantwortet Kundenanfragen in Echtzeit — automatisch und rund um die Uhr." },
        { title: "Automatisierte Workflows", description: "Von der Anfrage bis zur Rechnung: Wir automatisieren eure wiederkehrenden Prozesse." },
        { title: "System-Integrationen", description: "Nahtlose Anbindung an eure vorhandene Software — ohne Medienbrüche." },
      ],
      advantages: [
        { title: "Lokal verwurzelt", description: "Wir kennen die Ulmer Unternehmenslandschaft und arbeiten auf Augenhöhe." },
        { title: "Persönliche Betreuung", description: "Kein Callcenter — bei uns habt ihr einen festen Ansprechpartner." },
        { title: "Skalierbare Lösungen", description: "Startet klein und wachst mit der Lösung — ganz in eurem Tempo." },
      ],
      faqs: [
        { question: "Arbeitet ihr nur mit Unternehmen aus Ulm?", answer: "Nein, wir betreuen Unternehmen in der gesamten Region — von Ulm über Neu-Ulm bis ins Alb-Donau-Gebiet. Remote-Zusammenarbeit ist ebenfalls möglich." },
        { question: "Wie läuft die Zusammenarbeit ab?", answer: "Nach einem kostenlosen Erstgespräch erstellen wir ein Konzept. Die Umsetzung erfolgt in enger Abstimmung — typischerweise in 1–2 Wochen." },
        { question: "Brauche ich technisches Vorwissen?", answer: "Nein, absolut nicht. Wir kümmern uns um die komplette technische Umsetzung und erklären alles verständlich." },
        { question: "Kann ich die KI-Lösung vorher testen?", answer: "Ja, wir bieten Demo-Sessions an, in denen ihr die Lösung live erleben könnt, bevor ihr euch entscheidet." },
      ],
    },
  },
  "ki-telefonassistent": {
    stuttgart: {
      title: "KI-Telefonassistent Stuttgart | Anrufe automatisieren | MTM Studios",
      description: "KI-Telefonassistent für Unternehmen in Stuttgart. Automatische Anrufannahme, Terminbuchung und Weiterleitung — 24/7 erreichbar.",
      h1: "KI-Telefonassistent für Stuttgart",
      subtext: "Nie wieder verpasste Anrufe. Euer KI-Telefonassistent nimmt Anrufe an, beantwortet Fragen und bucht Termine — rund um die Uhr.",
      localContext: "In einer Wirtschaftsmetropole wie Stuttgart ist telefonische Erreichbarkeit geschäftskritisch. Ob Handwerksbetrieb im Kessel, Arztpraxis in Bad Cannstatt oder Kanzlei in der Innenstadt — verpasste Anrufe kosten Umsatz und Vertrauen. Unser KI-Telefonassistent löst dieses Problem.",
      painPoints: [
        { title: "Verpasste Anrufe = verlorene Kunden", description: "Jeder nicht angenommene Anruf ist ein potenzieller Auftrag, der zur Konkurrenz geht." },
        { title: "Telefonieren frisst Arbeitszeit", description: "Euer Team verbringt Stunden mit Routineanrufen statt mit wertschöpfender Arbeit." },
        { title: "Außerhalb der Öffnungszeiten unerreichbar", description: "Kunden rufen an, wenn es ihnen passt — nicht nur von 9 bis 17 Uhr." },
      ],
      features: [
        { title: "24/7 Anrufannahme", description: "Euer KI-Assistent ist immer erreichbar — auch nachts, am Wochenende und an Feiertagen." },
        { title: "Intelligente Terminbuchung", description: "Termine werden automatisch in euren Kalender eingetragen — ohne Hin-und-Her." },
        { title: "Natürliche Gesprächsführung", description: "Modernste Sprach-KI, die sich wie ein echter Mitarbeiter anhört — auf Deutsch." },
        { title: "Sofortige Weiterleitung", description: "Dringende Anrufe werden erkannt und direkt an die richtige Person weitergeleitet." },
      ],
      advantages: [
        { title: "Stuttgart kennt uns", description: "Wir arbeiten bereits mit Unternehmen aus der Region — mit Verständnis für lokale Abläufe." },
        { title: "In 48h einsatzbereit", description: "Schnelle Einrichtung, sofortige Wirkung — ohne wochenlange Projekte." },
        { title: "DSGVO-konform", description: "Alle Daten werden sicher und nach deutschen Standards verarbeitet." },
      ],
      faqs: [
        { question: "Wie klingt der KI-Telefonassistent?", answer: "Natürlich und professionell. Die Stimme klingt wie ein echter Mitarbeiter — nicht wie ein Roboter. Wir passen den Ton an eure Marke an." },
        { question: "Kann der Assistent Termine in meinen Kalender eintragen?", answer: "Ja, er integriert sich nahtlos in gängige Kalendersysteme wie Google Calendar, Outlook oder Calendly." },
        { question: "Was passiert bei komplexen Anfragen?", answer: "Erkennt der Assistent, dass ein menschlicher Kontakt nötig ist, leitet er den Anruf sofort weiter oder erstellt ein Rückruf-Ticket." },
        { question: "Ist das für meine Branche geeignet?", answer: "Ja — ob Handwerk, Gesundheit, Recht oder Dienstleistung. Wir konfigurieren den Assistenten genau für euren Anwendungsfall." },
      ],
    },
    ulm: {
      title: "KI-Telefonassistent Ulm | Anrufe automatisieren | MTM Studios",
      description: "KI-Telefonassistent für Unternehmen in Ulm. Automatische Anrufannahme, Terminbuchung und intelligente Weiterleitung — 24/7.",
      h1: "KI-Telefonassistent für Ulm",
      subtext: "Verpasst keinen Anruf mehr. Euer KI-Telefonassistent für die Region Ulm — immer erreichbar, immer professionell.",
      localContext: "Ulmer Unternehmen — vom Familienbetrieb bis zum Hidden Champion — setzen auf persönlichen Kundenkontakt. Doch die Realität zeigt: Nicht jeder Anruf kann angenommen werden. Unser KI-Telefonassistent schließt diese Lücke, ohne dass eure Kunden den Unterschied merken.",
      painPoints: [
        { title: "Zu wenig Personal fürs Telefon", description: "Kleine Teams können nicht jeden Anruf annehmen — und verlieren so potenzielle Kunden." },
        { title: "Routinefragen binden Kapazitäten", description: "Öffnungszeiten, Adresse, Preise — Standardfragen, die euer Team nicht manuell beantworten muss." },
        { title: "Kein Anrufbeantworter mehr", description: "Kunden legen auf, wenn sie auf einen Anrufbeantworter stoßen — und rufen die Konkurrenz an." },
      ],
      features: [
        { title: "Rund-um-die-Uhr erreichbar", description: "Auch wenn euer Büro geschlossen ist, nimmt euer KI-Assistent professionell Anrufe entgegen." },
        { title: "Automatische Terminvergabe", description: "Kunden buchen Termine direkt im Gespräch — der Assistent prüft die Verfügbarkeit in Echtzeit." },
        { title: "Mehrsprachig", description: "Neben Deutsch auch in weiteren Sprachen verfügbar — ideal für internationale Kunden." },
        { title: "Anrufzusammenfassungen", description: "Nach jedem Gespräch erhaltet ihr eine Zusammenfassung per E-Mail oder in eurem CRM." },
      ],
      advantages: [
        { title: "Nähe und Vertrauen", description: "Als regionaler Partner sind wir schnell erreichbar und kennen eure Herausforderungen." },
        { title: "Sofort startklar", description: "Keine langen Onboarding-Phasen — euer Assistent kann in wenigen Tagen live gehen." },
        { title: "Faire Preise", description: "Transparente Preismodelle ohne versteckte Kosten — passend für den Mittelstand." },
      ],
      faqs: [
        { question: "Funktioniert das auch mit meiner bestehenden Telefonnummer?", answer: "Ja, wir richten eine Weiterleitung ein. Eure bestehende Nummer bleibt erhalten, der Assistent übernimmt im Hintergrund." },
        { question: "Können Anrufe auch weitergeleitet werden?", answer: "Ja, der Assistent erkennt dringende Anliegen und leitet direkt an die zuständige Person weiter." },
        { question: "Was kostet ein KI-Telefonassistent?", answer: "Die Kosten richten sich nach dem Anrufvolumen und den gewünschten Funktionen. Wir beraten euch kostenlos und unverbindlich." },
        { question: "Wie trainiert ihr den Assistenten?", answer: "Wir konfigurieren den Assistenten mit euren FAQ, Öffnungszeiten, Services und Tonalität — komplett auf euch zugeschnitten." },
      ],
    },
  },
  "ki-chatbot": {
    stuttgart: {
      title: "KI-Chatbot Stuttgart | WhatsApp & Website | MTM Studios",
      description: "KI-Chatbot für Stuttgarter Unternehmen. Automatisiert Kundenanfragen auf WhatsApp, Website und mehr — 24/7, auf Deutsch.",
      h1: "KI-Chatbot für Stuttgart",
      subtext: "Automatisierte Kundenkommunikation auf WhatsApp und eurer Website — für Unternehmen in Stuttgart.",
      localContext: "Stuttgarter Kunden erwarten schnelle Antworten — egal ob über WhatsApp, eure Website oder Social Media. Ein KI-Chatbot beantwortet häufige Fragen sofort, qualifiziert Leads und entlastet euer Team. Perfekt für den anspruchsvollen Stuttgarter Markt.",
      painPoints: [
        { title: "Anfragen stapeln sich", description: "E-Mails, WhatsApp-Nachrichten, Website-Formulare — euer Team kommt kaum hinterher." },
        { title: "Langsame Reaktionszeiten", description: "Kunden erwarten Antworten in Minuten, nicht Stunden. Jede Verzögerung kostet Vertrauen." },
        { title: "Kein Service am Wochenende", description: "Eure Kunden haben auch samstags Fragen — aber euer Team ist nicht da." },
      ],
      features: [
        { title: "WhatsApp-Integration", description: "Euer Chatbot antwortet direkt in WhatsApp — dem Kanal, den eure Kunden täglich nutzen." },
        { title: "Website-Chat-Widget", description: "Ein elegantes Chat-Fenster auf eurer Website, das Besucher sofort anspricht." },
        { title: "Lead-Qualifizierung", description: "Der Chatbot erkennt kaufbereite Interessenten und leitet sie an euer Vertriebsteam weiter." },
        { title: "Wissensdatenbank-Anbindung", description: "Trainiert mit euren FAQ, Produktinfos und Preislisten für präzise Antworten." },
      ],
      advantages: [
        { title: "Stuttgarter Marktkenntnis", description: "Wir wissen, wie Kunden in der Region kommunizieren und was sie erwarten." },
        { title: "Schnelle Einrichtung", description: "Euer Chatbot ist in wenigen Tagen einsatzbereit — inklusive Training." },
        { title: "Messbare Ergebnisse", description: "Dashboard mit Auswertungen zu Anfragen, Konversionen und Kundenzufriedenheit." },
      ],
      faqs: [
        { question: "Kann der Chatbot auch auf Instagram oder Facebook antworten?", answer: "Ja, neben WhatsApp und Website können wir den Chatbot auch auf Instagram und Facebook Messenger einbinden." },
        { question: "Wie intelligent ist der Chatbot?", answer: "Sehr intelligent — er versteht Kontext, kann Folgefragen beantworten und lernt aus jeder Konversation dazu." },
        { question: "Brauche ich eine WhatsApp Business API?", answer: "Wir kümmern uns um die komplette technische Einrichtung, inklusive WhatsApp Business API." },
        { question: "Kann der Chatbot an mein CRM angebunden werden?", answer: "Ja, wir integrieren den Chatbot in gängige CRM-Systeme wie HubSpot, Salesforce oder Pipedrive." },
      ],
    },
    ulm: {
      title: "KI-Chatbot Ulm | WhatsApp & Website | MTM Studios",
      description: "KI-Chatbot für Unternehmen in Ulm. Automatisierte Kundenkommunikation auf WhatsApp, Website und mehr — rund um die Uhr.",
      h1: "KI-Chatbot für Ulm",
      subtext: "Eure Kunden schreiben. Euer Chatbot antwortet — sofort, intelligent und rund um die Uhr.",
      localContext: "Immer mehr Ulmer Unternehmen setzen auf digitale Kundenkommunikation. Ein KI-Chatbot bietet euren Kunden den Service, den sie erwarten — schnell, persönlich und über ihre bevorzugten Kanäle. Wir entwickeln Chatbots, die sich anfühlen wie ein echtes Gespräch.",
      painPoints: [
        { title: "Anfragen bleiben liegen", description: "Gerade in Stoßzeiten können nicht alle Nachrichten zeitnah beantwortet werden." },
        { title: "Kunden wollen WhatsApp", description: "Immer mehr Kunden bevorzugen Messaging statt Telefon — seid ihr darauf vorbereitet?" },
        { title: "Wiederkehrende Fragen kosten Zeit", description: "Die gleichen 20 Fragen beantworten eure Mitarbeiter jeden Tag aufs Neue." },
      ],
      features: [
        { title: "Multi-Channel-Support", description: "Ein Chatbot für WhatsApp, Website, Instagram und Facebook — alles aus einer Plattform." },
        { title: "Automatische Antworten", description: "Häufige Fragen werden sofort beantwortet — ohne manuellen Aufwand." },
        { title: "Übergabe an Mitarbeiter", description: "Bei komplexen Anliegen übergibt der Chatbot nahtlos an einen echten Mitarbeiter." },
        { title: "Mehrsprachig", description: "Bedient internationale Kunden in ihrer Sprache — automatisch erkannt und umgeschaltet." },
      ],
      advantages: [
        { title: "Persönliche Betreuung", description: "Wir sind in der Region und stehen euch persönlich zur Seite." },
        { title: "Maßgeschneidert", description: "Kein Standard-Bot — euer Chatbot spricht eure Sprache und kennt eure Produkte." },
        { title: "Datenschutz garantiert", description: "DSGVO-konforme Lösung — eure Kundendaten sind bei uns sicher." },
      ],
      faqs: [
        { question: "Wie lange dauert die Einrichtung?", answer: "In der Regel 3–5 Arbeitstage — je nach Komplexität und Anzahl der Kanäle." },
        { question: "Kann ich den Chatbot selbst anpassen?", answer: "Ja, über ein einfaches Dashboard könnt ihr Antworten, FAQ und Einstellungen jederzeit selbst ändern." },
        { question: "Was passiert, wenn der Chatbot eine Frage nicht beantworten kann?", answer: "Er gibt es ehrlich zu und leitet die Anfrage an euer Team weiter — mit vollem Gesprächskontext." },
        { question: "Für welche Unternehmensgrößen ist das geeignet?", answer: "Vom Einzelunternehmer bis zum Mittelständler — unsere Lösungen skalieren mit eurem Bedarf." },
      ],
    },
  },
  automatisierungen: {
    stuttgart: {
      title: "KI-Automatisierung Stuttgart | Prozesse automatisieren | MTM Studios",
      description: "KI-Automatisierung für Unternehmen in Stuttgart. Wir automatisieren eure Geschäftsprozesse — von der Anfrage bis zur Rechnung.",
      h1: "KI-Automatisierung für Stuttgart",
      subtext: "Wiederkehrende Prozesse automatisieren. Mehr Zeit für das, was zählt.",
      localContext: "Stuttgarter Unternehmen stehen unter Druck: steigende Kosten, Fachkräftemangel und wachsende Komplexität. KI-Automatisierung hilft, Routineaufgaben zu eliminieren, Fehler zu reduzieren und Kapazitäten freizusetzen — ohne zusätzliches Personal.",
      painPoints: [
        { title: "Manuelle Dateneingabe", description: "Stunden gehen verloren mit Copy-Paste zwischen Systemen, die nicht miteinander sprechen." },
        { title: "Fehleranfällige Prozesse", description: "Je mehr manuelle Schritte, desto mehr Fehler — und desto höher die Kosten." },
        { title: "Skalierung unmöglich", description: "Ohne Automatisierung wächst der Personalaufwand linear mit dem Umsatz." },
      ],
      features: [
        { title: "Workflow-Automatisierung", description: "Komplette Geschäftsprozesse automatisieren — von der Lead-Erfassung bis zum Follow-up." },
        { title: "System-Integrationen", description: "Eure Tools verbinden: CRM, E-Mail, Kalender, Buchhaltung — alles fließt automatisch zusammen." },
        { title: "Dokumentenverarbeitung", description: "Rechnungen, Verträge, Formulare — automatisch erfassen, sortieren und verarbeiten." },
        { title: "Reporting & Dashboards", description: "Automatische Berichte und Echtzeit-Dashboards für datenbasierte Entscheidungen." },
      ],
      advantages: [
        { title: "Industrie-Erfahrung", description: "Wir verstehen die Anforderungen von Stuttgarter Industrie- und Dienstleistungsunternehmen." },
        { title: "ROI in Wochen", description: "Unsere Automatisierungen zahlen sich schnell aus — messbar und nachweisbar." },
        { title: "Zukunftssicher", description: "Skalierbare Lösungen, die mit eurem Unternehmen mitwachsen." },
      ],
      faqs: [
        { question: "Welche Prozesse lassen sich automatisieren?", answer: "Grundsätzlich alle wiederkehrenden, regelbasierten Abläufe — von E-Mail-Workflows über Datenübertragungen bis zu komplexen Genehmigungsprozessen." },
        { question: "Muss ich meine bestehende Software wechseln?", answer: "Nein, wir integrieren uns in eure bestehende Systemlandschaft. Kein Wechsel nötig." },
        { question: "Wie messt ihr den Erfolg?", answer: "Wir definieren gemeinsam KPIs — z.B. eingesparte Stunden, Fehlerreduktion oder Durchlaufzeiten — und tracken diese transparent." },
        { question: "Ist das auch für kleine Unternehmen sinnvoll?", answer: "Ja, gerade kleine Teams profitieren besonders, weil Automatisierung Kapazitäten schafft, die sonst nicht vorhanden wären." },
      ],
    },
    ulm: {
      title: "KI-Automatisierung Ulm | Prozesse automatisieren | MTM Studios",
      description: "KI-Automatisierung für Unternehmen in Ulm. Wir automatisieren wiederkehrende Geschäftsprozesse — effizient, skalierbar, DSGVO-konform.",
      h1: "KI-Automatisierung für Ulm",
      subtext: "Schluss mit Routinearbeit. Eure Prozesse laufen automatisch — zuverlässig und rund um die Uhr.",
      localContext: "Ulmer Mittelständler sind das Rückgrat der regionalen Wirtschaft. Doch steigende Anforderungen und begrenzte Ressourcen machen Automatisierung zum Wettbewerbsvorteil. Wir helfen Unternehmen in Ulm, ihre Abläufe intelligent zu automatisieren — pragmatisch und ohne Overhead.",
      painPoints: [
        { title: "Zu viele manuelle Schritte", description: "Euer Team verbringt zu viel Zeit mit Aufgaben, die eine Maschine schneller und fehlerfreier erledigt." },
        { title: "Systeme arbeiten nicht zusammen", description: "Daten werden manuell zwischen Tools übertragen — ein Nährboden für Fehler und Verzögerungen." },
        { title: "Wachstum wird gebremst", description: "Ohne Automatisierung braucht jedes Prozent Wachstum proportional mehr Personal." },
      ],
      features: [
        { title: "End-to-End-Automatisierung", description: "Ganze Prozessketten automatisieren — vom Eingang einer Anfrage bis zur finalen Dokumentation." },
        { title: "API-Integrationen", description: "Eure bestehenden Tools nahtlos verbinden — wir sprechen die Sprache eurer Software." },
        { title: "KI-gestützte Entscheidungen", description: "Intelligente Automatisierungen, die nicht nur ausführen, sondern mitdenken." },
        { title: "Echtzeit-Monitoring", description: "Behaltet den Überblick über alle automatisierten Prozesse in einem zentralen Dashboard." },
      ],
      advantages: [
        { title: "Mittelstandsversteher", description: "Wir entwickeln Lösungen, die zum Budget und zur Struktur von KMUs passen." },
        { title: "Hands-on-Mentalität", description: "Kein PowerPoint-Consulting — wir setzen um und liefern Ergebnisse." },
        { title: "Regionale Nähe", description: "Persönliche Betreuung vor Ort in Ulm — bei Bedarf auch remote." },
      ],
      faqs: [
        { question: "Wie fange ich am besten an?", answer: "Mit einem kostenlosen Erstgespräch. Wir identifizieren gemeinsam die Prozesse mit dem größten Automatisierungspotenzial." },
        { question: "Wie lange dauert eine Automatisierung?", answer: "Einfache Workflows sind in 1–2 Wochen umgesetzt. Komplexere Projekte planen wir in Phasen." },
        { question: "Kann ich Automatisierungen später erweitern?", answer: "Ja, unsere Lösungen sind modular aufgebaut. Ihr könnt jederzeit weitere Prozesse automatisieren." },
        { question: "Sind meine Daten sicher?", answer: "Ja, alle Automatisierungen laufen DSGVO-konform. Eure Daten werden ausschließlich in der EU verarbeitet." },
      ],
    },
  },
};

export const validCities: CityKey[] = ["stuttgart", "ulm"];
export const validServices: ServiceKey[] = ["ki-agentur", "ki-telefonassistent", "ki-chatbot", "automatisierungen"];

export const getRegionalContent = (service: string, city: string): RegionalContentData | null => {
  const s = service as ServiceKey;
  const c = city as CityKey;
  if (!content[s] || !content[s][c]) return null;
  return content[s][c];
};

export const getServiceLabel = (service: string): string => {
  const labels: Record<string, string> = {
    "ki-agentur": "KI-Agentur",
    "ki-telefonassistent": "KI-Telefonassistent",
    "ki-chatbot": "KI-Chatbot",
    automatisierungen: "Automatisierungen",
  };
  return labels[service] || service;
};
