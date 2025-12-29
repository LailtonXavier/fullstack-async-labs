import { CreateProductDtoType } from '@/app/core/domain/dto/create-product.dto';
import { CreateProdutResponse } from '@/app/core/domain/types/product-response';
import { api } from '../../services/api.services';

export async function createProductService(
  data: CreateProductDtoType
): Promise<CreateProdutResponse> {
  return api.post<CreateProdutResponse>('/products', data);
}
