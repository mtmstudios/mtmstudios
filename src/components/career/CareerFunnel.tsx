import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock, GraduationCap, Clock3, Briefcase, Megaphone, Workflow,
  Check, ArrowLeft, ArrowRight, Send, Star, TrendingUp, Award,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const appleEase = [0.16, 1, 0.3, 1] as const;

const employmentTypes = [
  { id: "minijob", label: "Minijob", icon: Clock },
  { id: "werkstudent", label: "Werkstudent", icon: GraduationCap },
  { id: "teilzeit", label: "Teilzeit", icon: Clock3 },
  { id: "vollzeit", label: "Vollzeit", icon: Briefcase },
] as const;

const roles = [
  { id: "sales", label: "Sales", icon: Megaphone },
  { id: "automation", label: "Automatisierungsspezialist", icon: Workflow },
] as const;

const experienceLevels = [
  { id: "junior", label: "Einsteiger", sub: "0–1 Jahre", icon: Star },
  { id: "mid", label: "Erfahren", sub: "2–4 Jahre", icon: TrendingUp },
  { id: "senior", label: "Senior", sub: "5+ Jahre", icon: Award },
] as const;

const tools = [
  { id: "n8n", label: "N8N", logo: "https://cdn.simpleicons.org/n8n/white" },
  { id: "zapier", label: "Zapier", logo: "https://cdn.simpleicons.org/zapier/white" },
  { id: "claude", label: "Claude", logo: "https://cdn.simpleicons.org/anthropic/white" },
  { id: "chatgpt", label: "ChatGPT", logo: "https://cdn.simpleicons.org/openai/white" },
  { id: "gemini", label: "Gemini", logo: "https://cdn.simpleicons.org/googlegemini/white" },
] as const;

const hourOptions = ["8–12h", "12–16h", "16–20h"] as const;
const startOptions = ["Sofort", "In 1–3 Monaten", "Später"] as const;
const referralSources = ["Google", "Instagram", "Empfehlung", "LinkedIn", "Sonstiges"] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(100),
  email: z.string().trim().email("Bitte gültige E-Mail eingeben").max(255),
  phone: z.string().max(30).optional(),
  message: z.string().max(1000).optional(),
  referralSource: z.string().min(1, "Bitte auswählen"),
});

type ContactData = z.infer<typeof contactSchema>;

interface CareerFunnelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ── Selectable Card ──────────────────────────────── */
const SelectCard = ({
  selected,
  onClick,
  icon: Icon,
  label,
  sub,
  index,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ComponentType<any>;
  label: string;
  sub?: string;
  index: number;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.4, delay: index * 0.07, ease: appleEase }}
    onClick={onClick}
    className="relative group text-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer hover:bg-foreground/[0.05] hover:border-foreground/20"
    style={{
      borderColor: selected ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--border) / 0.15)",
      backgroundColor: selected ? "hsl(var(--foreground) / 0.06)" : "hsl(var(--foreground) / 0.02)",
      boxShadow: selected ? "0 0 25px hsl(var(--foreground) / 0.06), inset 0 1px 0 hsl(var(--foreground) / 0.08)" : "none",
    }}
  >
    <Icon
      className="w-5 h-5 mb-2 mx-auto transition-colors duration-300"
      style={{ color: selected ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
    />
    <span className="text-sm font-medium text-foreground block">{label}</span>
    {sub && <span className="text-xs text-muted-foreground block mt-0.5">{sub}</span>}
    <motion.div
      className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
      style={{ backgroundColor: "hsl(var(--accent))" }}
      initial={false}
      animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <Check className="w-3 h-3 text-background" />
    </motion.div>
  </motion.button>
);

/* ── Chip (for hours, start) ───────────────── */
const Chip = ({
  label,
  selected,
  onClick,
  index,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.35, delay: index * 0.05, ease: appleEase }}
    onClick={onClick}
    className="px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer"
    style={{
      borderColor: selected ? "hsl(var(--foreground) / 0.25)" : "hsl(var(--border) / 0.15)",
      backgroundColor: selected ? "hsl(var(--foreground) / 0.08)" : "hsl(var(--foreground) / 0.02)",
      color: selected ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.7)",
    }}
  >
    {label}
  </motion.button>
);

