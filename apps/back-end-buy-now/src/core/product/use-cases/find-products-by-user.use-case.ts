import { Either, right } from '@/shared/core/validation';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../application/repository/product.repository';
import { Product } from '../domain/entities/product.entity';

type FindProductsByUserResponse = Either<never, Product[]>;

@Injectable()
export class FindProductsByUserUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(userId: string): Promise<FindProductsByUserResponse> {
    const products = await this.productRepository.findByUserId(userId);
    return right(products);
  }
}