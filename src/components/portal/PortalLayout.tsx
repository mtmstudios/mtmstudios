import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Phone,
  AlertCircle,
  Users,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Sun,
  Moon,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import mtmLogoDark from "@/assets/logo-2.png";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/portal/dashboard", icon: <LayoutDashboard size={17} /> },
  { label: "Nachrichten", to: "/portal/inbox", icon: <MessageSquare size={17} /> },
  { label: "Anrufe", to: "/portal/dashboard#calls", icon: <Phone size={17} /> },
  { label: "Fehler-Log", to: "/portal/dashboard#errors", icon: <AlertCircle size={17} /> },
  { label: "Alle Kunden", to: "/portal/admin", icon: <Users size={17} />, adminOnly: true },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    meta.id = "portal-noindex";
    document.head.appendChild(meta);
    return () => { document.getElementById("portal-noindex")?.remove(); };
  }, []);

  const visibleNav = NAV_ITEMS.filter((item) => !item.adminOnly || profile?.is_admin);

  async function handleSignOut() {
    await signOut();
    navigate("/portal/login");
  }

  const initials = (profile?.name?.trim() || profile?.company?.trim() || "?")[0].toUpperCase();

  // Color tokens
  const sidebar = isDark
    ? "bg-[#0A0A0F] border-white/[0.06]"
    : "bg-white border-slate-200/80";
  const mainBg = isDark ? "bg-[#050508]" : "bg-slate-50";
  const navActive = isDark
    ? "bg-[#00E5C0]/10 text-[#00E5C0]"
    : "bg-teal-500/10 text-teal-600";
  const navDefault = isDark
    ? "text-slate-400 hover:text-white hover:bg-white/[0.05]"
    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100";
  const logoFilter = isDark ? "" : "brightness-0";
  const userBg = isDark ? "bg-[#00E5C0]/10" : "bg-teal-500/10";
  const userText = isDark ? "text-[#00E5C0]" : "text-teal-600";
  const nameText = isDark ? "text-white" : "text-slate-900";
  const mutedText = isDark ? "text-slate-400" : "text-slate-500";
  const border = isDark ? "border-white/[0.06]" : "border-slate-200/80";
  const topbar = isDark ? "bg-[#0A0A0F]" : "bg-white";
  const signOutBtn = isDark
    ? "text-slate-400 hover:text-white hover:bg-white/[0.05]"
    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100";
  const sectionLabel = isDark ? "text-slate-600" : "text-slate-400";
  const toggleBtn = isDark
    ? "text-slate-400 hover:text-white hover:bg-white/[0.06]"
    : "text-slate-400 hover:text-slate-900 hover:bg-slate-100";

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Logo */}
      <div className={`px-5 py-[18px] border-b ${border} flex items-center justify-between`}>
        <img src={mtmLogoDark} alt="MTM Studios" className={`h-7 w-auto ${logoFilter}`} />
        <button
          onClick={toggleTheme}
          aria-label="Farbschema wechseln"
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${toggleBtn}`}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {profile?.is_admin && (
          <p className={`px-3 mb-2 text-[10px] font-semibold tracking-widest uppercase ${sectionLabel}`}>
            Administration
          </p>
        )}
        {visibleNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 cursor-pointer ${
                isActive ? navActive : navDefault
              }`
            }
          >
            {item.icon}
            {item.label}
            {item.adminOnly && (
              <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${userBg} ${userText}`}>
                Admin
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + sign out */}
      <div className={`px-3 py-4 border-t ${border} space-y-0.5`}>
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl`}>
          <div className={`w-8 h-8 rounded-full ${userBg} flex items-center justify-center ${userText} text-sm font-bold flex-shrink-0`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-[13.5px] font-semibold ${nameText} truncate`}>{profile?.name ?? "Unbekannt"}</p>
            <p className={`text-xs ${mutedText} truncate`}>{profile?.company ?? ""}</p>
          </div>
          {profile?.is_admin && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0 ${userBg} ${userText}`}>
              Admin
            </span>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 cursor-pointer ${signOutBtn}`}
        >
          <LogOut size={16} />
          Abmelden
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex ${mainBg}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col w-[232px] ${sidebar} border-r flex-shrink-0`}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[232px] ${sidebar} border-r flex flex-col transform transition-transform duration-200 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className={`absolute top-4 right-4 ${mutedText} hover:text-current cursor-pointer`}
        >
          <X size={18} />
        </button>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className={`lg:hidden flex items-center gap-4 px-4 py-3.5 border-b ${border} ${topbar}`}>
          <button onClick={() => setMobileOpen(true)} className={`${mutedText} cursor-pointer`}>
            <Menu size={21} />
          </button>
          <img src={mtmLogoDark} alt="MTM Studios" className={`h-6 w-auto ${logoFilter}`} />
          <div className="ml-auto">
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${toggleBtn}`}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// ─── Shared UI primitives ────────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  sub,
  icon,
  accent = false,
  trend,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent?: boolean;
  trend?: { value: string; positive: boolean };
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const card = isDark
    ? "bg-[#0E0E16] border-white/[0.07] hover:border-white/[0.12]"
    : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm";
  const labelColor = isDark ? "text-slate-400" : "text-slate-500";
  const iconColor = accent
    ? isDark ? "text-[#00E5C0]" : "text-teal-500"
    : isDark ? "text-slate-600" : "text-slate-400";
  const valueColor = accent
    ? isDark ? "text-[#00E5C0]" : "text-teal-600"
    : isDark ? "text-white" : "text-slate-900";
  const subColor = isDark ? "text-slate-600" : "text-slate-400";

  return (
    <div className={`rounded-2xl border p-5 transition-all duration-200 ${card}`}>
      <div className="flex items-start justify-between mb-4">
        <span className={`text-[13px] font-medium ${labelColor}`}>{label}</span>
        <span className={`${iconColor}`}>{icon}</span>
      </div>
      <p className={`text-[28px] font-bold tracking-tight leading-none ${valueColor}`}>{value}</p>
      <div className="flex items-center gap-2 mt-2 min-h-[18px]">
        {sub && <p className={`text-xs ${subColor}`}>{sub}</p>}
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${
            trend.positive
              ? isDark ? "text-emerald-400" : "text-emerald-600"
              : isDark ? "text-red-400" : "text-red-500"
          }`}>
            <TrendingUp size={11} className={trend.positive ? "" : "rotate-180"} />
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

export function SectionHeading({ title, badge }: { title: string; badge?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-3 mb-5">
      <h2 className={`text-[15px] font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {badge && (
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          isDark ? "bg-[#00E5C0]/10 text-[#00E5C0]" : "bg-teal-500/10 text-teal-600"
        }`}>
          {badge}
        </span>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: "open" | "resolved" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
      status === "open"
        ? "bg-red-500/10 text-red-400"
        : "bg-emerald-500/10 text-emerald-400"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "open" ? "bg-red-400" : "bg-emerald-400"}`} />
      {status === "open" ? "Offen" : "Behoben"}
    </span>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className={`rounded-2xl border ${
      isDark ? "bg-[#0E0E16] border-white/[0.07]" : "bg-white border-slate-200/80 shadow-sm"
    } ${className}`}>
      {children}
    </div>
  );
}
