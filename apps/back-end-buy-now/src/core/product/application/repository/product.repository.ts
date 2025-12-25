import { Product } from '../../domain/entities/product.entity';
import { PaginatedProducts } from '../../domain/types/paginated-products.type';
import { ListProductsDtoType } from '../dto/list-products.dto';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract update(id: string, product: Partial<Product>): Promise<Product>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findByProductCode(productCode: string): Promise<Product | null>;
  abstract listProducts(params: ListProductsDtoType): Promise<PaginatedProducts>;
  abstract findByUserId(userId: string): Promise<Product[]>;
  abstract delete(id: string): Promise<boolean>;
}