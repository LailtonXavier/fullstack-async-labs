import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProductDtoType } from '../../domain/dto/update-product.dto';
import { updateProductService } from '../../infra/http/products/update.service';

export function useUpdateProduct(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: UpdateProductDtoType }) =>
      updateProductService(productId, data),
    
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      await queryClient.refetchQueries({ queryKey: ['user'], type: 'active' });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}