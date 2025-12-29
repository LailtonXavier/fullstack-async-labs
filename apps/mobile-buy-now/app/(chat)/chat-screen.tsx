import { ChatHeader } from '@/components/chat/chat-header';
import { Message } from '@/components/chat/ChatProps';
import { InputChat } from '@/components/chat/input-chat';
import { RenderMessage } from '@/components/chat/render-message';
import { TypingIndicator } from '@/components/chat/typing-indicator';
import { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { openAI } from '../core/infra/http/chat/openai';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente da BUY.NOW. Posso te ajudar a escolher a melhor cadeira para seu conforto 😊',
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  async function handleSend() {
    if (!newMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await openAI([...messages, userMessage]);

      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ChatHeader />
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <RenderMessage item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
        {isLoading && <TypingIndicator />}
        <InputChat
          value={newMessage}
          onMessageChange={setNewMessage}
          handleSend={handleSend}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  list: {
    flexGrow: 1,
    paddingVertical: 12,
  },
});
