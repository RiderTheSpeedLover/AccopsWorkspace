import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Settings,
  Folder,
  Chrome,
  FileText,
  Terminal,
  Calculator,
  Grid3X3,
} from "lucide-react";

const appFolders = [
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

const allVirtualApps = [
  { id: "word", name: "Microsoft Word", icon: FileText, isActive: true },
  { id: "excel", name: "Microsoft Excel", icon: FileText, isActive: false },
  { id: "powerpoint", name: "PowerPoint", icon: FileText, isActive: false },
  { id: "outlook", name: "Microsoft Outlook", icon: FileText, isActive: false },
  { id: "chrome", name: "Google Chrome", icon: Chrome, isActive: true },
  { id: "edge", name: "Microsoft Edge", icon: Chrome, isActive: false },
  { id: "firefox", name: "Mozilla Firefox", icon: Chrome, isActive: false },
  { id: "powershell", name: "PowerShell", icon: Terminal, isActive: false },
  { id: "cmd", name: "Command Prompt", icon: Terminal, isActive: false },
  { id: "wsl", name: "WSL Terminal", icon: Terminal, isActive: false },
  { id: "calculator", name: "Calculator", icon: Calculator, isActive: true },
  { id: "control", name: "Control Panel", icon: Settings, isActive: false },
  { id: "taskmgr", name: "Task Manager", icon: Settings, isActive: false },
];

const FolderTile = ({ folder }: { folder: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = folder.icon;

  if (isExpanded) {
    return (
      <div className="col-span-full">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              {folder.name} ({folder.count})
              {folder.isActive > 0 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {folder.isActive} active
                </span>
              )}
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Collapse
            </button>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {folder.apps.map((app: string, index: number) => (
              <div
                key={app}
                className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32"
              >
                {index < folder.isActive && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
                  {app}
                </span>
                {index < folder.isActive && (
                  <div className="text-xs text-green-600 mt-1 font-medium">
                    Active
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsExpanded(true)}
      className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200 cursor-pointer group h-32"
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
  return (
    <DashboardLayout
      activeItem="Virtual Applications"
      title="Virtual Applications"
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {appFolders.map((folder) => (
              <FolderTile key={folder.name} folder={folder} />
            ))}
          </div>
        </section>

        {/* All Virtual Applications */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Grid3X3 className="w-5 h-5 theme-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              All Virtual Applications
            </h2>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {allVirtualApps.length} apps
            </span>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {allVirtualApps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32"
                >
                  {app.isActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
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
      </div>
    </DashboardLayout>
  );
}
