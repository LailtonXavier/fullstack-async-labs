import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/shared/core/validation';
import { UserRepository } from '../application/repository/user.repository';
import { User } from '../domain/entities/user.entity';
import { 
  ValidationError, 
  ResourceNotFoundError, 
  ConflictError 
} from '@/shared/core/errors/app-errors';
import { UpdateUserDtoType } from '../application/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

type UpdateUserResponse = Either<
  ResourceNotFoundError | ConflictError | ValidationError, 
  User
>;

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UserRepository) {}

  async execute(userId: string, data: UpdateUserDtoType): Promise<UpdateUserResponse> {
    const existingUser = await this.usersRepository.findById(userId);
    if (!existingUser) {
      return left(new ResourceNotFoundError('Usuário não encontrado.'));
    }

    if (data.email && data.email !== existingUser.email) {
      const emailInUse = await this.usersRepository.findByEmail(data.email);
      if (emailInUse) {
        return left(new ConflictError(`O email ${data.email} já está em uso.`));
      }
    }

    let hashedPassword = existingUser.password;
    if (data.password) {
      const saltRounds = 10; 
      hashedPassword = await bcrypt.hash(data.password, saltRounds);
    }

    const userOrError = User.create({
      ...existingUser,
      ...data,    
      id: userId,   
      password: hashedPassword,
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    try {
      const updatedUser = await this.usersRepository.update(
        userId,
        userOrError.value
      );
      return right(updatedUser);
    } catch (error) {
      console.error(`[UpdateUserUseCase] Database Error:`, error);
      return left(new ValidationError('Não foi possível salvar as alterações no momento.'));
    }
  }
}