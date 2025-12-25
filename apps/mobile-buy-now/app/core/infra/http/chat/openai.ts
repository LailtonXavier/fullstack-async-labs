import { Message } from '@/components/chat/ChatProps';
import { prompt } from '../contants/prompt';

export const openAI = async (messages: Message[]): Promise<string> => {

  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey || 'sua_chave_aqui'}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: "system",
            content: prompt
          },
          ...messages.map(msg => ({
            role: msg.isUser ? "user" : "assistant",
            content: msg.text
          }))
        ],
        temperature: 0.7,
        max_tokens: 300
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro da OpenAI:', data);
      return data.error?.message || 'Erro desconhecido.';
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content || content.trim() === '') {
      return "Desculpe, não consegui entender sua pergunta. Tente reformular.";
    }

    return content;
  } catch (error) {
    console.error('Erro geral:', error);
    return 'Erro técnico ao chamar a IA.';
  }
};