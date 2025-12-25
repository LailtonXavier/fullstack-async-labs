import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchemaDto, RegisterSchema } from '@/core/domain/dto/register.dto';

export const useRegisterForm = () => {
  return useForm<RegisterSchemaDto>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
  });
};
