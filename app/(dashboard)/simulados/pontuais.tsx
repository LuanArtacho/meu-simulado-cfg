import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';

export default function PontuaisScreen() {
  const router = useRouter();

  const handlePontualPress = (tipo: string) => {
    router.push(`/(dashboard)/simulados/fazer?tipo=pontual&subtipo=${tipo}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Questões Pontuais</Text>
        <Text style={styles.subtitle}>Pratique questões específicas por tema</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Questões Aleatórias" 
          onPress={() => handlePontualPress('aleatorias')} 
        />
        <Button 
          title="Questões por Dificuldade" 
          onPress={() => handlePontualPress('dificuldade')} 
        />
        <Button 
          title="Revisão de Erros" 
          onPress={() => handlePontualPress('erros')} 
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
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    gap: 12,
    paddingBottom: 24,
  },
});