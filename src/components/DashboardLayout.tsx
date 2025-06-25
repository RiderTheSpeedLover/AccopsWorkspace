import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSelector } from "@/components/ThemeSelector";
import { ActivityManager } from "@/components/ActivityManager";
import { useTheme } from "@/hooks/use-theme";
import {
  Star,
  Settings,
  Monitor,
  Globe,
  Network,
  Search,
  Menu,
  Info,
  Calendar,
  HelpCircle,
  RotateCcw,
  LucideIcon,
  Palette,
  LogOut,
  Activity,
  Grid3X3,
} from "lucide-react";

const sidebarItems = [
  { icon: Grid3X3, label: "All", path: "/dashboard" },
  {
    icon: Settings,
    label: "Applications",
    path: "/virtual-applications",
  },
  { icon: Monitor, label: "Desktops", path: "/virtual-desktops" },
  { icon: Network, label: "Remote Connection", path: "/remote-connection" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeItem: string;
  title: string;
  icon: LucideIcon;
}

export function DashboardLayout({
  children,
  activeItem,
  title,
  icon: TitleIcon,
}: DashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showActivityManager, setShowActivityManager] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useTheme();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-gray-100"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <img
              src="https://cdn.builder.io/api/v1/assets/b6c85b60348d45f5871b1d3664d56961/accops_logo.653bdac-f95953?format=webp&width=800"
              alt="Accops Logo"
              className="h-7 w-auto"
            />
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activeItem;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-sm theme-primary-bg"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">
                  Turbo Mode: ON
                </span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 hover:bg-green-100 rounded-md"
                  title="Information"
                >
                  <Info className="w-3 h-3 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 hover:bg-green-100 rounded-md"
                  title="Calendar"
                >
                  <Calendar className="w-3 h-3 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 hover:bg-green-100 rounded-md"
                  title="Help"
                >
                  <HelpCircle className="w-3 h-3 text-green-600" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">Performance optimized</p>
          </div>
          <div className="flex justify-center">
            <span className="text-xs text-gray-500 font-mono">v7.0.1.1088</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <TitleIcon className="w-6 h-6 theme-primary" />
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 w-72 border-gray-300 rounded-lg theme-focus"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 hover:bg-gray-100 rounded-lg"
                title="Refresh"
              >
                <RotateCcw className="w-4 h-4 text-gray-600" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-9 h-9 rounded-full text-white font-medium transition-all duration-200 theme-primary-bg theme-primary-hover"
                  >
                    S
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-3 py-2 text-sm">
                    <div className="font-medium text-gray-900">
                      Sanjeev Tiwari
                    </div>
                    <div className="text-gray-500">
                      sanjeev.tiwari@accops.com
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/network-applications")}
                    className="flex items-center gap-2"
                  >
                    <Network className="w-4 h-4" />
                    Network Applications
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setShowActivityManager(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4" />
                    Activity Manager
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setShowThemeSelector(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Palette className="w-4 h-4" />
                    Change Theme
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    RDP Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>

        {/* Bottom Status */}
        <div className="h-10 bg-gray-50 border-t border-gray-200 flex items-center justify-between px-6">
          <span className="text-xs text-gray-500">
            Right click on desktop for power options.
          </span>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Connected</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <ThemeSelector
        isOpen={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
      />
      <ActivityManager
        isOpen={showActivityManager}
        onClose={() => setShowActivityManager(false)}
      />
    </div>
  );
}
