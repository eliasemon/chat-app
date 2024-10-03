import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice, AuthState } from './authSlice';

// Define the root store type which can include multiple slices
type StoreState = AuthState; // If you add more slices, combine types here

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a), // Combine auth slice into the store
    }),
    {
      name: 'store-storage', // Key to persist the store in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    },
  ),
);
