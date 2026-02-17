import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Setrex Logo" className="h-28 -my-6 -ml-2 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#telefonassistent" className="text-foreground hover:text-neon transition-colors">
              KI-Telefonassistent
            </a>
            <a href="#chatbot" className="text-foreground hover:text-neon transition-colors">
              Chatbot
            </a>
            <a href="#automatisierungen" className="text-foreground hover:text-neon transition-colors">
              Automatisierungen
            </a>
            <Link to="/about" className="text-foreground hover:text-neon transition-colors">
              Das sind Wir
            </Link>
            <a href="#kontakt" className="text-foreground hover:text-neon transition-colors">
              Kontakt
            </a>
          </div>

          {/* CTA Button */}
          <a href="#kontakt">
            <Button 
              variant="outline" 
              className="hidden md:inline-flex border-foreground/20 hover:border-neon hover:bg-neon hover:text-black transition-all"
            >
              Jetzt anfragen
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
