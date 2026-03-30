import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ContactFunnelProvider } from "@/contexts/ContactFunnelContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import ContactFunnel from "@/components/ContactFunnel";
import CookieBanner from "@/components/CookieBanner";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import PhoneAssistant from "./pages/PhoneAssistant";
import Chatbots from "./pages/Chatbots";
import Automations from "./pages/Automations";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import Partner from "./pages/Partner";
import Karriere from "./pages/Karriere";
import Barrierefreiheit from "./pages/Barrierefreiheit";
import KiStatistiken from "./pages/KiStatistiken";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import RegionalPage from "./components/regional/RegionalPage";
import KeywordPage from "./components/keyword/KeywordPage";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/portal/ProtectedRoute";
import PortalLogin from "./pages/portal/PortalLogin";
import CustomerDashboard from "./pages/portal/CustomerDashboard";
import AdminDashboard from "./pages/portal/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <CookieConsentProvider>
        <ContactFunnelProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AuthProvider>
              <BrowserRouter>
                <ScrollToTop />
                <ContactFunnel />
                <CookieBanner />
                <AccessibilityWidget />
                <a
                  href="#main"
                  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-accent-foreground focus:text-sm focus:font-medium focus:shadow-lg"
                >
                  Zum Inhalt springen
                </a>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dassindwir" element={<AboutUs />} />
                  <Route path="/ki-telefonassistent" element={<PhoneAssistant />} />
                  <Route path="/ki-chatbot" element={<Chatbots />} />
                  <Route path="/automatisierungen" element={<Automations />} />
                  <Route path="/impressum" element={<Impressum />} />
                  <Route path="/datenschutz" element={<Datenschutz />} />
                  <Route path="/agb" element={<AGB />} />
                  <Route path="/partnerwerden" element={<Partner />} />
                  <Route path="/karriere" element={<Karriere />} />
                  <Route path="/barrierefreiheit" element={<Barrierefreiheit />} />
                  <Route path="/ki-im-mittelstand-zahlen" element={<KiStatistiken />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/ki-agentur/:city" element={<RegionalPage context="ki-agentur" />} />
                  <Route path="/ki-telefonassistent/:city" element={<RegionalPage context="ki-telefonassistent" />} />
                  <Route path="/ki-chatbot/:city" element={<RegionalPage context="ki-chatbot" />} />
                  <Route path="/automatisierungen/:city" element={<RegionalPage context="automatisierungen" />} />
                  {/* Tier-1 Keyword-Landingpages */}
                  <Route path="/voicebot" element={<KeywordPage slug="voicebot" />} />
                  <Route path="/ki-telefonbot" element={<KeywordPage slug="ki-telefonbot" />} />
                  <Route path="/whatsapp-chatbot" element={<KeywordPage slug="whatsapp-chatbot" />} />
                  <Route path="/chatbot-agentur" element={<KeywordPage slug="chatbot-agentur" />} />
                  <Route path="/n8n-agentur" element={<KeywordPage slug="n8n-agentur" />} />
                  <Route path="/prozessautomatisierung-kmu" element={<KeywordPage slug="prozessautomatisierung-kmu" />} />
                  {/* Portal routes */}
                  <Route path="/portal" element={<Navigate to="/portal/login" replace />} />
                  <Route path="/portal/login" element={<PortalLogin />} />
                  <Route path="/portal/dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
                  <Route path="/portal/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </ContactFunnelProvider>
      </CookieConsentProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
