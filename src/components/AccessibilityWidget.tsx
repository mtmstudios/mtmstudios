import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Switch } from "@/components/ui/switch";
import { Accessibility, X, Cookie, FileText, Type } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

type FontSize = "small" | "normal" | "large" | "xlarge";

const fontSizes: { value: FontSize; label: string }[] = [
  { value: "small", label: "Klein" },
  { value: "normal", label: "Normal" },
  { value: "large", label: "Groß" },
  { value: "xlarge", label: "Sehr groß" },
];

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const { fontSize, highContrast, reducedMotion, setFontSize, setHighContrast, setReducedMotion } = useAccessibility();
  const { openSettings } = useCookieConsent();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[90] w-11 h-11 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all duration-200 shadow-lg"
        aria-label="Barrierefreiheit-Einstellungen öffnen"
      >
        <Accessibility className="w-5 h-5" />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[91] flex items-end sm:items-center justify-start p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: -40, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -40, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: appleEase }}
              className="w-full max-w-xs rounded-2xl bg-black/90 backdrop-blur-xl border border-white/[0.08] p-5 shadow-2xl sm:ml-2 mb-16 sm:mb-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Accessibility className="w-4 h-4 text-accent" />
                  Barrierefreiheit
                </h3>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-white/[0.06]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Font Size */}
                <div>
                  <p className="text-xs font-medium text-foreground/80 mb-2 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5" />
                    Schriftgröße
                  </p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {fontSizes.map((fs) => (
                      <button
                        key={fs.value}
                        onClick={() => setFontSize(fs.value)}
                        className={`text-xs py-1.5 rounded-lg border transition-all duration-200 ${
                          fontSize === fs.value
                            ? "bg-accent/20 border-accent/40 text-accent"
                            : "border-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                        }`}
                      >
                        {fs.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between py-2 border-t border-white/[0.06]">
                  <p className="text-xs font-medium text-foreground/80">Hoher Kontrast</p>
                  <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between py-2 border-t border-white/[0.06]">
                  <p className="text-xs font-medium text-foreground/80">Animationen reduzieren</p>
                  <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                </div>

                {/* Links */}
                <div className="pt-2 border-t border-white/[0.06] space-y-2">
                  <Link
                    to="/barrierefreiheit"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Barrierefreiheitserklärung
                  </Link>
                  <button
                    onClick={() => { setOpen(false); openSettings(); }}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Cookie className="w-3.5 h-3.5" />
                    Cookie-Einstellungen
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityWidget;
