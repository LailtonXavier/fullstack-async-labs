'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/useAuth';

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const isPublicRoute = pathname === '/auth/login';

  useEffect(() => {
    const handleUnauthorized = () => {
      queryClient.clear();
      router.replace('/auth/login');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [router, queryClient]);

  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute) {
      router.replace('/auth/login');
    }

    if (isAuthenticated && isPublicRoute) {
      router.replace('/');
    }
  }, [isAuthenticated, isPublicRoute, router]);

  if (!isAuthenticated && !isPublicRoute) return null;
  if (isAuthenticated && isPublicRoute) return null;

  return <>{children}</>;
}