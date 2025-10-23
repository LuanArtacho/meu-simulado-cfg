import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import SimuladoCard from '../../components/SimuladoCard';
import StatsCard from '../../components/StatsCard';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useSimuladoStore } from '../../store/useSimuladoStore';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { colors } = useTheme();
  const { getRecentResults, addResult, results } = useSimuladoStore();
  const recentResults = getRecentResults(4);
  
  // Calcular estatísticas
  const totalSimulados = results.length;
  const mediaGeral = results.length > 0 
    ? (results.reduce((acc, r) => acc + r.percentage, 0) / results.length).toFixed(1)
    : '0';
  const aprovacoes = results.filter(r => r.percentage >= 70).length;
  const melhorNota = results.length > 0 
    ? Math.max(...results.map(r => r.percentage)).toFixed(0)
    : '0';

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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Olá, {user?.email?.split('@')[0]}!</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Acompanhe seu progresso</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatsCard 
          title="Total de Simulados" 
          value={totalSimulados} 
        />
        <StatsCard 
          title="Média Geral" 
          value={`${mediaGeral}%`}
          color={Number(mediaGeral) >= 70 ? '#16a34a' : '#dc2626'}
        />
      </View>
      
      <View style={styles.statsContainer}>
        <StatsCard 
          title="Aprovações" 
          value={aprovacoes}
          subtitle={`de ${totalSimulados} simulados`}
          color="#16a34a"
        />
        <StatsCard 
          title="Melhor Nota" 
          value={`${melhorNota}%`}
          color="#0284c7"
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Últimos Simulados</Text>

      {recentResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          {recentResults.map((result) => (
            <SimuladoCard key={result.id} result={result} />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Nenhum simulado realizado ainda</Text>
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
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  actionContainer: {
    padding: 20,
    marginTop: 20,
  },
});