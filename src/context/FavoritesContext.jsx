import React, { createContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "portal_inmobiliario_favorites";

export const FavoritesContext = createContext(null);

export function useFavorites() {
  const context = React.useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persistir en localStorage cuando cambian los favoritos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignorar errores de almacenamiento local
    }
  }, [favorites]);

  const getPropId = (propOrId) => {
    if (!propOrId) return null;
    if (typeof propOrId === "string") return propOrId;
    return propOrId._id || propOrId.reference || propOrId.extref || null;
  };

  const toggleFavorite = useCallback((propOrId) => {
    const id = getPropId(propOrId);
    if (!id) return;
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (propOrId) => {
      const id = getPropId(propOrId);
      if (!id) return false;
      return favorites.includes(id);
    },
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

