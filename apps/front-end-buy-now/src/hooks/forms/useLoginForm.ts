import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaDto } from '@/core/domain/dto/login.dto';

export const useLoginForm = () => {
  return useForm<LoginSchemaDto>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });
};
