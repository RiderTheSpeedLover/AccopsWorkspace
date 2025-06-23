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
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Menu className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded transform rotate-45"></div>
                <div className="w-2 h-2 bg-orange-500 absolute"></div>
              </div>
              <span className="font-semibold text-gray-900">accops</span>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activeItem;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                  isActive
                    ? "bg-white text-gray-900 border border-gray-200 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-600 font-medium">Turbo Failed</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Version: 7.0.1.1088</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Info className="w-3 h-3 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Calendar className="w-3 h-3 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <HelpCircle className="w-3 h-3 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <TitleIcon className="w-5 h-5 text-gray-600" />
            <h1 className="text-lg font-medium text-gray-900">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-9 w-64 border-gray-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <RotateCcw className="w-4 h-4 text-gray-600" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-8 h-8 rounded-full bg-gray-600 text-white hover:bg-gray-700"
                  >
                    S
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    sanjeev.tiwari
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuItem>RDP</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
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
        <div className="h-8 bg-gray-50 border-t border-gray-200 flex items-center px-6">
          <span className="text-xs text-gray-500">
            Right click on desktop for power options.
          </span>
        </div>
      </div>
    </div>
  );
}
