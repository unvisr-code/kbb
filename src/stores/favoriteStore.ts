import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  favoriteIds: string[];
  toggleFavorite: (salonId: string) => void;
  isFavorite: (salonId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      toggleFavorite: (salonId) =>
        set((state) => {
          const isFavorited = state.favoriteIds.includes(salonId);
          return {
            favoriteIds: isFavorited
              ? state.favoriteIds.filter((id) => id !== salonId)
              : [...state.favoriteIds, salonId],
          };
        }),

      isFavorite: (salonId) => get().favoriteIds.includes(salonId),

      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'favorite-storage',
      partialize: (state) => ({
        favoriteIds: state.favoriteIds,
      }),
    }
  )
);
