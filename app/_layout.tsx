// app/_layout.tsx
// Este é o layout raiz do aplicativo, usando Expo Router.
// Ele é responsável por configurar o provedor de autenticação e a navegação principal.

import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(dashboard)" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
