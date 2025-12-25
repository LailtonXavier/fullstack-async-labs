import { DomainError } from './domain-error';

export class ValidationError extends DomainError {}
export class UnauthorizedError extends DomainError {}
export class ResourceNotFoundError extends DomainError {}
export class ConflictError extends DomainError {}
export class ForbiddenError extends DomainError {}