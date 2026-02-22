import { motion } from "motion/react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const ChatbotTestimonial = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center relative">
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 text-8xl text-accent/10 font-serif leading-none select-none pointer-events-none">
          „
        </span>

        <motion.blockquote
          className="text-xl md:text-2xl lg:text-3xl font-light italic text-foreground leading-relaxed relative z-10"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          „Unser WhatsApp-Bot beantwortet 80% der Kundenanfragen automatisch. Das Team kann sich endlich auf die komplexen Fälle konzentrieren."
        </motion.blockquote>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: appleEase }}
        >
          <p className="text-foreground font-semibold">Markus Schneider</p>
          <p className="text-muted-foreground text-sm">Head of Customer Service</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotTestimonial;
