// app/(dashboard)/_layout.tsx
// Layout para a seção do aplicativo que requer autenticação.
// Utiliza Tabs para criar a navegação por abas na parte inferior da tela.

import { Ionicons } from '@expo/vector-icons'; // Exemplo de ícones
import { Tabs } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#3b82f6', // Azul
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="simulados"
        options={{
          title: 'Simulados',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="resultados"
        options={{
          title: 'Resultados',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: 'Configurações',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
