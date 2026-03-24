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
  detailedContent: string;
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
      title: "KI Agentur Stuttgart | Voice KI, Chatbot & Automatisierung | MTM Studios",
      description: "MTM Studios — KI Agentur Stuttgart: Voice KI Telefonassistenten, Chatbots & n8n-Automatisierungen für den Stuttgarter Mittelstand. Kostenlose Erstberatung — in 48h einsatzbereit.",
      h1: "KI Agentur Stuttgart",
      subtext: "Voice KI, Chatbots und Automatisierungen für Stuttgarter Unternehmen — in 48 Stunden einsatzbereit.",
      localContext: "Stuttgart ist eines der bedeutendsten Wirtschaftszentren Deutschlands — von der Automobilindustrie in Untertürkheim und Zuffenhausen über den Maschinenbau in Feuerbach bis hin zu Tausenden Dienstleistungsunternehmen im Stuttgarter Kessel und der Innenstadt. Die Region Stuttgart mit über 2,8 Millionen Einwohnern ist geprägt von einem starken Mittelstand, der täglich mit denselben Herausforderungen kämpft: zu viele Routineaufgaben, steigende Kundenanforderungen und der grassierende Fachkräftemangel. Als KI Agentur für Stuttgart unterstützen wir Betriebe aus Handwerk, Gesundheit, Recht, Immobilien, IT und Industrie mit konkreten KI-Lösungen, die sofort spürbare Ergebnisse liefern — ohne monatelange Projekte und ohne IT-Vorkenntnisse auf deiner Seite.",
      detailedContent: "Als KI Agentur in Stuttgart entwickeln wir drei Kernlösungen für den lokalen Mittelstand: Voice KI Telefonassistenten, intelligente Chatbots und n8n-Automatisierungen. Ob Automobilzulieferer in Zuffenhausen, Handwerksbetrieb im Stuttgarter Kessel, Marketingagentur in der Stadtmitte oder B2B-Dienstleister im Neckartal — die Herausforderungen sind überall ähnlich: Telefone klingeln unbeantwortet, WhatsApp-Nachrichten bleiben liegen, und manuelle Dateneingaben fressen Stunden.\n\nUnser Voice KI Telefonassistent für Stuttgart nimmt jeden Anruf professionell entgegen — 24 Stunden am Tag, 7 Tage die Woche. Er klingt wie ein echter Mitarbeiter, beantwortet Standardfragen zu Öffnungszeiten und Leistungen, bucht Termine direkt in deinen Kalender und leitet dringende Anrufe sofort weiter. Stuttgarter Unternehmen berichten, dass bis zu 40 % ihrer Anrufe außerhalb der Öffnungszeiten eingehen — genau diese Anrufe gehen bisher verloren. Mit unserem Voice KI Assistenten nicht mehr.\n\nUnsere Chatbot-Lösungen für Stuttgart decken WhatsApp Business, deine Website und weitere Kanäle ab. Sie qualifizieren Leads, beantworten Produktfragen und buchen Beratungstermine — vollautomatisch, rund um die Uhr. Für Stuttgarter E-Commerce-Unternehmen in Feuerbach, Immobilienmakler in der Innenstadt oder Arztpraxen in Degerloch sind Chatbots ein echter Gamechanger bei der Kundenkommunikation.\n\nMit n8n-Automatisierungen verbinden wir deine bestehenden Tools nahtlos miteinander: CRM, E-Mail, Kalender, Buchhaltung, Projektmanagement. Daten fließen automatisch, Follow-up-E-Mails werden pünktlich verschickt, und Berichte erstellen sich selbst. Stuttgarter Kunden berichten typischerweise von 15–30 eingesparten Arbeitsstunden pro Woche.\n\nWir arbeiten branchenübergreifend: Rechtsanwaltskanzleien an der Königstraße, Ingenieurbüros in Vaihingen, Immobilienverwaltungen in Degerloch, Handwerksbetriebe im Cannstatter Tal, IT-Unternehmen in Möhringen — jede Lösung wird individuell auf deine Branche, deine Sprache und deine Prozesse zugeschnitten. Das Erstgespräch ist kostenlos, unverbindlich und dauert 30 Minuten.",
      painPoints: [
        { title: "Fachkräftemangel in Stuttgart", description: "Qualifizierte Mitarbeiter für Kundenservice sind in Stuttgart extrem schwer zu finden und teuer. KI-Lösungen schaffen Kapazitäten ohne neue Stellen." },
        { title: "Hohe Standortkosten", description: "Stuttgart gehört zu den teuersten Standorten Deutschlands. Automatisierung senkt Betriebskosten messbar — ohne Qualitätsverlust." },
        { title: "Steigende Kundenerwartungen", description: "Stuttgarter Kunden erwarten schnelle, professionelle Kommunikation rund um die Uhr — auf allen Kanälen." },
      ],
      features: [
        { title: "Voice KI Telefonassistent", description: "24/7 Anrufannahme, Terminbuchung und Weiterleitung — kein verpasster Anruf mehr in Stuttgart." },
        { title: "KI-Chatbots für Stuttgart", description: "WhatsApp- und Website-Chatbots, die deine Kunden sofort bedienen — auf Deutsch, rund um die Uhr." },
        { title: "n8n Prozessautomatisierung", description: "Wiederkehrende Abläufe vollständig automatisieren — dein Team gewinnt bis zu 30 Stunden pro Woche zurück." },
        { title: "Nahtlose Systemintegration", description: "Anbindung an deine bestehenden Tools: CRM, Kalender, ERP, Buchhaltung — alles verbunden, alles automatisch." },
      ],
      advantages: [
        { title: "Regionaler KI-Partner", description: "Wir kennen den Stuttgarter Markt und seine Besonderheiten — persönlich, erreichbar, nah." },
        { title: "In 48h einsatzbereit", description: "Von der Erstberatung zum laufenden Voice KI Assistenten in wenigen Tagen — nicht Monaten." },
        { title: "DSGVO-konform & sicher", description: "Alle Lösungen laufen auf europäischen Servern nach deutschen Datenschutzstandards." },
      ],
      faqs: [
        { question: "Was ist eine KI Agentur in Stuttgart?", answer: "Eine KI Agentur in Stuttgart wie MTM Studios entwickelt und implementiert KI-basierte Automatisierungslösungen für lokale Unternehmen. Das umfasst Voice KI Telefonassistenten, die Anrufe entgegennehmen und Termine buchen, KI-Chatbots für WhatsApp und Website sowie n8n-Workflows, die Geschäftsprozesse automatisieren. MTM Studios betreut Unternehmen aus Handwerk, Gesundheit, Recht, Immobilien und Industrie in Stuttgart und der Region." },
        { question: "Für welche Branchen in Stuttgart sind KI-Lösungen geeignet?", answer: "KI-Lösungen sind branchenübergreifend einsetzbar — besonders profitieren Stuttgarter Unternehmen aus folgenden Bereichen: Handwerksbetriebe (Anrufannahme, Terminbuchung), Arztpraxen und Therapeuten (Terminvergabe per Voice KI), Rechtsanwälte und Steuerberater (Lead-Qualifizierung), Immobilienmakler (Chatbot zur Vorqualifizierung), Automotive-Zulieferer (Prozessautomatisierung) sowie E-Commerce und Dienstleister (WhatsApp-Automatisierung). Jede Lösung wird individuell auf die Branche und den Standort zugeschnitten." },
        { question: "Wie schnell ist eine KI-Lösung in Stuttgart einsatzbereit?", answer: "Ein Voice KI Telefonassistent für Stuttgart ist typischerweise in 48 Stunden einsatzbereit. Chatbots gehen nach 3–5 Arbeitstagen live. Umfangreichere n8n-Automatisierungsprojekte mit mehreren Systemintegrationen benötigen 1–3 Wochen. Im kostenlosen Erstgespräch bekommst du eine verbindliche Timeline für dein konkretes Projekt." },
        { question: "Was kostet eine KI Agentur in Stuttgart?", answer: "Die Kosten hängen vom Produkt und Umfang ab. MTM Studios erstellt dir nach einem kostenlosen Erstgespräch ein individuelles Angebot — transparent, ohne versteckte Kosten und immer mit klarem ROI-Fokus. Ruf uns an oder schreib uns kurz, dann besprechen wir dein konkretes Projekt." },
        { question: "Bietet MTM Studios persönliche Beratung in Stuttgart an?", answer: "Ja. Wir bieten persönliche Termine in Stuttgart an — ob in deinem Büro, in der Stadtmitte oder per Videocall. Viele Stuttgarter Kunden schätzen das persönliche Kennenlernen vor Ort, bevor die Zusammenarbeit startet. Ruf uns an oder schreib uns — das Erstgespräch ist kostenlos und dauert 30 Minuten." },
        { question: "Wie unterscheidet sich MTM Studios von anderen KI Agenturen in Stuttgart?", answer: "MTM Studios fokussiert sich auf drei konkrete Produkte mit garantierter Umsetzung in Tagen: Voice KI (Telefon), Chatbots und n8n-Automatisierungen. Kein Consulting ohne Ergebnis, keine monatelangen Projekte. Wir liefern fertige, laufende Lösungen — mit persönlichem Ansprechpartner, DSGVO-konformer Infrastruktur und klarer Kommunikation. Stuttgarter Mittelstand ist unsere Kernzielgruppe." },
      ],
    },
    ulm: {
      title: "KI Agentur Ulm | Voice KI, Chatbot & Automatisierung | MTM Studios",
      description: "MTM Studios — KI Agentur Ulm: Voice KI Telefonassistenten, Chatbots & Automatisierungen für Unternehmen in Ulm und Neu-Ulm. Kostenlose Erstberatung — in 48h einsatzbereit.",
      h1: "KI Agentur Ulm",
      subtext: "Voice KI, Chatbots und Automatisierungen für Ulmer Unternehmen — regional, persönlich, sofort einsatzbereit.",
      localContext: "Ulm verbindet Tradition mit Innovation — als Wissenschaftsstadt mit der Universität Ulm, der Technischen Hochschule Ulm und einer wachsenden Start-up-Szene rund um den Science Park. Die Innovationsregion Ulm/Neu-Ulm ist Heimat zahlreicher mittelständischer Unternehmen: von Fertigungsbetrieben in Ulm-Nord über Handwerksbetriebe in der Altstadt bis hin zu IT-Dienstleistern und Steuerberatern in der Weststadt und der Neuen Mitte. Was diese Unternehmen verbindet: Der Wunsch nach pragmatischen Lösungen, die sofort funktionieren. Als KI Agentur für Ulm bieten wir genau das — Voice KI Telefonie, WhatsApp-Chatbots und n8n-Automatisierungen, die deinen Alltag spürbar erleichtern und ohne IT-Aufwand auf deiner Seite laufen.",
      detailedContent: "Als KI Agentur in Ulm unterstützen wir Unternehmen in der gesamten Innovationsregion Ulm/Neu-Ulm mit drei praxiserprobten Lösungen: Voice KI Telefonassistenten, KI-Chatbots und n8n-Automatisierungen. Die Wirtschaftsstruktur der Donaustadt ist vielfältig — Handwerk, Medizin, Recht, Logistik, IT und Produktion prägen die Region. Und alle haben dieselbe Herausforderung: Zu viele Routineaufgaben, zu wenig Zeit.\n\nUnser Voice KI Telefonassistent für Ulm nimmt Anrufe professionell entgegen — 24/7, auch wenn du auf der Baustelle bist, im Behandlungszimmer oder im Mandantengespräch. Ob Zahnarztpraxis am Münsterplatz, Handwerksbetrieb in Söflingen oder Steuerberater in Neu-Ulm — verpasste Anrufe kosten Aufträge. Der Voice KI Assistent klingt wie ein echter Mitarbeiter, beantwortet häufige Fragen und bucht Termine direkt in deinen Kalender. Einrichtungszeit: 48 Stunden.\n\nUnsere Chatbot-Lösungen für Ulm automatisieren die Kundenkommunikation auf WhatsApp Business und deiner Website. Über 80 % der Deutschen nutzen WhatsApp täglich — immer mehr kontaktieren Unternehmen darüber. Mit unserem KI-Chatbot bist du auf diesem Kanal rund um die Uhr vertreten. Kundenanfragen werden sofort beantwortet, Termine gebucht, Informationen bereitgestellt — ohne manuelle Arbeit auf deiner Seite.\n\nMit n8n-Automatisierungen verbinden wir deine bestehenden Tools miteinander: Aufträge aus dem Kontaktformular landen automatisch im CRM, Bestätigungen werden verschickt, Fristen überwacht, Berichte erstellt. Für einen Ulmer Handwerksbetrieb spart das schnell 10–20 Stunden pro Woche. Für eine Steuerberatung reduziert es Fehler in der Mandantenverwaltung erheblich.\n\nWir kennen die Besonderheiten der Region — die Bodenständigkeit des schwäbischen Mittelstands, die enge Vernetzung der Unternehmen und den Innovationsanspruch der Wissenschaftsstadt. Unsere Lösungen sind modular, DSGVO-konform und skalierbar. Das Erstgespräch ist kostenlos, unverbindlich und zeigt dir konkret, was KI für dein Unternehmen in Ulm bewirken kann.",
      painPoints: [
        { title: "Kleine Teams, große Aufgaben", description: "Viele Ulmer Unternehmen haben kompakte Teams, die täglich Dutzende Anrufe und Nachrichten bearbeiten müssen." },
        { title: "Wettbewerb mit der Großstadt", description: "Im Wettbewerb mit Stuttgart und München braucht der Ulmer Mittelstand smarte Lösungen, die Effizienz steigern." },
        { title: "Erreichbarkeit rund um die Uhr", description: "Kunden rufen außerhalb der Öffnungszeiten an und erwarten sofortige Antworten — auch abends und am Wochenende." },
      ],
      features: [
        { title: "Voice KI Telefonassistent", description: "24/7 Anrufannahme für Ulmer Unternehmen — kein verpasster Anruf, keine überlastete Rezeption mehr." },
        { title: "KI-Chatbot für WhatsApp & Website", description: "Automatische Antworten auf Kundenanfragen in Echtzeit — auf dem Kanal, den deine Kunden bevorzugen." },
        { title: "n8n Workflow-Automatisierung", description: "Von der Anfrage bis zur Dokumentation: Wiederkehrende Prozesse laufen automatisch ohne manuelle Eingriffe." },
        { title: "Systemintegrationen", description: "Nahtlose Anbindung an deine vorhandene Software — CRM, Kalender, Buchhaltung, alle verbunden." },
      ],
      advantages: [
        { title: "Regional verwurzelt", description: "Wir kennen die Ulmer Unternehmenslandschaft und arbeiten auf Augenhöhe mit dem Mittelstand." },
        { title: "Persönlicher Ansprechpartner", description: "Kein anonymes Callcenter — du hast einen festen Ansprechpartner, der dein Projekt kennt." },
        { title: "Schnell und skalierbar", description: "In 48h einsatzbereit, modular erweiterbar, DSGVO-konform und passend für KMUs jeder Größe." },
      ],
      faqs: [
        { question: "Was ist eine KI Agentur in Ulm?", answer: "Eine KI Agentur in Ulm wie MTM Studios entwickelt und betreibt KI-basierte Lösungen für lokale Unternehmen — Voice KI Telefonassistenten, die Anrufe entgegennehmen, KI-Chatbots für WhatsApp und Website sowie n8n-Automatisierungen für Geschäftsprozesse. MTM Studios betreut Unternehmen aus Handwerk, Gesundheit, Recht, Logistik und IT in Ulm, Neu-Ulm und der Region Alb-Donau." },
        { question: "Für welche Branchen in Ulm sind KI-Lösungen geeignet?", answer: "KI-Lösungen eignen sich für nahezu alle Branchen in Ulm. Besonders hohen Nutzen erzielen: Handwerksbetriebe (Voice KI für Terminbuchung), Arztpraxen und Therapeuten am Universitätsklinikum (automatische Anrufannahme), Steuerberater und Rechtsanwälte in der Neuen Mitte (Lead-Qualifizierung per Chatbot), Logistikunternehmen im Donautal (Prozessautomatisierung) sowie IT-Firmen in der Wissenschaftsstadt (Workflow-Integrationen). Jede Lösung wird individuell konfiguriert." },
        { question: "Wie schnell ist eine KI-Lösung in Ulm einsatzbereit?", answer: "Ein Voice KI Telefonassistent für Ulm ist innerhalb von 48 Stunden live. Chatbots gehen nach 3–5 Arbeitstagen in Betrieb. n8n-Automatisierungen sind je nach Komplexität in 1–2 Wochen fertig. Im kostenlosen Erstgespräch bekommst du eine verbindliche Timeline und ein transparentes Angebot ohne versteckte Kosten." },
        { question: "Was kostet eine KI Agentur in Ulm?", answer: "Die Kosten hängen vom gewählten Produkt und Umfang ab. MTM Studios erstellt dir nach einem kostenlosen Erstgespräch ein individuelles Angebot — transparent, ohne versteckte Kosten. Kontaktiere uns einfach und wir besprechen, was für dein Unternehmen in Ulm Sinn macht und was es kostet." },
        { question: "Arbeitet MTM Studios nur mit Unternehmen aus Ulm?", answer: "Nein. Wir betreuen Unternehmen in der gesamten Innovationsregion — von Ulm und Neu-Ulm über Blaubeuren, Laichingen und Ehingen bis ins Alb-Donau-Gebiet. Remote-Zusammenarbeit ist jederzeit möglich. Persönliche Treffen in Ulm bieten wir gerne an — das Erstgespräch ist immer kostenlos und unverbindlich." },
        { question: "Wie unterscheidet sich MTM Studios von anderen KI Agenturen in Ulm?", answer: "MTM Studios liefert keine Konzepte, sondern fertige, laufende Lösungen. Drei konkrete Produkte: Voice KI Telefon, Chatbots und n8n-Automatisierungen — einsatzbereit in Tagen. Persönlicher Ansprechpartner statt anonymem Support. DSGVO-konforme Infrastruktur auf europäischen Servern. Und eine nachgewiesene Umsetzungsgeschwindigkeit, die für den Ulmer Mittelstand gemacht ist." },
      ],
    },
  },
  "ki-telefonassistent": {
    stuttgart: {
      title: "KI-Telefonassistent Stuttgart | 24/7 Anrufannahme & Terminbuchung | MTM Studios",
      description: "KI-Telefonassistent Stuttgart: Automatische Anrufannahme, Terminbuchung & Weiterleitung — 24/7, kein verpasster Anruf mehr. Jetzt kostenlos beraten lassen.",
      h1: "KI-Telefonassistent Stuttgart",
      subtext: "Nie wieder verpasste Anrufe. Dein KI-Telefonassistent nimmt Anrufe an, beantwortet Fragen und bucht Termine — rund um die Uhr.",
      localContext: "In einer Wirtschaftsmetropole wie Stuttgart ist telefonische Erreichbarkeit geschäftskritisch. Ob Handwerksbetrieb im Kessel, Arztpraxis in Bad Cannstatt, Rechtsanwaltskanzlei in der Innenstadt oder Ingenieurbüro in Vaihingen — verpasste Anrufe kosten Umsatz und Vertrauen. Studien zeigen, dass bis zu 40 % der Anrufe bei kleinen und mittleren Unternehmen nicht angenommen werden. In einem Markt wie Stuttgart, wo Kunden hohe Servicestandards gewohnt sind, kann das den Unterschied zwischen Wachstum und Stillstand bedeuten. Unser KI-Telefonassistent löst dieses Problem — zuverlässig, professionell und ab dem ersten Tag.",
      detailedContent: "Ein KI-Telefonassistent in Stuttgart bedeutet für dein Unternehmen: kein verpasster Anruf mehr, keine überlastete Rezeption und keine genervten Kunden in der Warteschleife. In der Stuttgarter Geschäftswelt, wo persönlicher Kontakt und schnelle Reaktionszeiten über Aufträge entscheiden, ist das ein enormer Vorteil.\n\nStell dir vor: Ein potenzieller Kunde ruft bei deinem Handwerksbetrieb in Stuttgart-Ost an, während du auf der Baustelle bist. Statt eines Anrufbeantworters nimmt dein KI-Telefonassistent den Anruf professionell entgegen, beantwortet Standardfragen zu Leistungen und Preisen, und bucht direkt einen Besichtigungstermin in deinem Kalender. Der Anrufer fühlt sich gut aufgehoben, und du hast einen neuen Auftrag — ohne eine Sekunde Arbeitszeit zu verlieren.\n\nGenau so funktioniert unser KI-Telefonassistent für Stuttgarter Unternehmen. Die Sprach-KI klingt natürlich und menschlich, spricht fließend Deutsch und kann auf deine spezifischen Anforderungen trainiert werden. Ob Terminbuchung für eine Arztpraxis in Degerloch, Anfragenqualifizierung für ein Ingenieurbüro in Möhringen oder Erstberatung für eine Kanzlei am Schlossplatz — der Assistent passt sich an deine Branche und deinen Ton an.\n\nBesonders relevant für den Stuttgarter Markt: Unser Telefonassistent integriert sich nahtlos in deine bestehenden Systeme — Google Calendar, Outlook, Calendly, CRM-Systeme und mehr. Dringende Anrufe werden sofort an die richtige Person weitergeleitet, während Routineanfragen vollautomatisch abgewickelt werden. So sparst du nicht nur Zeit, sondern steigerst auch die Kundenzufriedenheit messbar. Die Einrichtung dauert in der Regel nur 48 Stunden, und du kannst den Assistenten jederzeit anpassen.",
      painPoints: [
        { title: "Verpasste Anrufe = verlorene Kunden", description: "Jeder nicht angenommene Anruf ist ein potenzieller Auftrag, der zur Konkurrenz geht." },
        { title: "Telefonieren frisst Arbeitszeit", description: "Dein Team verbringt Stunden mit Routineanrufen statt mit wertschöpfender Arbeit." },
        { title: "Außerhalb der Öffnungszeiten unerreichbar", description: "Kunden rufen an, wenn es ihnen passt — nicht nur von 9 bis 17 Uhr." },
      ],
      features: [
        { title: "24/7 Anrufannahme", description: "Dein KI-Assistent ist immer erreichbar — auch nachts, am Wochenende und an Feiertagen." },
        { title: "Intelligente Terminbuchung", description: "Termine werden automatisch in deinen Kalender eingetragen — ohne Hin-und-Her." },
        { title: "Natürliche Gesprächsführung", description: "Modernste Sprach-KI, die sich wie ein echter Mitarbeiter anhört — auf Deutsch." },
        { title: "Sofortige Weiterleitung", description: "Dringende Anrufe werden erkannt und direkt an die richtige Person weitergeleitet." },
      ],
      advantages: [
        { title: "Stuttgart kennt uns", description: "Wir arbeiten bereits mit Unternehmen aus der Region — mit Verständnis für lokale Abläufe." },
        { title: "In 48h einsatzbereit", description: "Schnelle Einrichtung, sofortige Wirkung — ohne wochenlange Projekte." },
        { title: "DSGVO-konform", description: "Alle Daten werden sicher und nach deutschen Standards verarbeitet." },
      ],
      faqs: [
        { question: "Wie klingt der KI-Telefonassistent?", answer: "Natürlich und professionell. Die Stimme klingt wie ein echter Mitarbeiter — nicht wie ein Roboter. Wir passen den Ton, die Begrüßung und die Gesprächsführung individuell an deine Marke und dein Unternehmen an. Viele Anrufer bemerken gar nicht, dass sie mit einer KI sprechen." },
        { question: "Kann der Assistent Termine in meinen Kalender eintragen?", answer: "Ja, er integriert sich nahtlos in gängige Kalendersysteme wie Google Calendar, Outlook oder Calendly. Der Assistent prüft in Echtzeit die Verfügbarkeit und bucht den Termin direkt ein. Du bekommst eine Bestätigung, und der Kunde ebenfalls — alles vollautomatisch und ohne manuellen Aufwand." },
        { question: "Was passiert bei komplexen Anfragen?", answer: "Erkennt der Assistent, dass ein menschlicher Kontakt nötig ist, leitet er den Anruf sofort an die zuständige Person weiter. Alternativ erstellt er ein detailliertes Rückruf-Ticket mit allen relevanten Informationen. So geht keine Anfrage verloren, und dein Team kann sich gezielt um die wichtigen Gespräche kümmern." },
        { question: "Ist das für meine Branche geeignet?", answer: "Ja — ob Handwerk, Gesundheit, Recht, Immobilien oder Dienstleistung. Wir konfigurieren den Assistenten genau für deinen Anwendungsfall. Jede Branche hat eigene Fachbegriffe, Abläufe und Kundenerwartungen — und genau darauf trainieren wir den Assistenten. Stuttgarter Unternehmen aus über 15 Branchen vertrauen bereits auf unsere Lösung." },
      ],
    },
    ulm: {
      title: "KI-Telefonassistent Ulm | Anrufe automatisieren | MTM Studios",
      description: "KI-Telefonassistent für Unternehmen in Ulm. Automatische Anrufannahme, Terminbuchung und intelligente Weiterleitung — 24/7.",
      h1: "KI-Telefonassistent für Ulm",
      subtext: "Verpasse keinen Anruf mehr. Dein KI-Telefonassistent für die Region Ulm — immer erreichbar, immer professionell.",
      localContext: "Ulmer Unternehmen — vom Familienbetrieb in Wiblingen bis zum Hidden Champion in der Wissenschaftsstadt — setzen auf persönlichen Kundenkontakt. Doch die Realität zeigt: Gerade in kleinen und mittleren Betrieben kann nicht jeder Anruf angenommen werden. Ob der Handwerker auf der Baustelle ist, die Ärztin im Behandlungszimmer oder der Steuerberater im Mandantengespräch — wichtige Anrufe gehen verloren. In der Region Ulm/Neu-Ulm, wo Mund-zu-Mund-Empfehlungen eine große Rolle spielen, kann jeder verpasste Anruf einen verlorenen Kunden bedeuten. Unser KI-Telefonassistent schließt diese Lücke zuverlässig, ohne dass deine Kunden den Unterschied merken.",
      detailedContent: "Ein KI-Telefonassistent für Ulm gibt deinem Unternehmen die Erreichbarkeit, die deine Kunden erwarten — rund um die Uhr, sieben Tage die Woche. In einer Region, in der persönlicher Kontakt und Verlässlichkeit zählen, ist das ein entscheidender Wettbewerbsvorteil.\n\nDie Wirtschaft in Ulm und Neu-Ulm ist vielfältig: Handwerksbetriebe in Söflingen und Gögglingen, Arztpraxen und Therapeuten rund um das Universitätsklinikum, Rechtsanwälte und Steuerberater in der Neuen Mitte, Logistikunternehmen im Donautal und technologieorientierte Firmen in der Wissenschaftsstadt. Alle diese Branchen haben eines gemeinsam: Ihre Kunden erwarten, dass jemand ans Telefon geht.\n\nUnser KI-Telefonassistent ist mehr als ein intelligenter Anrufbeantworter. Er führt echte Gespräche — erfragt das Anliegen, beantwortet häufige Fragen zu Öffnungszeiten, Leistungen oder Preisen, bucht Termine direkt in deinen Kalender und erstellt bei Bedarf detaillierte Rückruf-Tickets. Die Stimme klingt natürlich und freundlich, und der Assistent kann auf deine spezifischen FAQ, deine Dienstleistungen und deinen Kommunikationsstil trainiert werden.\n\nFür Ulmer Unternehmen besonders wertvoll: Die Lösung ist sofort einsatzbereit, ohne teure Hardware oder lange Implementierungszeiten. Du behältst deine bestehende Telefonnummer — wir richten lediglich eine intelligente Weiterleitung ein. Und das Beste: Du zahlst nur für das, was du wirklich nutzt. So profitiert auch der kleine Familienbetrieb mit fünf Mitarbeitern genauso wie das wachsende IT-Unternehmen mit 50 Angestellten.",
      painPoints: [
        { title: "Zu wenig Personal fürs Telefon", description: "Kleine Teams können nicht jeden Anruf annehmen — und verlieren so potenzielle Kunden." },
        { title: "Routinefragen binden Kapazitäten", description: "Öffnungszeiten, Adresse, Preise — Standardfragen, die dein Team nicht manuell beantworten muss." },
        { title: "Kein Anrufbeantworter mehr", description: "Kunden legen auf, wenn sie auf einen Anrufbeantworter stoßen — und rufen die Konkurrenz an." },
      ],
      features: [
        { title: "Rund-um-die-Uhr erreichbar", description: "Auch wenn dein Büro geschlossen ist, nimmt dein KI-Assistent professionell Anrufe entgegen." },
        { title: "Automatische Terminvergabe", description: "Kunden buchen Termine direkt im Gespräch — der Assistent prüft die Verfügbarkeit in Echtzeit." },
        { title: "Mehrsprachig", description: "Neben Deutsch auch in weiteren Sprachen verfügbar — ideal für internationale Kunden." },
        { title: "Anrufzusammenfassungen", description: "Nach jedem Gespräch erhältst du eine Zusammenfassung per E-Mail oder in deinem CRM." },
      ],
      advantages: [
        { title: "Nähe und Vertrauen", description: "Als regionaler Partner sind wir schnell erreichbar und kennen deine Herausforderungen." },
        { title: "Sofort startklar", description: "Keine langen Onboarding-Phasen — dein Assistent kann in wenigen Tagen live gehen." },
        { title: "Faire Preise", description: "Transparente Preismodelle ohne versteckte Kosten — passend für den Mittelstand." },
      ],
      faqs: [
        { question: "Funktioniert das auch mit meiner bestehenden Telefonnummer?", answer: "Ja, wir richten eine intelligente Weiterleitung ein, sodass deine bestehende Nummer erhalten bleibt. Der Assistent übernimmt im Hintergrund — deine Kunden merken keinen Unterschied. Die Einrichtung dauert nur wenige Minuten und ist komplett ohne technisches Vorwissen möglich." },
        { question: "Können Anrufe auch weitergeleitet werden?", answer: "Ja, der Assistent erkennt dringende Anliegen automatisch und leitet sie direkt an die zuständige Person weiter. Du definierst selbst die Regeln: Welche Themen sollen weitergeleitet werden, an wen, und zu welchen Zeiten. Außerhalb der Geschäftszeiten erstellt der Assistent ein Rückruf-Ticket mit allen Details." },
        { question: "Was kostet ein KI-Telefonassistent?", answer: "Die Kosten richten sich nach dem Anrufvolumen und den gewünschten Funktionen. Wir beraten dich kostenlos und unverbindlich und erstellen ein Angebot, das genau zu deinem Bedarf passt — transparent, ohne versteckte Kosten." },
        { question: "Wie trainiert ihr den Assistenten?", answer: "Wir konfigurieren den Assistenten mit deinen FAQ, Öffnungszeiten, Services, Preislisten und deiner gewünschten Tonalität — komplett auf dich zugeschnitten. Du gibst uns die Informationen, die deine Kunden am häufigsten erfragen, und wir trainieren den Assistenten darauf. Anpassungen sind jederzeit möglich, wenn sich deine Leistungen oder Prozesse ändern." },
      ],
    },
  },
  "ki-chatbot": {
    stuttgart: {
      title: "KI-Chatbot Stuttgart | WhatsApp & Website | MTM Studios",
      description: "KI-Chatbot für Stuttgarter Unternehmen. Automatisiert Kundenanfragen auf WhatsApp, Website und mehr — 24/7, auf Deutsch.",
      h1: "KI-Chatbot für Stuttgart",
      subtext: "Automatisierte Kundenkommunikation auf WhatsApp und deiner Website — für Unternehmen in Stuttgart.",
      localContext: "Stuttgarter Kunden erwarten schnelle Antworten — egal ob über WhatsApp, deine Website oder Social Media. Die Generation der Messaging-Nutzer wächst stetig, und immer mehr Menschen bevorzugen Chat gegenüber dem Telefon. In einer Stadt mit über 630.000 Einwohnern und einem enormen Einzugsgebiet bedeutet das: Tausende potenzielle Kundenanfragen, die schnell und professionell beantwortet werden müssen. Ein KI-Chatbot beantwortet häufige Fragen sofort, qualifiziert Leads und entlastet dein Team — perfekt für den anspruchsvollen Stuttgarter Markt, wo Geschwindigkeit und Servicequalität über Kundenbindung entscheiden.",
      detailedContent: "Ein KI-Chatbot für Stuttgarter Unternehmen ist weit mehr als ein einfaches FAQ-Tool. Er ist dein digitaler Mitarbeiter, der rund um die Uhr auf WhatsApp, deiner Website und weiteren Kanälen für deine Kunden da ist. In einer Wirtschaftsregion wie Stuttgart, wo Unternehmen in harter Konkurrenz um Kunden stehen, macht schnelle und professionelle Kommunikation den Unterschied.\n\nDenk an eine typische Situation: Ein potenzieller Kunde besucht am Sonntagabend deine Website, hat eine Frage zu deinem Angebot und schreibt über das Chat-Widget. Ohne Chatbot bleibt die Anfrage bis Montagmorgen unbeantwortet — und der Kunde hat inzwischen bei der Konkurrenz angefragt. Mit unserem KI-Chatbot erhält er sofort eine kompetente Antwort, wird durch deine Leistungen geführt und kann direkt einen Beratungstermin buchen.\n\nFür Stuttgarter Branchen haben wir spezialisierte Chatbot-Lösungen entwickelt: Immobilienmakler in der Innenstadt nutzen den Bot zur Vorqualifizierung von Mietinteressenten. Restaurants in Stuttgart-West nehmen Reservierungen entgegen. Online-Shops aus Feuerbach beantworten Produktfragen und reduzieren Retouren. Arztpraxen in Degerloch bieten Terminbuchung und Rezeptbestellung per WhatsApp an. Für jede Branche trainieren wir den Chatbot mit branchenspezifischem Wissen und deiner individuellen Tonalität.\n\nDie Integration ist nahtlos: Unser Chatbot verbindet sich mit deinem CRM, deinem Kalender und deiner Wissensdatenbank. Lead-Informationen werden automatisch erfasst, Gespräche protokolliert und Übergaben an echte Mitarbeiter intelligent gesteuert. Und das Beste: Du siehst in einem übersichtlichen Dashboard, welche Fragen am häufigsten gestellt werden, wo Kunden abspringen und welche Leads am vielversprechendsten sind.",
      painPoints: [
        { title: "Anfragen stapeln sich", description: "E-Mails, WhatsApp-Nachrichten, Website-Formulare — dein Team kommt kaum hinterher." },
        { title: "Langsame Reaktionszeiten", description: "Kunden erwarten Antworten in Minuten, nicht Stunden. Jede Verzögerung kostet Vertrauen." },
        { title: "Kein Service am Wochenende", description: "Deine Kunden haben auch samstags Fragen — aber dein Team ist nicht da." },
      ],
      features: [
        { title: "WhatsApp-Integration", description: "Dein Chatbot antwortet direkt in WhatsApp — dem Kanal, den deine Kunden täglich nutzen." },
        { title: "Website-Chat-Widget", description: "Ein elegantes Chat-Fenster auf deiner Website, das Besucher sofort anspricht." },
        { title: "Lead-Qualifizierung", description: "Der Chatbot erkennt kaufbereite Interessenten und leitet sie an dein Vertriebsteam weiter." },
        { title: "Wissensdatenbank-Anbindung", description: "Trainiert mit deinen FAQ, Produktinfos und Preislisten für präzise Antworten." },
      ],
      advantages: [
        { title: "Stuttgarter Marktkenntnis", description: "Wir wissen, wie Kunden in der Region kommunizieren und was sie erwarten." },
        { title: "Schnelle Einrichtung", description: "Dein Chatbot ist in wenigen Tagen einsatzbereit — inklusive Training." },
        { title: "Messbare Ergebnisse", description: "Dashboard mit Auswertungen zu Anfragen, Konversionen und Kundenzufriedenheit." },
      ],
      faqs: [
        { question: "Kann der Chatbot auch auf Instagram oder Facebook antworten?", answer: "Ja, neben WhatsApp und Website können wir den Chatbot auch auf Instagram und Facebook Messenger einbinden. So erreichst du deine Kunden auf allen Kanälen, die sie nutzen — und das mit einer einzigen, zentral verwalteten KI-Lösung. Alle Gespräche laufen in einem Dashboard zusammen." },
        { question: "Wie intelligent ist der Chatbot?", answer: "Sehr intelligent — er versteht Kontext, kann Folgefragen beantworten und lernt aus jeder Konversation dazu. Im Gegensatz zu einfachen Regel-Bots nutzt unsere Lösung moderne Sprach-KI, die natürliche Sprache versteht und auch bei unerwarteten Fragen sinnvoll reagiert. Stuttgarter Unternehmen berichten von einer Lösungsquote von über 85 % ohne menschliches Eingreifen." },
        { question: "Brauche ich eine WhatsApp Business API?", answer: "Wir kümmern uns um die komplette technische Einrichtung, inklusive WhatsApp Business API, Verifizierung deines Unternehmensprofils und Konfiguration der Nachrichtenvorlagen. Du musst dich um nichts Technisches kümmern — wir übernehmen den gesamten Prozess und begleiten dich Schritt für Schritt." },
        { question: "Kann der Chatbot an mein CRM angebunden werden?", answer: "Ja, wir integrieren den Chatbot in gängige CRM-Systeme wie HubSpot, Salesforce, Pipedrive oder auch branchenspezifische Lösungen. Kontaktdaten, Gesprächsverläufe und Lead-Scores werden automatisch synchronisiert. So hat dein Vertriebsteam immer den vollen Überblick, wenn es einen qualifizierten Lead weiterbearbeitet." },
      ],
    },
    ulm: {
      title: "KI-Chatbot Ulm | WhatsApp & Website | MTM Studios",
      description: "KI-Chatbot für Unternehmen in Ulm. Automatisierte Kundenkommunikation auf WhatsApp, Website und mehr — rund um die Uhr.",
      h1: "KI-Chatbot für Ulm",
      subtext: "Deine Kunden schreiben. Dein Chatbot antwortet — sofort, intelligent und rund um die Uhr.",
      localContext: "Immer mehr Ulmer Unternehmen setzen auf digitale Kundenkommunikation — und ihre Kunden erwarten genau das. Ob über WhatsApp, die Unternehmenswebsite oder Social-Media-Kanäle: Schnelle, kompetente Antworten sind kein Bonus mehr, sondern Standard. In der Region Ulm/Neu-Ulm, wo viele kleine und mittlere Unternehmen den Markt prägen, fehlen häufig die Ressourcen für eine permanente Besetzung aller Kommunikationskanäle. Ein KI-Chatbot bietet deinen Kunden den Service, den sie erwarten — schnell, persönlich und über ihre bevorzugten Kanäle. Wir entwickeln Chatbots, die sich anfühlen wie ein echtes Gespräch und gleichzeitig dein Team spürbar entlasten.",
      detailedContent: "Ein KI-Chatbot für Ulmer Unternehmen ist die Antwort auf eine der größten Herausforderungen im modernen Kundenservice: Wie beantworte ich hunderte Anfragen täglich, ohne mein Team zu überlasten? In einer Stadt, in der Kundennähe und persönlicher Service zum Selbstverständnis gehören, muss ein Chatbot mehr können als Standardantworten liefern.\n\nUnsere KI-Chatbots für die Region Ulm werden individuell trainiert — mit deinen Produkten, deinen FAQ, deiner Preisliste und deiner Unternehmenssprache. Ein Handwerksbetrieb in Söflingen bekommt einen anderen Bot als eine Zahnarztpraxis am Münsterplatz oder ein Modegeschäft in der Neuen Mitte. Jeder Chatbot spiegelt die Persönlichkeit und die Kompetenz deines Unternehmens wider.\n\nBesonders beliebt bei unseren Ulmer Kunden: Die WhatsApp-Integration. Über 80 % der Deutschen nutzen WhatsApp täglich — und immer mehr Kunden bevorzugen es, Unternehmen per Nachricht statt per Telefon zu kontaktieren. Mit unserem Chatbot bist du auf diesem Kanal professionell vertreten. Kundenanfragen werden sofort beantwortet, Termine gebucht und Informationen bereitgestellt — auch wenn dein Team gerade beschäftigt oder im Feierabend ist.\n\nDer Chatbot arbeitet nicht isoliert, sondern ist nahtlos in deine Geschäftsprozesse eingebunden. Kontaktdaten fließen automatisch in dein CRM, Termine werden in deinem Kalender eingetragen, und bei komplexen Anfragen übergibt der Bot das Gespräch mit vollem Kontext an einen echten Mitarbeiter. Für Ulmer KMUs ist das besonders wertvoll: Du bekommst Enterprise-Level-Kundenservice, ohne Enterprise-Level-Kosten.",
      painPoints: [
        { title: "Anfragen bleiben liegen", description: "Gerade in Stoßzeiten können nicht alle Nachrichten zeitnah beantwortet werden." },
        { title: "Kunden wollen WhatsApp", description: "Immer mehr Kunden bevorzugen Messaging statt Telefon — bist du darauf vorbereitet?" },
        { title: "Wiederkehrende Fragen kosten Zeit", description: "Die gleichen 20 Fragen beantworten deine Mitarbeiter jeden Tag aufs Neue." },
      ],
      features: [
        { title: "Multi-Channel-Support", description: "Ein Chatbot für WhatsApp, Website, Instagram und Facebook — alles aus einer Plattform." },
        { title: "Automatische Antworten", description: "Häufige Fragen werden sofort beantwortet — ohne manuellen Aufwand." },
        { title: "Übergabe an Mitarbeiter", description: "Bei komplexen Anliegen übergibt der Chatbot nahtlos an einen echten Mitarbeiter." },
        { title: "Mehrsprachig", description: "Bedient internationale Kunden in ihrer Sprache — automatisch erkannt und umgeschaltet." },
      ],
      advantages: [
        { title: "Persönliche Betreuung", description: "Wir sind in der Region und stehen dir persönlich zur Seite." },
        { title: "Maßgeschneidert", description: "Kein Standard-Bot — dein Chatbot spricht deine Sprache und kennt deine Produkte." },
        { title: "Datenschutz garantiert", description: "DSGVO-konforme Lösung — deine Kundendaten sind bei uns sicher." },
      ],
      faqs: [
        { question: "Wie lange dauert die Einrichtung?", answer: "In der Regel 3–5 Arbeitstage — je nach Komplexität und Anzahl der Kanäle. Für einfache Website-Chatbots geht es auch schneller. Wir kümmern uns um alles: von der technischen Einrichtung über das Training der KI bis zur Integration in deine bestehenden Systeme." },
        { question: "Kann ich den Chatbot selbst anpassen?", answer: "Ja, über ein intuitives Dashboard kannst du Antworten, FAQ und Einstellungen jederzeit selbst ändern. Neue Produkte hinzufügen, Preise aktualisieren oder saisonale Aktionen einpflegen — das geht in Minuten, ohne technisches Vorwissen. Natürlich unterstützen wir dich auch, wenn du Hilfe brauchst." },
        { question: "Was passiert, wenn der Chatbot eine Frage nicht beantworten kann?", answer: "Er gibt es ehrlich zu und leitet die Anfrage an dein Team weiter — mit vollem Gesprächskontext, damit dein Mitarbeiter nahtlos übernehmen kann. So bleibt die Kundenerfahrung positiv, und keine Anfrage geht verloren. Gleichzeitig lernt der Bot aus diesen Situationen und wird mit der Zeit immer besser." },
        { question: "Für welche Unternehmensgrößen ist das geeignet?", answer: "Vom Einzelunternehmer bis zum Mittelständler mit 200 Mitarbeitern — unsere Lösungen skalieren mit deinem Bedarf. Für kleine Unternehmen bieten wir schlanke Einstiegspakete, für größere Betriebe umfassende Multi-Channel-Lösungen. Der Chatbot wächst mit deinem Unternehmen, ohne dass du von vorne anfangen musst." },
      ],
    },
  },
  automatisierungen: {
    stuttgart: {
      title: "KI-Automatisierung Stuttgart | Prozesse automatisieren | MTM Studios",
      description: "KI-Automatisierung für Unternehmen in Stuttgart. Wir automatisieren deine Geschäftsprozesse — von der Anfrage bis zur Rechnung.",
      h1: "KI-Automatisierung für Stuttgart",
      subtext: "Wiederkehrende Prozesse automatisieren. Mehr Zeit für das, was zählt.",
      localContext: "Stuttgarter Unternehmen stehen unter enormem Druck: steigende Kosten, ein verschärfter Fachkräftemangel und wachsende Komplexität in nahezu allen Geschäftsbereichen. Vom Automobilzulieferer in Zuffenhausen über die Werbeagentur in der Stadtmitte bis zum Handwerksbetrieb in Cannstatt — die Anforderungen an Effizienz und Geschwindigkeit steigen jedes Jahr. KI-Automatisierung hilft, Routineaufgaben zu eliminieren, Fehler zu reduzieren und Kapazitäten freizusetzen — ohne zusätzliches Personal. In einer der teuersten Wirtschaftsregionen Deutschlands ist das nicht nur ein Vorteil, sondern oft eine Notwendigkeit.",
      detailedContent: "KI-Automatisierung für Stuttgarter Unternehmen bedeutet: Schluss mit dem täglichen Copy-Paste-Wahnsinn zwischen Systemen, die nicht miteinander reden. Schluss mit manueller Dateneingabe, vergessenen Follow-ups und Prozessen, die nur funktionieren, weil jemand daran denkt, sie anzustoßen.\n\nIn der Stuttgarter Wirtschaft, die von Präzision und Effizienz lebt, ist Automatisierung keine Zukunftsmusik mehr — sie ist ein Wettbewerbsvorteil, den immer mehr Unternehmen nutzen. Wir sehen das bei unseren Kunden täglich: Ein Automobilzulieferer in Stuttgart-Ost automatisiert seine Auftragsbestätigungen und spart 15 Stunden pro Woche. Eine Personalvermittlung in Vaihingen generiert automatisch Kandidatenprofile und verkürzt den Recruiting-Prozess um 40 %. Ein Architekturbüro am Schlossplatz automatisiert seine Angebotslegung und steigert die Abschlussquote.\n\nUnsere Automatisierungslösungen verbinden deine bestehenden Tools miteinander — CRM, E-Mail-Marketing, Buchhaltung, Projektmanagement, Kalender und mehr. Daten fließen automatisch von einem System ins andere, Workflows werden ohne manuelles Zutun ausgelöst, und Berichte erstellen sich von selbst. Dabei setzen wir auf bewährte Plattformen und ergänzen diese mit maßgeschneiderter KI-Logik, die mitdenkt statt nur ausführt.\n\nFür den Stuttgarter Markt besonders relevant: Unsere Automatisierungen sind DSGVO-konform, laufen auf europäischen Servern und lassen sich schrittweise einführen. Du musst nicht deine gesamte IT-Landschaft umkrempeln — wir beginnen mit dem Prozess, der dich am meisten Zeit kostet, und erweitern dann Schritt für Schritt. Der ROI ist typischerweise innerhalb weniger Wochen sichtbar.",
      painPoints: [
        { title: "Manuelle Dateneingabe", description: "Stunden gehen verloren mit Copy-Paste zwischen Systemen, die nicht miteinander sprechen." },
        { title: "Fehleranfällige Prozesse", description: "Je mehr manuelle Schritte, desto mehr Fehler — und desto höher die Kosten." },
        { title: "Skalierung unmöglich", description: "Ohne Automatisierung wächst der Personalaufwand linear mit dem Umsatz." },
      ],
      features: [
        { title: "Workflow-Automatisierung", description: "Komplette Geschäftsprozesse automatisieren — von der Lead-Erfassung bis zum Follow-up." },
        { title: "System-Integrationen", description: "Deine Tools verbinden: CRM, E-Mail, Kalender, Buchhaltung — alles fließt automatisch zusammen." },
        { title: "Dokumentenverarbeitung", description: "Rechnungen, Verträge, Formulare — automatisch erfassen, sortieren und verarbeiten." },
        { title: "Reporting & Dashboards", description: "Automatische Berichte und Echtzeit-Dashboards für datenbasierte Entscheidungen." },
      ],
      advantages: [
        { title: "Industrie-Erfahrung", description: "Wir verstehen die Anforderungen von Stuttgarter Industrie- und Dienstleistungsunternehmen." },
        { title: "ROI in Wochen", description: "Unsere Automatisierungen zahlen sich schnell aus — messbar und nachweisbar." },
        { title: "Zukunftssicher", description: "Skalierbare Lösungen, die mit deinem Unternehmen mitwachsen." },
      ],
      faqs: [
        { question: "Welche Prozesse lassen sich automatisieren?", answer: "Grundsätzlich alle wiederkehrenden, regelbasierten Abläufe — von E-Mail-Workflows über Datenübertragungen bis zu komplexen Genehmigungsprozessen. Typische Beispiele sind Lead-Nurturing, Auftragsbestätigungen, Rechnungsverarbeitung, Terminbestätigungen und Reporting. Wir identifizieren im Erstgespräch gemeinsam die Prozesse mit dem größten Einsparpotenzial." },
        { question: "Muss ich meine bestehende Software wechseln?", answer: "Nein, wir integrieren uns in deine bestehende Systemlandschaft. Ob du mit HubSpot, Salesforce, SAP, DATEV, Microsoft 365 oder spezialisierten Branchenlösungen arbeitest — wir schaffen die Verbindungen. Kein Systemwechsel, kein Datenverlust, keine Umstellungsphase. Deine Teams arbeiten weiter in ihren gewohnten Tools." },
        { question: "Wie messt ihr den Erfolg?", answer: "Wir definieren gemeinsam KPIs — z.B. eingesparte Arbeitsstunden, Fehlerreduktion, Durchlaufzeiten oder Kosteneinsparungen — und tracken diese transparent über ein Dashboard. So siehst du in Echtzeit, welchen Mehrwert die Automatisierung bringt. Unsere Stuttgarter Kunden berichten typischerweise von 20–40 % Zeitersparnis in automatisierten Prozessen." },
        { question: "Ist das auch für kleine Unternehmen sinnvoll?", answer: "Ja, gerade kleine Teams profitieren besonders, weil Automatisierung Kapazitäten schafft, die sonst nicht vorhanden wären. Ein Team von fünf Personen, das 10 Stunden pro Woche mit manuellen Routineaufgaben verbringt, gewinnt durch Automatisierung fast einen vollen Arbeitstag zurück — jede Woche. Unsere Lösungen sind modular und skalieren mit deinem Unternehmen." },
      ],
    },
    ulm: {
      title: "KI-Automatisierung Ulm | Prozesse automatisieren | MTM Studios",
      description: "KI-Automatisierung für Unternehmen in Ulm. Wir automatisieren wiederkehrende Geschäftsprozesse — effizient, skalierbar, DSGVO-konform.",
      h1: "KI-Automatisierung für Ulm",
      subtext: "Schluss mit Routinearbeit. Deine Prozesse laufen automatisch — zuverlässig und rund um die Uhr.",
      localContext: "Ulmer Mittelständler sind das Rückgrat der regionalen Wirtschaft — von Fertigungsbetrieben in Ulm-Nord über Ingenieurbüros in der Weststadt bis hin zu Steuerberatern und Rechtsanwälten in der Neuen Mitte. Die Innovationsregion Ulm/Neu-Ulm wächst dynamisch, doch steigende Anforderungen und begrenzte Ressourcen machen Automatisierung zum echten Wettbewerbsvorteil. Gerade in einer Region, in der viele Unternehmen mit schlanken Teams arbeiten, schafft KI-Automatisierung die Kapazitäten, die für Wachstum nötig sind. Wir helfen Unternehmen in Ulm, ihre Abläufe intelligent zu automatisieren — pragmatisch, ohne Overhead und mit sofort spürbaren Ergebnissen.",
      detailedContent: "KI-Automatisierung für Unternehmen in Ulm — das klingt nach Großkonzern-Technologie, ist aber längst im Mittelstand angekommen. Und gerade hier, in der Region Ulm/Neu-Ulm, wo pragmatische Lösungen und Effizienz zum Selbstverständnis gehören, entfaltet Automatisierung ihren größten Nutzen.\n\nDie Realität in vielen Ulmer Betrieben sieht so aus: Daten werden manuell zwischen Excel, E-Mail und Branchensoftware hin und her kopiert. Aufträge werden per Telefon angenommen und von Hand ins System eingepflegt. Follow-up-E-Mails an Kunden werden vergessen, weil niemand den Überblick behalten kann. Und Berichte für die Geschäftsführung werden am Freitagabend noch schnell zusammengebaut — aus Zahlen, die längst veraltet sind.\n\nGenau hier setzen wir an. Unsere KI-Automatisierungen verbinden deine bestehenden Systeme miteinander und sorgen dafür, dass Daten automatisch fließen, Workflows ohne manuellen Anstoß ablaufen und Berichte sich in Echtzeit aktualisieren. Für einen Handwerksbetrieb in Söflingen bedeutet das: Aufträge aus dem Kontaktformular landen automatisch im Projektmanagement-Tool, der Kunde erhält eine Bestätigung, und der Techniker bekommt den Termin in seinen Kalender. Für eine Steuerberatung am Münsterplatz: Mandantendokumente werden automatisch kategorisiert, Fristen überwacht und Erinnerungen verschickt.\n\nUnsere Stärke liegt im pragmatischen Ansatz: Wir beginnen nicht mit einem Mammutprojekt, sondern mit dem einen Prozess, der dich am meisten Zeit kostet. Die erste Automatisierung ist oft innerhalb einer Woche live — und spart ab Tag eins messbar Arbeitszeit. Von dort aus erweitern wir schrittweise, immer mit klarem ROI und in enger Abstimmung mit deinem Team.",
      painPoints: [
        { title: "Zu viele manuelle Schritte", description: "Dein Team verbringt zu viel Zeit mit Aufgaben, die eine Maschine schneller und fehlerfreier erledigt." },
        { title: "Systeme arbeiten nicht zusammen", description: "Daten werden manuell zwischen Tools übertragen — ein Nährboden für Fehler und Verzögerungen." },
        { title: "Wachstum wird gebremst", description: "Ohne Automatisierung braucht jedes Prozent Wachstum proportional mehr Personal." },
      ],
      features: [
        { title: "End-to-End-Automatisierung", description: "Ganze Prozessketten automatisieren — vom Eingang einer Anfrage bis zur finalen Dokumentation." },
        { title: "API-Integrationen", description: "Deine bestehenden Tools nahtlos verbinden — wir sprechen die Sprache deiner Software." },
        { title: "KI-gestützte Entscheidungen", description: "Intelligente Automatisierungen, die nicht nur ausführen, sondern mitdenken." },
        { title: "Echtzeit-Monitoring", description: "Behalte den Überblick über alle automatisierten Prozesse in einem zentralen Dashboard." },
      ],
      advantages: [
        { title: "Mittelstandsversteher", description: "Wir entwickeln Lösungen, die zum Budget und zur Struktur von KMUs passen." },
        { title: "Hands-on-Mentalität", description: "Kein PowerPoint-Consulting — wir setzen um und liefern Ergebnisse." },
        { title: "Regionale Nähe", description: "Persönliche Betreuung vor Ort in Ulm — bei Bedarf auch remote." },
      ],
      faqs: [
        { question: "Wie fange ich am besten an?", answer: "Mit einem kostenlosen Erstgespräch. Wir identifizieren gemeinsam die Prozesse mit dem größten Automatisierungspotenzial und erstellen einen konkreten Umsetzungsplan. Dabei priorisieren wir nach Impact: Welcher Prozess kostet dich am meisten Zeit? Dort starten wir — mit schnellen Ergebnissen und klarem Mehrwert von Tag eins." },
        { question: "Wie lange dauert eine Automatisierung?", answer: "Einfache Workflows sind in 1–2 Wochen umgesetzt — von der Analyse bis zum Go-live. Komplexere Projekte mit mehreren Systemintegrationen planen wir in überschaubaren Phasen, typischerweise 4–6 Wochen. Jede Phase liefert sofort nutzbare Ergebnisse, sodass du den Fortschritt kontinuierlich spürst." },
        { question: "Kann ich Automatisierungen später erweitern?", answer: "Ja, unsere Lösungen sind modular aufgebaut. Du kannst jederzeit weitere Prozesse automatisieren, neue Systeme anbinden oder bestehende Workflows erweitern. Das ist einer unserer Grundprinzipien: Start klein, dann skalieren. So minimierst du das Risiko und maximierst den Nutzen." },
        { question: "Sind meine Daten sicher?", answer: "Ja, alle Automatisierungen laufen DSGVO-konform. Deine Daten werden ausschließlich in der EU verarbeitet und gespeichert. Wir setzen auf verschlüsselte Verbindungen, Zugriffskontrollen und regelmäßige Sicherheitsüberprüfungen. Als deutsches Unternehmen unterliegen wir den strengen europäischen Datenschutzrichtlinien — das gibt dir und deinen Kunden Sicherheit." },
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
