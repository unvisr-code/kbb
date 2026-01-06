import { create } from 'zustand';

interface UIState {
  isMyPageOpen: boolean;
  openMyPage: () => void;
  closeMyPage: () => void;
  toggleMyPage: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMyPageOpen: false,
  openMyPage: () => set({ isMyPageOpen: true }),
  closeMyPage: () => set({ isMyPageOpen: false }),
  toggleMyPage: () => set((state) => ({ isMyPageOpen: !state.isMyPageOpen })),
}));
