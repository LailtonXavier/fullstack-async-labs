
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateProductDtoType } from '../../domain/dto/create-product.dto';
import { createProductService } from '../../infra/http/products/create.service';

export function useCreateProducts(
  onSuccessCallback?: () => void,
  onStartCreating?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDtoType) =>
      createProductService(data),

    onMutate: () => {
      onStartCreating?.();
    },

    onSuccess: () => {
      onSuccessCallback?.();
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },

    onError: () => {
    },
  });
}