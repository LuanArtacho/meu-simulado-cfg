import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import Button from './Button';
import { useTheme } from '../contexts/ThemeContext';

export default function FirebaseTest() {
  const { colors } = useTheme();
  const [testing, setTesting] = useState(false);

  const testFirebase = async () => {
    setTesting(true);
    try {
      // Teste simples de conexão
      const testEmail = `test${Date.now()}@test.com`;
      console.log('🔥 Testando Firebase...');
      
      const result = await createUserWithEmailAndPassword(auth, testEmail, '123456');
      console.log('✅ Firebase conectado! Usuário:', result.user.email);
      
      Alert.alert('✅ Firebase Funcionando!', `Usuário criado: ${result.user.email}`);
      
      // Limpar usuário de teste
      await result.user.delete();
      console.log('🗑️ Usuário de teste removido');
    } catch (error: any) {
      console.error('❌ Erro Firebase:', error);
      Alert.alert('❌ Erro Firebase', `Erro: ${error.message}`);
    }
    setTesting(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Teste Firebase</Text>
      <Button 
        title={testing ? "Testando..." : "Testar Conexão"} 
        onPress={testFirebase}
        disabled={testing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});