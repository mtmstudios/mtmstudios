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
      <div className="container mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand - zentriert auf Mobile */}
          <div className="space-y-4 text-center md:text-left">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Setrex Logo" className="h-28 -mb-6 -mt-6 object-contain md:-ml-4 md:-mt-2 md:-mb-6" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Wir helfen Unternehmen, mit intelligenter Automatisierung Zeit zu sparen und effizienter zu arbeiten.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3">
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

          {/* Leistungen + Unternehmen: 2-Spalten auf Mobile, je eigene Spalte auf Desktop */}
          <div className="grid grid-cols-2 md:contents gap-6">
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
          </div>

          {/* Kontakt - horizontal auf Mobile, vertikal auf Desktop */}
          <div className="text-center md:text-left">
            <h4 className="text-foreground font-semibold mb-3 md:mb-4">Kontakt</h4>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 md:flex-col md:items-start md:gap-3">
              <a href="mailto:info@setrex.de" className="flex items-center gap-2 text-muted-foreground hover:text-neon transition-colors text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                info@setrex.de
              </a>
              <a href="tel:+4912345678" className="flex items-center gap-2 text-muted-foreground hover:text-neon transition-colors text-sm">
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
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-muted-foreground text-xs">Alle Rechte vorbehalten.</span>
          <span className="text-muted-foreground text-xs">© 2025 Setrex</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
