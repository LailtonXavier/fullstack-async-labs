import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './infra/http/controllers/auth.controller';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { RefreshTokenStrategy } from './infra/strategies/refresh-token.strategy';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
  exports: [JwtService],
})
export class AuthModule {}
