import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { useColorScheme } from '@/hooks/use-color-scheme';
import ToastProvider from './providers/ToastProvider';


const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthGuard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
            <Stack.Screen name="(chat)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="dark" />
          </AuthGuard>
        </ThemeProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}