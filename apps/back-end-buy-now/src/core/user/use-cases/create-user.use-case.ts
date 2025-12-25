import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/shared/core/validation';
import { CreateUserDtoType } from '../application/dto/create-user.dto';
import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../application/repository/user.repository';
import { ValidationError, ConflictError } from '@/shared/core/errors/app-errors';
import * as bcrypt from 'bcrypt';

type CreateUserResponse = Either<ValidationError | ConflictError, User>;

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UserRepository) {}

  async execute(data: CreateUserDtoType): Promise<CreateUserResponse> {
    const userExists = await this.usersRepository.findByEmail(data.email);
    if (userExists) {
      return left(new ConflictError(`O email ${data.email} já está em uso.`));
    }

    if (!data.password) {
      return left(new ValidationError('A senha é obrigatória.'));
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userOrError = User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      photo: data.photo
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    await this.usersRepository.create(user);

    return right(user);
  }
}

