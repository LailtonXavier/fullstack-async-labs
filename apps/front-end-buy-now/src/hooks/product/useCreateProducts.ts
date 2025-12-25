
import { CreateProductDtoType } from '@/core/domain/dto/create-product.dto';
import { createProductService } from '@/core/infra/controllers/product/create';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateProducts(
  onSuccessCallback?: () => void,
  onStartCreating?: () => void
) {
  return useMutation({
    mutationFn: (data: CreateProductDtoType) =>
      createProductService(data),

    onMutate: () => {
      onStartCreating?.();
    },

    onSuccess: () => {
      toast.success('Produto entrou na fila para cadastro!', {
        description: 'Aguarde, você será notificado quando estiver pronto.',
      });
      onSuccessCallback?.();
    },

    onError: () => {
      toast.error('Erro ao criar produto.', {
        description: 'Tente novamente ou contate o suporte.',
      });
    },
  });
}