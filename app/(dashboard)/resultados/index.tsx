import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ResultadosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Resultados</Text>
      <Text style={styles.subtitle}>
        Aqui você verá o desempenho de todos os seus simulados concluídos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    marginTop: 8,
    color: '#64748b',
    textAlign: 'center',
  },
});