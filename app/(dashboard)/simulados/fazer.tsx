import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';
import { useSimuladoStore } from '../../../store/useSimuladoStore';

export default function FazerSimuladoScreen() {
  const { tipo, numero, subtipo } = useLocalSearchParams<{ 
    tipo: string; 
    numero?: string; 
    subtipo?: string; 
  }>();
  const router = useRouter();
  const addResult = useSimuladoStore(state => state.addResult);

  const getTitle = () => {
    if (tipo === 'modulo') return `Módulo ${numero}`;
    if (tipo === 'completo') return `Simulado Completo ${numero}`;
    if (tipo === 'pontual') return `Questões ${subtipo}`;
    return 'Simulado';
  };

  const handleStartSimulado = () => {
    // Simulação de um simulado concluído
    const score = Math.floor(Math.random() * 10) + 1;
    const totalQuestions = 10;
    const percentage = (score / totalQuestions) * 100;

    addResult({
      userId: 'user1',
      score,
      totalQuestions,
      percentage,
      timestamp: new Date(),
      modulo: getTitle(),
    });

    router.push('/(dashboard)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{getTitle()}</Text>
        <Text style={styles.subtitle}>
          {tipo === 'modulo' && 'Questões específicas do módulo selecionado'}
          {tipo === 'completo' && 'Simulado com questões de todos os módulos'}
          {tipo === 'pontual' && 'Questões pontuais para prática direcionada'}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Informações do Simulado:</Text>
        <Text style={styles.infoText}>• 10 questões</Text>
        <Text style={styles.infoText}>• Tempo estimado: 20 minutos</Text>
        <Text style={styles.infoText}>• Nota mínima para aprovação: 70%</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Iniciar Simulado" onPress={handleStartSimulado} />
        <Button 
          title="Voltar" 
          onPress={() => router.back()} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  buttonContainer: {
    gap: 12,
  },
});