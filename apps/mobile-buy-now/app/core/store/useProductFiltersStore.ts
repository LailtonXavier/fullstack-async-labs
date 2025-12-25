import { create } from 'zustand';
import { ProductProps } from '../domain/entities/product';

type ProductFiltersState = {
  productSelected: ProductProps | null;
  page: number;
  limit: number;
  status?: string;
  category?: string;
  price?: string;

  setProductSelected: (product: ProductProps) => void;
  setCategory: (category?: string) => void;
  setStatus: (status?: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED') => void;
  setPrice: (price?: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
};

export const useProductFiltersStore = create<ProductFiltersState>((set) => ({
  productSelected: null,
  page: 1,
  limit: 10,
  status: undefined,
  category: undefined,
  price: undefined,

  setCategory: (category) =>
    set(() => ({ category, page: 1 })),
  
  setProductSelected: (productSelected) =>
    set(() => ({ productSelected })),

  setStatus: (status) =>
    set(() => ({ status, page: 1 })),

  setPrice: (price) =>
    set(() => ({ price, page: 1 })),

  setPage: (page) =>
    set(() => ({ page })),

  resetFilters: () =>
    set(() => ({
      page: 1,
      limit: 10,
      status: undefined,
      category: undefined,
      price: undefined,
    })),
}));