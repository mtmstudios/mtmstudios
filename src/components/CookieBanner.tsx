import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X, Settings2, Shield } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const CookieBanner = () => {
  const { showBanner, showSettings, acceptAll, acceptNecessary, updateConsent, consent, openSettings, closeSettings } = useCookieConsent();
  const [localAnalytics, setLocalAnalytics] = useState(consent.analytics);
  const [localMarketing, setLocalMarketing] = useState(consent.marketing);

  const handleSaveSettings = () => {
    updateConsent({ analytics: localAnalytics, marketing: localMarketing });
  };

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
          >
            <div className="mx-auto max-w-3xl rounded-2xl bg-black/80 backdrop-blur-xl border border-white/[0.06] p-5 md:p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.{" "}
                    <Link to="/datenschutz" className="underline text-accent hover:text-accent/80 transition-colors">
                      Datenschutzerklärung
                    </Link>
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <Button onClick={acceptAll} size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-5 text-xs font-medium">
                      Alle akzeptieren
                    </Button>
                    <Button onClick={acceptNecessary} variant="outline" size="sm" className="rounded-full px-5 text-xs font-medium border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-foreground/80">
                      Nur notwendige
                    </Button>
                    <button onClick={openSettings} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 ml-1">
                      <Settings2 className="w-3.5 h-3.5" />
                      Einstellungen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeSettings}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: appleEase }}
              className="w-full max-w-md rounded-2xl bg-black/90 backdrop-blur-xl border border-white/[0.08] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Cookie-Einstellungen</h3>
                <button onClick={closeSettings} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-white/[0.06]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Necessary */}
                <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <div>
                    <p className="text-sm font-medium text-foreground">Notwendig</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Essenziell für die Funktion der Website</p>
                  </div>
                  <Switch checked disabled className="opacity-50" />
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <div>
                    <p className="text-sm font-medium text-foreground">Analyse</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Hilft uns, die Nutzung zu verstehen</p>
                  </div>
                  <Switch checked={localAnalytics} onCheckedChange={setLocalAnalytics} />
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Marketing</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Personalisierte Werbung und Inhalte</p>
                  </div>
                  <Switch checked={localMarketing} onCheckedChange={setLocalMarketing} />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleSaveSettings} size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full text-xs font-medium">
                  Auswahl speichern
                </Button>
                <Button onClick={acceptAll} variant="outline" size="sm" className="flex-1 rounded-full text-xs font-medium border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-foreground/80">
                  Alle akzeptieren
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                <Link to="/datenschutz" onClick={closeSettings} className="underline hover:text-foreground transition-colors">
                  Datenschutzerklärung
                </Link>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieBanner;
