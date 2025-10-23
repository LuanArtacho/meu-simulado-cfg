// app/(dashboard)/simulados/_layout.tsx
// Layout para a seção de simulados, permite navegação interna.
import { Stack } from 'expo-router';

export default function SimuladoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="modulos" />
      <Stack.Screen name="completos" />
      <Stack.Screen name="pontuais" />
      <Stack.Screen name="fazer" />
      <Stack.Screen name="review/[id]" />
    </Stack>
  );
}
