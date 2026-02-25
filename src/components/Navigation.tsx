import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useContactFunnel } from "@/contexts/ContactFunnelContext";
import logo from "@/assets/logo-2.png";

const solutionLinks = [
  { href: "/ki-telefonassistent", label: "Telefonassistent", desc: "KI-gestützte Anrufannahme" },
  { href: "/ki-chatbot", label: "Chatbot & WhatsApp", desc: "Automatisierte Kundenkommunikation" },
  { href: "/automatisierungen", label: "Automatisierungen", desc: "Workflows & Prozesse optimieren" },
];

const SolutionsDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-foreground/80 hover:text-foreground transition-opacity duration-200 flex items-center gap-1"
      >
        Lösungen
        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-background/95 backdrop-blur-md border border-border/20 shadow-lg py-2 z-[110]">
          {solutionLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block px-4 py-2.5 hover:bg-white/[0.05] transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              <span className="block text-sm text-foreground/90">{link.label}</span>
              <span className="block text-xs text-foreground/50 mt-0.5">{link.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const { setIsOpen: openFunnel } = useContactFunnel();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      e.preventDefault();
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/10 bg-background/80 backdrop-blur-md transition-all duration-200">
      <div className={`container mx-auto px-6 transition-all duration-200 ${scrolled ? "py-2 lg:py-4" : "py-4"}`}>
        
        {/* Mobile/Tablet Layout */}
        <div className="flex lg:hidden items-center justify-between relative">
          <Sheet open={mobileMenuOpen} onOpenChange={(v) => { setMobileMenuOpen(v); if (!v) setMobileSolutionsOpen(false); }}>
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
                {/* Lösungen collapsible */}
                <div>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="flex items-center gap-2 text-lg text-foreground/80 hover:text-foreground transition-opacity duration-200 w-full"
                  >
                    Lösungen
                    <svg className={`w-4 h-4 transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {mobileSolutionsOpen && (
                    <div className="flex flex-col gap-3 mt-3 pl-4">
                      {solutionLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="text-base text-foreground/70 hover:text-foreground transition-opacity duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link to="/dassindwir" className="text-lg text-foreground/80 hover:text-foreground transition-opacity duration-200" onClick={() => setMobileMenuOpen(false)}>Das sind Wir</Link>
                <Link to="/karriere" className="text-lg text-foreground/80 hover:text-foreground transition-opacity duration-200" onClick={() => setMobileMenuOpen(false)}>Karriere</Link>
                <Link to="/partnerwerden" className="text-lg text-foreground/80 hover:text-foreground transition-opacity duration-200" onClick={() => setMobileMenuOpen(false)}>Partner werden</Link>
                <div className="mt-2 pt-6 border-t border-border/10">
                  <button
                    className="w-full py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-foreground/90 text-base font-medium text-center hover:bg-white/[0.10] transition-all duration-300"
                    onClick={() => { setMobileMenuOpen(false); openFunnel(true); }}
                  >
                    Jetzt anfragen
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" onClick={handleLogoClick} className="absolute left-1/2 -translate-x-1/2">
            <img src={logo} alt="MTM Studios Logo" className={`object-contain transition-all duration-200 ${scrolled ? "h-6" : "h-8"}`} />
          </Link>

          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="z-10 flex sm:hidden items-center justify-center w-9 h-9 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 backdrop-blur-sm hover:bg-[#25D366]/20 transition-all duration-300">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>

          <button onClick={() => openFunnel(true)} className="z-10 hidden sm:flex lg:hidden px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-foreground/90 text-sm font-medium hover:bg-white/[0.10] backdrop-blur-sm transition-all duration-300">
            Jetzt anfragen
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <Link to="/" onClick={handleLogoClick} className="flex items-center">
            <img src={logo} alt="MTM Studios Logo" className="object-contain -ml-2 h-8" />
          </Link>

          <div className="flex items-center gap-8">
            <SolutionsDropdown />
            <Link to="/dassindwir" className="text-sm text-foreground/80 hover:text-foreground transition-opacity duration-200">Das sind Wir</Link>
            <Link to="/karriere" className="text-sm text-foreground/80 hover:text-foreground transition-opacity duration-200">Karriere</Link>
            <Link to="/partnerwerden" className="text-sm text-foreground/80 hover:text-foreground transition-opacity duration-200">Partner werden</Link>
          </div>

          <button onClick={() => openFunnel(true)} className="text-sm text-foreground/90 rounded-full border border-white/[0.12] px-5 py-2 hover:bg-white/[0.06] transition-all duration-300">
            Jetzt anfragen
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
