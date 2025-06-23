import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Globe } from "lucide-react";

const webApps = [
  { name: "AccopsAI", icon: "🤖", bgColor: "bg-blue-100" },
  { name: "ARS", icon: "🔄", bgColor: "bg-green-100" },
  { name: "ASPL", icon: "🔄", bgColor: "bg-purple-100" },
  { name: "CRM", icon: "🔄", bgColor: "bg-orange-100" },
  { name: "GIT", icon: "🔄", bgColor: "bg-gray-100" },
  { name: "Jenkins", icon: "🔄", bgColor: "bg-blue-100" },
  { name: "Portal", icon: "🔄", bgColor: "bg-indigo-100" },
  { name: "Support", icon: "🔄", bgColor: "bg-red-100" },
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

export default function WebApplications() {
  return (
    <DashboardLayout
      activeItem="Web Applications"
      title="Web Applications"
      icon={Globe}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Web Applications
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {webApps.map((app) => (
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
