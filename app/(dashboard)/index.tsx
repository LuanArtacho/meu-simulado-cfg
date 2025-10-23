import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import SimuladoCard from '../../components/SimuladoCard';
import { useSimuladoStore } from '../../store/useSimuladoStore';

export default function DashboardScreen() {
  const router = useRouter();
  const { getRecentResults, addResult } = useSimuladoStore();
  const recentResults = getRecentResults(4);

  // Dados de exemplo - remova isso quando tiver dados reais
  useEffect(() => {
    if (recentResults.length === 0) {
      // Adicionando alguns resultados de exemplo
      addResult({
        userId: 'user1',
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        timestamp: new Date(Date.now() - 86400000), // 1 dia atrás
        modulo: 'Simulado Completo',
      });
      addResult({
        userId: 'user1',
        score: 6,
        totalQuestions: 10,
        percentage: 60,
        timestamp: new Date(Date.now() - 172800000), // 2 dias atrás
        modulo: 'Módulo 1',
      });
      addResult({
        userId: 'user1',
        score: 9,
        totalQuestions: 10,
        percentage: 90,
        timestamp: new Date(Date.now() - 259200000), // 3 dias atrás
        modulo: 'Simulado Geral',
      });
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Seus últimos simulados</Text>
      </View>

      {recentResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          {recentResults.map((result) => (
            <SimuladoCard key={result.id} result={result} />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nenhum simulado realizado ainda</Text>
          <Button 
            title="Fazer Primeiro Simulado" 
            onPress={() => router.push('/(dashboard)/simulados')} 
          />
        </View>
      )}

      <View style={styles.actionContainer}>
        <Button 
          title="Novo Simulado" 
          onPress={() => router.push('/(dashboard)/simulados')} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionContainer: {
    padding: 20,
    marginTop: 20,
  },
});