/* ── Main Component ───────────────────────────────── */
const CareerFunnel = ({ open, onOpenChange }: CareerFunnelProps) => {
  const [step, setStep] = useState(1);
  const [employment, setEmployment] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [studiengang, setStudiengang] = useState("");
  const [hours, setHours] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [formData, setFormData] = useState<ContactData>({ name: "", email: "", phone: "", message: "", referralSource: "" });
  const [referralOther, setReferralOther] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});

  const isStudentPath = employment === "minijob" || employment === "werkstudent";
  const totalSteps = 6;

  const reset = useCallback(() => {
    setStep(1);
    setEmployment("");
    setRole("");
    setExperience("");
    setStudiengang("");
    setHours("");
    setStartDate("");
    setSelectedTools([]);
    setFormData({ name: "", email: "", phone: "", message: "", referralSource: "" });
    setReferralOther("");
    setErrors({});
  }, []);

  const handleOpenChange = (o: boolean) => {
    onOpenChange(o);
    if (!o) setTimeout(reset, 300);
  };

  const toggleTool = (t: string) =>
    setSelectedTools((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const handleReferralSelect = (source: string) => {
    setFormData((prev) => ({ ...prev, referralSource: source }));
    if (source !== "Sonstiges") setReferralOther("");
    if (errors.referralSource) setErrors((prev) => ({ ...prev, referralSource: undefined }));
  };

  const handleSubmit = () => {
    const dataToValidate = {
      ...formData,
      referralSource: formData.referralSource === "Sonstiges" ? referralOther : formData.referralSource,
    };
    const result = contactSchema.safeParse(dataToValidate);
    if (!result.success) {
      const fe: Partial<Record<keyof ContactData, string>> = {};
      result.error.errors.forEach((e) => {
        const f = e.path[0] as keyof ContactData;
        if (!fe[f]) fe[f] = e.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    console.log("Career funnel:", {
      employment, role, experience, studiengang, hours, startDate, tools: selectedTools, ...result.data,
    });
    setStep(6);
  };

  const canProceedStep3 = isStudentPath
    ? studiengang.trim().length > 0 && hours !== "" && startDate !== ""
    : experience !== "";

  const stepMotion = {
    initial: { opacity: 0, x: 40, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -40, filter: "blur(10px)" },
    transition: { duration: 0.4, ease: appleEase },
  };

  const inputClasses = "w-full rounded-xl border bg-foreground/[0.03] backdrop-blur-sm px-4 py-3.5 text-sm text-foreground text-center placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_15px_hsl(var(--foreground)/0.05)] focus:scale-[1.01]";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-background/95 backdrop-blur-xl border border-border/20 rounded-3xl max-w-xl p-0 gap-0 overflow-hidden shadow-[0_0_80px_hsl(var(--foreground)/0.04)]">
        <DialogTitle className="sr-only">Bewerbung</DialogTitle>

        {/* Progress */}
        <div className="flex gap-2 px-8 pt-8 pb-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-border/20 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(var(--foreground) / 0.2), hsl(var(--foreground) / 0.6))" }}
                initial={false}
                animate={{ width: step >= i + 1 ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: appleEase }}
              />
            </div>
          ))}
        </div>

        <div className="px-8 pb-8 pt-4 min-h-[440px] flex flex-col">
          <AnimatePresence mode="wait">
            {/* Step 1 – Employment Type */}
            {step === 1 && (
              <motion.div key="s1" {...stepMotion} className="flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase text-muted-foreground text-center mb-3">Schritt 1 von 6</p>
                <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Was suchst du?</h3>
                <p className="text-muted-foreground text-sm mb-6 text-center">Wähl aus, was am besten passt.</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {employmentTypes.map((t, i) => (
                    <SelectCard key={t.id} icon={t.icon} label={t.label} selected={employment === t.id} onClick={() => setEmployment(t.id)} index={i} />
                  ))}
                </div>
                <div className="mt-auto">
                  <Button onClick={() => setStep(2)} disabled={!employment} className="w-full bg-foreground/90 text-background hover:bg-foreground font-semibold rounded-full py-6 text-base disabled:opacity-30">
                    Weiter <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2 – Role */}
            {step === 2 && (
              <motion.div key="s2" {...stepMotion} className="flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase text-muted-foreground text-center mb-3">Schritt 2 von 6</p>
                <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Was willst du machen?</h3>
                <p className="text-muted-foreground text-sm mb-6 text-center">Wähl deine Rolle.</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {roles.map((r, i) => (
                    <SelectCard key={r.id} icon={r.icon} label={r.label} selected={role === r.id} onClick={() => setRole(r.id)} index={i} />
                  ))}
                </div>
                <div className="mt-auto flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full px-6 py-6 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                  </Button>
                  <Button onClick={() => setStep(3)} disabled={!role} className="flex-1 bg-foreground/90 text-background hover:bg-foreground font-semibold rounded-full py-6 text-base disabled:opacity-30">
                    Weiter <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3 – Branch */}
            {step === 3 && (
              <motion.div key="s3" {...stepMotion} className="flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase text-muted-foreground text-center mb-3">Schritt 3 von 6</p>
                {isStudentPath ? (
                  <>
                    <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Erzähl uns kurz von dir</h3>
                    <p className="text-muted-foreground text-sm mb-6 text-center">Ein paar Infos zu deinem Hintergrund.</p>
                    <div className="space-y-5 mb-8">
                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: appleEase }}>
                        <label className="text-sm text-muted-foreground mb-1.5 block text-center">Studiengang / Ausbildung</label>
                        <input
                          type="text" placeholder="z.B. Wirtschaftsinformatik" value={studiengang}
                          onChange={(e) => setStudiengang(e.target.value)}
                          className={inputClasses}
                          style={{ borderColor: "hsl(var(--border) / 0.15)" }}
                        />
                      </motion.div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block text-center">Stunden pro Woche</label>
                        <div className="flex flex-wrap justify-center gap-2">
                          {hourOptions.map((h, i) => (
                            <Chip key={h} label={h} selected={hours === h} onClick={() => setHours(h)} index={i} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block text-center">Wann kannst du anfangen?</label>
                        <div className="flex flex-wrap justify-center gap-2">
                          {startOptions.map((s, i) => (
                            <Chip key={s} label={s} selected={startDate === s} onClick={() => setStartDate(s)} index={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Wie viel Erfahrung bringst du mit?</h3>
                    <p className="text-muted-foreground text-sm mb-6 text-center">Wähl die passende Stufe.</p>
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {experienceLevels.map((l, i) => (
                        <SelectCard key={l.id} icon={l.icon} label={l.label} sub={l.sub} selected={experience === l.id} onClick={() => setExperience(l.id)} index={i} />
                      ))}
                    </div>
                  </>
                )}
                <div className="mt-auto flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(2)} className="rounded-full px-6 py-6 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                  </Button>
                  <Button onClick={() => setStep(4)} disabled={!canProceedStep3} className="flex-1 bg-foreground/90 text-background hover:bg-foreground font-semibold rounded-full py-6 text-base disabled:opacity-30">
                    Weiter <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4 – Tools */}
            {step === 4 && (
              <motion.div key="s4" {...stepMotion} className="flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase text-muted-foreground text-center mb-3">Schritt 4 von 6</p>
                <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Welche Tools kennst du?</h3>
                <p className="text-muted-foreground text-sm mb-6 text-center">Wähl alle aus, mit denen du schon gearbeitet hast.</p>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {tools.map((t, i) => {
                    const isSelected = selectedTools.includes(t.id);
                    return (
                      <motion.button
                        key={t.id}
                        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.35, delay: i * 0.05, ease: appleEase }}
                        onClick={() => toggleTool(t.id)}
                        whileHover={{ scale: 1.03 }}
                        className="relative flex flex-col items-center justify-center w-20 h-20 rounded-2xl border transition-all duration-300 cursor-pointer"
                        style={{
                          borderColor: isSelected ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--border) / 0.15)",
                          backgroundColor: isSelected ? "hsl(var(--foreground) / 0.06)" : "hsl(var(--foreground) / 0.02)",
                          boxShadow: isSelected ? "0 0 25px hsl(var(--foreground) / 0.06), inset 0 1px 0 hsl(var(--foreground) / 0.08)" : "none",
                        }}
                      >
                        <img src={t.logo} alt={t.label} className="w-8 h-8 mb-1.5" />
                        <span className="text-xs text-muted-foreground">{t.label}</span>
                        <motion.div
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
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
                  <Chip label="Keins davon" selected={selectedTools.includes("none")} onClick={() => setSelectedTools(["none"])} index={tools.length} />
                </div>
                <div className="mt-auto flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(3)} className="rounded-full px-6 py-6 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                  </Button>
                  <Button onClick={() => setStep(5)} disabled={selectedTools.length === 0} className="flex-1 bg-foreground/90 text-background hover:bg-foreground font-semibold rounded-full py-6 text-base disabled:opacity-30">
                    Weiter <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 5 – Contact */}
            {step === 5 && (
              <motion.div key="s5" {...stepMotion} className="flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase text-muted-foreground text-center mb-3">Schritt 5 von 6</p>
                <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Wie erreichen wir dich?</h3>
                <p className="text-muted-foreground text-sm mb-6 text-center">Wir melden uns schnellstmöglich.</p>
                <div className="space-y-4 mb-4">
                  {[
                    { key: "name" as const, label: "Name *", placeholder: "MTM Studios", type: "text" },
                    { key: "email" as const, label: "E-Mail *", placeholder: "hallo@mtmstudios.de", type: "email" },
                    { key: "phone" as const, label: "Telefon (optional)", placeholder: "+49 ...", type: "tel" },
                  ].map((field, i) => (
                    <motion.div key={field.key} initial={{ opacity: 0, y: 15, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.35, delay: i * 0.06, ease: appleEase }}>
                      <label className="text-sm text-muted-foreground mb-1.5 block text-center">{field.label}</label>
                      <input
                        type={field.type} placeholder={field.placeholder} value={formData[field.key] || ""}
                        onChange={(e) => { setFormData((p) => ({ ...p, [field.key]: e.target.value })); if (errors[field.key]) setErrors((p) => ({ ...p, [field.key]: undefined })); }}
                        className={inputClasses}
                        style={{ borderColor: errors[field.key] ? "hsl(0 70% 50% / 0.6)" : "hsl(var(--border) / 0.15)" }}
                      />
                      {errors[field.key] && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs mt-1.5 text-center" style={{ color: "hsl(0 70% 60%)" }}>{errors[field.key]}</motion.p>
                      )}
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, y: 15, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.35, delay: 0.18, ease: appleEase }}>
                    <label className="text-sm text-muted-foreground mb-1.5 block text-center">Nachricht (optional)</label>
                    <textarea placeholder="Erzähl uns kurz, was dich motiviert..." rows={3} value={formData.message || ""} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      className="w-full rounded-xl border bg-foreground/[0.03] backdrop-blur-sm px-4 py-3.5 text-sm text-foreground text-center placeholder:text-muted-foreground/50 outline-none resize-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_15px_hsl(var(--foreground)/0.05)] focus:scale-[1.01]"
                      style={{ borderColor: "hsl(var(--border) / 0.15)" }}
                    />
                  </motion.div>
                </div>

                {/* Woher kennst du uns? */}
                <motion.div
                  initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.35, delay: 0.24, ease: appleEase }}
                  className="pt-4 mb-6"
                  style={{ borderTop: "1px solid hsl(var(--foreground) / 0.06)" }}
                >
                  <label className="text-sm text-muted-foreground mb-3 block text-center">Woher kennst du uns? *</label>
                  <div className="flex flex-wrap justify-center gap-2">
                    {referralSources.map((source, i) => (
                      <motion.button
                        key={source}
                        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.3, delay: 0.28 + i * 0.04, ease: appleEase }}
                        onClick={() => handleReferralSelect(source)}
                        className="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer"
                        style={{
                          borderColor: formData.referralSource === source ? "hsl(var(--foreground) / 0.25)" : "hsl(var(--border) / 0.15)",
                          backgroundColor: formData.referralSource === source ? "hsl(var(--foreground) / 0.08)" : "hsl(var(--foreground) / 0.02)",
                          color: formData.referralSource === source ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.7)",
                        }}
                      >
                        {source}
                      </motion.button>
                    ))}
                  </div>
                  {formData.referralSource === "Sonstiges" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3">
                      <input
                        type="text" placeholder="Woher genau?" value={referralOther}
                        onChange={(e) => { setReferralOther(e.target.value); if (errors.referralSource) setErrors((prev) => ({ ...prev, referralSource: undefined })); }}
                        className={inputClasses}
                        style={{ borderColor: errors.referralSource ? "hsl(0 70% 50% / 0.6)" : "hsl(var(--border) / 0.15)" }}
                      />
                    </motion.div>
                  )}
                  {errors.referralSource && formData.referralSource !== "Sonstiges" && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs mt-2 text-center" style={{ color: "hsl(0 70% 60%)" }}>{errors.referralSource}</motion.p>
                  )}
                </motion.div>

                <div className="mt-auto flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(4)} className="rounded-full px-6 py-6 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-accent text-background hover:bg-accent/90 font-semibold rounded-full py-6 text-base">
                    Absenden <Send className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 6 – Success */}
            {step === 6 && (
              <motion.div key="s6" initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.5, ease: appleEase }} className="flex flex-col flex-1 items-center justify-center text-center py-8">
                <div className="relative mb-8">
                  <motion.div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--foreground) / 0.1) 0%, transparent 70%)" }} animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
                  <motion.div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.7))", boxShadow: "0 0 40px hsl(var(--foreground) / 0.15)" }} initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}>
                    <Check className="w-9 h-9 text-background" strokeWidth={3} />
                  </motion.div>
                </div>
                <motion.h3 className="text-2xl font-bold text-foreground mb-3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: appleEase }}>Geschafft!</motion.h3>
                <motion.p className="text-muted-foreground max-w-xs leading-relaxed mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: appleEase }}>Wir melden uns bei dir. Bis bald!</motion.p>
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

export default CareerFunnel;
