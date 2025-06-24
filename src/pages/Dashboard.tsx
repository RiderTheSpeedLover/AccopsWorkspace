import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from "@/contexts/FavoritesContext";
import {
  Star,
  Grid3X3,
  Chrome,
  FileText,
  Calculator,
  Settings,
  Terminal,
  Monitor,
  Clock,
  Globe,
  Network,
  Wifi,
} from "lucide-react";

interface App {
  id: string;
  name: string;
  icon: any;
  category: string;
  isActive: boolean;
  isFavorite: boolean;
}

const allApps: App[] = [
  // MS Office
  {
    id: "word",
    name: "Microsoft Word",
    icon: FileText,
    category: "MS Office",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    icon: FileText,
    category: "MS Office",
    isActive: true,
    isFavorite: false,
  },
  {
    id: "powerpoint",
    name: "PowerPoint",
    icon: FileText,
    category: "MS Office",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    icon: FileText,
    category: "MS Office",
    isActive: false,
    isFavorite: false,
  },

  // Browsers
  {
    id: "chrome",
    name: "Google Chrome",
    icon: Chrome,
    category: "Browsers",
    isActive: true,
    isFavorite: false,
  },
  {
    id: "edge",
    name: "Microsoft Edge",
    icon: Chrome,
    category: "Browsers",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "firefox",
    name: "Mozilla Firefox",
    icon: Chrome,
    category: "Browsers",
    isActive: false,
    isFavorite: false,
  },

  // PowerShells
  {
    id: "powershell",
    name: "PowerShell",
    icon: Terminal,
    category: "PowerShells",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "cmd",
    name: "Command Prompt",
    icon: Terminal,
    category: "PowerShells",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "wsl",
    name: "WSL Terminal",
    icon: Terminal,
    category: "PowerShells",
    isActive: false,
    isFavorite: false,
  },

  // System Tools
  {
    id: "calculator",
    name: "Calculator",
    icon: Calculator,
    category: "System Tools",
    isActive: true,
    isFavorite: false,
  },
  {
    id: "control",
    name: "Control Panel",
    icon: Settings,
    category: "System Tools",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "taskmgr",
    name: "Task Manager",
    icon: Monitor,
    category: "System Tools",
    isActive: false,
    isFavorite: false,
  },
];

// Web Applications
const webApps: App[] = [
  {
    id: "accopsai",
    name: "AccopsAI",
    icon: Globe,
    category: "Web",
    isActive: true,
    isFavorite: false,
  },
  {
    id: "ars",
    name: "ARS",
    icon: Globe,
    category: "Web",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "aspl",
    name: "ASPL",
    icon: Globe,
    category: "Web",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "crm",
    name: "CRM",
    icon: Globe,
    category: "Web",
    isActive: true,
    isFavorite: false,
  },
  {
    id: "git",
    name: "GIT",
    icon: Globe,
    category: "Web",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "jenkins",
    name: "Jenkins",
    icon: Globe,
    category: "Web",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "portal",
    name: "Portal",
    icon: Globe,
    category: "Web",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "support",
    name: "Support",
    icon: Globe,
    category: "Web",
    isActive: false,
    isFavorite: false,
  },
];

// Network Applications
const networkApps: App[] = [
  {
    id: "aspl-turbo",
    name: "ASPL-Turbo",
    icon: Network,
    category: "Network",
    isActive: true,
    isFavorite: false,
  },
  {
    id: "ars-oracle",
    name: "ARS-ORACLE",
    icon: Network,
    category: "Network",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "clientdev",
    name: "ClientDevMachines",
    icon: Network,
    category: "Network",
    isActive: true,
    isFavorite: false,
  },
  {
    id: "git-cloud",
    name: "GIT-Cloud",
    icon: Network,
    category: "Network",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "hsqa-virtual",
    name: "HSQA-VIRTUAL",
    icon: Network,
    category: "Network",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "prod-server",
    name: "Production-Server",
    icon: Network,
    category: "Network",
    isActive: false,
    isFavorite: false,
  },
];

// Combine all apps from all tabs
const allCombinedApps: App[] = [...allApps, ...webApps, ...networkApps];

const desktops = [
  { id: "desktop1", name: "SHD2K22", icon: "💻", isActive: true },
  { id: "desktop2", name: "VDIO188.ACCOPS.COM", icon: "✓", isActive: false },
  { id: "desktop3", name: "SHD-DEV01", icon: "🖥️", isActive: false },
  { id: "desktop4", name: "VDI-PROD02", icon: "🖥️", isActive: false },
  { id: "desktop5", name: "SHD-TEST03", icon: "💻", isActive: false },
  { id: "desktop6", name: "VDI-BACKUP01", icon: "🖥️", isActive: false },
  { id: "desktop7", name: "SHD-UAT04", icon: "💻", isActive: false },
  { id: "desktop8", name: "VDI-DR01", icon: "🖥️", isActive: false },
];

