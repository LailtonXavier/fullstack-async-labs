import { ValidationError } from '@/shared/core/errors/app-errors';
import { Either, left, right } from '@/shared/core/validation';
import { ProductStatus } from '../types/product-status.type';
import { ProductCategories } from '../types/product-category.type';

export interface ProductProps {
  id?: string;
  name: string;
  productCode: string;
  description: string;
  status: ProductStatus;
  price: string;
  category: ProductCategories;
  userId: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly productCode: string,
    public readonly description: string,
    public readonly status: ProductStatus,
    public readonly price: string,
    public readonly category: ProductCategories,
    public readonly userId: string,
    public readonly photo?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: ProductProps): Either<ValidationError, Product> {
    if (!props.name || props.name.length < 2) {
      return left(new ValidationError('O nome deve ter pelo menos 2 caracteres.'));
    }

    if (!props.productCode || props.productCode.length < 1) {
      return left(new ValidationError('O código do produto é obrigatório.'));
    }

    if (!props.description || props.description.length < 1) {
      return left(new ValidationError('A descrição é obrigatória.'));
    }

    if (!props.userId) {
      return left(new ValidationError('O ID do usuário é obrigatório.'));
    }

    const product = new Product(
      props.id || crypto.randomUUID(),
      props.name,
      props.productCode,
      props.description,
      props.status || 'ACTIVE',
      props.price,
      props.category || 'Featured',
      props.userId,
      props.photo,
      props.createdAt,
      props.updatedAt,
    );

    return right(product);
  }
}