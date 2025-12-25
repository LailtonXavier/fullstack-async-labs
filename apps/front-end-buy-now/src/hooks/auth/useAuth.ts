'use client';

import { useSyncExternalStore } from 'react';
import { tokenStore } from '@/core/infra/store/tokenStore';

function getSnapshot() {
  return !!tokenStore.getAccessToken();
}

function getServerSnapshot() {
  return false;
}

function subscribe(callback: () => void) {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'auth') {
      callback();
    }
  };

  const handleAuthChange = () => {
    callback();
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('auth:change', handleAuthChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('auth:change', handleAuthChange);
  };
}

export function useAuth() {
  const isAuthenticated = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return {
    isAuthenticated,
    isLoading: false,
  };
}