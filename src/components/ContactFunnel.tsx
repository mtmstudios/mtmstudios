import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useContactFunnel } from "@/contexts/ContactFunnelContext";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone, MessageSquare, Workflow, Compass, Check, ArrowLeft, ArrowRight, Send,
  Repeat, MessagesSquare, Clock, TrendingUp, Unplug, Timer,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const appleEase = [0.16, 1, 0.3, 1] as const;

const services = [
  { id: "phone", label: "KI-Telefonassistent", icon: Phone },
  { id: "chatbot", label: "WhatsApp & Chatbots", icon: MessageSquare },
  { id: "automation", label: "Automatisierungen", icon: Workflow },
  { id: "consulting", label: "Vollumfängliche Beratung", icon: Compass },
] as const;

const challenges = [
  { id: "manual-tasks", label: "Zu viele manuelle Aufgaben", icon: Repeat },
  { id: "lost-inquiries", label: "Kundenanfragen gehen verloren", icon: MessagesSquare },
  { id: "no-247", label: "Keine 24/7 Erreichbarkeit", icon: Clock },
  { id: "scaling", label: "Skalierung ohne mehr Personal", icon: TrendingUp },
  { id: "disconnected", label: "Daten und Systeme nicht verbunden", icon: Unplug },
  { id: "slow-response", label: "Zu langsame Reaktionszeiten", icon: Timer },
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(100),
  email: z.string().trim().email("Bitte gültige E-Mail eingeben").max(255),
  phone: z.string().max(30).optional(),
  message: z.string().max(1000).optional(),
});

type ContactData = z.infer<typeof contactSchema>;

interface SelectableCardGridProps {
  items: ReadonlyArray<{ id: string; label: string; icon: React.ComponentType<any> }>;
  selected: string[];
  onToggle: (id: string) => void;
}

const SelectableCardGrid = ({ items, selected, onToggle }: SelectableCardGridProps) => (
  <div className={`grid grid-cols-2 ${items.length > 4 ? "grid-rows-3" : ""} gap-3 mb-8`}>
    {items.map((item, i) => {
      const isSelected = selected.includes(item.id);
      const Icon = item.icon;
      return (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: i * 0.07, ease: appleEase }}
          onClick={() => onToggle(item.id)}
          className="relative group text-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer hover:bg-foreground/[0.05] hover:border-foreground/20"
          style={{
            borderColor: isSelected ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--border) / 0.15)",
            backgroundColor: isSelected ? "hsl(var(--foreground) / 0.06)" : "hsl(var(--foreground) / 0.02)",
            boxShadow: isSelected ? "0 0 25px hsl(var(--foreground) / 0.06), inset 0 1px 0 hsl(var(--foreground) / 0.08)" : "none",
          }}
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: "inset 0 1px 0 hsl(var(--foreground) / 0.06)" }}
          />
          <Icon
            className="w-5 h-5 mb-3 mx-auto transition-colors duration-300"
            style={{ color: isSelected ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
          />
          <span className="text-sm font-medium text-foreground block">{item.label}</span>
          <motion.div
            className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "hsl(var(--accent))" }}
            initial={false}
            animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check className="w-3 h-3 text-background" />
          </motion.div>
        </motion.button>
      );
    })}
  </div>
);

