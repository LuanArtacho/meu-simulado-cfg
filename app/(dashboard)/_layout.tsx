// app/(dashboard)/_layout.tsx
// Layout para a seção do aplicativo que requer autenticação.
// Utiliza Tabs para criar a navegação por abas na parte inferior da tela.

import { Ionicons } from '@expo/vector-icons'; // Exemplo de ícones
import { Tabs } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false, // Opcional: pode usar um header customizado
      tabBarActiveTintColor: '#3b82f6', // Azul
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="simulados"
        options={{
          title: 'Simulados',
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="resultados/index"
        options={{
          title: 'Resultados',
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="configuracoes/index"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
