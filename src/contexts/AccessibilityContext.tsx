import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type FontSize = "small" | "normal" | "large" | "xlarge";

interface AccessibilityState {
  fontSize: FontSize;
  highContrast: boolean;
  reducedMotion: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  setFontSize: (size: FontSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
}

const STORAGE_KEY = "mtm_accessibility";

const defaults: AccessibilityState = {
  fontSize: "normal",
  highContrast: false,
  reducedMotion: false,
};

const fontSizeMap: Record<FontSize, string> = {
  small: "14px",
  normal: "16px",
  large: "18px",
  xlarge: "20px",
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
};

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AccessibilityState>(defaults);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setState({ ...defaults, ...JSON.parse(stored) });
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = fontSizeMap[state.fontSize];

    if (state.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    if (state.reducedMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setFontSize = useCallback((fontSize: FontSize) => setState((s) => ({ ...s, fontSize })), []);
  const setHighContrast = useCallback((highContrast: boolean) => setState((s) => ({ ...s, highContrast })), []);
  const setReducedMotion = useCallback((reducedMotion: boolean) => setState((s) => ({ ...s, reducedMotion })), []);

  return (
    <AccessibilityContext.Provider value={{ ...state, setFontSize, setHighContrast, setReducedMotion }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
