import { motion } from "motion/react";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";
import { useIsMobile } from "@/hooks/use-mobile";

const slugs = [
  "whatsapp", "slack", "openai", "google",
  "salesforce", "hubspot", "zapier", "make", "shopify", "stripe",
  "wordpress", "notion", "calendly", "zendesk", "mailchimp", "twilio",
  "gmail", "telegram", "airtable", "jira",
];

const iconLabels: Record<string, string> = {
  whatsapp: "WhatsApp", slack: "Slack", openai: "OpenAI",
  google: "Google", salesforce: "Salesforce", hubspot: "HubSpot",
  zapier: "Zapier", make: "Make", shopify: "Shopify", stripe: "Stripe",
  wordpress: "WordPress", notion: "Notion", calendly: "Calendly", zendesk: "Zendesk",
  mailchimp: "Mailchimp", twilio: "Twilio", gmail: "Gmail", telegram: "Telegram",
  airtable: "Airtable", jira: "Jira",
};

const appleEase = [0.16, 1, 0.3, 1] as const;

const IntegrationsSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-32 px-4">
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

        {isMobile ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: appleEase }}
            className="grid grid-cols-4 gap-4 py-8"
          >
            {slugs.map((slug, i) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: appleEase }}
                className="flex flex-col items-center gap-1.5"
              >
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons@14.0.0/icons/${slug}.svg`}
                  alt={iconLabels[slug] || slug}
                  className="w-7 h-7 invert opacity-60"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="text-[10px] text-muted-foreground/60 truncate max-w-full">
                  {iconLabels[slug] || slug}
                </span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: appleEase }}
          >
            <IconCloud iconSlugs={slugs} />
          </motion.div>
        )}

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
