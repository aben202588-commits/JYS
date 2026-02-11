import { create } from 'zustand';

interface UserState {
  isVip: boolean;
  setVip: (isVip: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isVip: false,
  setVip: (isVip) => set({ isVip }),
}));
