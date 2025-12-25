import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ProductRepository } from '@/core/product/application/repository/product.repository';
import { Product } from '@/core/product/domain/entities/product.entity';
import { ProductGateway } from '../../gateways/product.gateway';

export interface CreateProductJobData {
  productData: {
    name: string;
    productCode: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
    category: 'Featured' | 'Chairs' | 'Armchairs'| 'TableLamp'| 'CeilingLight'| 'Decors'| 'Rugs'| 'Cushions';
    price:  string;
    userId: string;
    photo?: string;
  };
}

@Processor('product-queue')
export class ProductProcessor {
  private readonly logger = new Logger(ProductProcessor.name);

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productGateway: ProductGateway, // Injetar o Gateway
  ) {}

  @Process('create-product')
  async handleCreateProduct(job: Job<CreateProductJobData>) {
    this.logger.log(`Processando job ${job.id} - Criando produto: ${job.data.productData.name}`);

    const { userId } = job.data.productData;

    try {
      await job.progress(10);
      this.productGateway.notifyJobProgress(userId, String(job.id), 10);

      await this.simulateHeavyProcessing();

      await job.progress(50);
      this.productGateway.notifyJobProgress(userId, String(job.id), 50);

      const productOrError = Product.create(job.data.productData);

      if (productOrError.isLeft()) {
        this.logger.error(`Erro ao criar produto: ${productOrError.value.message}`);

        this.productGateway.notifyProductCreationFailed(
          userId,
          String(job.id),
          productOrError.value.message
        );

        throw productOrError.value;
      }

      const product = productOrError.value;

      await job.progress(75);
      this.productGateway.notifyJobProgress(userId, String(job.id), 75);

      const savedProduct = await this.productRepository.create(product);

      await job.progress(100);
      this.productGateway.notifyJobProgress(userId, String(job.id), 100);

      this.logger.log(`Produto ${savedProduct.id} criado com sucesso!`);

      this.productGateway.notifyProductCreated(userId, {
        id: savedProduct.id,
        name: savedProduct.name,
        productCode: savedProduct.productCode,
        description: savedProduct.description,
        status: savedProduct.status,
        photo: savedProduct.photo,
        price: savedProduct.price,
        category: savedProduct.category,
        userId: savedProduct.userId,
        createdAt: savedProduct.createdAt,
        updatedAt: savedProduct.updatedAt,
      });

      return {
        success: true,
        productId: savedProduct.id,
        message: 'Produto criado com sucesso',
      };
    } catch (error) {
      this.logger.error(`Erro ao processar job ${job.id}:`, error);
      throw error;
    }
  }

  private async simulateHeavyProcessing(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.logger.log('Processamento pesado concluído (validações, APIs externas, etc)');
        resolve();
      }, 10000);
    });
  }
}