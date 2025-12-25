import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ProductRepository } from '@/core/product/application/repository/product.repository';
import { Product } from '@/core/product/domain/entities/product.entity';
import { PrismaProduct } from '@/core/product/domain/types/prisma-product.type';
import { ListProductsDtoType } from '@/core/product/application/dto/list-products.dto';
import { PaginatedProducts } from '@/core/product/domain/types/paginated-products.type';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        productCode: product.productCode,
        description: product.description,
        status: product.status,
        price: product.price,
        category: product.category,
        userId: product.userId,
        photo: product.photo,
      },
    });

    return this.toDomain(createdProduct);
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        name: product.name,
        productCode: product.productCode,
        description: product.description,
        price: product.price,
        category: product.category,
        status: product.status,
        photo: product.photo,
        updatedAt: new Date(),
      },
    });

    return this.toDomain(updatedProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product ? this.toDomain(product) : null;
  }

  async listProducts(params: ListProductsDtoType): Promise<PaginatedProducts> {
    const { page, limit, status, price, category } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (price) {
      where.price = price;
    } 
    
    if (category) {
      where.category = category;
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      products: products.map(product => this.toDomain(product)),
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findByProductCode(productCode: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { productCode },
    });
    return product ? this.toDomain(product) : null;
  }

  async findByUserId(userId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return products.map(product => this.toDomain(product));
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.product.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Erro ao deletar produto no Prisma:', error);
      return false;
    }
  }

  private toDomain(product: PrismaProduct): Product {
    const result = Product.create({
      id: product.id,
      name: product.name,
      productCode: product.productCode,
      description: product.description,
      status: product.status,
      price: product.price,
      category: product.category,
      userId: product.userId,
      photo: product.photo ?? undefined,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}