import { usePathname, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

export function useAuthGuard() {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();

  const { isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';
    const isRoot = pathname === '/';

    if (!isAuthenticated) {
      if (inTabsGroup || isRoot) {
        router.replace('/(auth)/login');
      }
    } else {
      if (inAuthGroup || isRoot) {
        router.replace('/(tabs)/products');
      }
    }
  }, [isAuthenticated, loading, segments, pathname]);
}
