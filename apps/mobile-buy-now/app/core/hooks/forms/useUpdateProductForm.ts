import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UpdateProductDto, UpdateProductDtoType } from '../../domain/dto/update-product.dto';

export const useUpdateProductForm = () => {
  return useForm<UpdateProductDtoType>({
    resolver: zodResolver(UpdateProductDto),
    mode: 'onChange',
    defaultValues: {
      name: '',
      productCode: '',
      description: '',
      price: '',
      status: 'ACTIVE', 
      category: 'Featured',
      userId: '',
      photo: null
    }
  });
};
