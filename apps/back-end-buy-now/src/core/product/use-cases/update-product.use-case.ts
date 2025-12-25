import {
  ConflictError,
  ResourceNotFoundError,
  ValidationError
} from '@/shared/core/errors/app-errors';
import { Either, left, right } from '@/shared/core/validation';
import { Injectable } from '@nestjs/common';
import { UpdateProductDtoType } from '../application/dto/update-product.dto';
import { ProductRepository } from '../application/repository/product.repository';
import { Product } from '../domain/entities/product.entity';

type UpdateProductResponse = Either<
  ValidationError | ResourceNotFoundError | ConflictError, 
  Product
>;

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, data: UpdateProductDtoType): Promise<UpdateProductResponse> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      return left(new ResourceNotFoundError(`Produto com ID ${id} não encontrado.`));
    }

    if (data.productCode && data.productCode !== product.productCode) {
      const productWithSameCode = await this.productRepository.findByProductCode(data.productCode);
      
      if (productWithSameCode) {
        return left(new ConflictError(`O código ${data.productCode} já está em uso por outro produto.`));
      }
    }

    const productOrError = Product.create({
      ...product,
      ...data,
      id,
    });

    const updatedProduct = await this.productRepository.update(id, productOrError.value);

    return right(updatedProduct);
  }
}