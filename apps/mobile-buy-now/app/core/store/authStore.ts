import { create } from 'zustand';
import { tokenStore } from './tokenStore';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  accessToken: string | null;
  userId: string | null;

  restoreSession: () => Promise<void>;
  signIn: (data: { accessToken: string; userId: string }) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  loading: true,
  accessToken: null,
  userId: null,

  async restoreSession() {
    try {
      set({ loading: true });

      const data = await tokenStore.get();

      if (data?.accessToken) {
        set({
          isAuthenticated: true,
          accessToken: data.accessToken,
          userId: data.userId,
        });
      } else {
        set({ isAuthenticated: false });
      }
    } finally {
      set({ loading: false });
    }
  },

  signIn({ accessToken, userId }) {
    set({
      isAuthenticated: true,
      accessToken,
      userId,
    });
  },

  async signOut() {
    await tokenStore.clear();
    set({
      isAuthenticated: false,
      accessToken: null,
      userId: null,
    });
  },
}));