export default function Dashboard() {
  const { favoriteApps, favoriteDesktops, toggleFavorite, isFavorite } =
    useFavorites();

  const handleToggleFavorite = (appId: string) => {
    const app = allCombinedApps.find((a) => a.id === appId);
    if (app) {
      let appType = "application";
      if (app.category === "Web") appType = "web";
      else if (app.category === "Network") appType = "network";
      else if (app.category === "Virtual") appType = "virtual";

      toggleFavorite({
        id: app.id,
        name: app.name,
        icon: app.icon,
        type: appType as any,
        isActive: app.isActive,
        category: app.category,
      });
    }
  };

  const handleToggleDesktopFavorite = (desktopId: string) => {
    const desktop = desktops.find((d) => d.id === desktopId);
    if (desktop) {
      toggleFavorite({
        id: desktop.id,
        name: desktop.name,
        icon: desktop.icon,
        type: "desktop",
        isActive: desktop.isActive,
      });
    }
  };

  const recentApps = allCombinedApps.filter((app) => app.isActive);

  return (
    <DashboardLayout activeItem="All" title="Applications" icon={Grid3X3}>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4" />
            All
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Favorites ({favoriteApps.length + favoriteDesktops.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          {/* Recent Applications */}
          {recentApps.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 theme-primary" />
                <h2 className="text-xl font-semibold text-gray-900">Recent</h2>
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {recentApps.length} apps
                </span>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {recentApps.map((app) => (
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
                          isFavorite(app.id, "application")
                            ? "text-yellow-500 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>

                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                      {typeof app.icon === "string" ? (
                        <span className="text-xl">{app.icon}</span>
                      ) : (
                        <app.icon className="w-6 h-6 text-blue-600" />
                      )}
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
                ))}
              </div>
            </section>
          )}

          {/* Desktops Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Monitor className="w-5 h-5 theme-primary" />
              <h2 className="text-xl font-semibold text-gray-900">Desktops</h2>
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {desktops.length} available
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {desktops.map((desktop) => (
                <div
                  key={desktop.id}
                  className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32"
                >
                  {desktop.isActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}

                  {/* Favorite Star Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleDesktopFavorite(desktop.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 left-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Star
                      className={`w-3 h-3 ${
                        isFavorite(desktop.id, "desktop")
                          ? "text-yellow-500 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>

                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    <span className="text-xl">{desktop.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
                    {desktop.name}
                  </span>
                  {desktop.isActive && (
                    <div className="text-xs text-green-600 mt-1 font-medium">
                      Connected
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Virtual Applications Grid */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 theme-primary" />
              <h2 className="text-xl font-semibold text-gray-900">
                Applications
              </h2>
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {allApps.length} apps
              </span>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {allApps.map((app) => (
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
                        isFavorite(app.id, "application")
                          ? "text-yellow-500 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>

                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    {typeof app.icon === "string" ? (
                      <span className="text-xl">{app.icon}</span>
                    ) : (
                      <app.icon className="w-6 h-6 text-blue-600" />
                    )}
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
              ))}
            </div>
          </section>

          {/* Web Applications Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 theme-primary" />
              <h2 className="text-xl font-semibold text-gray-900">
                Web Applications
              </h2>
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {webApps.length} apps
              </span>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {webApps.map((app) => (
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
                        isFavorite(app.id, "web")
                          ? "text-yellow-500 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>

                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    {typeof app.icon === "string" ? (
                      <span className="text-xl">{app.icon}</span>
                    ) : (
                      <app.icon className="w-6 h-6 text-blue-600" />
                    )}
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
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-8">
          {favoriteApps.length > 0 || favoriteDesktops.length > 0 ? (
            <>
              {/* Favorite Applications */}
              {favoriteApps.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Grid3X3 className="w-5 h-5 theme-primary" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Favorite Applications
                    </h2>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {favoriteApps.length} apps
                    </span>
                  </div>
                  <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {favoriteApps.map((app) => (
                      <div
                        key={app.id}
                        className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32"
                      >
                        {app.isActive && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}

                        {/* Favorite Star Button - Always filled for favorites tab */}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(app);
                          }}
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 left-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        </Button>

                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                          {typeof app.icon === "string" ? (
                            <span className="text-xl">{app.icon}</span>
                          ) : (
                            <app.icon className="w-6 h-6 text-blue-600" />
                          )}
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
                    ))}
                  </div>
                </section>
              )}

              {/* Favorite Desktops */}
              {favoriteDesktops.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Monitor className="w-5 h-5 theme-primary" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Favorite Desktops
                    </h2>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {favoriteDesktops.length} desktops
                    </span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {favoriteDesktops.map((desktop) => (
                      <div
                        key={desktop.id}
                        className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32"
                      >
                        {desktop.isActive && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}

                        {/* Favorite Star Button - Always filled for favorites tab */}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(desktop);
                          }}
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 left-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        </Button>

                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                          <span className="text-xl">{desktop.icon}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
                          {desktop.name}
                        </span>
                        {desktop.location && (
                          <span className="text-xs text-gray-500 mt-1">
                            {desktop.location}
                          </span>
                        )}
                        {desktop.isActive && (
                          <div className="text-xs text-green-600 mt-1 font-medium">
                            Connected
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start using applications to add them to your favorites
                automatically.
              </p>
              <Button
                onClick={() => {
                  const tabs = document.querySelector('[role="tablist"]');
                  const allTab = tabs?.querySelector(
                    '[value="all"]',
                  ) as HTMLElement;
                  allTab?.click();
                }}
                className="theme-primary-bg theme-primary-hover text-white"
              >
                Browse All Applications
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
