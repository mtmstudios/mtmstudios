import { Navigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEOHead from "@/components/SEOHead";
import { useContactFunnel } from "@/contexts/ContactFunnelContext";
import { getKeywordPageContent, keywordPageSlugs } from "@/data/keywordContent";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const appleEase = [0.16, 1, 0.3, 1] as const;

interface KeywordPageProps {
  slug: string;
}

const KeywordPage = ({ slug }: KeywordPageProps) => {
  const { setIsOpen } = useContactFunnel();

  if (!keywordPageSlugs.includes(slug)) {
    return <Navigate to="/404" replace />;
  }

  const content = getKeywordPageContent(slug);
  if (!content) return <Navigate to="/404" replace />;

  const pageUrl = `https://mtmstudios.de/${slug}`;

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        "url": pageUrl,
        "name": content.title,
        "description": content.description,
        "inLanguage": "de-DE",
        "isPartOf": { "@id": "https://mtmstudios.de" },
        "breadcrumb": { "@id": `${pageUrl}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://mtmstudios.de" },
          { "@type": "ListItem", "position": 2, "name": content.parentLabel, "item": `https://mtmstudios.de${content.parentPath}` },
          { "@type": "ListItem", "position": 3, "name": content.h1, "item": pageUrl }
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://mtmstudios.de/#service",
        "name": "MTM Studios",
        "url": "https://mtmstudios.de",
        "telephone": "+4915567077414",
        "description": content.description,
        "areaServed": { "@type": "Country", "name": "Deutschland" },
        "serviceType": content.h1,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": content.h1,
          "itemListElement": content.features.map((f) => ({
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": f.title, "description": f.description }
          }))
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": content.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  }), [slug, content, pageUrl]);

  const paragraphs = content.detailedContent.split("\n\n");

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead
        title={content.title}
        description={content.description}
        canonical={pageUrl}
        jsonLd={jsonLd}
      />

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-foreground/50 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00E5C0]" />
            {content.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-4xl mx-auto"
          >
            {content.h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: appleEase }}
            className="mt-6 text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}
          >
            {content.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: appleEase }}
            className="flex flex-col items-center gap-4 mt-10"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#00E5C0] text-black font-semibold px-8 py-3.5 text-sm hover:bg-[#00E5C0]/90 transition-colors"
            >
              Kostenlos beraten lassen
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to={content.parentPath}
              className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors underline underline-offset-4"
            >
              Mehr über {content.parentLabel}
            </Link>
          </motion.div>
        </section>

        {/* Intro */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: appleEase }}
            className="text-foreground/70 text-base md:text-lg leading-relaxed text-center"
          >
            {content.intro}
          </motion.p>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: appleEase }}
            className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12"
          >
            Was du bekommst
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: appleEase }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00E5C0]/10 flex items-center justify-center mb-4">
                  <span className="text-[#00E5C0] font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-foreground font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detailed Content */}
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: appleEase }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-10"
          >
            So funktioniert es
          </motion.h2>
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: appleEase }}
                className="text-foreground/70 leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: appleEase }}
            className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12"
          >
            Häufige Fragen
          </motion.h2>
          <Accordion type="single" collapsible className="space-y-3">
            {content.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: appleEase }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-foreground/90 font-medium py-5 hover:no-underline [&>svg]:hidden">
                    <span className="flex items-center gap-3 w-full">
                      <span className="text-[#00E5C0] text-xs font-bold shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.question}
                      <ChevronDown className="ml-auto w-4 h-4 text-foreground/40 transition-transform duration-300 [[data-state=open]_&]:rotate-180 shrink-0" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/60 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </section>

        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default KeywordPage;
