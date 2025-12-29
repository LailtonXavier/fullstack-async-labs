import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deteleProductService } from '../../infra/http/products/delete.service';

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