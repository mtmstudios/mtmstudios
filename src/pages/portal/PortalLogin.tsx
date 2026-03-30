import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function PortalLogin() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navigate("/portal/dashboard", { replace: true });
  }, [session, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <img
          src="https://www.mtmstudios.de/assets/LOGO-2-WHITE-TARANSPERNT_1766676640443-Ng-FVsmn.png"
          alt="MTM Studios"
          className="h-8 w-auto"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-[#0E0E0E] border border-white/[0.08] rounded-xl p-8">
        <div className="mb-1">
          <span className="text-xs font-semibold tracking-widest text-[#00E5C0] uppercase">
            Kundenportal
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Anmelden</h1>
        <p className="text-sm text-[#9CA3AF] mb-8">
          Melde dich mit deinen Zugangsdaten an.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#9CA3AF]" htmlFor="email">
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
              className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#4B5563] focus:outline-none focus:border-[#00E5C0] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#9CA3AF]" htmlFor="password">
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
              className="w-full bg-black border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#4B5563] focus:outline-none focus:border-[#00E5C0] transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00E5C0] hover:bg-[#00cdb0] text-black font-semibold rounded-lg py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>
      </div>

      <p className="mt-8 text-xs text-[#4B5563]">
        Noch kein Zugang?{" "}
        <a href="mailto:hello@mtmstudios.de" className="text-[#00E5C0] hover:underline">
          Kontaktiere uns
        </a>
      </p>
    </div>
  );
}
