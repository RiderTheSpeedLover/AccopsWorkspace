import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Star, Grid3X3 } from "lucide-react";

// This would typically come from a global state or context
const favoriteApps: any[] = []; // Empty initially as requested

export default function Favorites() {
  const navigate = useNavigate();

  return (
    <DashboardLayout activeItem="Favorites" title="Favorites" icon={Star}>
      <div className="space-y-8">
        {favoriteApps.length > 0 ? (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-5 h-5 theme-primary" />
              <h2 className="text-xl font-semibold text-gray-900">
                Your Favorite Applications
              </h2>
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {favoriteApps.length} favorites
              </span>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
              {favoriteApps.map((app) => (
                <div key={app.id} className="app-tile">
                  {app.name}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-16">
            <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-6">
              Add applications to your favorites by clicking the heart icon on
              any app tile.
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="theme-primary-bg theme-primary-hover text-white"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Browse All Applications
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
