import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactFunnelProvider } from "@/contexts/ContactFunnelContext";
import ContactFunnel from "@/components/ContactFunnel";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ContactFunnelProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ContactFunnel />
        <BrowserRouter>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ContactFunnelProvider>
  </QueryClientProvider>
);

export default App;
