import { motion } from "motion/react";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";

const slugs = [
  "whatsapp", "slack", "openai", "google",
  "salesforce", "hubspot", "zapier", "make", "shopify", "stripe",
  "wordpress", "notion", "calendly", "zendesk", "mailchimp", "twilio",
  "gmail", "telegram", "airtable", "jira",
];

const appleEase = [0.16, 1, 0.3, 1] as const;

const IntegrationsSection = () => {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: appleEase }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-3"
          >
            Über 100+ Integrationen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Wir verbinden deine bestehenden Tools nahtlos mit KI.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: appleEase }}
          className="relative flex items-center justify-center min-h-[300px] md:min-h-[400px]"
        >
          <IconCloud iconSlugs={slugs} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: appleEase }}
          className="text-center text-sm text-muted-foreground mt-4"
        >
          ...und viele mehr
        </motion.p>
      </div>
    </section>
  );
};

export default IntegrationsSection;
