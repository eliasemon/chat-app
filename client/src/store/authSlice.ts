import { StateCreator } from 'zustand';

// Define the authentication state and actions
export interface AuthResponse {
  _id: string;
  token: string;
  fullName: string;
  userEmail: string;
  profilePic: string;
}

export type User = Omit<AuthResponse, '_id' | 'token'>;

export interface AuthState {
  user: AuthResponse | null;
  setUser: (user: AuthResponse) => void;
  clearUser: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (user: AuthResponse) => set({ user }),
  clearUser: () => set({ user: null }),
});
