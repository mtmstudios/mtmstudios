import { motion } from "motion/react";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";

const slugs = [
  "whatsapp",
  "googlecalendar",
  "hubspot",
  "slack",
  "n8n",
  "make",
  "openai",
  "salesforce",
  "zapier",
  "microsoftteams",
  "notion",
  "calendly",
  "pipedrive",
  "zendesk",
  "mailchimp",
  "stripe",
  "airtable",
  "twilio",
  "shopify",
  "wordpress",
];

const easing = [0.25, 0.1, 0.25, 1] as const;

const IntegrationsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon/10 text-neon border border-neon/20 mb-4"
          >
            Integrationen
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easing }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Über 100+ Integrationen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: easing }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Wir verbinden eure bestehenden Tools nahtlos mit KI.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: easing }}
        >
          <IconCloud iconSlugs={slugs} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6, ease: easing }}
          className="text-center text-sm text-muted-foreground mt-4"
        >
          ...und viele mehr
        </motion.p>
      </div>
    </section>
  );
};

export default IntegrationsSection;
