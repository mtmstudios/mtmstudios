import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const serviceLinks = [
  { text: "KI-Telefonassistent", href: "#telefonassistent" },
  { text: "Chatbot", href: "#chatbot" },
  { text: "Automatisierungen", href: "#automatisierungen" },
  { text: "Beratung", href: "#kontakt" },
];

const companyLinks = [
  { text: "Über uns", href: "/about", isRoute: true },
  { text: "Karriere", href: "#karriere" },
  { text: "Blog", href: "#blog" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img src={logo} alt="Setrex Logo" className="h-28 -ml-4 -mt-4 -mb-4 object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Wir helfen Unternehmen, mit intelligenter Automatisierung Zeit zu sparen und effizienter zu arbeiten.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:info@setrex.de" className="text-muted-foreground hover:text-neon transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Leistungen</h4>
            <ul className="space-y-2">
              {serviceLinks.map(({ text, href }) => (
                <li key={text}>
                  <a href={href} className="text-muted-foreground hover:text-neon transition-colors text-sm">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2">
              {companyLinks.map(({ text, href, isRoute }) => (
                <li key={text}>
                  {isRoute ? (
                    <Link to={href} className="text-muted-foreground hover:text-neon transition-colors text-sm">
                      {text}
                    </Link>
                  ) : (
                    <a href={href} className="text-muted-foreground hover:text-neon transition-colors text-sm">
                      {text}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@setrex.de" className="flex items-center gap-2 text-muted-foreground hover:text-neon transition-colors text-sm">
                  <Mail className="w-4 h-4 shrink-0" />
                  info@setrex.de
                </a>
              </li>
              <li>
                <a href="tel:+4912345678" className="flex items-center gap-2 text-muted-foreground hover:text-neon transition-colors text-sm">
                  <Phone className="w-4 h-4 shrink-0" />
                  +49 123 456 78
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  Deutschland
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/10">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-muted-foreground text-xs">Alle Rechte vorbehalten.</span>
          <span className="text-muted-foreground text-xs">© 2025 Setrex</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
