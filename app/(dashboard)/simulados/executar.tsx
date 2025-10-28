import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';
import QuestionCard from '../../../components/QuestionCard';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { simuladoCompleto1 } from '../../../data/simulados';
import { saveResult } from '../../../services/firestoreService';

export default function ExecutarSimuladoScreen() {
  const { tipo, numero } = useLocalSearchParams<{ tipo: string; numero?: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [startTime] = useState(new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);
  
  // Por enquanto, apenas Simulado Completo 1 tem perguntas reais
  const questions = tipo === 'completo' && numero === '1' ? simuladoCompleto1 : [];
  
  if (questions.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Simulado em desenvolvimento</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }

  const handleSelectOption = (option: string) => {
    if (!showAnswer) {
      setAnswers(prev => ({
        ...prev,
        [questions[currentQuestion].id]: option
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    } else {
      finishSimulado();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const finishSimulado = async () => {
    const finishTime = new Date();
    setEndTime(finishTime);
    
    const correctAnswers = questions.filter(q => {
      const userAnswer = answers[q.id];
      return userAnswer === q.answer;
    }).length;

    const percentage = (correctAnswers / questions.length) * 100;
    const duration = Math.floor((finishTime.getTime() - startTime.getTime()) / 1000);

    const resultData = {
      userId: user?.uid || 'anonymous',
      score: correctAnswers,
      totalQuestions: questions.length,
      percentage,
      timestamp: new Date(),
      modulo: `Simulado Completo ${numero}`,
      duration,
      answers,
      questions
    };

    // Salvar no Firebase
    try {
      await saveResult(resultData);
      console.log('✅ Resultado salvo no Firebase');
    } catch (error) {
      console.error('❌ Erro ao salvar resultado:', error);
    }

    router.push({
      pathname: '/(dashboard)/simulados/resultado',
      params: {
        score: correctAnswers,
        total: questions.length,
        percentage: percentage.toFixed(1),
        duration,
        answers: JSON.stringify(answers),
        questions: JSON.stringify(questions)
      }
    });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Questão {currentQuestion + 1} de {questions.length}
        </Text>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View style={[styles.progress, { width: `${progress}%`, backgroundColor: colors.primary }]} />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <QuestionCard
          question={questions[currentQuestion]}
          selectedOption={answers[questions[currentQuestion].id]}
          onSelectOption={handleSelectOption}
          showAnswer={showAnswer}
          correctAnswer={questions[currentQuestion].answer}
        />
      </ScrollView>

      <View style={styles.navigation}>
        <Button 
          title="Voltar" 
          onPress={handlePrevious}
          disabled={currentQuestion === 0}
        />
        <Button 
          title={showAnswer ? "Ocultar" : "Resposta"} 
          onPress={handleShowAnswer}
        />
        <Button 
          title={currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"} 
          onPress={handleNext} 
        />
      </View>
    </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  navigation: {
    flexDirection: 'row',
    padding: 20,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});