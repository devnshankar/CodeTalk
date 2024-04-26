import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: 'user-storage', // Storage name
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useUserStore;
