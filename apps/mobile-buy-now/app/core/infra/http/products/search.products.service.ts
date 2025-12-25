import { PaginatedProducts } from '@/app/core/domain/types/paginated-products.type';
import { api } from '../../services/api.services';

type GetProductsParams = {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  price?: string;
};

export async function getSearchProductsService(params: GetProductsParams): Promise<PaginatedProducts> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await api.get<PaginatedProducts>(`/products?${query.toString()}`);
  return res;
}
