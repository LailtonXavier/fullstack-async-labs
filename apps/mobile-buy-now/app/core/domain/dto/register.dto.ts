import { z } from 'zod';

export const RegisterSchema = z.object({
  password: z.string().min(3, 'Senha é obrigatorio'),
  email: z.string().email('E-mail inválido'),
  name: z.string().min(6, 'Mínimo 6 caracteres'),
});

export type RegisterSchemaDto = z.infer<typeof RegisterSchema>;
