import { Instagram, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-2.png";

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
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="mailto:info@mtmstudios.de" className="text-muted-foreground hover:text-foreground transition-opacity duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="text-center md:text-right">
            <h4 className="text-foreground font-semibold mb-3 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/telefonassistent" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">KI-Telefonassistent</Link></li>
              <li><Link to="/chatbots" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">Chatbots & WhatsApp</Link></li>
              <li><Link to="/automatisierungen" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">Automatisierungen</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">Das sind Wir</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/10">
        <div className="container mx-auto px-6 py-5 flex flex-col items-center gap-3">
          <span className="text-muted-foreground text-xs flex items-center gap-1">
            Mit <Heart className="w-3 h-3 text-accent fill-accent" /> für den Mittelstand.
          </span>
          <p className="text-muted-foreground text-xs text-center max-w-md mx-auto leading-relaxed">
            Es gelten die <Link to="/agb" className="underline hover:text-foreground transition-opacity duration-200">AGB</Link> von MTMstudios. Informationen zur Datenverarbeitung sowie zur Auftragsverarbeitung (AVV) finden Sie in unserer <Link to="/datenschutz" className="underline hover:text-foreground transition-opacity duration-200">Datenschutzerklärung</Link>.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Link to="/impressum" className="hover:text-foreground transition-opacity duration-200">Impressum</Link>
            <span>·</span>
            <Link to="/datenschutz" className="hover:text-foreground transition-opacity duration-200">Datenschutz</Link>
            <span>·</span>
            <Link to="/agb" className="hover:text-foreground transition-opacity duration-200">AGB</Link>
          </div>
          <span className="text-muted-foreground text-xs">© 2026 MTM Studios</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
