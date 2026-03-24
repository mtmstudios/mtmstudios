import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = "https://mtmstudios.de";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MTM Studios",
  url: BASE_URL,
  logo: `${BASE_URL}/assets/logo-2.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+49-155-67077414",
    contactType: "customer service",
    availableLanguage: "German",
  },
  sameAs: ["https://instagram.com/mtmstudios"],
};

const SEOHead = ({ title, description, canonical, jsonLd }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const canonicalUrl = canonical || `${BASE_URL}${window.location.pathname}`;

    setMeta("description", description);
    setMeta("robots", "index, follow");

    // Open Graph
    setMeta("og:type", "website", "property");
    setMeta("og:locale", "de_DE", "property");
    setMeta("og:site_name", "MTM Studios", "property");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:image", `${BASE_URL}/og-image.png`, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:url", canonicalUrl, "property");

    // Twitter / X Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", `${BASE_URL}/og-image.png`);

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    // JSON-LD structured data
    const schemas = [organizationSchema, ...(jsonLd ? [jsonLd] : [])];

    document.querySelectorAll('script[data-seo-head="true"]').forEach((el) => el.remove());

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-head", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-seo-head="true"]').forEach((el) => el.remove());
    };
  }, [title, description, canonical, jsonLd]);

  return null;
};

export default SEOHead;
