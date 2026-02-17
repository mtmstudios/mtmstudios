import { motion } from "motion/react";

const integrations = [
  { name: "WhatsApp", icon: "https://cdn.simpleicons.org/whatsapp/white" },
  { name: "Google Calendar", icon: "https://cdn.simpleicons.org/googlecalendar/white" },
  { name: "HubSpot", icon: "https://cdn.simpleicons.org/hubspot/white" },
  { name: "Slack", icon: "https://cdn.simpleicons.org/slack/white" },
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/white" },
  { name: "Make", icon: "https://cdn.simpleicons.org/make/white" },
  { name: "OpenAI", icon: "https://cdn.simpleicons.org/openai/white" },
  { name: "Salesforce", icon: "https://cdn.simpleicons.org/salesforce/white" },
  { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier/white" },
  { name: "Microsoft Teams", icon: "https://cdn.simpleicons.org/microsoftteams/white" },
  { name: "Notion", icon: "https://cdn.simpleicons.org/notion/white" },
  { name: "Calendly", icon: "https://cdn.simpleicons.org/calendly/white" },
  { name: "Pipedrive", icon: "https://cdn.simpleicons.org/pipedrive/white" },
  { name: "Zendesk", icon: "https://cdn.simpleicons.org/zendesk/white" },
  { name: "Mailchimp", icon: "https://cdn.simpleicons.org/mailchimp/white" },
  { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe/white" },
];

const easing = [0.25, 0.1, 0.25, 1] as const;

const IntegrationsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.04, ease: easing }}
              className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:border-neon/30 hover:shadow-[0_0_20px_hsl(72_100%_60%/0.1)]"
            >
              <img
                src={integration.icon}
                alt={integration.name}
                className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center">
                {integration.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6, ease: easing }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          ...und viele mehr
        </motion.p>
      </div>
    </section>
  );
};

export default IntegrationsSection;
