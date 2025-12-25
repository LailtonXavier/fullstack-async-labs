import { ProductCategories } from '../types/product-category.type';
import { ProductStatus } from '../types/product-status.type';

export interface ProductProps {
  id?: string;
  name: string;
  productCode: string;
  description: string;
  status: ProductStatus;
  price: string;
  category: ProductCategories;
  userId: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
