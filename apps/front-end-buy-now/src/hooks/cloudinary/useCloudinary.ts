import { uploadImageToCloudinary } from '@/core/infra/controllers/cloudinary/cloudinaryApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreatePhoto() {
  return useMutation<string, Error, File>({
    mutationFn: (file: File) => uploadImageToCloudinary(file),

    onError: () => {
      toast.error('Erro ao adicionar foto no Cloudinary.');
    },
  });
}
