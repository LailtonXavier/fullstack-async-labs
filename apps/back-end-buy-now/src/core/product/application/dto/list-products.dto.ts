import { z } from 'zod';

export const ListProductsDto = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).optional(),
  category: z.enum(['Featured', 'Chairs', 'Armchairs', 'TableLamp', 'CeilingLight', 'Decors', 'Rugs', 'Cushions']).default('Featured'),
  price: z.string().optional(),
});

export type ListProductsDtoType = z.infer<typeof ListProductsDto>;