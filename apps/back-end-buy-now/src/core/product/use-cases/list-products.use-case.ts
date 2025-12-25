import { Either, right } from '@/shared/core/validation';
import { Injectable } from '@nestjs/common';
import { ListProductsDtoType } from '../application/dto/list-products.dto';
import { ProductRepository } from '../application/repository/product.repository';
import { PaginatedProducts } from '../domain/types/paginated-products.type';

type ListProductsResponse = Either<never, PaginatedProducts>;

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(params: ListProductsDtoType): Promise<ListProductsResponse> {
    const paginatedProducts = await this.productRepository.listProducts(params);
    return right(paginatedProducts);
  }
}