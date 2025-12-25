import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterSchema, RegisterSchemaDto } from '../../domain/dto/register.dto';

export const useRegisterForm = () =>
  useForm<RegisterSchemaDto>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: ''
    },
  });