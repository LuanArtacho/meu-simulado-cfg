import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestoreDB } from './firebaseConfig';

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  modulo: string;
  simulado: string;
}

export const getQuestionsBySimulado = async (simulado: string): Promise<Question[]> => {
  try {
    const q = query(
      collection(firestoreDB, 'questions'),
      where('simulado', '==', simulado)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Question[];
  } catch (error) {
    console.error('Erro ao buscar questões:', error);
    return [];
  }
};

export const getQuestionsByModulo = async (modulo: string): Promise<Question[]> => {
  try {
    const q = query(
      collection(firestoreDB, 'questions'),
      where('modulo', '==', modulo)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Question[];
  } catch (error) {
    console.error('Erro ao buscar questões por módulo:', error);
    return [];
  }
};