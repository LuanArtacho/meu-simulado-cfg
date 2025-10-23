import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Result } from '../types/simulado';

interface SimuladoCardProps {
  result: Result;
}

export default function SimuladoCard({ result }: SimuladoCardProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const isGoodScore = result.percentage >= 70;

  const handlePress = () => {
    router.push(`/(dashboard)/simulados/review/${result.id}`);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface }]} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{result.modulo}</Text>
        <Text style={[styles.percentage, { color: isGoodScore ? '#16a34a' : '#dc2626' }]}>
          {result.percentage.toFixed(0)}%
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.score, { color: colors.textSecondary }]}>
          {result.score}/{result.totalQuestions} acertos
        </Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>{formatDate(result.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  percentage: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,
  },
});