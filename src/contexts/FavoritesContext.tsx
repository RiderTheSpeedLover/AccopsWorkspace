import React, { createContext, useContext, useState, ReactNode } from "react";

export interface FavoriteApp {
  id: string;
  name: string;
  icon: any;
  type: "application" | "desktop" | "web" | "network" | "virtual";
  isActive?: boolean;
  category?: string;
  bgColor?: string;
  location?: string;
}

interface FavoritesContextType {
  favoriteApps: FavoriteApp[];
  favoriteDesktops: FavoriteApp[];
  toggleFavorite: (item: FavoriteApp) => void;
  isFavorite: (id: string, type: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteApp[]>([]);

  const favoriteApps = favorites.filter(
    (item) =>
      item.type === "application" ||
      item.type === "web" ||
      item.type === "network" ||
      item.type === "virtual",
  );

  const favoriteDesktops = favorites.filter((item) => item.type === "desktop");

  const toggleFavorite = (item: FavoriteApp) => {
    setFavorites((prev) => {
      const existingIndex = prev.findIndex(
        (fav) => fav.id === item.id && fav.type === item.type,
      );

      if (existingIndex >= 0) {
        // Remove from favorites
        return prev.filter((_, index) => index !== existingIndex);
      } else {
        // Add to favorites
        return [...prev, item];
      }
    });
  };

  const isFavorite = (id: string, type: string) => {
    return favorites.some((fav) => fav.id === id && fav.type === type);
  };

  const value: FavoritesContextType = {
    favoriteApps,
    favoriteDesktops,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
