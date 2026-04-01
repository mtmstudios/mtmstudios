import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: Props) {
  const { session, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00E5C0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    // Remember where the user was trying to go
    sessionStorage.setItem("portal_redirect", location.pathname);
    return <Navigate to="/portal/login" replace />;
  }
  if (adminOnly && !profile?.is_admin) return <Navigate to="/portal/dashboard" replace />;

  return <>{children}</>;
}
