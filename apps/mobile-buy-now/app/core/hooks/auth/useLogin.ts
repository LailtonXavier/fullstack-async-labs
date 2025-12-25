import { useMutation } from '@tanstack/react-query';
import { LoginSchemaDto } from '../../domain/dto/login.dto';
import { LoginResponse } from '../../domain/types/login.types';
import { loginService } from '../../infra/http/auth/login.service';

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginSchemaDto>({
    mutationFn: loginService,
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}