import { UserPayload } from '@/core/auth/application/types/user-payload';
import { CurrentUser } from '@/core/auth/infra/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/core/auth/infra/guards/jwt-auth.guard';
import { CreateProductDtoType } from '@/core/product/application/dto/create-product.dto';
import { ListProductsDtoType } from '@/core/product/application/dto/list-products.dto';
import { UpdateProductDtoType } from '@/core/product/application/dto/update-product.dto';
import { CreateProductAsyncUseCase } from '@/core/product/use-cases/create-product-async.use-case';
import { CreateProductUseCase } from '@/core/product/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '@/core/product/use-cases/delete-product.use-case';
import { FindProductByIdUseCase } from '@/core/product/use-cases/find-product-by-id.use-case';
import { FindProductsByUserUseCase } from '@/core/product/use-cases/find-products-by-user.use-case';
import { GetProductJobStatusUseCase } from '@/core/product/use-cases/get-product-job-status.use-case';
import { ListProductsUseCase } from '@/core/product/use-cases/list-products.use-case';
import { UpdateProductUseCase } from '@/core/product/use-cases/update-product.use-case';
import { ForbiddenError } from '@/shared/core/errors/app-errors';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ProductQueueProducer } from '../../queues/producers/product-queue.producer';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly createProductAsync: CreateProductAsyncUseCase,
    private readonly getProductJobStatus: GetProductJobStatusUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly findProductById: FindProductByIdUseCase,
    private readonly findProductsByUser: FindProductsByUserUseCase,
    private readonly listProducts: ListProductsUseCase,
    private readonly deleteProduct: DeleteProductUseCase,
    private readonly productQueueProducer: ProductQueueProducer,
  ) {}

  @Get()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED',
    @Query('category') category?: 'Featured' | 'Chairs' | 'Armchairs'| 'TableLamp'| 'CeilingLight'| 'Decors'| 'Rugs'| 'Cushions',
    @Query('price') price?: string,
  ) {
    const params: ListProductsDtoType = {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
      status,
      price,
      category,
    };

    const result = await this.listProducts.execute(params);
    return result.value;
  }

  @Post()
  async create(
    @Body() body: CreateProductDtoType,
    @CurrentUser() user: UserPayload
  ) {
    const result = await this.createProductAsync.execute({
      ...body,
      userId: user.userId,
    });
    
    if (result.isLeft()) throw result.value;
    
    return {
      ...result.value,
      statusUrl: `/products/job/${result.value.jobId}`,
    };
  }

  @Get('job/:jobId')
  async getJobStatus(@Param('jobId') jobId: string) {
    const result = await this.getProductJobStatus.execute(jobId);
    return result.value;
  }

  @Get('queue/stats')
  async getQueueStats() {
    return await this.productQueueProducer.getAllJobs();
  }

  @Post('sync')
  async createSync(
    @Body() body: CreateProductDtoType,
    @CurrentUser() user: UserPayload
  ) {
    const result = await this.createProduct.execute({
      ...body,
      userId: user.userId,
    });
    
    if (result.isLeft()) throw result.value;
    
    return result.value;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateProductDtoType,
    @CurrentUser() currentUser: UserPayload
  ) {
    if (updateData.userId !== currentUser.userId) {
      throw new ForbiddenError('Você só pode atualizar seus próprios produtos');
    }

    const result = await this.updateProduct.execute(id, updateData);
    if (result.isLeft()) throw result.value;

    return result.value;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.findProductById.execute(id);
    
    if (result.isLeft()) throw result.value;

    return result.value;
  }

  @Get('user/me')
  async findByUser(@CurrentUser() user: UserPayload) {
    const result = await this.findProductsByUser.execute(user.userId);
    
    return result.value;
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserPayload
  ) {
    const productResult = await this.findProductById.execute(id);
    if (productResult.isLeft()) throw productResult.value;

    if (productResult.value.userId !== currentUser.userId) {
      throw new ForbiddenError('Você só pode deletar seus próprios produtos');
    }

    const result = await this.deleteProduct.execute(id);
    if (result.isLeft()) throw result.value;

    return { success: true, message: 'Produto deletado com sucesso' };
  }
}