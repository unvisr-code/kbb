import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Region, SalonFilters } from '@/types';

interface FilterState {
  filters: SalonFilters;
  setRegion: (region: Region | undefined) => void;
  setSortBy: (sortBy: SalonFilters['sortBy']) => void;
  setForeignerFriendlyOnly: (value: boolean) => void;
  resetFilters: () => void;
}

const initialFilters: SalonFilters = {
  region: undefined,
  sortBy: 'recommended',
  foreignerFriendlyOnly: false,
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      filters: initialFilters,

      setRegion: (region) =>
        set((state) => ({
          filters: { ...state.filters, region },
        })),

      setSortBy: (sortBy) =>
        set((state) => ({
          filters: { ...state.filters, sortBy },
        })),

      setForeignerFriendlyOnly: (foreignerFriendlyOnly) =>
        set((state) => ({
          filters: { ...state.filters, foreignerFriendlyOnly },
        })),

      resetFilters: () => set({ filters: initialFilters }),
    }),
    {
      name: 'filter-storage',
      partialize: (state) => ({
        filters: state.filters,
      }),
    }
  )
);
