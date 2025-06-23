import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Star } from "lucide-react";

const desktopApps = [
  {
    name: "SHD2K22",
    icon: "💻",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "VDIO188.ACCOPS.COM",
    icon: "✓",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
];

const applications = [
  {
    name: "Chrome",
    icon: "🌐",
    bgColor: "bg-blue-100",
    color: "chrome",
  },
  {
    name: "Excel",
    icon: "📊",
    bgColor: "bg-green-100",
    color: "excel",
  },
  {
    name: "Noteplus",
    icon: "📝",
    bgColor: "bg-yellow-100",
    color: "note",
  },
  {
    name: "PowerPoint",
    icon: "📈",
    bgColor: "bg-orange-100",
    color: "powerpoint",
  },
  {
    name: "Word",
    icon: "📄",
    bgColor: "bg-blue-100",
    color: "word",
  },
];

const AppTile = ({
  name,
  icon,
  bgColor,
  onClick,
}: {
  name: string;
  icon: string;
  bgColor: string;
  onClick?: () => void;
}) => (
  <div
    className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
    onClick={onClick}
  >
    <div
      className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-2 group-hover:scale-105 transition-transform`}
    >
      <span className="text-xl">{icon}</span>
    </div>
    <span className="text-sm text-gray-700 text-center leading-tight">
      {name}
    </span>
  </div>
);

export default function Dashboard() {
  return (
    <DashboardLayout activeItem="Favorites" title="Favorites" icon={Star}>
      <div className="space-y-8">
        {/* Desktops Section */}
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Desktops</h2>
          <div className="grid grid-cols-2 gap-4">
            {desktopApps.map((app) => (
              <AppTile
                key={app.name}
                name={app.name}
                icon={app.icon}
                bgColor={app.bgColor}
              />
            ))}
          </div>
        </section>

        {/* Applications Section */}
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Applications
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {applications.map((app) => (
              <AppTile
                key={app.name}
                name={app.name}
                icon={app.icon}
                bgColor={app.bgColor}
              />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
