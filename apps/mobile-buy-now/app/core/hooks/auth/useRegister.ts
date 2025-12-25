import { useMutation } from '@tanstack/react-query';
import { registerService } from '../../infra/http/auth/register.service';

export function useRegister() {
  return useMutation({
    mutationFn: registerService,
    onSuccess: (data) => {
      console.log('Criado com successful:', data);
    },
    onError: (error) => {
      console.error('Falha ao criar:', error);
    },
  });
}