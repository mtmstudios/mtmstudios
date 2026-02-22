import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-2.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-transparent">
      <div className="container mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block md:-ml-2">
              <img src={logo} alt="MTM Studios Logo" className="h-10 object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mt-2">
              Wir helfen Unternehmen, mit intelligenter Automatisierung Zeit zu sparen und effizienter zu arbeiten.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-opacity duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-opacity duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:info@mtmstudios.de" className="text-muted-foreground hover:text-foreground transition-opacity duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h4 className="text-foreground font-semibold mb-4">Leistungen</h4>
            <ul className="space-y-2">
              <li><Link to="/telefonassistent" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">KI-Telefonassistent</Link></li>
              <li><Link to="/chatbots" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">WhatsApp & Chatbots</Link></li>
              <li><Link to="/automatisierungen" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">Automatisierungen</Link></li>
              <li><a href="#kontakt" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">Beratung</a></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">Über uns</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="text-center md:text-left">
            <h4 className="text-foreground font-semibold mb-4">Kontakt</h4>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <a href="mailto:info@mtmstudios.de" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                info@mtmstudios.de
              </a>
              <a href="tel:+4912345678" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-opacity duration-200 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                +49 123 456 78
              </a>
              <span className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                Deutschland
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/10">
        <div className="container mx-auto px-6 py-5 text-center">
          <span className="text-muted-foreground text-xs">© 2025 MTM Studios</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
