import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'E-mail é obrigatório'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

export type LoginSchemaDto = z.infer<typeof LoginSchema>;