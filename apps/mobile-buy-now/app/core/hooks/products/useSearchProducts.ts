import { useQuery } from '@tanstack/react-query';
import { getSearchProductsService } from '../../infra/http/products/search.products.service';
import { useProductFiltersStore } from '../../store/useProductFiltersStore';

interface ApiError {
  message: string;
  status: number;
  error?: string;
}

export function useProducts() {
  const {
    page,
    limit,
    status,
    category,
    price,
  } = useProductFiltersStore();

  return useQuery({
    queryKey: ['products', page, limit, status, category, price],
    queryFn: () =>
      getSearchProductsService({
        page,
        limit,
        status,
        category,
        price,
      }),
    enabled: true,
    retry: (failureCount, error: ApiError) => {
      if (error?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
}