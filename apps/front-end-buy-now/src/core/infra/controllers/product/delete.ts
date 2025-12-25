
import { api } from '../../services/api.services';

export async function deteleProductService(productId: string) {
  return await api.delete(`/products/${productId}`);
}
