import { useQuery } from '@tanstack/react-query';
import { useProductFiltersStore } from '@/core/infra/store/useProductFiltersStore';
import { getSearchProducts } from '@/core/infra/controllers/product/getSearchProduct';

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
      getSearchProducts({
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