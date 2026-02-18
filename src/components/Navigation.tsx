import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/logo-2.png";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#telefonassistent", label: "KI-Telefonassistent" },
    { href: "#chatbot", label: "Chatbot" },
    { href: "#automatisierungen", label: "Automatisierungen" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/10 bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className={`container mx-auto px-6 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
        
        {/* Mobile/Tablet Layout */}
        <div className="flex lg:hidden items-center justify-between relative">
          {/* Left: Hamburger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="text-foreground z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/95 backdrop-blur-md border-border/20 w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg text-foreground hover:text-neon transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  to="/about"
                  className="text-lg text-foreground hover:text-neon transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Das sind Wir
                </Link>
                <a href="#kontakt" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-foreground/20 hover:border-neon hover:bg-neon hover:text-black transition-all"
                  >
                    Jetzt anfragen
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center: Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src={logo}
              alt="Setrex Logo"
              className={`object-contain transition-all duration-300 ${scrolled ? "h-12 -my-1" : "h-20 -my-4"}`}
            />
          </Link>

          {/* Right: WhatsApp (phone only) */}
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 flex sm:hidden items-center justify-center w-10 h-10 rounded-full overflow-hidden"
          >
            <img src={whatsappLogo} alt="WhatsApp" className="w-10 h-10 object-contain" />
          </a>

          {/* Right: Jetzt anfragen (tablet only) */}
          <a href="#kontakt" className="z-10 hidden sm:flex lg:hidden">
            <Button
              variant="outline"
              className="border-foreground/20 hover:border-neon hover:bg-neon hover:text-black transition-all text-sm"
            >
              Jetzt anfragen
            </Button>
          </a>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Setrex Logo"
              className={`object-contain -ml-2 transition-all duration-300 ${scrolled ? "h-16 -my-2" : "h-28 -my-6"}`}
            />
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-foreground hover:text-neon transition-colors">
                {link.label}
              </a>
            ))}
            <Link to="/about" className="text-sm text-foreground hover:text-neon transition-colors">
              Das sind Wir
            </Link>
          </div>

          <a href="#kontakt">
            <Button
              variant="outline"
              className="border-foreground/20 hover:border-neon hover:bg-neon hover:text-black transition-all"
            >
              Jetzt anfragen
            </Button>
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
