import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';
import { useTheme } from '../../../contexts/ThemeContext';

export default function SimuladosIndexScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Escolha o Tipo de Simulado</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Simulado por Módulo" 
          onPress={() => router.push('/(dashboard)/simulados/modulos')} 
        />
        <Button 
          title="Simulados Completos" 
          onPress={() => router.push('/(dashboard)/simulados/completos')} 
        />
        <Button 
          title="Questões Pontuais" 
          onPress={() => router.push('/(dashboard)/simulados/pontuais')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 16,
    alignItems: 'center',
  },
});