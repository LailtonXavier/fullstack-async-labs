import { ResourceNotFoundError } from '@/shared/core/errors/app-errors';
import { Either, left, right } from '@/shared/core/validation';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../application/repository/product.repository';
import { Product } from '../domain/entities/product.entity';

type FindProductByIdResponse = Either<ResourceNotFoundError, Product>;

@Injectable()
export class FindProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<FindProductByIdResponse> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      return left(new ResourceNotFoundError(`Produto com ID ${id} não encontrado.`));
    }

    return right(product);
  }
}