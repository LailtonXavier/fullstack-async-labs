import { productDescriptionPrompt } from '../contants/description-product-prompt';

interface GenerateDescriptionParams {
  name: string;
  category: string;
}

export async function generateProductDescription({
  name,
  category,
}: GenerateDescriptionParams): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

  const userPrompt = `
Crie uma descrição para o seguinte produto:

Nome do produto: ${name}
Categoria: ${category}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: productDescriptionPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.6,
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return 'Erro ao gerar descrição do produto.';
    }

    return data.choices?.[0]?.message?.content ?? '';
  } catch (error) {
    console.error(error);
    return 'Erro técnico ao gerar descrição.';
  }
}
