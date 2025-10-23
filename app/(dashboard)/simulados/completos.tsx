import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';

export default function CompletosScreen() {
  const router = useRouter();

  const handleCompletoPress = (numero: number) => {
    if (numero === 1) {
      router.push(`/(dashboard)/simulados/executar?tipo=completo&numero=${numero}`);
    } else {
      router.push(`/(dashboard)/simulados/fazer?tipo=completo&numero=${numero}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Simulados Completos</Text>
        <Text style={styles.subtitle}>Simulados com questões de todos os módulos</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((numero) => (
          <Button 
            key={numero}
            title={`Simulado Completo ${numero}`} 
            onPress={() => handleCompletoPress(numero)} 
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