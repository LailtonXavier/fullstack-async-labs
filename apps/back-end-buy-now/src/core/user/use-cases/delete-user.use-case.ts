import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/shared/core/validation';
import { UserRepository } from '../application/repository/user.repository';
import { 
  ValidationError, 
  ResourceNotFoundError, 
  UnauthorizedError 
} from '@/shared/core/errors/app-errors';
import * as bcrypt from 'bcrypt';

type DeleteUserResponse = Either<
  ResourceNotFoundError | UnauthorizedError | ValidationError, 
  boolean
>;

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UserRepository) {}

  async execute(userId: string, password: string): Promise<DeleteUserResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError('Usuário não encontrado.'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return left(new UnauthorizedError('Senha incorreta. Operação não autorizada.'));
    }

    try {
      await this.usersRepository.delete(userId);
      return right(true);
    } catch (error) {
      console.error(`[DeleteUserUseCase] Error deleting user ${userId}:`, error);
      return left(new ValidationError('Não foi possível processar a exclusão no momento.'));
    }
  }
}