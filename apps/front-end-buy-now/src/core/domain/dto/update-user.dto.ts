import { z } from 'zod';

export const UpdateUserDto = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  photo: z.string().url().optional(),
});

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;