import { useMutation } from '@tanstack/react-query';
import { uploadImageToCloudinaryService } from '../../infra/http/cloudinary/cloudinaryApi';

export function useCreatePhoto() {
  return useMutation<string, Error, string>({
    mutationFn: (file: string) => uploadImageToCloudinaryService(file),

    onError: () => {
      // toast.error('Erro ao adicionar foto no Cloudinary.');
    },
  });
}
