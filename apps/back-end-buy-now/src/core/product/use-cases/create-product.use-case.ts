import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/shared/core/validation';
import { CreateProductDtoType } from '../application/dto/create-product.dto';
import { Product } from '../domain/entities/product.entity';
import { ProductRepository } from '../application/repository/product.repository';
import { ValidationError, ConflictError, ResourceNotFoundError } from '@/shared/core/errors/app-errors';

type CreateProductResponse = Either<
  ValidationError | ResourceNotFoundError | ConflictError, 
  Product
>;

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductDtoType): Promise<CreateProductResponse> {
    const productExists = await this.productRepository.findByProductCode(data.productCode);
    
    if (productExists) {
      return left(new ConflictError(`O código ${data.productCode} já está em uso por outro produto.`));
    }

    const productOrError = Product.create({
      name: data.name,
      productCode: data.productCode,
      description: data.description,
      status: data.status,
      price: data.price,
      category: data.category,
      userId: data.userId,
      photo: data.photo,
    });

    if (productOrError.isLeft()) {
      return left(productOrError.value);
    }

    const product = productOrError.value;
    await this.productRepository.create(product);

    return right(product);
  }
}