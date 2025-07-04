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
  Monitor,
  Star,
  MoreVertical,
  Power,
  Pause,
  RotateCcw,
  Activity,
} from "lucide-react";

interface Desktop {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
  type: string;
  location: string;
  isFavorite: boolean;
}

const initialDesktops: Desktop[] = [
  {
    id: "desktop1",
    name: "SHD2K22",
    icon: "💻",
    isActive: true,
    type: "SHD",
    location: "Primary",
    isFavorite: false,
  },
  {
    id: "desktop2",
    name: "VDIO188.ACCOPS.COM",
    icon: "✓",
    isActive: false,
    type: "VDI",
    location: "Production",
    isFavorite: false,
  },
  {
    id: "desktop3",
    name: "SHD-DEV01",
    icon: "🖥️",
    isActive: false,
    type: "SHD",
    location: "Development",
    isFavorite: false,
  },
  {
    id: "desktop4",
    name: "VDI-PROD02",
    icon: "🖥️",
    isActive: false,
    type: "VDI",
    location: "Production",
    isFavorite: false,
  },
  {
    id: "desktop5",
    name: "SHD-TEST03",
    icon: "💻",
    isActive: false,
    type: "SHD",
    location: "Testing",
    isFavorite: false,
  },
  {
    id: "desktop6",
    name: "VDI-BACKUP01",
    icon: "🖥️",
    isActive: false,
    type: "VDI",
    location: "Backup",
    isFavorite: false,
  },
  {
    id: "desktop7",
    name: "SHD-UAT04",
    icon: "💻",
    isActive: false,
    type: "SHD",
    location: "UAT",
    isFavorite: false,
  },
  {
    id: "desktop8",
    name: "VDI-DR01",
    icon: "🖥️",
    isActive: false,
    type: "VDI",
    location: "Disaster Recovery",
    isFavorite: false,
  },
];

export default function VirtualDesktops() {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleToggleFavorite = (desktopId: string) => {
    const desktop = initialDesktops.find((d) => d.id === desktopId);
    if (desktop) {
      toggleFavorite({
        id: desktop.id,
        name: desktop.name,
        icon: desktop.icon,
        type: "desktop",
        isActive: desktop.isActive,
        location: desktop.location,
      });
    }
  };

  const shdDesktops = initialDesktops.filter(
    (desktop) => desktop.type === "SHD",
  );
  const vdiDesktops = initialDesktops.filter(
    (desktop) => desktop.type === "VDI",
  );

  const DesktopTile = ({ desktop }: { desktop: Desktop }) => (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32">
      {/* Three Dot Menu - Only visible on hover */}
      {desktop.isActive && (
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
          handleToggleFavorite(desktop.id);
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
      <span className="text-xs text-gray-500 mt-1">{desktop.location}</span>
      {desktop.isActive && (
        <div className="text-xs text-green-600 mt-1 font-medium flex items-center gap-1">
          <Activity className="w-3 h-3" />
          Connected
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout activeItem="Desktops" title="Desktops" icon={Monitor}>
      <div className="space-y-8">
        {/* SHD Desktops */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Monitor className="w-5 h-5 theme-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              SHD Desktops
            </h2>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {shdDesktops.length} available
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {shdDesktops.map((desktop) => (
              <DesktopTile key={desktop.id} desktop={desktop} />
            ))}
          </div>
        </section>

        {/* VDI Desktops */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Monitor className="w-5 h-5 theme-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              VDI Desktops
            </h2>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {vdiDesktops.length} available
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {vdiDesktops.map((desktop) => (
              <DesktopTile key={desktop.id} desktop={desktop} />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
