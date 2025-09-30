import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Home from "./pages/Home";
import Index from "./pages/Index";
import YieldPrediction from "./pages/YieldPrediction";
import SoilWeather from "./pages/SoilWeather";
import CropRecommendations from "./pages/CropRecommendations";
import Optimization from "./pages/Optimization";
import DashboardPage from "./pages/DashboardPage";
import Resources from "./pages/Resources";
import MarketInsights from "./pages/MarketInsights";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 border-b border-sidebar-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4">
            <SidebarTrigger />
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/yield-prediction" element={<AppLayout><YieldPrediction /></AppLayout>} />
          <Route path="/soil-weather" element={<AppLayout><SoilWeather /></AppLayout>} />
          <Route path="/crop-recommendations" element={<AppLayout><CropRecommendations /></AppLayout>} />
          <Route path="/optimization" element={<AppLayout><Optimization /></AppLayout>} />
          <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
          <Route path="/resources" element={<AppLayout><Resources /></AppLayout>} />
          <Route path="/market-insights" element={<AppLayout><MarketInsights /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
