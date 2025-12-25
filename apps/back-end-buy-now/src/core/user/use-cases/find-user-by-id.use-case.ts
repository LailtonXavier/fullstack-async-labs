import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/shared/core/validation';
import { UserRepository } from '../application/repository/user.repository';
import { User } from '../domain/entities/user.entity';
import { ResourceNotFoundError } from '@/shared/core/errors/app-errors';

type FindUserByIdResponse = Either<ResourceNotFoundError, User>;

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<FindUserByIdResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFoundError(`Usuário com ID "${id}" não encontrado.`));
    }

    return right(user);
  }
}