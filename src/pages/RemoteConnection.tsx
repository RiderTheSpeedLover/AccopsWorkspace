import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Network,
  Plus,
  Monitor,
  Settings,
  Play,
  Square,
  MoreVertical,
  Wifi,
  WifiOff,
} from "lucide-react";

interface RemoteConnection {
  id: string;
  name: string;
  type: string;
  host: string;
  port?: number;
  status: "connected" | "disconnected" | "connecting";
  lastConnected?: string;
}

const connections: RemoteConnection[] = [
  {
    id: "rdp1",
    name: "Production Server",
    type: "RDP",
    host: "192.168.1.100",
    port: 3389,
    status: "connected",
    lastConnected: "2 minutes ago",
  },
  {
    id: "ssh1",
    name: "Development SSH",
    type: "SSH",
    host: "dev.example.com",
    port: 22,
    status: "disconnected",
    lastConnected: "1 hour ago",
  },
  {
    id: "vnc1",
    name: "Graphics Workstation",
    type: "VNC",
    host: "192.168.1.50",
    port: 5900,
    status: "disconnected",
    lastConnected: "Yesterday",
  },
  {
    id: "rdp2",
    name: "Test Environment",
    type: "RDP",
    host: "test.local",
    port: 3389,
    status: "connecting",
    lastConnected: "5 minutes ago",
  },
];

export default function RemoteConnection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConnections = connections.filter(
    (conn) =>
      conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.host.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-200";
      case "connecting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Wifi className="w-3 h-3" />;
      case "connecting":
        return (
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
        );
      default:
        return <WifiOff className="w-3 h-3" />;
    }
  };

  return (
    <DashboardLayout
      activeItem="Remote Connection"
      title="Remote Connection"
      icon={Network}
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80"
            />
          </div>
          <Button className="theme-primary-bg theme-primary-hover text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Connection
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {connections.filter((c) => c.status === "connected").length}
                  </p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">
                    {
                      connections.filter((c) => c.status === "disconnected")
                        .length
                    }
                  </p>
                  <p className="text-sm text-gray-600">Inactive</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {connections.filter((c) => c.type === "RDP").length}
                  </p>
                  <p className="text-sm text-gray-600">RDP</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {connections.length}
                  </p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredConnections.map((connection) => (
            <Card
              key={connection.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-gray-600" />
                    <CardTitle className="text-lg">{connection.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getStatusColor(connection.status)}
                    >
                      {getStatusIcon(connection.status)}
                      <span className="ml-1 capitalize">
                        {connection.status}
                      </span>
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{connection.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Host:</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {connection.host}
                      {connection.port && `:${connection.port}`}
                    </span>
                  </div>
                  {connection.lastConnected && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Connected:</span>
                      <span className="text-gray-500">
                        {connection.lastConnected}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {connection.status === "connected" ? (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Square className="w-3 h-3 mr-2" />
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="flex-1 theme-primary-bg theme-primary-hover text-white"
                      disabled={connection.status === "connecting"}
                    >
                      <Play className="w-3 h-3 mr-2" />
                      {connection.status === "connecting"
                        ? "Connecting..."
                        : "Connect"}
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredConnections.length === 0 && (
          <div className="text-center py-12">
            <Network className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No connections found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try adjusting your search criteria"
                : "Create your first remote connection to get started"}
            </p>
            <Button className="theme-primary-bg theme-primary-hover text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Connection
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
