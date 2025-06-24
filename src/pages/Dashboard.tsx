import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Grid3X3,
  Heart,
  HeartOff,
  Chrome,
  FileText,
  Calculator,
  Settings,
  Terminal,
  Folder,
  Monitor,
  Clock,
} from "lucide-react";

interface App {
  id: string;
  name: string;
  icon: any;
  category: string;
  isActive: boolean;
  isFavorite: boolean;
  lastUsed?: string;
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
    lastUsed: "2 hours ago",
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
    lastUsed: "5 minutes ago",
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
    lastUsed: "1 hour ago",
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

const desktops = [
  { id: "desktop1", name: "SHD2K22", icon: "💻", isActive: true },
  { id: "desktop2", name: "VDIO188.ACCOPS.COM", icon: "✓", isActive: false },
];

const AppTile = ({
  app,
  onToggleFavorite,
  showFavoriteButton = true,
}: {
  app: App;
  onToggleFavorite: (appId: string) => void;
  showFavoriteButton?: boolean;
}) => {
  const Icon = app.icon;

  return (
    <div className="relative flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border">
      {/* Active Status Indicator */}
      {app.isActive && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      )}

      {/* Favorite Button */}
      {showFavoriteButton && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(app.id);
          }}
          variant="ghost"
          size="sm"
          className="absolute top-1 left-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {app.isFavorite ? (
            <Heart className="w-3 h-3 text-red-500 fill-current" />
          ) : (
            <HeartOff className="w-3 h-3 text-gray-400" />
          )}
        </Button>
      )}

      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>

      <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
        {app.name}
      </span>

      {app.lastUsed && (
        <span className="text-xs text-gray-500 mt-1">{app.lastUsed}</span>
      )}

      {app.isActive && (
        <div className="text-xs text-green-600 mt-1 font-medium">Active</div>
      )}
    </div>
  );
};

const FolderTile = ({
  name,
  apps,
  onToggleFavorite,
}: {
  name: string;
  apps: App[];
  onToggleFavorite: (appId: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeCount = apps.filter((app) => app.isActive).length;

  if (isExpanded) {
    return (
      <div className="col-span-full">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Folder className="w-5 h-5 text-blue-600" />
              {name} ({apps.length})
              {activeCount > 0 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {activeCount} active
                </span>
              )}
            </h3>
            <Button
              onClick={() => setIsExpanded(false)}
              variant="outline"
              size="sm"
            >
              Collapse
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {apps.map((app) => (
              <AppTile
                key={app.id}
                app={app}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsExpanded(true)}
      className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      <div className="relative w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
        <Folder className="w-6 h-6 text-white" />
        {activeCount > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">{activeCount}</span>
          </div>
        )}
      </div>
      <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
        {name}
      </span>
      <span className="text-xs text-gray-500 mt-1">{apps.length} apps</span>
    </div>
  );
};

export default function Dashboard() {
  const [apps, setApps] = useState(allApps);

  const handleToggleFavorite = (appId: string) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, isFavorite: !app.isFavorite } : app,
      ),
    );
  };

  const favoriteApps = apps.filter((app) => app.isFavorite);
  const recentApps = apps
    .filter((app) => app.lastUsed)
    .sort((a, b) => {
      // Simple sort by recency (you'd implement proper date sorting in production)
      return (a.lastUsed || "").localeCompare(b.lastUsed || "");
    });

  const appsByCategory = apps.reduce(
    (acc, app) => {
      if (!acc[app.category]) {
        acc[app.category] = [];
      }
      acc[app.category].push(app);
      return acc;
    },
    {} as Record<string, App[]>,
  );

  return (
    <DashboardLayout activeItem="All" title="Applications" icon={Grid3X3}>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4" />
            All Applications
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Favorites ({favoriteApps.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {desktops.map((desktop) => (
                <div
                  key={desktop.id}
                  className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative"
                >
                  {desktop.isActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
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

          {/* Recent Applications */}
          {recentApps.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 theme-primary" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Recently Used
                </h2>
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {recentApps.length} apps
                </span>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                {recentApps.map((app) => (
                  <AppTile
                    key={app.id}
                    app={app}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Application Folders */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Folder className="w-5 h-5 theme-primary" />
              <h2 className="text-xl font-semibold text-gray-900">
                Application Categories
              </h2>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(appsByCategory).map(
                ([category, categoryApps]) => (
                  <FolderTile
                    key={category}
                    name={category}
                    apps={categoryApps}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ),
              )}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-8">
          {favoriteApps.length > 0 ? (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-5 h-5 theme-primary" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Favorite Applications
                </h2>
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {favoriteApps.length} favorites
                </span>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
                {favoriteApps.map((app) => (
                  <AppTile
                    key={app.id}
                    app={app}
                    onToggleFavorite={handleToggleFavorite}
                    showFavoriteButton={false}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-16">
              <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-600 mb-6">
                Add applications to your favorites by clicking the heart icon on
                any app tile.
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
