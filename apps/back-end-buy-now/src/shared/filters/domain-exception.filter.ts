import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { 
  ValidationError, 
  UnauthorizedError, 
  ResourceNotFoundError, 
  ConflictError, 
  ForbiddenError
} from '@/shared/core/errors/app-errors';
import { DomainError } from '../core/errors/domain-error';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorMap: Record<string, number> = {
      [ValidationError.name]: HttpStatus.BAD_REQUEST,
      [UnauthorizedError.name]: HttpStatus.UNAUTHORIZED,
      [ResourceNotFoundError.name]: HttpStatus.NOT_FOUND,
      [ConflictError.name]: HttpStatus.CONFLICT,
      [ForbiddenError.name]: HttpStatus.FORBIDDEN,
    };

    const status = errorMap[exception.name] || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}