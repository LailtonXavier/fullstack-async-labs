import { ProductProps } from './product';

export interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  photo?: string,
  products?: ProductProps[]
}
