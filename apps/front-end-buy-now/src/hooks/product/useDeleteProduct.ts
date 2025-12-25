import { deteleProductService } from '@/core/infra/controllers/product/delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId }: { productId: string}) =>
      deteleProductService(productId),
    
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      await queryClient.refetchQueries({ queryKey: ['user'], type: 'active' });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}