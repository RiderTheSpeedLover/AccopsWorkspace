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
} from "lucide-react";

const sidebarItems = [
  { icon: Star, label: "Favorites", path: "/dashboard" },
  {
    icon: Settings,
    label: "Virtual Applications",
    path: "/virtual-applications",
  },
  { icon: Monitor, label: "Virtual Desktops", path: "/virtual-desktops" },
  { icon: Globe, label: "Web Applications", path: "/web-applications" },
  {
    icon: Network,
    label: "Network Applications",
    path: "/network-applications",
  },
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
  const navigate = useNavigate();
  const location = useLocation();

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
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                <div className="w-6 h-6 bg-white rounded transform rotate-45"></div>
                <div className="w-2 h-2 bg-orange-500 absolute rounded-sm"></div>
              </div>
              <div>
                <span className="font-bold text-gray-900 text-lg">accops</span>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Workspace
                </div>
              </div>
            </div>
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
                    ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-blue-600" : ""}`}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-700 font-medium">
                Turbo Mode Failed
              </span>
            </div>
            <p className="text-xs text-red-600 mt-1">
              Connection issue detected
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-mono">v7.0.1.1088</span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 hover:bg-gray-200 rounded-md"
                title="Information"
              >
                <Info className="w-3 h-3 text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 hover:bg-gray-200 rounded-md"
                title="Calendar"
              >
                <Calendar className="w-3 h-3 text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 hover:bg-gray-200 rounded-md"
                title="Help"
              >
                <HelpCircle className="w-3 h-3 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <TitleIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 w-72 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg"
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
                    className="w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-medium"
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
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    RDP Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
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
    </div>
  );
}
