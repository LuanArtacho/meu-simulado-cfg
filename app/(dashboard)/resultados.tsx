import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SimuladoCard from '../../components/SimuladoCard';
import StatsCard from '../../components/StatsCard';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { getUserResults } from '../../services/firestoreService';
import { Result } from '../../types/simulado';
import { useFocusEffect } from '@react-navigation/native';

export default function ResultadosScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const loadResults = async () => {
    if (user?.uid) {
      try {
        console.log('🔄 Carregando resultados para usuário:', user.uid);
        const firebaseResults = await getUserResults(user.uid);
        setResults(firebaseResults);
        console.log('✅ Resultados carregados:', firebaseResults.length);
      } catch (error) {
        console.error('❌ Erro ao carregar resultados:', error);
      }
    }
    setLoading(false);
    setRefreshing(false);
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    await loadResults();
  };
  
  useEffect(() => {
    loadResults();
  }, [user]);
  
  useFocusEffect(
    useCallback(() => {
      loadResults();
    }, [user])
  );
  
  // Estatísticas por módulo
  const estatisticasPorModulo = results.reduce((acc, result) => {
    const modulo = result.modulo;
    if (!acc[modulo]) {
      acc[modulo] = { total: 0, soma: 0, melhor: 0 };
    }
    acc[modulo].total += 1;
    acc[modulo].soma += result.percentage;
    acc[modulo].melhor = Math.max(acc[modulo].melhor, result.percentage);
    return acc;
  }, {} as Record<string, { total: number; soma: number; melhor: number }>);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Histórico Completo</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Todos os seus simulados realizados</Text>
          </View>
          <TouchableOpacity onPress={onRefresh} style={[styles.refreshButton, { backgroundColor: colors.surface }]}>
            <Ionicons name="refresh" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {Object.keys(estatisticasPorModulo).length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Estatísticas por Módulo</Text>
          <View style={styles.modulosContainer}>
            {Object.entries(estatisticasPorModulo).map(([modulo, stats]) => (
              <View key={modulo} style={[styles.moduloCard, { backgroundColor: colors.surface }]}>
                <Text style={[styles.moduloTitle, { color: colors.text }]}>{modulo}</Text>
                <View style={styles.moduloStats}>
                  <StatsCard 
                    title="Média" 
                    value={`${(stats.soma / stats.total).toFixed(1)}%`}
                    color={(stats.soma / stats.total) >= 70 ? '#16a34a' : '#dc2626'}
                  />
                  <StatsCard 
                    title="Melhor" 
                    value={`${stats.melhor.toFixed(0)}%`}
                    color="#0284c7"
                  />
                  <StatsCard 
                    title="Total" 
                    value={stats.total}
                  />
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Todos os Simulados</Text>
      {loading ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Carregando resultados...</Text>
        </View>
      ) : results.length > 0 ? (
        <View style={styles.resultsContainer}>
          {results
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((result) => (
              <SimuladoCard key={result.id} result={result} />
            ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Nenhum simulado realizado ainda</Text>
        </View>
      )}
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  modulosContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  moduloCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  moduloTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  moduloStats: {
    flexDirection: 'row',
    gap: 8,
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});