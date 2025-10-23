import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';

export default function ModulosScreen() {
  const router = useRouter();

  const handleModuloPress = (modulo: number) => {
    router.push(`/(dashboard)/simulados/fazer?tipo=modulo&numero=${modulo}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Simulado por Módulo</Text>
        <Text style={styles.subtitle}>Escolha o módulo que deseja praticar</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((modulo) => (
          <Button 
            key={modulo}
            title={`Módulo ${modulo}`} 
            onPress={() => handleModuloPress(modulo)} 
          />
        ))}
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