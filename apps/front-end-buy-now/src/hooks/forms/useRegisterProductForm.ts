import { CreateProductDto, CreateProductDtoType } from '@/core/domain/dto/create-product.dto';
import { UpdateProductDtoType } from '@/core/domain/dto/update-product.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type InitialValuesType = Partial<CreateProductDtoType & UpdateProductDtoType>;

export const useRegisterProductForm = (initialValues?: InitialValuesType) => {
  return useForm<CreateProductDtoType>({
    resolver: zodResolver(CreateProductDto),
    mode: 'onChange',
    defaultValues: {
      name: '',
      productCode: '',
      description: '',
      price: '',
      status: 'ACTIVE', 
      category: 'Featured',
      userId: '', 
      photo: null,
      ...initialValues
    } as CreateProductDtoType
  });
};