import { useIsMobile } from "./use-mobile";

/**
 * Returns helpers to conditionally disable GPU-intensive blur animations on mobile.
 * Desktop gets the full premium blur effect; mobile gets lightweight opacity+transform only.
 */
export function useMobileBlur() {
  const isMobile = useIsMobile();

  return {
    /** Adds filter: blur(px) on desktop, nothing on mobile */
    blur: (px: number) => (isMobile ? {} : { filter: `blur(${px}px)` }),
    /** Adds filter: blur(0px) on desktop (for animation end state), nothing on mobile */
    noBlur: isMobile ? {} : { filter: "blur(0px)" },
    isMobile,
  };
}
