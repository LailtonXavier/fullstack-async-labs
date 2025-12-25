import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { RegisterUserDto } from '@/core/domain/types/register-user.types';
import { registerService } from '@/core/infra/controllers/auth/register';

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterUserDto) => {
      await registerService(data);
    },

    onSuccess: () => {
      toast.success('Conta criada com sucesso!');
    },

    onError: () => {
      toast.error('Erro ao criar conta.');
    },
  });
}
