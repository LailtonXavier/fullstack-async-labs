import { UserRepository } from '@/core/user/application/repository/user.repository';
import { User } from '@/core/user/domain/entities/user.entity';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id || undefined,
        name: user.name,
        email: user.email,
        password: user.password,
        photo: user.photo,
      },
    });

    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password,
      createdUser.photo
    );
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        photo: user.photo,
        updatedAt: new Date(),
      },
    });
  
    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.password,
      updatedUser.photo
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            productCode: true,
            description: true,
            status: true,
            price: true,
            category: true,
            userId: true,
            photo: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  
    return user ? this.toDomain(user) : null;
  }
  
  private toDomain(prismaUser: any): User {
    const result = User.create({
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      photo: prismaUser.photo,
      products: prismaUser.products?.map(product => ({
        id: product.id,
        name: product.name,
        productCode: product.productCode,
        description: product.description,
        status: product.status,
        price: product.price,
        category: product.category,
        userId: product.userId,
        photo: product.photo,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
    });

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Erro ao deletar no Prisma:', error);
      return false;
    }
  }
  
}