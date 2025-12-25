import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductService } from '@/core/infra/controllers/product/update';
import { UpdateProductDtoType } from '@/core/domain/dto/update-product.dto';

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