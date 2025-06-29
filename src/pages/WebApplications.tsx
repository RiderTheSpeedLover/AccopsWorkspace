import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFavorites } from "@/contexts/FavoritesContext";
import {
  Globe,
  Star,
  MoreVertical,
  Power,
  Pause,
  RotateCcw,
  Activity,
} from "lucide-react";

interface WebApp {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  isFavorite: boolean;
  isActive: boolean;
}

const initialWebApps: WebApp[] = [
  {
    id: "accopsai",
    name: "AccopsAI",
    icon: "🤖",
    bgColor: "bg-blue-100",
    isFavorite: false,
    isActive: true,
  },
  {
    id: "ars",
    name: "ARS",
    icon: "🔄",
    bgColor: "bg-green-100",
    isFavorite: false,
    isActive: false,
  },
  {
    id: "aspl",
    name: "ASPL",
    icon: "🔄",
    bgColor: "bg-purple-100",
    isFavorite: false,
    isActive: false,
  },
  {
    id: "crm",
    name: "CRM",
    icon: "🔄",
    bgColor: "bg-orange-100",
    isFavorite: false,
    isActive: true,
  },
  {
    id: "git",
    name: "GIT",
    icon: "🔄",
    bgColor: "bg-gray-100",
    isFavorite: false,
    isActive: false,
  },
  {
    id: "jenkins",
    name: "Jenkins",
    icon: "🔄",
    bgColor: "bg-blue-100",
    isFavorite: false,
    isActive: false,
  },
  {
    id: "portal",
    name: "Portal",
    icon: "🔄",
    bgColor: "bg-indigo-100",
    isFavorite: false,
    isActive: false,
  },
  {
    id: "support",
    name: "Support",
    icon: "🔄",
    bgColor: "bg-red-100",
    isFavorite: false,
    isActive: false,
  },
];

export default function WebApplications() {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleToggleFavorite = (appId: string) => {
    const app = initialWebApps.find((a) => a.id === appId);
    if (app) {
      toggleFavorite({
        id: app.id,
        name: app.name,
        icon: app.icon,
        type: "web",
        isActive: app.isActive,
        bgColor: app.bgColor,
      });
    }
  };

  return (
    <DashboardLayout
      activeItem="Web Applications"
      title="Web Applications"
      icon={Globe}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 theme-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              Web Applications
            </h2>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {initialWebApps.length} apps
            </span>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {initialWebApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32"
              >
                {/* Three Dot Menu - Only visible on hover */}
                {app.isActive && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-3 h-3 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-red-600">
                        <Power className="w-3 h-3 mr-2" />
                        Power Off
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pause className="w-3 h-3 mr-2" />
                        Pause
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RotateCcw className="w-3 h-3 mr-2" />
                        Restart
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* Favorite Star Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(app.id);
                  }}
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 left-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Star
                    className={`w-3 h-3 ${
                      isFavorite(app.id, "web")
                        ? "text-yellow-500 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                </Button>

                <div
                  className={`w-12 h-12 ${app.bgColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm`}
                >
                  <span className="text-xl">{app.icon}</span>
                </div>
                <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
                  {app.name}
                </span>
                {app.isActive && (
                  <div className="text-xs text-green-600 mt-1 font-medium flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Active
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
