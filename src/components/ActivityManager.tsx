import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  X,
  Chrome,
  FileText,
  Calculator,
  Settings,
  Play,
  Square,
} from "lucide-react";

interface ActiveApp {
  id: string;
  name: string;
  icon: any;
  status: "running" | "suspended";
  startTime: string;
}

interface ActivityManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityManager({ isOpen, onClose }: ActivityManagerProps) {
  const [activeApps, setActiveApps] = useState<ActiveApp[]>([
    {
      id: "chrome-1",
      name: "Google Chrome",
      icon: Chrome,
      status: "running",
      startTime: "10:32 AM",
    },
    {
      id: "excel-1",
      name: "Microsoft Excel",
      icon: FileText,
      status: "running",
      startTime: "09:15 AM",
    },
    {
      id: "calc-1",
      name: "Calculator",
      icon: Calculator,
      status: "suspended",
      startTime: "08:45 AM",
    },
    {
      id: "settings-1",
      name: "Control Panel",
      icon: Settings,
      status: "running",
      startTime: "11:20 AM",
    },
  ]);

  const handleStopApp = (appId: string) => {
    setActiveApps((prev) => prev.filter((app) => app.id !== appId));
  };

  const handleToggleApp = (appId: string) => {
    setActiveApps((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              status: app.status === "running" ? "suspended" : "running",
            }
          : app,
      ),
    );
  };

  const runningApps = activeApps.filter((app) => app.status === "running");
  const suspendedApps = activeApps.filter((app) => app.status === "suspended");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-3 pb-4">
          <div className="mx-auto w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Activity Manager
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              Manage your active applications and sessions
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {/* Running Applications */}
          {runningApps.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Running ({runningApps.length})
              </h3>
              <div className="space-y-2">
                {runningApps.map((app) => {
                  const Icon = app.icon;
                  return (
                    <div
                      key={app.id}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100"
                    >
                      <Icon className="w-5 h-5 text-green-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {app.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Started: {app.startTime}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          onClick={() => handleToggleApp(app.id)}
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          title="Suspend"
                        >
                          <Square className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => handleStopApp(app.id)}
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Stop"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Suspended Applications */}
          {suspendedApps.length > 0 && (
            <div>
              <Separator />
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Suspended ({suspendedApps.length})
              </h3>
              <div className="space-y-2">
                {suspendedApps.map((app) => {
                  const Icon = app.icon;
                  return (
                    <div
                      key={app.id}
                      className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100"
                    >
                      <Icon className="w-5 h-5 text-yellow-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {app.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Started: {app.startTime}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          onClick={() => handleToggleApp(app.id)}
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          title="Resume"
                        >
                          <Play className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => handleStopApp(app.id)}
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Stop"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeApps.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No active applications</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t">
          <div className="text-xs text-gray-500">
            Total: {activeApps.length} apps
          </div>
          <Button
            onClick={onClose}
            className="px-6 bg-blue-600 hover:bg-blue-700"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
