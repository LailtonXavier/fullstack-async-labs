import generateDescription from '@/core/infra/controllers/ai/generateDescriptionApi';
import { useMutation } from '@tanstack/react-query';

export function useGenerateDescription() {
  return useMutation({
    mutationFn: generateDescription,
  });
}