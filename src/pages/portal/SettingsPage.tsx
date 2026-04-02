import { useState, useEffect } from "react";
import {
  Settings,
  User,
  Lock,
  Users,
  Code,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Copy,
  ExternalLink,
  Plus,
  Mail,
  Shield,
  ChevronRight,
  Building2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import PortalLayout from "@/components/portal/PortalLayout";

/* ---------- Types ---------- */
interface CustomerProfile {
  id: string;
  name: string | null;
  company: string | null;
  is_admin: boolean;
  created_at: string;
}

type Tab = "profil" | "passwort" | "widget" | "kunden";

/* ---------- Component ---------- */
export default function SettingsPage() {
  const { user, profile } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState<Tab>("profil");

  /* ── Profil tab state ── */
  const [profileName, setProfileName] = useState(profile?.name ?? "");
  const [profileCompany, setProfileCompany] = useState(profile?.company ?? "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  /* ── Passwort tab state ── */
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  /* ── Widget tab state ── */
  const [widgetTargetId, setWidgetTargetId] = useState<string>(profile?.id ?? "");
  const [botName, setBotName] = useState("KI Assistent");
  const [greeting, setGreeting] = useState("Hallo! Wie kann ich Ihnen helfen?");
  const [widgetSaved, setWidgetSaved] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  /* ── Kunden tab state ── */
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteCompany, setInviteCompany] = useState("");
  const [inviteSending, setInviteSending] = useState(false);
  const [inviteMsg, setInviteMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  /* ── Init profile fields ── */
  useEffect(() => {
    setProfileName(profile?.name ?? "");
    setProfileCompany(profile?.company ?? "");
    if (profile?.id) setWidgetTargetId(profile.id);
  }, [profile]);

  /* ── Load widget config from localStorage ── */
  useEffect(() => {
    if (!widgetTargetId) return;
    const stored = localStorage.getItem(`widget_config_${widgetTargetId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBotName(parsed.botName ?? "KI Assistent");
        setGreeting(parsed.greeting ?? "Hallo! Wie kann ich Ihnen helfen?");
      } catch {
        /* ignore */
      }
    } else {
      setBotName("KI Assistent");
      setGreeting("Hallo! Wie kann ich Ihnen helfen?");
    }
  }, [widgetTargetId]);

  /* ── Load customers (admin only) ── */
  useEffect(() => {
    if (activeTab === "kunden" && profile?.is_admin) {
      fetchCustomers();
    }
  }, [activeTab, profile?.is_admin]);

  async function fetchCustomers() {
    setCustomersLoading(true);
    const { data } = await (supabase.from("profiles") as any)
      .select("*")
      .eq("is_admin", false)
      .order("created_at");
    setCustomers((data as CustomerProfile[]) ?? []);
    setCustomersLoading(false);
  }

  /* ── Save profile ── */
  async function saveProfile() {
    if (!user?.id) return;
    setProfileSaving(true);
    setProfileError(null);
    const { error } = await (supabase.from("profiles") as any)
      .update({ name: profileName, company: profileCompany })
      .eq("id", user.id);
    if (error) {
      setProfileError(error.message);
    } else {
      await (supabase.auth as any).refreshSession();
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    }
    setProfileSaving(false);
  }

  /* ── Change password ── */
  async function changePassword() {
    setPwError(null);
    if (newPassword.length < 8) {
      setPwError("Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwörter stimmen nicht überein.");
      return;
    }
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPwError(error.message);
    } else {
      setPwSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPwSuccess(false), 4000);
    }
    setPwSaving(false);
  }

  /* ── Save widget config ── */
  function saveWidgetConfig() {
    localStorage.setItem(
      `widget_config_${widgetTargetId}`,
      JSON.stringify({ botName, greeting })
    );
    setWidgetSaved(true);
    setTimeout(() => setWidgetSaved(false), 3000);
  }

  /* ── Copy embed code ── */
  function copyEmbedCode() {
    const host = window.location.host;
    const code = `<script>\n(function(){\n  var s=document.createElement('script');\n  s.src='https://${host}/chat-loader.js?id=${widgetTargetId}';\n  document.head.appendChild(s);\n})();\n<\/script>`;
    navigator.clipboard.writeText(code).then(() => {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2500);
    });
  }

  /* ── Send invite ── */
  async function sendInvite() {
    if (!inviteEmail) return;
    setInviteSending(true);
    setInviteMsg(null);
    try {
      const { error } = await (supabase.auth as any).admin.inviteUserByEmail(inviteEmail);
      if (error) throw error;
      setInviteMsg({ type: "success", text: `Einladung an ${inviteEmail} gesendet.` });
      setInviteEmail("");
      setInviteName("");
      setInviteCompany("");
    } catch {
      setInviteMsg({
        type: "error",
        text: "Kontaktiere den MTM Administrator für neue Zugänge.",
      });
    }
    setInviteSending(false);
  }

  /* ── Theme tokens ── */
  const cardBg = isDark
    ? "bg-[#0E0E16] border-white/[0.07]"
    : "bg-white border-slate-200/80 shadow-sm";
  const inputCls = isDark
    ? "bg-[#050508] border-white/[0.08] text-white placeholder:text-slate-600"
    : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400";
  const labelCls = isDark ? "text-slate-400" : "text-slate-500";
  const accentText = isDark ? "text-[#00E5C0]" : "text-teal-600";
  const headingColor = isDark ? "text-white" : "text-slate-900";
  const subText = isDark ? "text-slate-400" : "text-slate-500";
  const mutedText = isDark ? "text-slate-600" : "text-slate-400";
  const btnPrimary = isDark
    ? "bg-[#00E5C0] hover:bg-[#00cdb0] text-black"
    : "bg-teal-500 hover:bg-teal-600 text-white";
  const tabActive = isDark
    ? "text-white border-b-2 border-[#00E5C0]"
    : "text-slate-900 border-b-2 border-teal-500";
  const tabInactive = isDark
    ? "text-slate-500 hover:text-slate-300"
    : "text-slate-400 hover:text-slate-700";
  const dividerColor = isDark ? "border-white/[0.06]" : "border-slate-100";
  const codeBg = isDark ? "bg-[#050508] border-white/[0.06]" : "bg-slate-50 border-slate-200";
  const tableHeaderText = isDark ? "text-slate-600" : "text-slate-400";
  const tableHeaderBorder = isDark ? "border-white/[0.06]" : "border-slate-200";
  const tableRowBorder = isDark ? "border-white/[0.04]" : "border-slate-100";
  const tableRowHover = isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50";
  const tableCellMuted = isDark ? "text-slate-400" : "text-slate-500";
  const spinnerColor = isDark ? "border-[#00E5C0]" : "border-teal-500";
  const badgeBg = isDark ? "bg-white/[0.06] text-slate-400" : "bg-slate-100 text-slate-500";

  /* ── Derived ── */
  const host = typeof window !== "undefined" ? window.location.host : "portal.example.com";
  const widgetUrl = `https://${host}/chat/${widgetTargetId}`;
  const embedCode = `<script>\n(function(){\n  var s=document.createElement('script');\n  s.src='https://${host}/chat-loader.js?id=${widgetTargetId}';\n  document.head.appendChild(s);\n})();\n<\/script>`;

  const adminTabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profil",   label: "Profil",    icon: <User size={15} /> },
    { key: "passwort", label: "Passwort",  icon: <Lock size={15} /> },
    { key: "widget",   label: "Widget",    icon: <Code size={15} /> },
    { key: "kunden",   label: "Kunden",    icon: <Users size={15} /> },
  ];
  const customerTabs = adminTabs.filter((t) => t.key !== "kunden");
  const tabs = profile?.is_admin ? adminTabs : customerTabs;

  return (
    <PortalLayout>
      {/* Page header */}
      <div className="mb-8">
        <p className={`text-xs font-semibold tracking-widest ${accentText} uppercase mb-1`}>
          Einstellungen
        </p>
        <h1 className={`text-2xl font-bold ${headingColor}`}>Einstellungen</h1>
        <p className={`text-sm ${subText} mt-1`}>
          Konto, Sicherheit und Widget-Konfiguration
        </p>
      </div>

      {/* Tab bar */}
      <div className={`flex gap-1 border-b ${dividerColor} mb-6 overflow-x-auto`}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === t.key ? tabActive : tabInactive
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: PROFIL ── */}
      {activeTab === "profil" && (
        <div className={`rounded-2xl border p-6 ${cardBg} max-w-lg`}>
          <div className="flex items-center gap-2 mb-5">
            <User size={17} className={accentText} />
            <h2 className={`text-base font-semibold ${headingColor}`}>Profil-Informationen</h2>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Ihr Name"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors ${inputCls}`}
              />
            </div>

            {/* Company */}
            <div>
              <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>
                Unternehmen
              </label>
              <input
                type="text"
                value={profileCompany}
                onChange={(e) => setProfileCompany(e.target.value)}
                placeholder="Ihr Unternehmen"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors ${inputCls}`}
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>
                E-Mail (nicht änderbar)
              </label>
              <input
                type="email"
                value={user?.email ?? ""}
                readOnly
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm cursor-not-allowed opacity-60 ${inputCls}`}
              />
            </div>

            {/* Member since */}
            {profile?.created_at && (
              <p className={`text-xs ${mutedText}`}>
                Mitglied seit{" "}
                {new Date(profile.created_at).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            )}

            {/* Feedback */}
            {profileSuccess && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <Check size={15} />
                Gespeichert ✓
              </div>
            )}
            {profileError && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={15} />
                {profileError}
              </div>
            )}

            <button
              onClick={saveProfile}
              disabled={profileSaving}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer ${btnPrimary}`}
            >
              {profileSaving ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check size={15} />
              )}
              Speichern
            </button>
          </div>
        </div>
      )}

      {/* ── TAB: PASSWORT ── */}
      {activeTab === "passwort" && (
        <div className={`rounded-2xl border p-6 ${cardBg} max-w-lg`}>
          <div className="flex items-center gap-2 mb-5">
            <Lock size={17} className={accentText} />
            <h2 className={`text-base font-semibold ${headingColor}`}>Passwort ändern</h2>
          </div>

          <div className="space-y-4">
            {/* New password */}
            <div>
              <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>
                Neues Passwort
              </label>
              <div className="relative">
                <input
                  type={showNewPw ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mindestens 8 Zeichen"
                  className={`w-full rounded-xl border px-3.5 py-2.5 pr-10 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors ${inputCls}`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw((v) => !v)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedText} hover:text-slate-300 transition-colors cursor-pointer`}
                >
                  {showNewPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>
                Passwort bestätigen
              </label>
              <div className="relative">
                <input
                  type={showConfirmPw ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Passwort wiederholen"
                  className={`w-full rounded-xl border px-3.5 py-2.5 pr-10 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors ${inputCls}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw((v) => !v)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedText} hover:text-slate-300 transition-colors cursor-pointer`}
                >
                  {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Strength hint */}
            {newPassword.length > 0 && (
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      newPassword.length >= level * 3
                        ? level <= 2
                          ? "bg-yellow-400"
                          : "bg-emerald-400"
                        : isDark
                        ? "bg-white/[0.08]"
                        : "bg-slate-200"
                    }`}
                  />
                ))}
                <span className={`text-xs ${mutedText} ml-1`}>
                  {newPassword.length < 8 ? "Zu kurz" : newPassword.length < 12 ? "Mittel" : "Stark"}
                </span>
              </div>
            )}

            {/* Feedback */}
            {pwSuccess && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <Check size={15} />
                Passwort erfolgreich geändert.
              </div>
            )}
            {pwError && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={15} />
                {pwError}
              </div>
            )}

            <button
              onClick={changePassword}
              disabled={pwSaving || !newPassword || !confirmPassword}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer ${btnPrimary}`}
            >
              {pwSaving ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Shield size={15} />
              )}
              Passwort ändern
            </button>
          </div>
        </div>
      )}

      {/* ── TAB: WIDGET ── */}
      {activeTab === "widget" && (
        <div className="space-y-6 max-w-2xl">
          {/* Intro */}
          <div className={`rounded-2xl border p-6 ${cardBg}`}>
            <div className="flex items-center gap-2 mb-1">
              <Code size={17} className={accentText} />
              <h2 className={`text-base font-semibold ${headingColor}`}>Chat Widget</h2>
            </div>
            <p className={`text-sm ${subText} mb-5`}>
              Binden Sie den MTM Voice KI Chat auf Ihrer Website ein.
            </p>

            {/* Admin customer selector */}
            {profile?.is_admin && (
              <div className="mb-5">
                <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>
                  Widget-Konfiguration für Kunden
                </label>
                <select
                  value={widgetTargetId}
                  onChange={(e) => setWidgetTargetId(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors cursor-pointer ${inputCls}`}
                >
                  <option value={profile.id}>Eigenes Profil ({profile.name ?? profile.company ?? profile.id})</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name ?? c.company ?? c.id}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Widget URL */}
            <div className="mb-4">
              <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>
                Widget-URL
              </label>
              <div className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 ${codeBg}`}>
                <span className={`text-sm font-mono flex-1 truncate ${isDark ? "text-[#00E5C0]" : "text-teal-600"}`}>
                  {widgetUrl}
                </span>
                <a
                  href={widgetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-shrink-0 ${mutedText} hover:text-slate-300 transition-colors`}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Embed code */}
            <div className="mb-4">
              <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>
                Einbettungs-Code
              </label>
              <div className={`relative rounded-xl border p-4 ${codeBg}`}>
                <pre className={`text-xs font-mono whitespace-pre-wrap break-all ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {embedCode}
                </pre>
                <button
                  onClick={copyEmbedCode}
                  className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    codeCopied
                      ? "bg-emerald-500/20 text-emerald-400"
                      : isDark
                      ? "bg-white/[0.06] text-slate-400 hover:text-white"
                      : "bg-slate-100 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {codeCopied ? <Check size={12} /> : <Copy size={12} />}
                  {codeCopied ? "Kopiert!" : "Code kopieren"}
                </button>
              </div>
            </div>

            {/* Preview button */}
            <a
              href={`/chat/${widgetTargetId}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                isDark
                  ? "bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <ExternalLink size={14} />
              Vorschau öffnen
            </a>
          </div>

          {/* Widget config */}
          <div className={`rounded-2xl border p-6 ${cardBg}`}>
            <h3 className={`text-sm font-semibold ${headingColor} mb-4`}>Widget-Konfiguration</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>Bot-Name</label>
                <input
                  type="text"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  placeholder="KI Assistent"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors ${inputCls}`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>
                  Begrüßungsnachricht
                </label>
                <textarea
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  rows={3}
                  placeholder="Hallo! Wie kann ich Ihnen helfen?"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors resize-none ${inputCls}`}
                />
              </div>

              {widgetSaved && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <Check size={14} />
                  Konfiguration gespeichert.
                </div>
              )}

              <button
                onClick={saveWidgetConfig}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${btnPrimary}`}
              >
                <Check size={15} />
                Konfiguration speichern
              </button>

              <p className={`text-xs ${mutedText}`}>
                Einstellungen werden lokal gespeichert und beim Widget-Aufruf geladen.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: KUNDEN (admin only) ── */}
      {activeTab === "kunden" && profile?.is_admin && (
        <div className="space-y-6">
          {/* Customer list */}
          <div className={`rounded-2xl border p-4 lg:p-5 ${cardBg}`}>
            <div className="flex items-center gap-2 mb-4">
              <Users size={17} className={accentText} />
              <h2 className={`text-base font-semibold ${headingColor}`}>Kundenliste</h2>
              {!customersLoading && (
                <span className={`ml-auto text-xs ${badgeBg} px-2 py-0.5 rounded-full`}>
                  {customers.length} Kunden
                </span>
              )}
            </div>

            {customersLoading ? (
              <div className="h-24 flex items-center justify-center">
                <div className={`w-6 h-6 border-2 ${spinnerColor} border-t-transparent rounded-full animate-spin`} />
              </div>
            ) : customers.length === 0 ? (
              <p className={`text-sm ${mutedText} py-4`}>Noch keine Kunden vorhanden.</p>
            ) : (
              <div className="overflow-x-auto -mx-4 lg:mx-0">
                <table className="w-full text-sm min-w-[540px]">
                  <thead>
                    <tr className={`text-left text-xs ${tableHeaderText} border-b ${tableHeaderBorder}`}>
                      <th className="pb-3 pr-4 pl-4 lg:pl-0 font-medium">Name</th>
                      <th className="pb-3 pr-4 font-medium">Unternehmen</th>
                      <th className="pb-3 pr-4 font-medium">E-Mail</th>
                      <th className="pb-3 pr-4 font-medium">Erstellt</th>
                      <th className="pb-3 pr-4 lg:pr-0 font-medium">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr
                        key={c.id}
                        className={`border-b ${tableRowBorder} ${tableRowHover} transition-colors`}
                      >
                        <td className={`py-3 pr-4 pl-4 lg:pl-0 font-medium ${isDark ? "text-white" : "text-slate-900"}`}>
                          {c.name ?? <span className={mutedText}>—</span>}
                        </td>
                        <td className={`py-3 pr-4 ${tableCellMuted}`}>
                          {c.company ? (
                            <span className="flex items-center gap-1.5">
                              <Building2 size={13} />
                              {c.company}
                            </span>
                          ) : (
                            <span className={mutedText}>—</span>
                          )}
                        </td>
                        <td className={`py-3 pr-4 ${tableCellMuted} font-mono text-xs`}>
                          <span className="flex items-center gap-1">
                            <Mail size={12} />
                            {c.id}
                          </span>
                        </td>
                        <td className={`py-3 pr-4 ${tableCellMuted}`}>
                          {new Date(c.created_at).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })}
                        </td>
                        <td className="py-3 pr-4 lg:pr-0">
                          <button
                            onClick={() => {
                              setWidgetTargetId(c.id);
                              setActiveTab("widget");
                            }}
                            className={`flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer ${accentText} hover:opacity-80`}
                          >
                            Details
                            <ChevronRight size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Invite section */}
          <div className={`rounded-2xl border p-6 ${cardBg} max-w-lg`}>
            <div className="flex items-center gap-2 mb-5">
              <Plus size={17} className={accentText} />
              <h3 className={`text-base font-semibold ${headingColor}`}>Neuen Kunden einladen</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>E-Mail *</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="kunde@beispiel.de"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors ${inputCls}`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>Name</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Max Mustermann"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors ${inputCls}`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium ${labelCls} mb-1.5`}>Unternehmen</label>
                <input
                  type="text"
                  value={inviteCompany}
                  onChange={(e) => setInviteCompany(e.target.value)}
                  placeholder="Muster GmbH"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#00E5C0]/60 transition-colors ${inputCls}`}
                />
              </div>

              {inviteMsg && (
                <div
                  className={`flex items-center gap-2 text-sm ${
                    inviteMsg.type === "success" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {inviteMsg.type === "success" ? (
                    <Check size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  {inviteMsg.text}
                </div>
              )}

              <button
                onClick={sendInvite}
                disabled={inviteSending || !inviteEmail}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer ${btnPrimary}`}
              >
                {inviteSending ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Mail size={15} />
                )}
                Einladungs-E-Mail senden
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
