import { z } from 'zod';

export const CreateUserDto = z.object({
  id: z.number().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  photo: z.string().url().optional(),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;