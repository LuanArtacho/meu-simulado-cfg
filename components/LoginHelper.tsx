import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LoginHelperProps {
  onFillCredentials: (email: string, password: string) => void;
}

export default function LoginHelper({ onFillCredentials }: LoginHelperProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credenciais de Teste:</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => onFillCredentials('admin123@test.com', '123')}
      >
        <Text style={styles.buttonText}>Preencher automaticamente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0284c7',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0284c7',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#0284c7',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});