const ContactFunnel = () => {
  const { isOpen, setIsOpen } = useContactFunnel();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [formData, setFormData] = useState<ContactData>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});

  const reset = useCallback(() => {
    setStep(1);
    setSelected([]);
    setSelectedChallenges([]);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setTimeout(reset, 300);
  };

  const toggle = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, id: string) => {
    setList(list.includes(id) ? list.filter((s) => s !== id) : [...list, id]);
  };

  const handleSubmit = () => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactData, string>> = {};
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof ContactData;
        if (!fieldErrors[field]) fieldErrors[field] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    console.log("Funnel submission:", { services: selected, challenges: selectedChallenges, ...result.data });
    setStep(4);
  };

  const stepMotion = {
    initial: { opacity: 0, x: 40, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -40, filter: "blur(10px)" },
    transition: { duration: 0.4, ease: appleEase },
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-background/95 backdrop-blur-xl border border-border/20 rounded-3xl max-w-xl p-0 gap-0 overflow-hidden shadow-[0_0_80px_hsl(var(--foreground)/0.04)]">
        <DialogTitle className="sr-only">Anfrage stellen</DialogTitle>

        {/* Progress bar */}
        <div className="flex gap-2 px-8 pt-8 pb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="h-1 flex-1 rounded-full bg-border/20 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(var(--foreground) / 0.2), hsl(var(--foreground) / 0.6))" }}
                initial={false}
                animate={{ width: step >= s ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: appleEase }}
              />
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="px-8 pb-8 pt-4 min-h-[440px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" {...stepMotion} className="flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase text-muted-foreground text-center mb-3">Schritt 1 von 3</p>
                <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Was braucht ihr?</h3>
                <p className="text-muted-foreground text-sm mb-6 text-center">Wählt alles aus, was euch interessiert.</p>
                <SelectableCardGrid items={services as any} selected={selected} onToggle={(id) => toggle(selected, setSelected, id)} />
                <div className="mt-auto">
                  <Button onClick={() => setStep(2)} disabled={selected.length === 0} className="w-full bg-foreground/90 text-background hover:bg-foreground font-semibold rounded-full py-6 text-base transition-all duration-300 disabled:opacity-30">
                    Weiter <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" {...stepMotion} className="flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase text-muted-foreground text-center mb-3">Schritt 2 von 3</p>
                <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Was ist aktuell eure größte Herausforderung?</h3>
                <p className="text-muted-foreground text-sm mb-6 text-center">Wählt alles aus, was zutrifft.</p>
                <SelectableCardGrid items={challenges as any} selected={selectedChallenges} onToggle={(id) => toggle(selectedChallenges, setSelectedChallenges, id)} />
                <div className="mt-auto flex gap-3 justify-center">
                  <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full px-6 py-6 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                  </Button>
                  <Button onClick={() => setStep(3)} disabled={selectedChallenges.length === 0} className="flex-1 bg-foreground/90 text-background hover:bg-foreground font-semibold rounded-full py-6 text-base transition-all duration-300 disabled:opacity-30">
                    Weiter <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" {...stepMotion} className="flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase text-muted-foreground text-center mb-3">Schritt 3 von 3</p>
                <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Wie erreichen wir euch?</h3>
                <p className="text-muted-foreground text-sm mb-6 text-center">Wir melden uns schnellstmöglich.</p>
                <div className="space-y-4 mb-8">
                  {[
                    { key: "name" as const, label: "Name *", placeholder: "MTM Studios", type: "text" },
                    { key: "email" as const, label: "E-Mail *", placeholder: "hallo@mtmstudios.de", type: "email" },
                    { key: "phone" as const, label: "Telefon (optional)", placeholder: "+49 ...", type: "tel" },
                  ].map((field, i) => (
                    <motion.div key={field.key} initial={{ opacity: 0, y: 15, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.35, delay: i * 0.06, ease: appleEase }}>
                      <label className="text-sm text-muted-foreground mb-1.5 block">{field.label}</label>
                      <input
                        type={field.type} placeholder={field.placeholder} value={formData[field.key] || ""}
                        onChange={(e) => { setFormData((prev) => ({ ...prev, [field.key]: e.target.value })); if (errors[field.key]) setErrors((prev) => ({ ...prev, [field.key]: undefined })); }}
                        className="w-full rounded-xl border bg-foreground/[0.03] backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_15px_hsl(var(--foreground)/0.05)]"
                        style={{ borderColor: errors[field.key] ? "hsl(0 70% 50% / 0.6)" : "hsl(var(--border) / 0.15)" }}
                      />
                      {errors[field.key] && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs mt-1.5" style={{ color: "hsl(0 70% 60%)" }}>{errors[field.key]}</motion.p>
                      )}
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, y: 15, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.35, delay: 0.18, ease: appleEase }}>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Nachricht (optional)</label>
                    <textarea placeholder="Erzählt uns kurz, was ihr vorhabt..." rows={3} value={formData.message || ""} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full rounded-xl border bg-foreground/[0.03] backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_15px_hsl(var(--foreground)/0.05)]"
                      style={{ borderColor: "hsl(var(--border) / 0.15)" }}
                    />
                  </motion.div>
                </div>
                <div className="mt-auto flex gap-3 justify-center">
                  <Button variant="ghost" onClick={() => setStep(2)} className="rounded-full px-6 py-6 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-accent text-background hover:bg-accent/90 font-semibold rounded-full py-6 text-base transition-all duration-300">
                    Absenden <Send className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.5, ease: appleEase }} className="flex flex-col flex-1 items-center justify-center text-center py-8">
                <div className="relative mb-8">
                  <motion.div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--foreground) / 0.1) 0%, transparent 70%)" }} animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
                  <motion.div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.7))", boxShadow: "0 0 40px hsl(var(--foreground) / 0.15)" }} initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}>
                    <Check className="w-9 h-9 text-background" strokeWidth={3} />
                  </motion.div>
                </div>
                <motion.h3 className="text-2xl font-bold text-foreground mb-3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: appleEase }}>Geschafft!</motion.h3>
                <motion.p className="text-muted-foreground max-w-xs leading-relaxed mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: appleEase }}>Wir melden uns innerhalb von 24h bei euch. Bis bald!</motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <Button onClick={() => handleOpenChange(false)} variant="ghost" className="rounded-full px-8 py-6 text-muted-foreground hover:text-foreground border border-border/20">Schließen</Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFunnel;
