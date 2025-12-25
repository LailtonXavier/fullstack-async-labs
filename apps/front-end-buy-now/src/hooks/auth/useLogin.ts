import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { loginService } from '@/core/infra/controllers/auth/login';
import { tokenStore } from '@/core/infra/store/tokenStore';
import { LoginDto } from '@/core/domain/types/login.types';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginDto) => {
      return loginService(data);
    },

    onSuccess: async (data) => {
      if (data?.accessToken) {
        await tokenStore.saveAuthData(data);
        toast.success('Login realizado com sucesso!');
        router.replace('/');
      } else {
        toast.error('Token inválido');
      }
    },

    onError: () => {
      toast.error('E-mail ou senha inválidos');
    },
  });
}
