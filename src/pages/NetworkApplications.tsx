import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Network, Monitor, Wifi } from "lucide-react";

const networkApps = [
  { name: "ASPL-Turbo", icon: Monitor, bgColor: "bg-blue-100" },
  { name: "ARS-ORACLE", icon: Monitor, bgColor: "bg-green-100" },
  { name: "ClientDevMachines", icon: Monitor, bgColor: "bg-purple-100" },
  { name: "GIT-Cloud", icon: Monitor, bgColor: "bg-orange-100" },
  { name: "HSQA-VIRTUAL", icon: Monitor, bgColor: "bg-gray-100" },
  { name: "Production-Server", icon: Monitor, bgColor: "bg-red-100" },
];

const AppTile = ({
  name,
  icon: Icon,
  bgColor,
}: {
  name: string;
  icon: any;
  bgColor: string;
}) => (
  <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border h-32">
    <div
      className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm relative`}
    >
      <Icon className="w-6 h-6 text-gray-600" />
      <Wifi className="w-3 h-3 text-blue-600 absolute -top-1 -right-1" />
    </div>
    <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
      {name}
    </span>
  </div>
);

export default function NetworkApplications() {
  return (
    <DashboardLayout
      activeItem="Network Applications"
      title="Network Applications"
      icon={Network}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Remote Access Applications
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {networkApps.map((app) => (
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
