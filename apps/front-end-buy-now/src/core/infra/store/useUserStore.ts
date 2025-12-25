import { User } from '@/core/domain/entities/user';
import { create } from 'zustand';

type UserStoreState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ 
    user, 
    error: null,
    isLoading: false 
  }),

  clearUser: () => set({ 
    user: null, 
    error: null 
  }),

  setLoading: (loading) => set({ 
    isLoading: loading 
  }),

  setError: (error) => set({ 
    error, 
    isLoading: false 
  }),
}));