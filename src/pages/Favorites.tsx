import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Star, Grid3X3, Monitor } from "lucide-react";

export default function Favorites() {
  const navigate = useNavigate();
  const { favoriteApps, favoriteDesktops, toggleFavorite } = useFavorites();

  const hasFavorites = favoriteApps.length > 0 || favoriteDesktops.length > 0;

  return (
    <DashboardLayout activeItem="Favorites" title="Favorites" icon={Star}>
      <div className="space-y-8">
        {hasFavorites ? (
          <>
            {/* Favorite Applications Section */}
            {favoriteApps.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Grid3X3 className="w-5 h-5 theme-primary" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Favorite Applications
                  </h2>
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {favoriteApps.length} apps
                  </span>
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {favoriteApps.map((app) => (
                    <div
                      key={app.id}
                      className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32"
                    >
                      {app.isActive && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}

                      {/* Favorite Star - Always filled in favorites */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle unfavorite action
                        }}
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 left-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      </Button>

                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                        <span className="text-xl">{app.icon}</span>
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
                  ))}
                </div>
              </section>
            )}

            {/* Favorite Desktops Section */}
            {favoriteDesktops.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Monitor className="w-5 h-5 theme-primary" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Favorite Desktops
                  </h2>
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {favoriteDesktops.length} desktops
                  </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {favoriteDesktops.map((desktop) => (
                    <div
                      key={desktop.id}
                      className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group theme-hover-border relative h-32"
                    >
                      {desktop.isActive && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}

                      {/* Favorite Star - Always filled in favorites */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle unfavorite action
                        }}
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 left-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      </Button>

                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                        <span className="text-xl">{desktop.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900">
                        {desktop.name}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {desktop.location}
                      </span>
                      {desktop.isActive && (
                        <div className="text-xs text-green-600 mt-1 font-medium">
                          Connected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-6">
              Add applications and desktops to your favorites by clicking the
              star icon on any tile.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/dashboard")}
                className="theme-primary-bg theme-primary-hover text-white"
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Browse Applications
              </Button>
              <Button
                onClick={() => navigate("/virtual-desktops")}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Browse Desktops
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
