import { ResourceNotFoundError } from '@/shared/core/errors/app-errors';
import { Either, left, right } from '@/shared/core/validation';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../application/repository/product.repository';

type DeleteProductResponse = Either<ResourceNotFoundError, boolean>;

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<DeleteProductResponse> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      return left(new ResourceNotFoundError(`Produto com ID ${id} não encontrado.`));
    }

    const deleted = await this.productRepository.delete(id);
    return right(deleted);
  }
}