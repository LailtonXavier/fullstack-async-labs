import { getUserService } from '@/core/infra/controllers/user/getUser';
import { useUserStore } from '@/core/infra/store/useUserStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface ApiError {
  message: string;
  status: number;
  error?: string;
}

export function useUser() {
  const queryClient = useQueryClient();
  const { user, setUser, clearUser, setLoading, setError } = useUserStore();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUserService,
    staleTime: 0, 
    initialData: user || undefined, 
    retry: (failureCount, error: ApiError) => {
      if (error?.status === 401) {
        handleLogout();
        return false;
      }
      return failureCount < 2;
    },
  });

  const handleLogout = () => {
    clearUser();
    queryClient.setQueryData(['user'], null);
    queryClient.removeQueries({ queryKey: ['user'] });
  };

  const refreshUser = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
    return query.refetch();
  };

  useEffect(() => {
    if (query.data) setUser(query.data);
    if (query.error) setError(query.error.message);
    setLoading(query.isLoading);
  }, [query.data, query.error, query.isLoading]);

  return {
    user: query.data ?? user,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error?.message,
    refetch: query.refetch,
    clearUser: handleLogout,
    refreshUser,
  };
}