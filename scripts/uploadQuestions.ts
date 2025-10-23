import { collection, addDoc } from 'firebase/firestore';
import { firestoreDB } from '../services/firebaseConfig';
import { simuladoCompleto1 } from '../data/simulados';

export const uploadQuestionsToFirestore = async () => {
  try {
    console.log('Iniciando upload das questões...');
    
    for (const question of simuladoCompleto1) {
      await addDoc(collection(firestoreDB, 'questions'), {
        ...question,
        simulado: 'completo1',
        createdAt: new Date()
      });
      console.log(`Questão ${question.id} enviada`);
    }
    
    console.log('✅ Todas as questões foram enviadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao enviar questões:', error);
  }
};