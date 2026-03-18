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

const chatgptLogo = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>')}`;

const claudeLogo = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M4.709 15.955l4.066-2.328L4.907 9.99l3.07-.093-1.18-4.157 3.496 2.07L12.002 4l1.705 3.81 3.5-2.07-1.182 4.156 3.07.094-3.868 3.636 4.066 2.328-3.86.69 1.483 3.656-3.703-1.563-.045.005L12 18.96l-1.168 1.762-.045-.005-3.703 1.563 1.483-3.657z"/></svg>')}`;

const tools = [
  { id: "n8n", label: "N8N", logo: "https://cdn.simpleicons.org/n8n/white" },
  { id: "zapier", label: "Zapier", logo: "https://cdn.simpleicons.org/zapier/white" },
  { id: "claude", label: "Claude", logo: claudeLogo },
  { id: "chatgpt", label: "ChatGPT", logo: chatgptLogo },
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
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.04, ease: appleEase }}
    onClick={onClick}
    className="relative group text-center p-4 rounded-2xl border transition-colors duration-200 cursor-pointer active:bg-foreground/[0.08]"
    style={{
      borderColor: selected ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--border) / 0.15)",
      backgroundColor: selected ? "hsl(var(--foreground) / 0.06)" : "hsl(var(--foreground) / 0.02)",
    }}
  >
    <Icon
      className="w-5 h-5 mb-2 mx-auto transition-colors duration-200"
      style={{ color: selected ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
    />
    <span className="text-sm font-medium text-foreground block">{label}</span>
    {sub && <span className="text-xs text-muted-foreground block mt-0.5">{sub}</span>}
    {selected && (
      <div
        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "hsl(var(--accent))" }}
      >
        <Check className="w-3 h-3 text-background" />
      </div>
    )}
  </motion.button>
);

