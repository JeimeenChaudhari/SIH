import { 
  Home, 
  TrendingUp, 
  Cloud, 
  Sprout, 
  Settings, 
  LayoutDashboard, 
  BookOpen, 
  TrendingDown,
  Gauge
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import sihLogo from "@/assets/sih-logo.png";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Yield Prediction", url: "/yield-prediction", icon: TrendingUp },
  { title: "Soil & Weather", url: "/soil-weather", icon: Cloud },
  { title: "Crop Recommendations", url: "/crop-recommendations", icon: Sprout },
  { title: "Optimization", url: "/optimization", icon: Gauge },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Resources", url: "/resources", icon: BookOpen },
  { title: "Market Insights", url: "/market-insights", icon: TrendingDown },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <img 
            src="/harvestra-logo.png" 
            alt="Harvestra Logo" 
            className={`transition-all ${open ? "h-10 w-10" : "h-8 w-8"}`}
          />
          {open && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                Harvestra
              </span>
              <span className="text-xs text-muted-foreground">
                Smart Farming Platform
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} className="block">
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all"
                      >
                        <item.icon className="h-5 w-5" />
                        {open && <span>{item.title}</span>}
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
