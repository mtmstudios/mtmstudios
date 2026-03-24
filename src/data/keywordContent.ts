export interface KeywordPageContent {
  title: string;
  description: string;
  h1: string;
  subtext: string;
  intro: string;
  detailedContent: string;
  features: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  parentPath: string;
  parentLabel: string;
  badge: string;
}

const pages: Record<string, KeywordPageContent> = {
  voicebot: {
    title: "Voicebot für Unternehmen | 24/7 Anrufannahme mit KI | MTM Studios",
    description: "MTM Studios entwickelt Voicebots für Unternehmen: Automatische Anrufannahme, Terminbuchung und Weiterleitung — 24/7, kein verpasster Anruf mehr. Jetzt kostenlos beraten lassen.",
    h1: "Voicebot für Unternehmen",
    subtext: "Dein KI-Voicebot nimmt Anrufe entgegen, beantwortet Fragen und bucht Termine — rund um die Uhr, kein Anruf geht mehr verloren.",
    badge: "Voice KI · Automatische Anrufannahme",
    intro: "Ein Voicebot ist eine KI-basierte Sprachlösung, die eingehende Anrufe vollautomatisch entgegennimmt, verarbeitet und beantwortet — ohne menschlichen Eingriff. Im Gegensatz zu klassischen Anrufbeantwortern führt ein Voicebot echte Gespräche: Er versteht natürliche Sprache, beantwortet individuelle Fragen und kann Termine buchen oder Anrufe weiterleiten. MTM Studios entwickelt und betreibt Voicebots für den deutschen Mittelstand — einsatzbereit in 48 Stunden.",
    detailedContent: "Voicebots revolutionieren die telefonische Erreichbarkeit für Unternehmen jeder Größe. In der Praxis bedeutet das: Kein verpasster Anruf mehr, keine überlastete Rezeption und keine frustrierten Kunden in der Warteschleife.\n\nEin MTM Studios Voicebot klingt wie ein echter Mitarbeiter — natürlich, freundlich und kompetent. Er führt strukturierte Gespräche, erfragt das Anliegen des Anrufers, beantwortet Standardfragen zu Öffnungszeiten, Leistungen und Preisen und bucht Termine direkt in deinen Kalender. Dringende Anrufe erkennt er automatisch und leitet sie sofort an die zuständige Person weiter.\n\nDie Einsatzbereiche sind vielfältig: Handwerksbetriebe nutzen Voicebots zur Terminvereinbarung, wenn der Meister auf der Baustelle ist. Arztpraxen automatisieren die Terminbuchung und Rezeptbestellung. Rechtsanwälte und Steuerberater qualifizieren eingehende Mandantenanfragen vor. Immobilienmakler nehmen Besichtigungsanfragen entgegen. Hotels und Restaurants verwalten Reservierungen — vollautomatisch.\n\nUnser Voicebot integriert sich nahtlos in deine bestehende Infrastruktur: Google Calendar, Outlook, Calendly, CRM-Systeme, Praxisverwaltungssoftware und mehr. Du behältst deine bestehende Telefonnummer — wir richten lediglich eine intelligente Weiterleitung ein. Nach jedem Gespräch erhältst du eine Zusammenfassung per E-Mail oder direkt in deinem CRM.\n\nDie Einrichtung dauert 48 Stunden. Danach läuft dein Voicebot vollautomatisch — du kannst ihn jederzeit anpassen, neue FAQ hinzufügen oder den Gesprächsflow verändern.",
    features: [
      { title: "Natürliche Gesprächsführung", description: "Modernste Sprach-KI, die Deutsch fließend spricht und sich wie ein echter Mitarbeiter anhört — kein Roboter-Feeling." },
      { title: "24/7 Erreichbarkeit", description: "Dein Voicebot nimmt Anrufe entgegen — auch nachts, am Wochenende und an Feiertagen." },
      { title: "Automatische Terminbuchung", description: "Termine werden direkt in deinen Kalender eingetragen — Verfügbarkeit wird in Echtzeit geprüft." },
      { title: "Intelligente Weiterleitung", description: "Dringende Anrufe werden erkannt und sofort an die richtige Person weitergeleitet." },
      { title: "CRM & Kalender-Integration", description: "Nahtlose Anbindung an Google Calendar, Outlook, Calendly, HubSpot und mehr." },
      { title: "In 48h einsatzbereit", description: "Von der Erstberatung zum laufenden Voicebot — ohne lange Projektphasen." },
    ],
    faqs: [
      { question: "Was ist ein Voicebot?", answer: "Ein Voicebot ist eine KI-basierte Software, die Telefonanrufe vollautomatisch entgegennimmt und bearbeitet. Im Gegensatz zu klassischen Anrufbeantwortern führt ein Voicebot echte Gespräche: Er versteht natürliche Sprache, beantwortet individuelle Fragen, bucht Termine und leitet Anrufe bei Bedarf weiter. Moderne Voicebots wie die von MTM Studios klingen dabei wie echte Mitarbeiter — natürlich, freundlich und kompetent." },
      { question: "Für welche Unternehmen eignet sich ein Voicebot?", answer: "Voicebots eignen sich für alle Unternehmen mit regelmäßigem Telefonaufkommen. Besonders profitieren Handwerksbetriebe, Arztpraxen, Anwaltskanzleien, Steuerberater, Immobilienmakler, Restaurants und Dienstleister, die täglich viele Standardanfragen telefonisch erhalten. Ab ca. 10–20 Anrufen pro Tag rechnet sich ein Voicebot nachweislich." },
      { question: "Wie schnell ist ein Voicebot einsatzbereit?", answer: "Ein MTM Studios Voicebot ist in der Regel innerhalb von 48 Stunden live. Wir richten alles ein — Gesprächsflow, FAQ-Training, Kalenderintegration und Weiterleitung. Du musst nichts installieren und brauchst kein technisches Vorwissen." },
      { question: "Merken Anrufer, dass sie mit einem Voicebot sprechen?", answer: "Viele Anrufer bemerken es nicht. Moderne KI-Stimmen klingen natürlich und menschlich. Auf Wunsch kann der Voicebot sich aber auch transparent als KI-Assistent vorstellen — was von vielen Kunden als professionell und innovativ wahrgenommen wird. Wir konfigurieren den Voicebot so, wie es für dein Unternehmen am besten passt." },
      { question: "Kann der Voicebot Termine in meinen Kalender buchen?", answer: "Ja. Der Voicebot prüft in Echtzeit deine Verfügbarkeit und trägt Termine direkt in Google Calendar, Outlook oder Calendly ein. Anrufer und du erhalten automatisch eine Bestätigung. Stornierungen und Umbuchungen sind ebenfalls per Voicebot möglich." },
      { question: "Was passiert bei sehr komplexen Anfragen?", answer: "Erkennt der Voicebot, dass ein menschlicher Kontakt nötig ist, leitet er den Anruf sofort weiter oder erstellt ein detailliertes Rückruf-Ticket mit Zusammenfassung des Gesprächs. So geht keine Anfrage verloren, und dein Team kann gezielt dort eingreifen, wo es wirklich gebraucht wird." },
    ],
    parentPath: "/ki-telefonassistent",
    parentLabel: "KI-Telefonassistent",
  },

  "ki-telefonbot": {
    title: "KI Telefonbot | Automatische Anrufannahme mit künstlicher Intelligenz | MTM Studios",
    description: "MTM Studios KI Telefonbot: Automatische Anrufannahme, Terminbuchung und intelligente Weiterleitung für Unternehmen. 24/7 erreichbar — in 48h live.",
    h1: "KI Telefonbot",
    subtext: "Automatische Anrufannahme mit künstlicher Intelligenz — dein KI Telefonbot ist immer erreichbar und bucht Termine ohne manuellen Aufwand.",
    badge: "KI Telefonie · Sprachautomatisierung",
    intro: "Ein KI Telefonbot kombiniert künstliche Intelligenz mit automatisierter Telefonie: Er nimmt Anrufe entgegen, führt natürliche Gespräche auf Deutsch und löst Anfragen vollautomatisch — von der einfachen Terminbuchung bis zur Weiterleitung komplexer Anliegen an echte Mitarbeiter. MTM Studios baut KI Telefonbots für den deutschen Mittelstand — ohne Einrichtungsaufwand auf deiner Seite.",
    detailedContent: "KI Telefonbots sind die nächste Evolutionsstufe der Unternehmenskommunikation. Während klassische Telefonhotlines auf menschliche Mitarbeiter angewiesen sind, arbeitet ein KI Telefonbot vollautomatisch — rund um die Uhr, an 365 Tagen im Jahr, ohne Pause und ohne Krankentage.\n\nDer Unterschied zu einfachen Anrufbeantwortern ist fundamental: Ein KI Telefonbot versteht natürliche Sprache, kann auf unvorhergesehene Fragen reagieren und führt strukturierte Gespräche mit echtem Mehrwert für den Anrufer. Er fragt nach dem Anliegen, gibt präzise Antworten auf Basis deiner Wissensdatenbank und schließt Gespräche mit konkreten Ergebnissen ab — einem gebuchten Termin, einer Ticketnummer oder einer Weiterleitung.\n\nMTM Studios konfiguriert KI Telefonbots individuell für jede Branche und jeden Anwendungsfall. Ein KI Telefonbot für eine Zahnarztpraxis funktioniert anders als einer für ein Logistikunternehmen oder eine Steuerberatungskanzlei. Wir trainieren den Bot mit deinen FAQ, deinen Leistungen, deinen Öffnungszeiten und deiner gewünschten Tonalität.\n\nDie technische Integration ist einfach: Deine bestehende Telefonnummer bleibt erhalten. Wir richten eine intelligente Weiterleitung ein — Anrufe werden automatisch an den KI Telefonbot übergeben, der sie professionell bearbeitet. Integrationen mit Kalender-Systemen, CRM-Software und Ticketing-Tools sind standardmäßig enthalten.\n\nNach der Einrichtung erhältst du Zugriff auf ein Dashboard, das alle Gespräche dokumentiert, häufige Anfragen analysiert und dir zeigt, wie der KI Telefonbot deine Erreichbarkeit verbessert.",
    features: [
      { title: "Sprachverständnis auf Muttersprachler-Niveau", description: "Der KI Telefonbot versteht Dialekte, Abkürzungen und komplexe Satzstrukturen auf Deutsch." },
      { title: "Vollautomatische Terminbuchung", description: "Kein manueller Aufwand — Termine werden direkt im Gespräch gebucht und bestätigt." },
      { title: "Individuelles Bot-Training", description: "Trainiert mit deinen FAQ, Leistungen, Öffnungszeiten und Unternehmenssprache." },
      { title: "Echtzeit-Gespräche", description: "Keine Wartezeiten — der KI Telefonbot antwortet sofort und ohne Verzögerung." },
      { title: "Nahtlose Übergabe", description: "Bei komplexen Anfragen übergibt der Bot mit vollem Gesprächskontext an einen Mitarbeiter." },
      { title: "Gesprächs-Protokolle", description: "Jedes Gespräch wird zusammengefasst und automatisch ins CRM oder per E-Mail übertragen." },
    ],
    faqs: [
      { question: "Was ist der Unterschied zwischen einem KI Telefonbot und einem normalen Anrufbeantworter?", answer: "Ein klassischer Anrufbeantworter spielt nur eine Ansage ab. Ein KI Telefonbot führt echte, interaktive Gespräche: Er versteht das Anliegen des Anrufers, stellt Rückfragen, beantwortet individuelle Fragen aus deiner Wissensdatenbank und schließt Gespräche mit konkreten Ergebnissen ab — einem gebuchten Termin, einer Information oder einer Weiterleitung. Das ist der entscheidende Unterschied: aktive Lösung statt passive Ansage." },
      { question: "Kann ein KI Telefonbot Termine buchen?", answer: "Ja, das ist eine der Kernfunktionen. Der KI Telefonbot greift in Echtzeit auf deinen Kalender zu, prüft die Verfügbarkeit und bucht den Termin direkt im Gespräch. Unterstützt werden Google Calendar, Outlook, Calendly und weitere Kalender-Systeme. Anrufer und Unternehmen erhalten automatisch eine Bestätigung." },
      { question: "Wie wird der KI Telefonbot trainiert?", answer: "Wir trainieren den Bot mit deinen Inhalten: FAQ, Leistungsbeschreibungen, Öffnungszeiten, Preisinfos (sofern gewünscht), Mitarbeiter-Namen und gewünschter Gesprächstonalität. Das Training dauert in der Regel 1–2 Tage. Danach ist der Bot einsatzbereit. Anpassungen sind jederzeit möglich." },
      { question: "In welchen Branchen wird ein KI Telefonbot eingesetzt?", answer: "KI Telefonbots werden branchenübergreifend eingesetzt: Handwerk (Terminbuchung), Gesundheit (Arztpraxen, Therapeuten), Recht (Kanzleien, Erstberatung), Immobilien (Besichtigungsanfragen), Gastronomie (Reservierungen), Logistik (Auftragsannahme) und viele mehr. Jeder Bot wird individuell auf die Branche konfiguriert." },
      { question: "Ist ein KI Telefonbot DSGVO-konform?", answer: "Ja. MTM Studios betreibt alle KI Telefonbot-Systeme auf europäischen Servern nach deutschen und europäischen Datenschutzstandards. Gesprächsdaten werden verschlüsselt übertragen und gespeichert. Wir stellen die notwendigen Auftragsverarbeitungsverträge (AVV) bereit." },
    ],
    parentPath: "/ki-telefonassistent",
    parentLabel: "KI-Telefonassistent",
  },

  "whatsapp-chatbot": {
    title: "WhatsApp Chatbot für Unternehmen | Automatisierte Kundenkommunikation | MTM Studios",
    description: "MTM Studios entwickelt WhatsApp Chatbots für Unternehmen: Automatische Antworten, Terminbuchung und Lead-Qualifizierung über WhatsApp Business — 24/7, DSGVO-konform.",
    h1: "WhatsApp Chatbot für Unternehmen",
    subtext: "Automatisierte Kundenkommunikation über WhatsApp — dein Chatbot antwortet sofort, bucht Termine und qualifiziert Leads rund um die Uhr.",
    badge: "WhatsApp Business API · Chatbot-Automatisierung",
    intro: "Über 60 Millionen Deutsche nutzen WhatsApp täglich — und immer mehr bevorzugen es, Unternehmen per Nachricht statt per Telefon zu kontaktieren. Ein WhatsApp Chatbot von MTM Studios beantwortet Kundenanfragen sofort, vollautomatisch und professionell — ohne dass dein Team eingreifen muss. Einsatzbereit in wenigen Tagen, DSGVO-konform auf europäischen Servern.",
    detailedContent: "WhatsApp ist der meistgenutzte Messenger in Deutschland. Für Unternehmen bedeutet das: Kunden kontaktieren euch täglich über WhatsApp — und erwarten schnelle Antworten. Wer nicht antwortet oder zu langsam reagiert, verliert Kunden an die Konkurrenz.\n\nEin WhatsApp Chatbot von MTM Studios löst dieses Problem vollständig. Er ist 24 Stunden am Tag, 7 Tage die Woche aktiv, antwortet innerhalb von Sekunden und kann dabei Hunderte von Gesprächen gleichzeitig führen. Dabei klingt er nicht wie ein Bot — er ist trainiert mit deinen Inhalten, spricht deine Unternehmenssprache und gibt präzise, hilfreiche Antworten.\n\nDie Einsatzmöglichkeiten sind vielfältig: Terminbuchung für Handwerker, Ärzte und Dienstleister. Lead-Qualifizierung für Immobilienmakler und Agenturen. Produktberatung für Online-Shops. Reservierungsannahme für Restaurants und Hotels. Kundensupport für IT-Unternehmen und SaaS-Anbieter. Für jeden Anwendungsfall konfigurieren wir den Chatbot individuell.\n\nDie technische Basis ist die offizielle WhatsApp Business API — die einzige DSGVO-konforme Lösung für den professionellen Unternehmenseinsatz. Im Gegensatz zu inoffiziellen Tools drohen hier keine Sperrungen. Wir kümmern uns um die komplette Einrichtung: API-Zugang, Verifizierung deines Unternehmensprofils, Chatbot-Training und Integration in deine bestehenden Systeme.\n\nAlle Gespräche laufen in einem zentralen Dashboard zusammen. Du siehst in Echtzeit, welche Anfragen eingehen, wie der Chatbot antwortet und wo ein menschlicher Mitarbeiter übernehmen soll. Lead-Daten werden automatisch in dein CRM übertragen.",
    features: [
      { title: "WhatsApp Business API", description: "Offizielle API — DSGVO-konform, keine Sperrungsgefahr, professionelles Unternehmensprofil." },
      { title: "Sofortige Antworten", description: "Kundenanfragen werden in Sekunden beantwortet — egal zu welcher Uhrzeit." },
      { title: "Terminbuchung per Chat", description: "Kunden buchen Termine direkt im WhatsApp-Gespräch — der Chatbot prüft die Verfügbarkeit." },
      { title: "Lead-Qualifizierung", description: "Der Chatbot erkennt kaufbereite Interessenten und leitet sie mit vollem Kontext weiter." },
      { title: "CRM-Integration", description: "Kontaktdaten und Gesprächsverläufe fließen automatisch in HubSpot, Pipedrive und mehr." },
      { title: "Multi-Channel-Fähig", description: "Derselbe Bot kann parallel auf Website, Instagram und Facebook Messenger laufen." },
    ],
    faqs: [
      { question: "Was ist ein WhatsApp Chatbot für Unternehmen?", answer: "Ein WhatsApp Chatbot für Unternehmen ist eine KI-basierte Software, die automatisch auf eingehende WhatsApp-Nachrichten antwortet. Er ist über die offizielle WhatsApp Business API angebunden, führt natürliche Gespräche auf Deutsch und kann Aufgaben wie Terminbuchung, FAQ-Beantwortung, Lead-Qualifizierung und Kundenbetreuung vollautomatisch erledigen." },
      { question: "Brauche ich ein WhatsApp Business-Konto?", answer: "Für einen professionellen WhatsApp Chatbot wird die WhatsApp Business API benötigt — nicht die einfache WhatsApp Business App. MTM Studios kümmert sich um die komplette Einrichtung: API-Zugang beantragen, Unternehmensprofil verifizieren, Nachrichtenvorlagen genehmigen lassen. Du musst nichts selbst tun." },
      { question: "Ist ein WhatsApp Chatbot DSGVO-konform?", answer: "Ja, wenn er über die offizielle WhatsApp Business API betrieben wird. MTM Studios nutzt ausschließlich die offizielle API und betreibt alle Systeme auf DSGVO-konformen europäischen Servern. Wir stellen Auftragsverarbeitungsverträge bereit und sorgen dafür, dass Kundendaten sicher verarbeitet werden." },
      { question: "Kann der WhatsApp Chatbot Termine buchen?", answer: "Ja. Der Chatbot prüft in Echtzeit deine Verfügbarkeit und bucht Termine direkt im Gespräch — mit automatischer Bestätigung per WhatsApp an den Kunden. Unterstützt werden Google Calendar, Outlook, Calendly und weitere Kalender-Systeme." },
      { question: "Was passiert, wenn der Chatbot eine Frage nicht beantworten kann?", answer: "Der Chatbot übergibt das Gespräch nahtlos an einen menschlichen Mitarbeiter — mit vollem Gesprächskontext, damit dieser sofort anknüpfen kann. Außerhalb der Geschäftszeiten erstellt er eine Aufgabe im Dashboard für die nächste Bearbeitung. Keine Anfrage geht verloren." },
      { question: "Für welche Branchen eignet sich ein WhatsApp Chatbot?", answer: "Für nahezu alle Branchen mit Kundenkontakt: Handwerk (Terminanfragen), Gesundheit (Praxisanmeldung), Einzelhandel (Produktfragen), Gastronomie (Reservierungen), Immobilien (Besichtigungsanfragen), IT und SaaS (Kundensupport) sowie E-Commerce (Bestellstatus, Retouren). Jeder Chatbot wird individuell konfiguriert." },
    ],
    parentPath: "/ki-chatbot",
    parentLabel: "KI-Chatbot",
  },

  "chatbot-agentur": {
    title: "Chatbot Agentur | KI-Chatbots entwickeln & betreiben | MTM Studios",
    description: "MTM Studios ist deine Chatbot Agentur: Wir entwickeln KI-Chatbots für WhatsApp, Website & mehr — individuelle Lösungen für den Mittelstand. Kostenlose Erstberatung.",
    h1: "Chatbot Agentur",
    subtext: "Wir entwickeln, trainieren und betreiben KI-Chatbots für dein Unternehmen — auf allen Kanälen, in deiner Sprache, sofort einsatzbereit.",
    badge: "KI-Chatbot-Entwicklung · Omnichannel",
    intro: "Als spezialisierte Chatbot Agentur entwickelt MTM Studios individuelle KI-Chatbot-Lösungen für den deutschen Mittelstand. Kein Baukastensystem, keine Standardlösung — wir bauen Chatbots, die deine Prozesse, deine Sprache und deine Kunden verstehen. Von der Konzeption über die Entwicklung bis zum laufenden Betrieb — alles aus einer Hand.",
    detailedContent: "Eine professionelle Chatbot Agentur macht den Unterschied zwischen einem Bot, der frustriert, und einem Bot, der begeistert. MTM Studios kombiniert technisches Know-how mit tiefem Verständnis für Kundenkommunikation — das Ergebnis sind Chatbots, die echten Mehrwert liefern.\n\nAls Chatbot Agentur begleiten wir dich durch den gesamten Prozess: Zunächst analysieren wir gemeinsam deine Kommunikationskanäle, häufigsten Kundenanfragen und Geschäftsprozesse. Dann entwickeln wir einen maßgeschneiderten Chatbot, der genau diese Anforderungen abdeckt. Wir trainieren ihn mit deinen Inhalten, integrieren ihn in deine Systeme und gehen live.\n\nUnsere Chatbot-Lösungen decken alle relevanten Kanäle ab: WhatsApp Business (über die offizielle API), deine Website, Instagram Direct Messages, Facebook Messenger und mehr. Alle Kanäle laufen in einer zentralen Plattform zusammen — du verwaltest alles an einem Ort.\n\nAls Chatbot Agentur übernehmen wir auch den laufenden Betrieb: Wir analysieren Gesprächsdaten, identifizieren häufige Abbrüche, optimieren den Gesprächsflow und trainieren den Bot kontinuierlich weiter. So wird dein Chatbot mit der Zeit immer besser — ohne zusätzlichen Aufwand auf deiner Seite.\n\nBesonders für den deutschen Mittelstand ist unsere Chatbot Agentur die richtige Wahl: Wir verstehen die spezifischen Anforderungen kleiner und mittlerer Unternehmen — schnelle Umsetzung, überschaubare Budgets, persönliche Betreuung und pragmatische Lösungen ohne unnötigen Overhead.",
    features: [
      { title: "Individuelle Chatbot-Entwicklung", description: "Kein Baukastensystem — jeder Chatbot wird individuell auf dein Unternehmen, deine Branche und deine Kunden zugeschnitten." },
      { title: "Omnichannel-Fähigkeit", description: "Ein Chatbot für alle Kanäle: WhatsApp, Website, Instagram, Facebook Messenger — zentral gesteuert." },
      { title: "KI-Training & Optimierung", description: "Kontinuierliches Training auf Basis echter Gesprächsdaten — dein Chatbot wird täglich besser." },
      { title: "Integration in bestehende Systeme", description: "Nahtlose Anbindung an CRM, Kalender, Helpdesk, ERP und mehr — keine Insellösung." },
      { title: "Vollständig betriebsbereit", description: "Wir liefern keinen Code, den du selbst deployen musst — sondern einen laufenden, betreuten Service." },
      { title: "DSGVO-konforme Infrastruktur", description: "Alle Daten auf europäischen Servern, AVV inklusive, volle Compliance mit deutschem Datenschutzrecht." },
    ],
    faqs: [
      { question: "Was macht eine Chatbot Agentur?", answer: "Eine Chatbot Agentur wie MTM Studios entwickelt, trainiert und betreibt KI-Chatbots für Unternehmen. Das umfasst die Analyse der Kundenanforderungen, die technische Entwicklung des Chatbots, das Training mit unternehmensspezifischen Inhalten, die Integration in bestehende Systeme (CRM, Kalender, Website) und den laufenden Betrieb und die Optimierung. MTM Studios bietet alles aus einer Hand." },
      { question: "Was unterscheidet eine Chatbot Agentur von DIY-Chatbot-Tools?", answer: "DIY-Tools wie ManyChat oder Tidio bieten Baukastenlösungen mit begrenzter Individualisierung. Eine spezialisierte Chatbot Agentur entwickelt maßgeschneiderte Lösungen, die genau deine Prozesse abbilden, deine Unternehmenssprache sprechen und tief in deine bestehenden Systeme integriert sind. Außerdem übernimmt die Agentur das Training, die Optimierung und den Support — du musst dich um nichts kümmern." },
      { question: "Auf welchen Kanälen können Chatbots eingesetzt werden?", answer: "MTM Studios entwickelt Chatbots für WhatsApp Business (offizielle API), Website-Chat-Widgets, Instagram Direct Messages, Facebook Messenger und weitere Kanäle. Alle Kanäle werden über eine zentrale Plattform verwaltet, sodass du einen einheitlichen Überblick über alle Kundengespräche hast." },
      { question: "Wie lange dauert die Entwicklung eines Chatbots?", answer: "Einfache Chatbots für einen Kanal sind in 3–5 Arbeitstagen einsatzbereit. Komplexere Lösungen mit mehreren Kanälen, tiefen CRM-Integrationen und umfangreichem Training benötigen 2–3 Wochen. Im kostenlosen Erstgespräch erhältst du eine verbindliche Timeline für dein konkretes Projekt." },
      { question: "Übernimmt MTM Studios auch den laufenden Betrieb?", answer: "Ja. Als Chatbot Agentur übernehmen wir nicht nur die Entwicklung, sondern auch den laufenden Betrieb: technischer Support, kontinuierliche Optimierung des Gesprächsflows, Training auf neue FAQ und Inhalte sowie monatliche Reporting-Calls. Du hast immer einen festen Ansprechpartner." },
    ],
    parentPath: "/ki-chatbot",
    parentLabel: "KI-Chatbot",
  },

  "n8n-agentur": {
    title: "n8n Agentur | Workflow-Automatisierung mit n8n | MTM Studios",
    description: "MTM Studios ist deine n8n Agentur: Wir entwickeln und betreiben n8n-Workflows für den deutschen Mittelstand. Prozessautomatisierung, API-Integrationen, Self-Hosted. Kostenlose Erstberatung.",
    h1: "n8n Agentur",
    subtext: "Wir entwickeln, deployen und betreiben n8n-Workflows für dein Unternehmen — leistungsstarke Automatisierungen, die deine Tools verbinden und Prozesse beschleunigen.",
    badge: "n8n · Workflow-Automatisierung · Open Source",
    intro: "n8n ist das leistungsstärkste Open-Source-Automatisierungstool auf dem Markt — und MTM Studios ist deine spezialisierte n8n Agentur. Wir entwickeln komplexe Workflows, deployen n8n auf deiner eigenen Infrastruktur und betreiben es dauerhaft. Das Ergebnis: maximale Kontrolle, DSGVO-konforme Datenhoheit und Automatisierungen ohne laufende Lizenzkosten.",
    detailedContent: "n8n ist nicht Make, nicht Zapier, nicht eine weitere No-Code-Plattform mit limitierten Möglichkeiten. n8n ist ein self-hosted, open-source Automatisierungstool, das Entwicklern und spezialisierten Agenturen maximale Flexibilität gibt — bei vollständiger Datenkontrolle.\n\nAls n8n Agentur setzt MTM Studios auf n8n, weil es für den deutschen Mittelstand die beste Wahl ist: Daten bleiben auf deiner Infrastruktur oder einem europäischen Server. Keine laufenden Lizenzkosten pro Workflow oder pro Operation. Unbegrenzte Integrationen über 400+ native Nodes. Volle Code-Freiheit für komplexe Logik per JavaScript oder Python.\n\nWas wir als n8n Agentur entwickeln: Vollautomatische Lead-Pipelines, die eingehende Anfragen aus Formularen, E-Mail und WhatsApp erfassen, qualifizieren und ins CRM übertragen. E-Mail-Automatisierungen mit intelligenten Follow-up-Sequenzen. Daten-Sync zwischen verschiedenen Systemen — CRM, ERP, Buchhaltung, Projektmanagement. Dokumentenverarbeitung: Rechnungen, Verträge und Formulare automatisch erfassen, sortieren und verarbeiten. Benachrichtigungssysteme: automatische Alerts bei definierten Ereignissen. Reporting-Automatisierungen: Berichte erstellen sich selbst und landen pünktlich in deiner Inbox.\n\nUnsere n8n-Workflows folgen klaren Namenskonventionen und sind vollständig dokumentiert — du bist nie von uns abhängig und kannst jederzeit eigene Änderungen vornehmen oder das Projekt übergeben. Als n8n Agentur liefern wir keine Black Box, sondern nachvollziehbare, wartbare Automatisierungen.",
    features: [
      { title: "Self-Hosted & DSGVO-konform", description: "n8n läuft auf deiner Infrastruktur oder einem europäischen Server — deine Daten verlassen nie die EU." },
      { title: "400+ native Integrationen", description: "Von Salesforce über DATEV bis Slack — n8n verbindet nahezu alle Business-Tools ohne Middleware." },
      { title: "Unbegrenzte Workflows", description: "Keine Limits bei Workflow-Anzahl oder Operationen — skaliert mit deinem Unternehmen ohne Zusatzkosten." },
      { title: "Custom Code-Logik", description: "Für komplexe Anforderungen: eigene JavaScript- oder Python-Funktionen direkt im Workflow." },
      { title: "Vollständige Dokumentation", description: "Alle Workflows werden dokumentiert und übergeben — du bist nie in einer Black Box gefangen." },
      { title: "Laufender Betrieb & Support", description: "Wir betreiben, monitoren und optimieren deine n8n-Instanz dauerhaft — proaktiv, nicht reaktiv." },
    ],
    faqs: [
      { question: "Was ist n8n?", answer: "n8n ist ein open-source Workflow-Automatisierungstool, das ähnlich wie Zapier oder Make funktioniert, aber self-hosted betrieben werden kann. Das bedeutet: Die Software läuft auf deiner eigenen Infrastruktur oder einem Server deiner Wahl, deine Daten verlassen nie dein System, und es gibt keine laufenden Lizenzkosten pro Workflow. n8n bietet über 400 native Integrationen und ermöglicht komplexe Automatisierungen mit eigener Code-Logik." },
      { question: "Was ist eine n8n Agentur?", answer: "Eine n8n Agentur wie MTM Studios entwickelt, deployt und betreibt n8n-Workflows für Unternehmen. Wir übernehmen die technische Einrichtung der n8n-Instanz, die Entwicklung der Automatisierungen, die Integration in bestehende Systeme und den laufenden Betrieb. Du profitierst von der Leistung von n8n, ohne selbst technisches Know-how aufbauen zu müssen." },
      { question: "Was ist der Unterschied zwischen n8n und Zapier?", answer: "Der größte Unterschied: n8n kann self-hosted betrieben werden — deine Daten bleiben auf deiner Infrastruktur. Zapier ist ein Cloud-Dienst, bei dem alle Daten über US-amerikanische Server laufen. Außerdem ist n8n deutlich flexibler bei komplexen Workflows, hat keine Limits bei Operationen und verursacht keine steigenden Kosten bei skalierendem Datenvolumen." },
      { question: "Für welche Prozesse eignet sich n8n?", answer: "n8n eignet sich für alle regelbasierten, wiederkehrenden Prozesse: Lead-Erfassung und CRM-Synchronisation, E-Mail-Automatisierungen, Daten-Sync zwischen verschiedenen Tools, Dokumentenverarbeitung, Benachrichtigungssysteme, Reporting-Automatisierungen und API-Integrationen zwischen Systemen, die keine native Verbindung haben. Wir identifizieren im Erstgespräch deine Prozesse mit dem größten Automatisierungspotenzial." },
      { question: "Muss ich n8n selbst hosten?", answer: "Nein. MTM Studios übernimmt als n8n Agentur das komplette Hosting und den Betrieb. Wir richten n8n auf einem DSGVO-konformen europäischen Server ein, kümmern uns um Updates, Backups und Monitoring. Du bekommst Zugriff auf deine n8n-Instanz und kannst Workflows einsehen — musst aber nichts technisch warten." },
      { question: "Kann ich nach dem Projekt die Workflows selbst weiterentwickeln?", answer: "Ja, das ist explizit unser Ansatz. Alle Workflows sind vollständig dokumentiert und übergeben. n8n hat eine intuitive Benutzeroberfläche — viele Kunden erweitern nach dem Onboarding ihre Workflows selbst. MTM Studios steht jederzeit für Unterstützung bereit, aber du bist nicht von uns abhängig." },
    ],
    parentPath: "/automatisierungen",
    parentLabel: "Automatisierungen",
  },

  "prozessautomatisierung-kmu": {
    title: "Prozessautomatisierung für KMU | Workflows automatisieren | MTM Studios",
    description: "MTM Studios automatisiert Geschäftsprozesse für KMU: Wiederkehrende Abläufe, System-Integrationen und Workflow-Automatisierung — DSGVO-konform, schnell umgesetzt, messbarer ROI.",
    h1: "Prozessautomatisierung für KMU",
    subtext: "Schluss mit manueller Dateneingabe und Copy-Paste zwischen Systemen. Wir automatisieren deine Kernprozesse — schnell, skalierbar und ohne IT-Aufwand auf deiner Seite.",
    badge: "Workflow-Automatisierung · KMU · Mittelstand",
    intro: "Prozessautomatisierung ist für KMU kein Luxus mehr — sie ist eine Notwendigkeit. Wachsende Anforderungen, Fachkräftemangel und steigende Kosten machen manuelle Routinearbeit zum Wachstumsblocker. MTM Studios automatisiert die Kernprozesse kleiner und mittlerer Unternehmen: pragmatisch, ohne monatelange Projekte und mit messbarem ROI ab der ersten Woche.",
    detailedContent: "Prozessautomatisierung für KMU beginnt nicht mit einer großen Systemumstellung oder einem teuren ERP-Rollout. Sie beginnt mit dem einen Prozess, der heute die meiste Zeit kostet.\n\nBei den meisten kleinen und mittleren Unternehmen sind das: Manuelle Dateneingabe zwischen verschiedenen Systemen. E-Mails, die manuell kategorisiert und weitergeleitet werden. Follow-up-Aufgaben, die im Stress vergessen werden. Berichte, die jeden Freitag aus verschiedenen Tools zusammengebaut werden. Auftragsbestätigungen, Rechnungen und Termine, die per Copy-Paste ins System eingepflegt werden.\n\nJeder dieser Prozesse lässt sich automatisieren. MTM Studios analysiert im Erstgespräch deine Abläufe und identifiziert die Quick Wins — Prozesse, bei denen Automatisierung sofort spürbar Zeit spart. Dann entwickeln wir die Automatisierung in 1–2 Wochen und setzen sie live. Ab Tag eins sparst du Arbeitszeit.\n\nUnsere Prozessautomatisierungen für KMU setzen auf bewährte Tools: n8n für komplexe Workflow-Logik, native Integrationen für Standard-Verbindungen und KI-gestützte Verarbeitung für Dokumente und E-Mails. DSGVO-konform, auf europäischen Servern, mit vollständiger Dokumentation.\n\nBesonders wichtig für KMU: Unsere Automatisierungen laufen in deiner bestehenden Systemlandschaft — kein Wechsel zu neuen Tools, kein Datenverlust, keine Umstellungsphase für dein Team. Wir integrieren uns in was du bereits nutzt: HubSpot, Salesforce, DATEV, SAP Business One, Microsoft 365, Google Workspace, Slack, Asana und hunderte weitere Tools.",
    features: [
      { title: "Quick-Win-Analyse", description: "Wir identifizieren im Erstgespräch die Prozesse mit dem größten Einsparpotenzial — konkret, nicht theoretisch." },
      { title: "Keine Systemumstellung nötig", description: "Wir automatisieren in deiner bestehenden Tool-Landschaft — kein teurer Systemwechsel." },
      { title: "Umsetzung in 1–2 Wochen", description: "Erste Automatisierungen gehen schnell live — messbare Ergebnisse ab der ersten Woche." },
      { title: "KI-gestützte Verarbeitung", description: "Dokumente, E-Mails und Formulare werden intelligent verarbeitet — nicht nur weitergeleitet." },
      { title: "Skalierbar ohne Mehrkosten", description: "Automatisierungen wachsen mit deinem Unternehmen — ohne proportional steigende Kosten." },
      { title: "Transparent & dokumentiert", description: "Du verstehst, was automatisiert wird und kannst es jederzeit anpassen oder übergeben." },
    ],
    faqs: [
      { question: "Was ist Prozessautomatisierung für KMU?", answer: "Prozessautomatisierung für KMU bedeutet, wiederkehrende, regelbasierte Geschäftsabläufe durch Software zu ersetzen. Statt manuelle Dateneingabe, E-Mail-Weiterleitung oder Copy-Paste zwischen Systemen laufen diese Aufgaben vollautomatisch — ausgelöst durch definierte Ereignisse, ausgeführt in Echtzeit, ohne manuelle Eingriffe. MTM Studios setzt Prozessautomatisierungen für kleine und mittlere Unternehmen um: schnell, pragmatisch und mit klarem ROI." },
      { question: "Welche Prozesse lassen sich in einem KMU automatisieren?", answer: "Grundsätzlich alle wiederkehrenden, regelbasierten Abläufe: Lead-Erfassung und CRM-Eintragung, E-Mail-Routing und automatische Antworten, Auftragsbestätigungen und Rechnungsversand, Termin-Bestätigungen und Erinnerungen, Daten-Synchronisation zwischen verschiedenen Tools, Dokument-Verarbeitung (Rechnungen, Verträge, Formulare), Reporting und Dashboards sowie Follow-up-Sequenzen im Vertrieb." },
      { question: "Muss ich meine bestehende Software ersetzen?", answer: "Nein. MTM Studios integriert sich in deine bestehende Systemlandschaft. Ob du mit HubSpot, Salesforce, DATEV, SAP, Microsoft 365, Google Workspace oder spezialisierten Branchenlösungen arbeitest — wir schaffen die Verbindungen zwischen deinen Tools, ohne dass du wechseln oder dein Team umschulen musst." },
      { question: "Wie schnell sieht man Ergebnisse?", answer: "Erste Automatisierungen gehen in 1–2 Wochen live. Ab diesem Zeitpunkt werden Arbeitsstunden eingespart — messbar und dokumentiert. Wir definieren gemeinsam KPIs (eingesparte Stunden, Fehlerreduktion, Durchlaufzeiten) und tracken diese in einem Dashboard. Typische KMU-Kunden berichten von 10–30 eingesparten Arbeitsstunden pro Woche nach den ersten Automatisierungen." },
      { question: "Ist Prozessautomatisierung auch für kleine Unternehmen sinnvoll?", answer: "Ja, gerade kleine Unternehmen profitieren besonders. Ein Team von 5 Personen, das 2 Stunden täglich mit Routineaufgaben verbringt, gewinnt durch Automatisierung die Kapazität einer halben Vollzeitstelle zurück — ohne neue Mitarbeiter einstellen zu müssen. Unsere Lösungen sind modular und skalieren mit deinem Bedarf." },
      { question: "Ist Prozessautomatisierung DSGVO-konform?", answer: "Ja. MTM Studios setzt alle Automatisierungen DSGVO-konform um: Daten werden ausschließlich auf europäischen Servern verarbeitet, Verbindungen sind verschlüsselt, Zugriffsrechte klar definiert. Wir erstellen auf Wunsch Verzeichnisse von Verarbeitungstätigkeiten und stellen Auftragsverarbeitungsverträge (AVV) bereit." },
    ],
    parentPath: "/automatisierungen",
    parentLabel: "Automatisierungen",
  },
};

export const getKeywordPageContent = (slug: string): KeywordPageContent | null => {
  return pages[slug] ?? null;
};

export const keywordPageSlugs = Object.keys(pages);
