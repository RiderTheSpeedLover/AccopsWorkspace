import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Star, Monitor } from "lucide-react";

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
    className="flex flex-col items-center p-5 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group"
    onClick={onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `rgb(var(--primary) / 0.3)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "";
    }}
  >
    <div
      className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm`}
    >
      <span className="text-2xl">{icon}</span>
    </div>
    <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
      {name}
    </span>
  </div>
);

export default function Dashboard() {
  return (
    <DashboardLayout activeItem="Favorites" title="Favorites" icon={Star}>
      <div className="space-y-10">
        {/* Desktops Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Monitor
              className="w-5 h-5"
              style={{ color: `rgb(var(--primary))` }}
            />
            <h2 className="text-xl font-semibold text-gray-900">Desktops</h2>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {desktopApps.length} available
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="flex items-center gap-3 mb-6">
            <Star
              className="w-5 h-5"
              style={{ color: `rgb(var(--primary))` }}
            />
            <h2 className="text-xl font-semibold text-gray-900">
              Favorite Applications
            </h2>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {applications.length} apps
            </span>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
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
