import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Phone,
  AlertCircle,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/portal/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Anrufe", to: "/portal/calls", icon: <Phone size={18} /> },
  { label: "Fehler-Log", to: "/portal/errors", icon: <AlertCircle size={18} /> },
  { label: "Alle Kunden", to: "/portal/admin", icon: <Users size={18} />, adminOnly: true },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleNav = NAV_ITEMS.filter((item) => !item.adminOnly || profile?.is_admin);

  async function handleSignOut() {
    await signOut();
    navigate("/portal/login");
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <img
          src="https://www.mtmstudios.de/assets/LOGO-2-WHITE-TARANSPERNT_1766676640443-Ng-FVsmn.png"
          alt="MTM Studios"
          className="h-7 w-auto"
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {profile?.is_admin && (
          <div className="px-3 mb-3">
            <span className="text-[10px] font-semibold tracking-widest text-[#4B5563] uppercase">
              Administration
            </span>
          </div>
        )}
        {visibleNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#00E5C0]/10 text-[#00E5C0]"
                  : "text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]"
              }`
            }
          >
            {item.icon}
            {item.label}
            {item.adminOnly && (
              <span className="ml-auto text-[10px] bg-[#00E5C0]/10 text-[#00E5C0] px-1.5 py-0.5 rounded-full font-semibold">
                Admin
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1">
          <div className="w-8 h-8 rounded-full bg-[#00E5C0]/10 flex items-center justify-center text-[#00E5C0] text-sm font-bold">
            {(profile?.name ?? profile?.company ?? "?")[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {profile?.name ?? "Unbekannt"}
            </p>
            <p className="text-xs text-[#4B5563] truncate">{profile?.company ?? ""}</p>
          </div>
          {profile?.is_admin && (
            <span className="text-[10px] bg-[#00E5C0]/10 text-[#00E5C0] px-1.5 py-0.5 rounded-full font-semibold">
              Admin
            </span>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-[#9CA3AF] hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <LogOut size={16} />
          Abmelden
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#0E0E0E] border-r border-white/[0.06] flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#0E0E0E] border-r border-white/[0.06] flex flex-col transform transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white"
        >
          <X size={20} />
        </button>
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-4 border-b border-white/[0.06] bg-[#0E0E0E]">
          <button onClick={() => setMobileOpen(true)} className="text-[#9CA3AF] hover:text-white">
            <Menu size={22} />
          </button>
          <img
            src="https://www.mtmstudios.de/assets/LOGO-2-WHITE-TARANSPERNT_1766676640443-Ng-FVsmn.png"
            alt="MTM Studios"
            className="h-6 w-auto"
          />
        </header>

        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// Reusable stat card component used across dashboards
export function StatCard({
  label,
  value,
  sub,
  icon,
  accent = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="bg-[#0E0E0E] border border-white/[0.08] rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-[#9CA3AF]">{label}</span>
        <span className={`${accent ? "text-[#00E5C0]" : "text-[#4B5563]"}`}>{icon}</span>
      </div>
      <p className={`text-3xl font-bold ${accent ? "text-[#00E5C0]" : "text-white"}`}>{value}</p>
      {sub && <p className="text-xs text-[#4B5563] mt-1">{sub}</p>}
    </div>
  );
}

// Section heading used across dashboards
export function SectionHeading({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {badge && (
        <span className="text-xs bg-[#00E5C0]/10 text-[#00E5C0] px-2 py-0.5 rounded-full font-semibold">
          {badge}
        </span>
      )}
    </div>
  );
}

// Error badge
export function StatusBadge({ status }: { status: "open" | "resolved" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
        status === "open"
          ? "bg-red-500/10 text-red-400"
          : "bg-green-500/10 text-green-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${status === "open" ? "bg-red-400" : "bg-green-400"}`}
      />
      {status === "open" ? "Offen" : "Behoben"}
    </span>
  );
}
