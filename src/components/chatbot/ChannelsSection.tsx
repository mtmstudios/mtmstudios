import { motion } from "motion/react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const ChannelsSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-foreground text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Eure Kanäle. Ein Bot.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Card */}
          <motion.div
            className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/[0.06]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: appleEase }}
          >
            {/* WhatsApp Chat Mockup */}
            <div className="mb-8 rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-3">
              {/* Bot bubble */}
              <div className="flex justify-start">
                <div className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-[#25D366]/10 border border-[#25D366]/20 text-sm text-foreground/80 max-w-[80%]">
                  Hallo! Wie kann ich helfen? 👋
                </div>
              </div>
              {/* User bubble */}
              <div className="flex justify-end">
                <div className="px-4 py-2.5 rounded-2xl rounded-br-md bg-secondary text-sm text-foreground/80 max-w-[80%]">
                  Ich möchte einen Termin buchen
                </div>
              </div>
              {/* Bot reply */}
              <div className="flex justify-start">
                <div className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-[#25D366]/10 border border-[#25D366]/20 text-sm text-foreground/80 max-w-[80%]">
                  Klar! Wann passt es euch? 📅
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <h3 className="text-2xl font-semibold text-foreground">WhatsApp Business</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Erreicht eure Kunden dort, wo sie täglich kommunizieren.
            </p>
          </motion.div>

          {/* Website Chat Card */}
          <motion.div
            className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/[0.06]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: appleEase }}
          >
            {/* Website Chat Mockup */}
            <div className="mb-8 rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
              {/* Chat widget header */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                <span className="text-xs text-foreground/60">Online</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-accent/10 border border-accent/20 text-sm text-foreground/80 max-w-[80%]">
                    Willkommen! Fragen Sie mich alles.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="px-4 py-2.5 rounded-2xl rounded-br-md bg-secondary text-sm text-foreground/80 max-w-[80%]">
                    Was kostet euer Service?
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Website-Chat</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Besucher direkt auf eurer Website betreuen — ohne Wartezeit.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;
