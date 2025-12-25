import { UpdateProductDto, UpdateProductDtoType } from '@/core/domain/dto/update-product.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
