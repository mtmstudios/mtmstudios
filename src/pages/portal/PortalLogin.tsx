import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import mtmLogo from "@/assets/logo-2.png";

const AUTH_ERROR_MAP: Record<string, string> = {
  "Invalid login credentials": "E-Mail oder Passwort ist falsch.",
  "Email not confirmed": "E-Mail-Adresse noch nicht bestätigt. Bitte prüfe dein Postfach.",
  "Too many requests": "Zu viele Anmeldeversuche. Bitte warte kurz und versuche es erneut.",
  "User not found": "Kein Konto mit dieser E-Mail gefunden.",
};

export default function PortalLogin() {
  const { session, loading: authLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && session) {
      const intended = sessionStorage.getItem("portal_redirect");
      if (intended) {
        sessionStorage.removeItem("portal_redirect");
        navigate(intended, { replace: true });
      } else {
        navigate("/portal/dashboard", { replace: true });
      }
    }
  }, [session, authLoading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(AUTH_ERROR_MAP[error.message] ?? "Anmeldung fehlgeschlagen. Bitte erneut versuchen.");
    setLoading(false);
  }

  // Theme tokens
  const bg = isDark ? "bg-[#050508]" : "bg-slate-50";
  const cardBg = isDark ? "bg-[#0E0E16] border-white/[0.07]" : "bg-white border-slate-200/80 shadow-sm";
  const eyebrowColor = isDark ? "text-[#00E5C0]" : "text-teal-600";
  const headingColor = isDark ? "text-white" : "text-slate-900";
  const subColor = isDark ? "text-slate-400" : "text-slate-500";
  const labelColor = isDark ? "text-slate-400" : "text-slate-600";
  const inputClass = isDark
    ? "bg-[#050508] border-white/[0.08] text-white placeholder:text-slate-700 focus:border-[#00E5C0]"
    : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-teal-500";
  const footerText = isDark ? "text-slate-600" : "text-slate-400";
  const footerLink = isDark ? "text-[#00E5C0] hover:underline" : "text-teal-600 hover:underline";
  const logoFilter = isDark ? "" : "brightness-0";
  const toggleBtn = isDark
    ? "text-slate-500 hover:text-white hover:bg-white/[0.06]"
    : "text-slate-400 hover:text-slate-900 hover:bg-slate-100";
  const spinnerColor = isDark ? "border-[#00E5C0]" : "border-teal-500";
  const ctaBtn = isDark
    ? "bg-[#00E5C0] hover:bg-[#00cdb0] text-black"
    : "bg-teal-500 hover:bg-teal-600 text-white";

  if (authLoading) {
    return (
      <div className={`min-h-screen ${bg} flex items-center justify-center`}>
        <div className={`w-8 h-8 border-2 ${spinnerColor} border-t-transparent rounded-full animate-spin`} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${bg} flex flex-col items-center justify-center px-4`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Theme toggle — top right */}
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleTheme}
          aria-label="Farbschema wechseln"
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${toggleBtn}`}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Logo */}
      <div className="mb-10">
        <img
          src={mtmLogo}
          alt="MTM Studios"
          className={`h-8 w-auto ${logoFilter}`}
        />
      </div>

      {/* Card */}
      <div className={`w-full max-w-md rounded-2xl border p-8 ${cardBg}`}>
        <div className="mb-1">
          <span className={`text-xs font-semibold tracking-widest ${eyebrowColor} uppercase`}>
            Kundenportal
          </span>
        </div>
        <h1 className={`text-2xl font-bold ${headingColor} mb-1`}>Anmelden</h1>
        <p className={`text-sm ${subColor} mb-8`}>
          Melde dich mit deinen Zugangsdaten an.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${labelColor}`} htmlFor="email">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              className={`w-full rounded-xl px-4 py-3 text-sm border transition-colors focus:outline-none ${inputClass}`}
            />
          </div>

          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${labelColor}`} htmlFor="password">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full rounded-xl px-4 py-3 text-sm border transition-colors focus:outline-none ${inputClass}`}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${ctaBtn}`}
          >
            {loading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>
      </div>

      <p className={`mt-8 text-xs ${footerText}`}>
        Noch kein Zugang?{" "}
        <a href="mailto:hello@mtmstudios.de" className={footerLink}>
          Kontaktiere uns
        </a>
      </p>
    </div>
  );
}
