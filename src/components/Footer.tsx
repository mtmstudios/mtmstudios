import { Instagram, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-2.png";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-transparent">
      <div className="container mx-auto px-6 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 max-w-4xl mx-auto">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block md:-ml-2">
              <img src={logo} alt="MTM Studios Logo" className="h-10 object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mt-2 max-w-xs mx-auto md:mx-0">
              Wir helfen Unternehmen, mit intelligenter Automatisierung Zeit zu sparen und effizienter zu arbeiten.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-opacity duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/4912345678" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-opacity duration-200">
                <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5" />
              </a>
              <a href="mailto:info@mtmstudios.de" className="text-muted-foreground hover:text-foreground transition-opacity duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="text-center md:text-right">
            <h4 className="text-foreground font-semibold mb-3 text-sm uppercase tracking-wider">Leistungen</h4>
            <ul className="space-y-2">
              <li><Link to="/telefonassistent" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">KI-Telefonassistent</Link></li>
              <li><Link to="/chatbots" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">WhatsApp & Chatbots</Link></li>
              <li><Link to="/automatisierungen" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">Automatisierungen</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/10">
        <div className="container mx-auto px-6 py-5 flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-muted-foreground text-xs">
            <span>© 2025 MTM Studios</span>
            <span className="flex items-center gap-1">
              Mit <Heart className="w-3 h-3 text-accent fill-accent" /> für den Mittelstand.
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Link to="/impressum" className="hover:text-foreground transition-opacity duration-200">Impressum</Link>
            <span>·</span>
            <Link to="/datenschutz" className="hover:text-foreground transition-opacity duration-200">Datenschutz</Link>
            <span>·</span>
            <Link to="/agb" className="hover:text-foreground transition-opacity duration-200">AGB</Link>
          </div>
          <p className="text-muted-foreground text-xs text-center max-w-md mx-auto mt-1 leading-relaxed">
            Es gelten die <Link to="/agb" className="underline hover:text-foreground transition-opacity duration-200">AGB</Link> von MTMstudios. Informationen zur Datenverarbeitung sowie zur Auftragsverarbeitung (AVV) finden Sie in unserer <Link to="/datenschutz" className="underline hover:text-foreground transition-opacity duration-200">Datenschutzerklärung</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
