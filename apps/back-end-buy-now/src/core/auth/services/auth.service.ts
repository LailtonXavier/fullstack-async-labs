import { CreateUserUseCase } from '@/core/user/use-cases/create-user.use-case';
import { UserService } from '@/core/user/user.service';
import { ResourceNotFoundError, UnauthorizedError } from '@/shared/core/errors/app-errors';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../application/dto/register.dto';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    return user;
  }

  login(user: { id: string; email: string }) {
    const accessToken = this.jwtService.signAccessToken({
      sub: user.id,
      email: user.email,
    });

    const refreshToken = this.jwtService.signRefreshToken({
      sub: user.id,
      email: user.email,
    });

    return { accessToken, refreshToken, userId: user.id };
  }

  async register(registerDto: RegisterDto) {
    const result = await this.createUserUseCase.execute(registerDto);

    if (result.isLeft()) {
      throw result.value; 
    }

    const user = result.value;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    };
  }

  async refreshToken(token: string) {
    const payload = this.jwtService.verifyRefreshToken(token);

    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new ResourceNotFoundError('Usuário não encontrado');
    }

    const accessToken = this.jwtService.signAccessToken({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}