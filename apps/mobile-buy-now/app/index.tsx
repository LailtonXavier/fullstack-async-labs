import { Redirect } from 'expo-router';
import { useAuthStore } from './core/store/authStore';

export default function Index() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return null;

  return (
    <Redirect
      href={isAuthenticated ? '/(tabs)/products' : '/(auth)/login'}
    />
  );
}
