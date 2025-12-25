import { ProductCategories } from './product-category.type';
import { ProductStatus } from './product-status.type';

export type PrismaProduct = {
  id: string;
  name: string;
  productCode: string;
  description: string;
  status: ProductStatus;
  price: string;
  category: ProductCategories;
  userId: string;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
};