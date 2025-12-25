import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ProductRepository } from './application/repository/product.repository';
import { ProductGateway } from './infra/gateways/product.gateway';
import { ProductController } from './infra/http/controllers/product.controller';
import { PrismaProductRepository } from './infra/prisma/repositories/prisma-product.repository';
import { ProductProcessor } from './infra/queues/processors/product.processor';
import { ProductQueueProducer } from './infra/queues/producers/product-queue.producer';
import { CreateProductAsyncUseCase } from './use-cases/create-product-async.use-case';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { FindProductByIdUseCase } from './use-cases/find-product-by-id.use-case';
import { FindProductsByUserUseCase } from './use-cases/find-products-by-user.use-case';
import { GetProductJobStatusUseCase } from './use-cases/get-product-job-status.use-case';
import { ListProductsUseCase } from './use-cases/list-products.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'product-queue',
    }),
  ],
  controllers: [ProductController],
  providers: [
    PrismaService,
    CreateProductUseCase,
    CreateProductAsyncUseCase,
    GetProductJobStatusUseCase,
    UpdateProductUseCase,
    FindProductByIdUseCase,
    FindProductsByUserUseCase,
    ListProductsUseCase,
    DeleteProductUseCase,
    ProductProcessor,
    ProductQueueProducer,
    ProductGateway,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [ProductRepository],
})
export class ProductModule {}