import { ProductProps } from '../entities/product';

export type PaginatedProducts = {
  products: ProductProps[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
