import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../components/Button';
import SuccessModal from '../components/SuccessModal';
import { useTheme } from '../contexts/ThemeContext';
import { auth } from '../services/firebaseConfig';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Usuário criado no Firebase:', userCredential.user.email);
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error('❌ Erro Firebase:', error.message);
      alert(`Erro no cadastro: ${error.message}`);
    }
    setLoading(false);
  };
  
  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push('/login');
  };
  
  const handleModalTimeout = () => {
    setShowSuccessModal(false);
    router.push('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button 
          title={loading ? "Cadastrando..." : "Cadastrar"} 
          onPress={handleRegister}
          disabled={loading}
        />
      </View>
      <Text style={[styles.linkText, { color: colors.textSecondary }]}>
        Já tem uma conta?{' '}
        <Text style={[styles.link, { color: colors.primary }]} onPress={() => router.push('/login')}>
          Faça login
        </Text>
      </Text>
      
      <SuccessModal
        visible={showSuccessModal}
        onClose={handleModalClose}
        onTimeout={handleModalTimeout}
        title="Conta Criada!"
        message={`Sua conta foi criada com sucesso!\nVocê será redirecionado para o login.`}
        duration={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
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
  },
  link: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
});