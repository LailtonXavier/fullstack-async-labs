import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="products" />
      <Stack.Screen name="details" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
