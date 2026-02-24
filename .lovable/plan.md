
# Plan: Datenschutz -- Kontaktformular und Bewerbungsformular auf n8n aktualisieren

## Aenderungen in `src/pages/Datenschutz.tsx`

### Abschnitt 9: "Kontaktformular" erweitern (Zeilen 151-164)

Der bestehende Abschnitt wird umgeschrieben zu **"Kontakt- und Bewerbungsformulare"** mit folgenden Anpassungen:

- **Titel**: "9. Kontakt- und Bewerbungsformulare" (statt nur "Kontaktformular")
- **Technische Verarbeitung**: Hinweis, dass die Formulardaten ueber **n8n** (Workflow-Automatisierung) verarbeitet werden
- **Hosting-Hinweis**: Klarer Vermerk, dass n8n und alle Formulardaten **ausschliesslich auf Servern in Deutschland** gehostet und verarbeitet werden -- keine Datenuebermittlung in Drittlaender
- **Bewerbungsformular ergaenzen**: Zusaetzliche verarbeitete Daten fuer Bewerbungen auflisten (z.B. Lebenslauf, Anschreiben, gewuenschte Position)
- **Rechtsgrundlage**: Art. 6 Abs. 1 lit. b DSGVO fuer Kontaktanfragen und Bewerbungen (vorvertragliche Massnahmen)

### Konkrete Inhalte

**Verarbeitete Daten Kontaktformular:**
- Name
- E-Mail-Adresse
- Telefonnummer (optional)
- Nachricht / Anfrage
- Gewaehlte Loesung und Herausforderung

**Verarbeitete Daten Bewerbungsformular:**
- Name
- E-Mail-Adresse
- Telefonnummer (optional)
- Gewuenschte Position
- Lebenslauf / Anschreiben
- Weitere von dir angegebene Informationen

**Technischer Hinweis:**
- Anbieter der Formularverarbeitung: n8n (Self-hosted)
- Serverstandort: Deutschland
- Keine Datenuebermittlung in Drittlaender

---

## Zusammenfassung

**1 Datei aendern** (`src/pages/Datenschutz.tsx`), **1 Abschnitt** ueberarbeiten und erweitern.
