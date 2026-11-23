import { Stack } from 'expo-router';

export default function PlansLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="propose" options={{ headerShown: false }} />
    </Stack>
  );
}
