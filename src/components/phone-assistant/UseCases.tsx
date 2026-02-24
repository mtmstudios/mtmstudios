import { motion } from "motion/react";
import { Stethoscope, Hammer, Scale, ShoppingCart } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const useCases = [
  {
    title: "Arztpraxen",
    description: "Terminvergabe und Rezeptanfragen automatisieren",
    icon: Stethoscope,
  },
  {
    title: "Handwerk",
    description: "Aufträge annehmen, auch wenn das Team auf der Baustelle ist",
    icon: Hammer,
  },
  {
    title: "Kanzleien",
    description: "Erstgespräche vorqualifizieren und Rückrufbitten aufnehmen",
    icon: Scale,
  },
  {
    title: "E-Commerce",
    description: "Bestellstatus und Retouren telefonisch abwickeln",
    icon: ShoppingCart,
  },
];

const UseCases = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-foreground text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Für jede Branche.
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: appleEase }}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm p-5 md:p-6 text-center transition-all duration-300"
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-accent/60 mx-auto mb-3" />
                <h3 className="text-base md:text-lg font-semibold text-foreground">
                  {uc.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {uc.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
