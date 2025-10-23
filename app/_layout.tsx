// app/_layout.tsx
// Este é o layout raiz do aplicativo, usando Expo Router.
// Ele é responsável por configurar o provedor de autenticação e a navegação principal.

import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(dashboard)" />
      </Stack>
    </AuthProvider>
  );
}
