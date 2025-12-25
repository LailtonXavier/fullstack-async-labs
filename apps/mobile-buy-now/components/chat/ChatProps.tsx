export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Olá! Sou seu assistente de treinos. Como posso te ajudar com musculação ou exercícios hoje?',
    isUser: false,
    timestamp: new Date()
  }
];