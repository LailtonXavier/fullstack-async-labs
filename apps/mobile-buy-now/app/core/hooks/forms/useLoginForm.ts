import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginSchemaDto } from '../../domain/dto/login.dto';

export const useLoginForm = () =>
  useForm<LoginSchemaDto>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });