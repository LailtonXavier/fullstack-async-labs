import { z } from 'zod';

export const CreateProductDto = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  productCode: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']),
  category: z.enum(['Featured', 'Chairs', 'Armchairs', 'TableLamp', 'CeilingLight', 'Decors', 'Rugs', 'Cushions']),
  price: z.string(),
  photo: z.string().url().optional().nullable(),
  userId: z.string(),
});

export type CreateProductDtoType = z.infer<typeof CreateProductDto>;