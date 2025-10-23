import { addDoc, collection, getDocs, orderBy, query, where, limit as firestoreLimit } from 'firebase/firestore';
import { Result } from '../types/simulado';
import { firestoreDB } from './firebaseConfig';

export const saveResult = async (result: Omit<Result, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(firestoreDB, 'results'), {
      ...result,
      timestamp: result.timestamp,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar resultado:', error);
    throw error;
  }
};

export const getUserResults = async (userId: string): Promise<Result[]> => {
  try {
    const q = query(
      collection(firestoreDB, 'results'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp),
      };
    }) as Result[];
  } catch (error) {
    console.error('Erro ao buscar resultados:', error);
    return [];
  }
};

export const getRecentResults = async (userId: string, limit: number = 4): Promise<Result[]> => {
  try {
    const q = query(
      collection(firestoreDB, 'results'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      firestoreLimit(limit)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp),
      };
    }) as Result[];
  } catch (error) {
    console.error('Erro ao buscar resultados recentes:', error);
    return [];
  }
};

export const syncUserData = async (userId: string) => {
  try {
    const results = await getUserResults(userId);
    return {
      totalSimulados: results.length,
      mediaGeral: results.length > 0 ? results.reduce((acc, r) => acc + r.percentage, 0) / results.length : 0,
      aprovacoes: results.filter(r => r.percentage >= 70).length,
      melhorNota: results.length > 0 ? Math.max(...results.map(r => r.percentage)) : 0
    };
  } catch (error) {
    console.error('Erro ao sincronizar dados:', error);
    return null;
  }
};