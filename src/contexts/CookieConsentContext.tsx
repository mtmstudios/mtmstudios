import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CookieCategory = "necessary" | "analytics" | "marketing";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string | null;
}

interface CookieConsentContextType {
  consent: ConsentState;
  hasConsent: (category: CookieCategory) => boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  updateConsent: (categories: Partial<Omit<ConsentState, "necessary" | "timestamp">>) => void;
  showBanner: boolean;
  showSettings: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const STORAGE_KEY = "mtm_cookie_consent";

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: null,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
};

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const persist = useCallback((state: ConsentState) => {
    const withTimestamp = { ...state, timestamp: new Date().toISOString() };
    setConsent(withTimestamp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, marketing: true, timestamp: null });
  }, [persist]);

  const acceptNecessary = useCallback(() => {
    persist({ necessary: true, analytics: false, marketing: false, timestamp: null });
  }, [persist]);

  const updateConsent = useCallback((categories: Partial<Omit<ConsentState, "necessary" | "timestamp">>) => {
    persist({ ...consent, ...categories, necessary: true, timestamp: null });
  }, [consent, persist]);

  const hasConsent = useCallback((category: CookieCategory) => consent[category], [consent]);

  const openSettings = useCallback(() => setShowSettings(true), []);
  const closeSettings = useCallback(() => setShowSettings(false), []);

  return (
    <CookieConsentContext.Provider
      value={{ consent, hasConsent, acceptAll, acceptNecessary, updateConsent, showBanner, showSettings, openSettings, closeSettings }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
