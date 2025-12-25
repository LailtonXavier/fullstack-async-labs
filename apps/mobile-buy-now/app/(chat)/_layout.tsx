import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';

export default function ChatLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack 
      screenOptions={{
        headerTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
      }}>
      <Stack.Screen name="chat-screen" />
    </Stack>
  );
}
