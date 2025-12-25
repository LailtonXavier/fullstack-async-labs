import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { tokenStore } from '@/core/infra/store/tokenStore';

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    tokenStore.clear();
    queryClient.clear();
    router.replace('/auth/login');
  };

  return { logout };
}