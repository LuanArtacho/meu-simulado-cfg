import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../../components/Button';
import { useSimuladoStore } from '../../../../store/useSimuladoStore';

export default function ReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const getResultById = useSimuladoStore(state => state.getResultById);
  
  const result = getResultById(id!);

  if (!result) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Simulado não encontrado</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }

  const isGoodScore = result.percentage >= 70;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{result.modulo}</Text>
        <Text style={[styles.percentage, { color: isGoodScore ? '#16a34a' : '#dc2626' }]}>
          {result.percentage.toFixed(1)}%
        </Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{result.score}</Text>
          <Text style={styles.statLabel}>Acertos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{result.totalQuestions - result.score}</Text>
          <Text style={styles.statLabel}>Erros</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{result.totalQuestions}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <Text style={styles.dateText}>
        Realizado em: {new Date(result.timestamp).toLocaleDateString('pt-BR')}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Voltar ao Dashboard" onPress={() => router.push('/(dashboard)')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  percentage: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  dateText: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 20,
  },
});