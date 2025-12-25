'use client';

import { Sparkles } from 'lucide-react';
import { useGenerateDescription } from '@/hooks/ai/useGenerateDescription';

interface GenerateDescriptionButtonProps {
  name?: string;
  category?: string;
  onGenerated: (description: string) => void;
}

export function GenerateDescriptionButton({
  name,
  category,
  onGenerated,
}: GenerateDescriptionButtonProps) {
  const generateDescription = useGenerateDescription();

  function handleGenerate() {
    if (!name || !category) return;

    generateDescription.mutate(
      { name, category },
      {
        onSuccess: (data) => {
          onGenerated(data.description);
        },
      }
    );
  }

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={generateDescription.isPending || !name || !category}
      className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition disabled:opacity-50"
    >
      <Sparkles className="h-4 w-4 text-yellow-400" />
      {generateDescription.isPending
        ? 'Criando magia...'
        : 'Gerar com IA'}
    </button>
  );
}
