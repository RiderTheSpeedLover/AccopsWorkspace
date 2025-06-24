import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Network, Monitor, Wifi, Star } from "lucide-react";

interface NetworkApp {
  id: string;
  name: string;
  icon: any;
  bgColor: string;
  isFavorite: boolean;
  isActive: boolean;
}

const initialNetworkApps: NetworkApp[] = [
  {
    id: "aspl-turbo",
    name: "ASPL-Turbo",
    icon: Monitor,
    bgColor: "bg-blue-100",
    isFavorite: false,
    isActive: true,
  },
  {
    id: "ars-oracle",
    name: "ARS-ORACLE",
    icon: Monitor,
    bgColor: "bg-green-100",
    isFavorite: false,
    isActive: false,
  },
  {
    id: "clientdev",
    name: "ClientDevMachines",
    icon: Monitor,
    bgColor: "bg-purple-100",
    isFavorite: false,
    isActive: true,
  },
  {
    id: "git-cloud",
    name: "GIT-Cloud",
    icon: Monitor,
    bgColor: "bg-orange-100",
    isFavorite: false,
    isActive: false,
  },
  {
    id: "hsqa-virtual",
    name: "HSQA-VIRTUAL",
    icon: Monitor,
    bgColor: "bg-gray-100",
    isFavorite: false,
    isActive: false,
  },
  {
    id: "prod-server",
    name: "Production-Server",
    icon: Monitor,
    bgColor: "bg-red-100",
    isFavorite: false,
    isActive: false,
  },
];

export default function NetworkApplications() {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleToggleFavorite = (appId: string) => {
    const app = initialNetworkApps.find((a) => a.id === appId);
    if (app) {
      const IconComponent = app.icon;
      toggleFavorite({
        id: app.id,
        name: app.name,
        icon: IconComponent,
        type: "network",
        isActive: app.isActive,
        bgColor: app.bgColor,
      });
    }
  };

  return (
    <DashboardLayout
      activeItem="Network Applications"
      title="Network Applications"
      icon={Network}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Network className="w-5 h-5 theme-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              Remote Access Applications
            </h2>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {initialNetworkApps.length} apps
            </span>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {initialNetworkApps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32"
                >
                  {app.isActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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
                        app.isFavorite
                          ? "text-yellow-500 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>

                  <div
                    className={`w-12 h-12 ${app.bgColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm relative`}
                  >
                    <Icon className="w-6 h-6 text-gray-600" />
                    <Wifi className="w-3 h-3 text-blue-600 absolute -top-1 -right-1" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
                    {app.name}
                  </span>
                  {app.isActive && (
                    <div className="text-xs text-green-600 mt-1 font-medium">
                      Active
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
