import { z } from 'zod';

export const UpdateProductDto = z.object({
  name: z.string().min(2).optional(),
  productCode: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).optional(),
  price: z.string(),
  category: z.enum(['Featured', 'Chairs', 'Armchairs', 'TableLamp', 'CeilingLight', 'Decors', 'Rugs', 'Cushions']),
  userId: z.string(),
  photo: z.string().url().optional().nullable(),
});

export type UpdateProductDtoType = z.infer<typeof UpdateProductDto>;