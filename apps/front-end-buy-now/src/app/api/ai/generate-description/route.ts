import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { name, category } = await req.json();

  if (!name || !category) {
    return NextResponse.json(
      { error: 'Nome e categoria são obrigatórios' },
      { status: 400 }
    );
  }

  const prompt = `
Crie uma descrição de produto em português, com tom sofisticado e comercial.

Produto: ${name}
Categoria: ${category}

A descrição deve ser curta (2 parágrafos), elegante e voltada para e-commerce de design premium.
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Você é um especialista em copywriting para e-commerce.' },
      { role: 'user', content: prompt },
    ],
  });

  const description = completion.choices[0].message.content;

  return NextResponse.json({ description });
}
