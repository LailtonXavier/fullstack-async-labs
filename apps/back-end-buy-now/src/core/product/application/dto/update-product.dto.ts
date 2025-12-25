import { validateRequiredField } from '@/shared/utils/validation.utils';
import { z } from 'zod';

export const UpdateProductDto = z.object({
  name: z.string().min(2).optional(),
  productCode: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).optional(),
  price: z.string().transform(val => validateRequiredField('price', val)),
  category: z.enum(['Featured', 'Chairs', 'Armchairs', 'TableLamp', 'CeilingLight', 'Decors', 'Rugs', 'Cushions']).default('Featured'),
  userId: z.string().transform(val => validateRequiredField('userId', val)),
  photo: z.string().url().optional().nullable(),
});

export type UpdateProductDtoType = z.infer<typeof UpdateProductDto>;