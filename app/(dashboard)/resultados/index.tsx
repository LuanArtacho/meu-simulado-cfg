import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SimuladoCard from '../../../components/SimuladoCard';
import StatsCard from '../../../components/StatsCard';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSimuladoStore } from '../../../store/useSimuladoStore';

export default function ResultadosScreen() {
  const { results } = useSimuladoStore();
  const { colors } = useTheme();
  
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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Histórico Completo</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Todos os seus simulados realizados</Text>
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
      {results.length > 0 ? (
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