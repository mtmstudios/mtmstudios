import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import logo from "@/assets/logo-2.png";

const Footer = () => {
  const { openSettings } = useCookieConsent();

  return (
    <footer className="border-t border-border/20 bg-transparent">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 max-w-5xl mx-auto">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block md:-ml-2">
              <img src={logo} alt="MTM Studios Logo" className="h-10 object-contain" />
            </Link>
            <p className="text-foreground/40 text-sm leading-relaxed mt-3 max-w-xs mx-auto md:mx-0">
              Wir helfen Unternehmen, mit intelligenter Automatisierung Zeit zu sparen und effizienter zu arbeiten.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
              <a href="https://www.instagram.com/mtmstudios.de?igsh=MXRxMXVjbjUzejRkcg==" target="_blank" rel="noopener noreferrer" className="text-foreground/30 hover:text-foreground transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/4915567077414" target="_blank" rel="noopener noreferrer" className="text-foreground/30 hover:text-foreground transition-colors duration-200">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="mailto:hallo@mtmstudios.de" className="text-foreground/30 hover:text-foreground transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation — structured vertical list */}
          <div className="text-center md:text-right">
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/60 mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/ki-telefonassistent" className="text-foreground/40 hover:text-foreground transition-colors duration-200 text-sm">
                  KI-Telefonassistent
                </Link>
              </li>
              <li>
                <Link to="/ki-chatbot" className="text-foreground/40 hover:text-foreground transition-colors duration-200 text-sm">
                  KI-Chatbot
                </Link>
              </li>
              <li>
                <Link to="/automatisierungen" className="text-foreground/40 hover:text-foreground transition-colors duration-200 text-sm">
                  Automatisierungen
                </Link>
              </li>
              <li className="pt-2 border-t border-white/[0.04]">
                <Link to="/dassindwir" className="text-foreground/40 hover:text-foreground transition-colors duration-200 text-sm">
                  Das sind Wir
                </Link>
              </li>
              <li>
                <Link to="/karriere" className="text-foreground/40 hover:text-foreground transition-colors duration-200 text-sm">
                  Karriere
                </Link>
              </li>
              <li>
                <Link to="/partnerwerden" className="text-foreground/40 hover:text-foreground transition-colors duration-200 text-sm">
                  Partner werden
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/40 hover:text-foreground transition-colors duration-200 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/ki-im-mittelstand-zahlen" className="text-foreground/40 hover:text-foreground transition-colors duration-200 text-sm">
                  KI Statistiken
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/10">
        <div className="container mx-auto px-6 py-5 flex flex-col items-center gap-3">
          <span className="text-foreground/25 text-xs">
            KI-Lösungen für Unternehmen.
          </span>
          <p className="text-foreground/25 text-xs text-center max-w-md mx-auto leading-relaxed">
            Es gelten die <Link to="/agb" className="underline hover:text-foreground transition-colors duration-200">AGB</Link> von MTMstudios. Informationen zur Datenverarbeitung sowie zur Auftragsverarbeitung (AVV) finden Sie in unserer <Link to="/datenschutz" className="underline hover:text-foreground transition-colors duration-200">Datenschutzerklärung</Link>.
          </p>
          <div className="flex items-center gap-2 text-foreground/25 text-xs flex-wrap justify-center">
            <Link to="/impressum" className="hover:text-foreground transition-colors duration-200">Impressum</Link>
            <span>·</span>
            <Link to="/datenschutz" className="hover:text-foreground transition-colors duration-200">Datenschutz</Link>
            <span>·</span>
            <Link to="/agb" className="hover:text-foreground transition-colors duration-200">AGB</Link>
            <span>·</span>
            <Link to="/barrierefreiheit" className="hover:text-foreground transition-colors duration-200">Barrierefreiheit</Link>
            <span>·</span>
            <button onClick={openSettings} className="hover:text-foreground transition-colors duration-200 underline">Cookie-Einstellungen</button>
          </div>
          <span className="text-foreground/20 text-xs">© 2026 MTM Studios</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
