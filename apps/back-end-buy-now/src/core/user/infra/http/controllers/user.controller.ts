import { UserPayload } from '@/core/auth/application/types/user-payload';
import { CurrentUser } from '@/core/auth/infra/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/core/auth/infra/guards/jwt-auth.guard';
import { CreateUserDtoType } from '@/core/user/application/dto/create-user.dto';
import { UpdateUserDtoType } from '@/core/user/application/dto/update-user.dto';
import { CreateUserUseCase } from '@/core/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '@/core/user/use-cases/delete-user.use-case';
import { FindUserByIdUseCase } from '@/core/user/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from '@/core/user/use-cases/update-user.use-case';
import { getErrorMessage } from '@/shared/core/validation';
import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpCode, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDtoType) {
    const result = await this.createUser.execute(body);
    
    if (result.isLeft()) {
      const error = result.value;
      
      throw new BadRequestException(getErrorMessage(error));
    }
    
    return result.value;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserPayload,
    @Body() updateData: UpdateUserDtoType
  ) {
    if (currentUser.userId !== id) {
      throw new ForbiddenException('Você só pode atualizar sua própria conta');
    }

    const result = await this.updateUserUseCase.execute(id, updateData);
    
    if (result.isLeft()) {
      throw result.value;
    }

    const { ...userWithoutPassword } = result.value;
    return userWithoutPassword;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findById(
    @CurrentUser() userPayload: UserPayload
  ) {
    const result = await this.findUserByIdUseCase.execute(userPayload.userId);
    
    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }

    const user = result.value;
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      products: user.products || []
    };
  }

  @Post(':id/delete')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async execute(
    @Param('id') id: string,
    @Body('password') password: string,
    @CurrentUser() user: UserPayload
  ) {

    if (user.userId !== id) {
      throw new ForbiddenException('Você só pode deletar sua própria conta');
    }

    const result = await this.deleteUserUseCase.execute(id, password);
    
    if (result.isLeft()) {
      throw result.value;
    }

    return { success: true, message: 'Usuário deletado com sucesso' };
  }
}
