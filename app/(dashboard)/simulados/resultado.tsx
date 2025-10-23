import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../components/Button';
import { useTheme } from '../../../contexts/ThemeContext';

type FilterType = 'all' | 'correct' | 'incorrect' | 'unanswered';

export default function ResultadoScreen() {
  const params = useLocalSearchParams<{
    score: string;
    total: string;
    percentage: string;
    duration: string;
    answers: string;
    questions: string;
  }>();
  
  const router = useRouter();
  const { colors } = useTheme();
  const [filter, setFilter] = useState<FilterType>('all');

  const score = parseInt(params.score || '0');
  const total = parseInt(params.total || '0');
  const percentage = parseFloat(params.percentage || '0');
  const duration = parseInt(params.duration || '0');
  const answers = JSON.parse(params.answers || '{}');
  const questions = JSON.parse(params.questions || '[]');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFilteredQuestions = () => {
    return questions.filter((q: any) => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.answer;
      const isAnswered = !!userAnswer;

      switch (filter) {
        case 'correct': return isCorrect;
        case 'incorrect': return isAnswered && !isCorrect;
        case 'unanswered': return !isAnswered;
        default: return true;
      }
    });
  };

  const filteredQuestions = getFilteredQuestions();
  const isApproved = percentage >= 70;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header com resultado */}
      <View style={[styles.header, { backgroundColor: isApproved ? '#16a34a' : '#dc2626' }]}>
        <Ionicons 
          name={isApproved ? "checkmark-circle" : "close-circle"} 
          size={64} 
          color="white" 
        />
        <Text style={styles.headerTitle}>
          {isApproved ? 'Aprovado!' : 'Reprovado'}
        </Text>
        <Text style={styles.headerPercentage}>{percentage.toFixed(1)}%</Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statValue, { color: '#16a34a' }]}>{score}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Acertos</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statValue, { color: '#dc2626' }]}>{total - score}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Erros</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>{formatTime(duration)}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tempo</Text>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <Text style={[styles.filtersTitle, { color: colors.text }]}>Filtrar questões:</Text>
        <View style={styles.filtersRow}>
          {[
            { key: 'all', label: 'Todas', count: questions.length },
            { key: 'correct', label: 'Certas', count: score },
            { key: 'incorrect', label: 'Erradas', count: total - score },
            { key: 'unanswered', label: 'Não respondidas', count: questions.filter((q: any) => !answers[q.id]).length }
          ].map(({ key, label, count }) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.filterButton,
                { 
                  backgroundColor: filter === key ? colors.primary : colors.surface,
                  borderColor: colors.border
                }
              ]}
              onPress={() => setFilter(key as FilterType)}
            >
              <Text style={[
                styles.filterText,
                { color: filter === key ? 'white' : colors.text }
              ]}>
                {label} ({count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Lista de questões filtradas */}
      <View style={styles.questionsContainer}>
        {filteredQuestions.map((question: any, index: number) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.answer;
          const isAnswered = !!userAnswer;
          
          return (
            <View key={question.id} style={[styles.questionItem, { backgroundColor: colors.surface }]}>
              <View style={styles.questionHeader}>
                <Text style={[styles.questionNumber, { color: colors.text }]}>
                  Questão {questions.findIndex((q: any) => q.id === question.id) + 1}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: !isAnswered ? '#f59e0b' : isCorrect ? '#16a34a' : '#dc2626'
                  }
                ]}>
                  <Text style={styles.statusText}>
                    {!isAnswered ? 'Não respondida' : isCorrect ? 'Correta' : 'Incorreta'}
                  </Text>
                </View>
              </View>
              
              <Text style={[styles.questionText, { color: colors.text }]}>
                {question.question}
              </Text>
              
              <View style={styles.answersContainer}>
                <Text style={[styles.answerLabel, { color: colors.textSecondary }]}>
                  Resposta correta: <Text style={{ color: '#16a34a', fontWeight: 'bold' }}>{question.answer}</Text>
                </Text>
                {isAnswered && (
                  <Text style={[styles.answerLabel, { color: colors.textSecondary }]}>
                    Sua resposta: <Text style={{ color: isCorrect ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>{userAnswer}</Text>
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

      {/* Botões de ação */}
      <View style={styles.actionsContainer}>
        <Button title="Refazer Simulado" onPress={() => router.back()} />
        <Button title="Ver Dashboard" onPress={() => router.push('/(dashboard)')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 40,
    paddingTop: 80,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  headerPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  filtersContainer: {
    padding: 20,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  questionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  questionItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  answersContainer: {
    gap: 4,
  },
  answerLabel: {
    fontSize: 14,
  },
  actionsContainer: {
    padding: 20,
    gap: 12,
  },
});