/* ── Chip (for hours, start) ───────────────── */
const Chip = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}) => (
  <button
    onClick={onClick}
    className="px-5 py-2.5 rounded-full border text-sm font-medium transition-colors duration-200 cursor-pointer active:bg-foreground/[0.12]"
    style={{
      borderColor: selected ? "hsl(var(--foreground) / 0.25)" : "hsl(var(--border) / 0.15)",
      backgroundColor: selected ? "hsl(var(--foreground) / 0.08)" : "hsl(var(--foreground) / 0.02)",
      color: selected ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.7)",
    }}
  >
    {label}
  </button>
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
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.3, ease: appleEase },
  };

  const inputClasses = "w-full rounded-xl border bg-foreground/[0.03] px-4 py-3.5 text-sm text-foreground text-center placeholder:text-muted-foreground/50 outline-none transition-colors duration-200 focus:border-foreground/30";

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
                transition={{ duration: 0.4, ease: appleEase }}
              />
            </div>
          ))}
        </div>

        <div className="px-8 pb-8 pt-4 min-h-[440px] max-h-[80vh] overflow-y-auto flex flex-col">
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
                <div className="grid grid-cols-1 gap-3 mb-8">
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
                      <div>
                        <label className="text-sm text-muted-foreground mb-1.5 block text-center">Studiengang / Ausbildung</label>
                        <input
                          type="text" placeholder="z.B. Wirtschaftsinformatik" value={studiengang}
                          onChange={(e) => setStudiengang(e.target.value)}
                          className={inputClasses}
                          style={{ borderColor: "hsl(var(--border) / 0.15)" }}
                        />
                      </div>
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
                      <button
                        key={t.id}
                        onClick={() => toggleTool(t.id)}
                        className="relative flex flex-col items-center justify-center w-20 h-20 rounded-2xl border transition-colors duration-200 cursor-pointer active:bg-foreground/[0.1]"
                        style={{
                          borderColor: isSelected ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--border) / 0.15)",
                          backgroundColor: isSelected ? "hsl(var(--foreground) / 0.06)" : "hsl(var(--foreground) / 0.02)",
                        }}
                      >
                        <img src={t.logo} alt={t.label} className="w-8 h-8 mb-1.5" />
                        <span className="text-xs text-muted-foreground">{t.label}</span>
                        {isSelected && (
                          <div
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "hsl(var(--accent))" }}
                          >
                            <Check className="w-3 h-3 text-background" />
                          </div>
                        )}
                      </button>
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
                    <motion.div key={field.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.05, ease: appleEase }}>
                      <label className="text-sm text-muted-foreground mb-1.5 block text-center">{field.label}</label>
                      <input
                        type={field.type} placeholder={field.placeholder} value={formData[field.key] || ""}
                        onChange={(e) => { setFormData((p) => ({ ...p, [field.key]: e.target.value })); if (errors[field.key]) setErrors((p) => ({ ...p, [field.key]: undefined })); }}
                        className={inputClasses}
                        style={{ borderColor: errors[field.key] ? "hsl(0 70% 50% / 0.6)" : "hsl(var(--border) / 0.15)" }}
                      />
                      {errors[field.key] && (
                        <p className="text-xs mt-1.5 text-center" style={{ color: "hsl(0 70% 60%)" }}>{errors[field.key]}</p>
                      )}
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.15, ease: appleEase }}>
                    <label className="text-sm text-muted-foreground mb-1.5 block text-center">Nachricht (optional)</label>
                    <textarea placeholder="Erzähl uns kurz, was dich motiviert..." rows={3} value={formData.message || ""} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      className="w-full rounded-xl border bg-foreground/[0.03] px-4 py-3.5 text-sm text-foreground text-center placeholder:text-muted-foreground/50 outline-none resize-none transition-colors duration-200 focus:border-foreground/30"
                      style={{ borderColor: "hsl(var(--border) / 0.15)" }}
                    />
                  </motion.div>
                </div>

                {/* Woher kennst du uns? */}
                <div
                  className="pt-4 mb-6"
                  style={{ borderTop: "1px solid hsl(var(--foreground) / 0.06)" }}
                >
                  <label className="text-sm text-muted-foreground mb-3 block text-center">Woher kennst du uns? *</label>
                  <div className="flex flex-wrap justify-center gap-2">
                    {referralSources.map((source) => (
                      <button
                        key={source}
                        onClick={() => handleReferralSelect(source)}
                        className="px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200 cursor-pointer active:bg-foreground/[0.12]"
                        style={{
                          borderColor: formData.referralSource === source ? "hsl(var(--foreground) / 0.25)" : "hsl(var(--border) / 0.15)",
                          backgroundColor: formData.referralSource === source ? "hsl(var(--foreground) / 0.08)" : "hsl(var(--foreground) / 0.02)",
                          color: formData.referralSource === source ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.7)",
                        }}
                      >
                        {source}
                      </button>
                    ))}
                  </div>
                  {formData.referralSource === "Sonstiges" && (
                    <div className="mt-3">
                      <input
                        type="text" placeholder="Woher genau?" value={referralOther}
                        onChange={(e) => { setReferralOther(e.target.value); if (errors.referralSource) setErrors((prev) => ({ ...prev, referralSource: undefined })); }}
                        className={inputClasses}
                        style={{ borderColor: errors.referralSource ? "hsl(0 70% 50% / 0.6)" : "hsl(var(--border) / 0.15)" }}
                      />
                    </div>
                  )}
                  {errors.referralSource && formData.referralSource !== "Sonstiges" && (
                    <p className="text-xs mt-2 text-center" style={{ color: "hsl(0 70% 60%)" }}>{errors.referralSource}</p>
                  )}
                </div>

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
              <motion.div key="s6" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: appleEase }} className="flex flex-col flex-1 items-center justify-center text-center py-8">
                <div className="relative mb-8">
                  <div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.7))", boxShadow: "0 0 40px hsl(var(--foreground) / 0.15)" }}>
                    <Check className="w-9 h-9 text-background" strokeWidth={3} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Geschafft!</h3>
                <p className="text-muted-foreground max-w-xs leading-relaxed mb-10">Wir melden uns bei dir. Bis bald!</p>
                <Button onClick={() => handleOpenChange(false)} variant="ghost" className="rounded-full px-8 py-6 text-muted-foreground hover:text-foreground border border-border/20">Schließen</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerFunnel;
