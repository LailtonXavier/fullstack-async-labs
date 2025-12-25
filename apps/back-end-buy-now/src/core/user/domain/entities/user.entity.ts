import { ValidationError } from '@/shared/core/errors/app-errors';
import { Either, left, right } from '@/shared/core/validation';

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  products?: Array<{
    id: string;
    name: string;
    productCode: string;
    description: string;
    status: string;
    price: string;
    category: string;
    userId: string;
    photo?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }>;
}

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly photo?: string,
    public readonly products?: Array<{
      id: string;
      name: string;
      productCode: string;
      description: string;
      status: string;
      price: string;
      category: string;
      userId: string;
      photo?: string;
      createdAt?: Date;
      updatedAt?: Date;
    }>,
  ) {}

  public static create(props: UserProps): Either<Error, User> {
    if (!props.email.includes('@')) {
      return left(new ValidationError('Email inválido'));
    }

    return right(new User(
      props.id || '',
      props.name,
      props.email,
      props.password,
      props.photo,
      props.products || [],
    ));
  }
}