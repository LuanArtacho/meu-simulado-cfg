import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../components/Button';
import LoginHelper from '../components/LoginHelper';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      await login(email, password);
      router.replace('/(dashboard)');
    } catch (error: any) {
      Alert.alert("Erro no Login", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <LoginHelper onFillCredentials={(email, password) => {
        setEmail(email);
        setPassword(password);
      }} />
      <TextInput
        style={styles.input}
        placeholder="E-mail (admin123@test.com)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha (123)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.linkText}>
        Não tem uma conta?{' '}
        <Text style={styles.link} onPress={() => router.push('/register')}>
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0284c7',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 18,
  },
  linkText: {
    marginTop: 24,
    color: '#64748b',
  },
  link: {
    color: '#0284c7',
    fontWeight: 'bold',
  },
});