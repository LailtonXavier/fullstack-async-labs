import { UpdateProductDtoType } from '@/core/domain/dto/update-product.dto';
import { api } from '../../services/api.services';

export async function updateProductService(
  productId: string,
  data: UpdateProductDtoType
): Promise<UpdateProductDtoType> {
  return api.put<UpdateProductDtoType>(`/products/${productId}`, data);
}
