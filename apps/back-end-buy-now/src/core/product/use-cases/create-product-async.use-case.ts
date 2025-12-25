import { ConflictError } from '@/shared/core/errors/app-errors';
import { Either, left, right } from '@/shared/core/validation';
import { Injectable } from '@nestjs/common';
import { CreateProductDtoType } from '../application/dto/create-product.dto';
import { ProductRepository } from '../application/repository/product.repository';
import { JobResponse } from '../domain/types/job-response.type';
import { ProductQueueProducer } from '../infra/queues/producers/product-queue.producer';

type CreateProductAsyncResponse = Either<ConflictError, JobResponse>;

@Injectable()
export class CreateProductAsyncUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productQueueProducer: ProductQueueProducer,
  ) {}

  async execute(data: CreateProductDtoType): Promise<CreateProductAsyncResponse> {
    const productExists = await this.productRepository.findByProductCode(data.productCode);
    
    if (productExists) {
      return left(new ConflictError(`O código ${data.productCode} já está em uso por outro produto.`));
    }

    const result = await this.productQueueProducer.addCreateProductJob({
      name: data.name,
      productCode: data.productCode,
      description: data.description,
      status: data.status,
      price: data.price,
      category: data.category,
      userId: data.userId,
      photo: data.photo,
    });

    return right(result);
  }
}