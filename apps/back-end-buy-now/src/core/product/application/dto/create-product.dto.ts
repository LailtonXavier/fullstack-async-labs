import { validateRequiredField } from '@/shared/utils/validation.utils';
import { z } from 'zod';

export const CreateProductDto = z.object({
  id: z.string().optional(),
  name: z.string().min(2).transform(val => validateRequiredField('name', val)),
  productCode: z.string().min(1).transform(val => validateRequiredField('productCode', val)),
  description: z.string().min(1).transform(val => validateRequiredField('description', val)),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).default('ACTIVE'),
  category: z.enum(['Featured', 'Chairs', 'Armchairs', 'TableLamp', 'CeilingLight', 'Decors', 'Rugs', 'Cushions']).default('Featured'),
  price: z.string().transform(val => validateRequiredField('price', val)),
  userId: z.string().transform(val => validateRequiredField('userId', val)),
  photo: z.string().url().optional(),
});

export type CreateProductDtoType = z.infer<typeof CreateProductDto>;