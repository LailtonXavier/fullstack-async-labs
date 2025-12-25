export default async function generateDescription(data: {
  name: string;
  category: string;
}) {
  const res = await fetch('/api/ai/generate-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Erro ao gerar descrição');

  return res.json();
}