import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { sign, verify, TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedError } from '@/shared/core/errors/app-errors';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  signAccessToken(payload: { sub: string; email: string }): string {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not defined in environment');
    }

    return this.nestJwtService.sign(payload, {
      expiresIn: '1d',
      secret: secret,
    });
  }

  signRefreshToken(payload: { sub: string; email: string }): string {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not defined in environment');
    }

    return sign(payload, secret, {
      expiresIn: '7d', 
    });
  }

  verifyRefreshToken(token: string): { sub: string; email: string } {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not defined');
    }

    try {
      const decoded = verify(token, secret);
      return decoded as { sub: string; email: string };
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError('Refresh token expirado');
      }
      
      throw new UnauthorizedError('Refresh token inválido');
    }
  }
}