import { Product } from '../entities/product.entity';

export type PaginatedProducts = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};