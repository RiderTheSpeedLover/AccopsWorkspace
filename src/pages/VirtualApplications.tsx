import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Settings } from "lucide-react";

const applications = [
  { name: "Chrome", icon: "🌐", bgColor: "bg-blue-100" },
  { name: "Excel", icon: "📊", bgColor: "bg-green-100" },
  { name: "Word", icon: "📄", bgColor: "bg-blue-100" },
  { name: "PowerPoint", icon: "📈", bgColor: "bg-orange-100" },
  { name: "Teams", icon: "👥", bgColor: "bg-purple-100" },
  { name: "Noteplus", icon: "📝", bgColor: "bg-yellow-100" },
  { name: "Zoom", icon: "📹", bgColor: "bg-blue-100" },
];

const AppTile = ({
  name,
  icon,
  bgColor,
}: {
  name: string;
  icon: string;
  bgColor: string;
}) => (
  <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group theme-hover-border">
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

export default function VirtualApplications() {
  return (
    <DashboardLayout
      activeItem="Virtual Applications"
      title="Virtual Applications"
      icon={Settings}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Virtual Applications
          </h2>
          <div className="grid grid-cols-4 gap-4">
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
