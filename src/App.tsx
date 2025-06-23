import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Login from "./pages/Login";
import TwoStepVerification from "./pages/TwoStepVerification";
import Dashboard from "./pages/Dashboard";
import VirtualApplications from "./pages/VirtualApplications";
import WebApplications from "./pages/WebApplications";
import NetworkApplications from "./pages/NetworkApplications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/two-step-verification"
              element={<TwoStepVerification />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/virtual-applications"
              element={<VirtualApplications />}
            />
            <Route path="/virtual-desktops" element={<Dashboard />} />
            <Route path="/web-applications" element={<WebApplications />} />
            <Route
              path="/network-applications"
              element={<NetworkApplications />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
