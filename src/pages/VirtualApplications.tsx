import React, { useState } from "react";
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
  Settings,
  Folder,
  Chrome,
  FileText,
  Terminal,
  Calculator,
  Grid3X3,
  Star,
  Globe,
  MoreVertical,
  Power,
  Pause,
  RotateCcw,
  Activity,
} from "lucide-react";

const appFolders = [
  {
    name: "All",
    icon: Grid3X3,
    count: 13,
    isActive: 3,
    apps: [],
  },
  {
    name: "MS Office",
    icon: FileText,
    count: 4,
    isActive: 1,
    apps: ["Word", "Excel", "PowerPoint", "Outlook"],
  },
  {
    name: "Browsers",
    icon: Chrome,
    count: 3,
    isActive: 2,
    apps: ["Chrome", "Edge", "Firefox"],
  },
  {
    name: "PowerShells",
    icon: Terminal,
    count: 3,
    isActive: 0,
    apps: ["PowerShell", "CMD", "WSL"],
  },
  {
    name: "System Tools",
    icon: Calculator,
    count: 3,
    isActive: 1,
    apps: ["Calculator", "Control Panel", "Task Manager"],
  },
];

const initialVirtualApps = [
  {
    id: "word",
    name: "Microsoft Word",
    icon: FileText,
    isActive: true,
    isFavorite: false,
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    icon: FileText,
    isActive: false,
    isFavorite: false,
  },
  {
    id: "powerpoint",
    name: "PowerPoint",
    icon: FileText,
    isActive: false,
    isFavorite: false,
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    icon: FileText,
    isActive: false,
    isFavorite: false,
  },
  {
    id: "chrome",
    name: "Google Chrome",
    icon: Chrome,
    isActive: true,
    isFavorite: false,
  },
  {
    id: "edge",
    name: "Microsoft Edge",
    icon: Chrome,
    isActive: false,
    isFavorite: false,
  },
  {
    id: "firefox",
    name: "Mozilla Firefox",
    icon: Chrome,
    isActive: false,
    isFavorite: false,
  },
  {
    id: "powershell",
    name: "PowerShell",
    icon: Terminal,
    isActive: false,
    isFavorite: false,
  },
  {
    id: "cmd",
    name: "Command Prompt",
    icon: Terminal,
    isActive: false,
    isFavorite: false,
  },
  {
    id: "wsl",
    name: "WSL Terminal",
    icon: Terminal,
    isActive: false,
    isFavorite: false,
  },
  {
    id: "calculator",
    name: "Calculator",
    icon: Calculator,
    isActive: true,
    isFavorite: false,
  },
  {
    id: "control",
    name: "Control Panel",
    icon: Settings,
    isActive: false,
    isFavorite: false,
  },
  {
    id: "taskmgr",
    name: "Task Manager",
    icon: Settings,
    isActive: false,
    isFavorite: false,
  },
];

const webAppsData = [
  {
    id: "accopsai",
    name: "AccopsAI",
    icon: "🤖",
    isActive: true,
    isFavorite: false,
  },
  { id: "ars", name: "ARS", icon: "🔄", isActive: false, isFavorite: false },
  { id: "aspl", name: "ASPL", icon: "🔄", isActive: false, isFavorite: false },
  { id: "crm", name: "CRM", icon: "🔄", isActive: true, isFavorite: false },
  { id: "git", name: "GIT", icon: "🔄", isActive: false, isFavorite: false },
  {
    id: "jenkins",
    name: "Jenkins",
    icon: "🔄",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "portal",
    name: "Portal",
    icon: "🔄",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "support",
    name: "Support",
    icon: "🔄",
    isActive: false,
    isFavorite: false,
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    icon: "💬",
    isActive: true,
    isFavorite: false,
  },
];

const FolderTile = ({
  folder,
  isSelected,
  onSelect,
}: {
  folder: any;
  isSelected: boolean;
  onSelect: (folderName: string) => void;
}) => {
  const Icon = folder.icon;

  return (
    <div
      onClick={() => onSelect(folder.name)}
      className={`flex flex-col items-center p-4 rounded-xl border hover:shadow-lg transition-all duration-200 cursor-pointer group h-32 ${
        isSelected
          ? "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 shadow-md"
          : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
      }`}
    >
      <div className="relative w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
        <Folder className="w-6 h-6 text-white" />
        {folder.isActive > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">
              {folder.isActive}
            </span>
          </div>
        )}
      </div>
      <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
        {folder.name}
      </span>
      <span className="text-xs text-gray-500 mt-1">{folder.count} apps</span>
    </div>
  );
};

export default function VirtualApplications() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedFolder, setSelectedFolder] = useState("All");

  const handleToggleFavorite = (appId: string) => {
    const app = initialVirtualApps.find((a) => a.id === appId);
    if (app) {
      const IconComponent = app.icon;
      toggleFavorite({
        id: app.id,
        name: app.name,
        icon: IconComponent,
        type: "virtual",
        isActive: app.isActive,
      });
    }
  };

  // Filter apps based on selected folder
  const getFilteredApps = () => {
    if (selectedFolder === "All") {
      return initialVirtualApps;
    }

    const folderMap: Record<string, string[]> = {
      "MS Office": ["word", "excel", "powerpoint", "outlook"],
      Browsers: ["chrome", "edge", "firefox"],
      PowerShells: ["powershell", "cmd", "wsl"],
      "System Tools": ["calculator", "control", "taskmgr"],
    };

    const appIds = folderMap[selectedFolder] || [];
    return initialVirtualApps.filter((app) => appIds.includes(app.id));
  };

  const filteredApps = getFilteredApps();

  return (
    <DashboardLayout
      activeItem="Applications"
      title="Applications"
      icon={Settings}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Folder className="w-5 h-5 theme-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              Application Categories
            </h2>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {appFolders.length} categories
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {appFolders.map((folder) => (
              <FolderTile
                key={folder.name}
                folder={folder}
                isSelected={selectedFolder === folder.name}
                onSelect={setSelectedFolder}
              />
            ))}
          </div>
        </section>

        {/* Applications */}
        {selectedFolder === "All" ? (
          <div className="space-y-8">
            {/* Virtual Applications Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 theme-primary" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Virtual Applications
                </h2>
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {initialVirtualApps.length} apps
                </span>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {initialVirtualApps.map((app) => {
                  const Icon = app.icon;
                  return (
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
                            isFavorite(app.id, "virtual")
                              ? "text-yellow-500 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </Button>

                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                        <Icon className="w-6 h-6 text-blue-600" />
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
                  );
                })}
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
                  {webAppsData.length} apps
                </span>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {webAppsData.map((app) => (
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
                        // Handle web app favorite
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
        ) : (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Grid3X3 className="w-5 h-5 theme-primary" />
              <h2 className="text-xl font-semibold text-gray-900">
                {`${selectedFolder} Applications`}
              </h2>
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredApps.length} apps
              </span>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredApps.map((app) => {
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
                          isFavorite(app.id, "virtual")
                            ? "text-yellow-500 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>

                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                      <Icon className="w-6 h-6 text-blue-600" />
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
        )}
      </div>
    </DashboardLayout>
  );
}
