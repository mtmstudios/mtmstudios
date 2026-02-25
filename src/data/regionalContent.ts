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
      title: "KI-Agentur Stuttgart | Telefonassistenten, Chatbots & Automatisierungen | MTM Studios",
      description: "MTM Studios ist deine KI-Agentur in Stuttgart. Wir entwickeln Telefonassistenten, Chatbots und Automatisierungen für Unternehmen in der Region Stuttgart.",
      h1: "KI-Agentur für Stuttgart",
      subtext: "Telefonassistenten, Chatbots und Automatisierungen — maßgeschneidert für Stuttgarter Unternehmen.",
      localContext: "Stuttgart ist ein Zentrum für Innovation und Industrie — von der Automobilbranche in Untertürkheim über die kreative Szene in Stuttgart-West bis hin zu den zahlreichen Dienstleistungsunternehmen in der Innenstadt. Unternehmen in der Region stehen vor der Herausforderung, wachsende Kundenanfragen effizient zu bearbeiten und gleichzeitig wettbewerbsfähig zu bleiben. Die Mischung aus Global Playern und starkem Mittelstand macht Stuttgart zu einem idealen Standort für KI-gestützte Geschäftslösungen. Als KI-Agentur verstehen wir die Anforderungen des Stuttgarter Marktes — von der hohen Serviceerwartung der Kunden bis zum Druck, mit begrenzten Ressourcen maximale Ergebnisse zu erzielen. Genau hier setzen unsere maßgeschneiderten KI-Lösungen an.",
      detailedContent: "Als KI-Agentur in Stuttgart entwickeln wir intelligente Lösungen, die den Arbeitsalltag von Unternehmen in der Region grundlegend verändern. Ob Automobilzulieferer in Zuffenhausen, Handwerksbetrieb im Stuttgarter Kessel, Marketingagentur in der Stadtmitte oder B2B-Dienstleister im Neckartal — die Herausforderungen sind ähnlich: zu viele manuelle Prozesse, zu wenig qualifiziertes Personal und steigende Erwartungen der Kunden an Schnelligkeit und Erreichbarkeit.\n\nUnsere KI-Agentur setzt genau dort an, wo der größte Hebel liegt. Wir analysieren deine bestehenden Abläufe — von der telefonischen Erreichbarkeit über die Kundenkommunikation per WhatsApp und E-Mail bis hin zu internen Workflows — und identifizieren Prozesse, die sich intelligent automatisieren lassen. Dabei setzen wir auf bewährte Technologien und entwickeln Lösungen, die sich nahtlos in deine bestehende Infrastruktur integrieren.\n\nFür Stuttgarter Unternehmen ist das besonders relevant: Die Region gehört zu den wirtschaftsstärksten in Europa, und der Wettbewerb um Fachkräfte ist enorm. KI-Lösungen wie Telefonassistenten, Chatbots und Prozessautomatisierungen schaffen Kapazitäten, ohne dass du neue Mitarbeiter einstellen musst. Gleichzeitig steigerst du die Servicequalität — deine Kunden erhalten schnellere Antworten, bessere Erreichbarkeit und professionellere Kommunikation.\n\nWir arbeiten branchenübergreifend: Arztpraxen in Bad Cannstatt, Rechtsanwaltskanzleien in der Königstraße, Ingenieurbüros in Vaihingen, Immobilienverwaltungen in Degerloch oder E-Commerce-Unternehmen in Feuerbach — unsere KI-Lösungen passen sich an deine Branche, deine Sprache und deine Prozesse an. Das Erstgespräch ist kostenlos und unverbindlich.",
      painPoints: [
        { title: "Fachkräftemangel in der Region", description: "Qualifizierte Mitarbeiter für Kundenservice sind in Stuttgart schwer zu finden. KI-Lösungen entlasten dein Team nachhaltig." },
        { title: "Hohe Betriebskosten", description: "Stuttgart gehört zu den teuersten Standorten Deutschlands. Automatisierung senkt deine Kosten ohne Qualitätsverlust." },
        { title: "Wachsende Kundenerwartungen", description: "Stuttgarter Kunden erwarten schnelle, professionelle Kommunikation — rund um die Uhr." },
      ],
      features: [
        { title: "KI-Telefonassistenten", description: "Automatisierte Anrufannahme und Terminbuchung für Unternehmen in Stuttgart und Umgebung." },
        { title: "Intelligente Chatbots", description: "WhatsApp- und Website-Chatbots, die deine Kunden sofort bedienen — auf Deutsch, 24/7." },
        { title: "Prozessautomatisierung", description: "Wiederkehrende Abläufe automatisieren und dein Team für wichtigere Aufgaben freimachen." },
        { title: "Nahtlose Integrationen", description: "Anbindung an deine bestehenden Systeme — von CRM bis Kalender, alles verbunden." },
      ],
      advantages: [
        { title: "Regionaler Partner", description: "Wir kennen den Stuttgarter Markt und seine Besonderheiten — persönlich und nah." },
        { title: "Schnelle Umsetzung", description: "Von der Erstberatung zur fertigen Lösung in wenigen Tagen, nicht Monaten." },
        { title: "Langfristiger Support", description: "Wir betreuen deine KI-Lösungen dauerhaft und optimieren kontinuierlich." },
      ],
      faqs: [
        { question: "Für welche Branchen in Stuttgart sind die KI-Lösungen geeignet?", answer: "Unsere Lösungen sind branchenübergreifend einsetzbar — von Automotive-Zulieferern über Handwerksbetriebe bis zu Arztpraxen und Kanzleien in Stuttgart. Besonders profitieren Unternehmen mit hohem Kundenkontakt und wiederkehrenden Anfragen. Wir passen jede Lösung individuell an deine Branche und deine Prozesse an, sodass der KI-Assistent genau die Sprache deiner Kunden spricht." },
        { question: "Wie schnell kann eine KI-Lösung in Stuttgart live gehen?", answer: "Je nach Komplexität sind erste Ergebnisse innerhalb von 3–7 Tagen möglich. Einfache Telefonassistenten können sogar in 48 Stunden starten. Für umfangreichere Projekte mit mehreren Integrationen planen wir typischerweise 2–3 Wochen ein. In jedem Fall bekommst du vorab eine detaillierte Timeline im kostenlosen Erstgespräch." },
        { question: "Bietet ihr persönliche Beratung in Stuttgart an?", answer: "Ja, wir bieten persönliche Termine in Stuttgart und der Region an. Ob in deinem Büro, bei uns oder in einem Coworking-Space — wir kommen zu dir. Alternativ arbeiten wir auch remote per Videocall, ganz wie es dir am besten passt. Viele unserer Stuttgarter Kunden schätzen den Mix aus persönlichem Kennenlernen und effizienter Remote-Zusammenarbeit." },
        { question: "Was kostet eine KI-Lösung für mein Unternehmen?", answer: "Die Kosten hängen vom Umfang und der Komplexität ab. Einfache Telefonassistenten starten bereits im niedrigen dreistelligen Bereich pro Monat, umfassendere Automatisierungsprojekte liegen entsprechend höher. Wir erstellen dir ein individuelles Angebot nach einem kostenlosen Erstgespräch — transparent, ohne versteckte Kosten und immer mit klarem ROI-Fokus." },
      ],
    },
    ulm: {
      title: "KI-Agentur Ulm | Telefonassistenten, Chatbots & Automatisierungen | MTM Studios",
      description: "MTM Studios ist deine KI-Agentur in Ulm. Wir entwickeln Telefonassistenten, Chatbots und Automatisierungen für Unternehmen in Ulm und Umgebung.",
      h1: "KI-Agentur für Ulm",
      subtext: "Telefonassistenten, Chatbots und Automatisierungen — maßgeschneidert für Ulmer Unternehmen.",
      localContext: "Ulm verbindet Tradition mit Innovation — als Wissenschaftsstadt mit der Universität Ulm, der Technischen Hochschule und einer lebendigen Start-up-Szene rund um den Donautal-Campus. Die Stadt an der Donau ist Heimat zahlreicher mittelständischer Unternehmen, von Fertigungsbetrieben in Ulm-Nord über Handwerker in der Altstadt bis hin zu IT-Dienstleistern in der Weststadt. Die Innovationsregion Ulm/Neu-Ulm wächst stetig, und Unternehmen, die jetzt auf KI-Automatisierung setzen, sichern sich einen entscheidenden Wettbewerbsvorteil. Als Partner vor Ort verstehen wir die lokalen Bedürfnisse und liefern Lösungen, die deinen Alltag spürbar erleichtern.",
      detailedContent: "Als KI-Agentur in Ulm unterstützen wir Unternehmen in der gesamten Innovationsregion Ulm/Neu-Ulm dabei, ihre Geschäftsprozesse mit künstlicher Intelligenz zu optimieren. Die Wirtschaftsstruktur der Donaustadt ist einzigartig: Eine starke Mischung aus produzierendem Gewerbe, Handwerk, Gesundheitswesen und wissensintensiven Dienstleistungen prägt die Region.\n\nOb Zahnarztpraxis am Münsterplatz, Handwerksbetrieb in Söflingen, Logistikunternehmen in Donautal, IT-Firma in der Wissenschaftsstadt oder Steuerberater in Neu-Ulm — die Herausforderungen gleichen sich: Telefonanrufe, die nicht angenommen werden können, Kundenanfragen, die in E-Mail-Postfächern verschwinden, und manuelle Prozesse, die wertvolle Arbeitszeit verschlingen.\n\nUnsere KI-Agentur bietet dafür passgenaue Lösungen: KI-Telefonassistenten, die jeden Anruf professionell entgegennehmen, intelligente Chatbots für WhatsApp und deine Website sowie Automatisierungen, die deine internen Abläufe beschleunigen. Wir kennen die Besonderheiten der Region — die enge Vernetzung der Unternehmen untereinander, die Bodenständigkeit des schwäbischen Mittelstands und den gleichzeitigen Innovationsanspruch der Wissenschaftsstadt.\n\nBesonders für kleine und mittlere Unternehmen in Ulm ist KI-Automatisierung ein Gamechanger: Du bekommst die Servicequalität eines Großunternehmens, ohne dafür ein großes Team aufbauen zu müssen. Unsere Lösungen sind modular, skalierbar und zahlen sich oft schon im ersten Monat aus. Wir starten mit einem kostenlosen Erstgespräch, analysieren deine Prozesse und zeigen dir konkret, wo KI deinen Arbeitsalltag verbessern kann — pragmatisch, ohne Buzzwords und mit messbaren Ergebnissen.",
      painPoints: [
        { title: "Kleine Teams, große Aufgaben", description: "Viele Ulmer Unternehmen haben kompakte Teams, die täglich unzählige Anfragen stemmen müssen." },
        { title: "Wettbewerb mit der Großstadt", description: "Im Wettbewerb mit Stuttgart und München brauchst du smarte Lösungen, die dich effizienter machen." },
        { title: "Erreichbarkeit sicherstellen", description: "Kunden erwarten ständige Erreichbarkeit — auch außerhalb der Geschäftszeiten." },
      ],
      features: [
        { title: "KI-Telefonassistenten", description: "Verpasse keinen Anruf mehr — dein KI-Assistent nimmt Anrufe an und bucht Termine automatisch." },
        { title: "Chatbots für Website & WhatsApp", description: "Beantwortet Kundenanfragen in Echtzeit — automatisch und rund um die Uhr." },
        { title: "Automatisierte Workflows", description: "Von der Anfrage bis zur Rechnung: Wir automatisieren deine wiederkehrenden Prozesse." },
        { title: "System-Integrationen", description: "Nahtlose Anbindung an deine vorhandene Software — ohne Medienbrüche." },
      ],
      advantages: [
        { title: "Lokal verwurzelt", description: "Wir kennen die Ulmer Unternehmenslandschaft und arbeiten auf Augenhöhe." },
        { title: "Persönliche Betreuung", description: "Kein Callcenter — bei uns hast du einen festen Ansprechpartner." },
        { title: "Skalierbare Lösungen", description: "Starte klein und wachse mit der Lösung — ganz in deinem Tempo." },
      ],
      faqs: [
        { question: "Arbeitet ihr nur mit Unternehmen aus Ulm?", answer: "Nein, wir betreuen Unternehmen in der gesamten Region — von Ulm über Neu-Ulm bis ins Alb-Donau-Gebiet und darüber hinaus. Auch Unternehmen in Blaubeuren, Laichingen oder Ehingen gehören zu unseren Kunden. Remote-Zusammenarbeit ist ebenfalls jederzeit möglich, sodass die Entfernung keine Rolle spielt." },
        { question: "Wie läuft die Zusammenarbeit ab?", answer: "Nach einem kostenlosen Erstgespräch, in dem wir deine Anforderungen und Ziele kennenlernen, erstellen wir ein maßgeschneidertes Konzept. Die Umsetzung erfolgt in enger Abstimmung mit deinem Team — typischerweise in 1–2 Wochen für die erste Lösung. Danach optimieren wir kontinuierlich basierend auf echten Nutzungsdaten und deinem Feedback." },
        { question: "Brauche ich technisches Vorwissen?", answer: "Nein, absolut nicht. Wir kümmern uns um die komplette technische Umsetzung — von der Einrichtung über die Integration in deine bestehenden Systeme bis zur Schulung deines Teams. Alles wird verständlich erklärt, und du bekommst eine persönliche Einführung, damit du dich von Anfang an sicher fühlst." },
        { question: "Kann ich die KI-Lösung vorher testen?", answer: "Ja, wir bieten Demo-Sessions an, in denen du die Lösung live erleben kannst, bevor du dich entscheidest. So siehst du konkret, wie der Telefonassistent klingt, wie der Chatbot antwortet oder wie eine Automatisierung abläuft. Das schafft Vertrauen und hilft dir, die richtige Entscheidung für dein Unternehmen zu treffen." },
      ],
    },
  },
  "ki-telefonassistent": {
    stuttgart: {
      title: "KI-Telefonassistent Stuttgart | Anrufe automatisieren | MTM Studios",
      description: "KI-Telefonassistent für Unternehmen in Stuttgart. Automatische Anrufannahme, Terminbuchung und Weiterleitung — 24/7 erreichbar.",
      h1: "KI-Telefonassistent für Stuttgart",
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
        { question: "Was kostet ein KI-Telefonassistent?", answer: "Die Kosten richten sich nach dem Anrufvolumen und den gewünschten Funktionen. Es gibt flexible Modelle, die bereits im niedrigen dreistelligen Bereich pro Monat starten. Wir beraten dich kostenlos und unverbindlich und erstellen ein Angebot, das genau zu deinem Bedarf und deinem Budget passt." },
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
        { question: "Ist das auch für kleine Unternehmen sinnvoll?", answer: "Ja, gerade kleine Teams profitieren besonders, weil Automatisierung Kapazitäten schafft, die sonst nicht vorhanden wären. Ein Team von fünf Personen, das 10 Stunden pro Woche mit manuellen Routineaufgaben verbringt, gewinnt durch Automatisierung fast einen vollen Arbeitstag zurück — jede Woche. Unsere Lösungen sind modular und starten bei Budgets, die auch für Kleinunternehmen passen." },
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
