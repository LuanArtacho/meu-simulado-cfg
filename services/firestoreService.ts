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
    // Primeira tentativa com ordenação
    let q = query(
      collection(firestoreDB, 'results'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    let querySnapshot;
    try {
      querySnapshot = await getDocs(q);
    } catch (indexError) {
      console.log('⚠️ Erro de índice, tentando sem ordenação:', indexError);
      // Fallback: consulta sem ordenação
      q = query(
        collection(firestoreDB, 'results'),
        where('userId', '==', userId)
      );
      querySnapshot = await getDocs(q);
    }
    
    console.log('📊 Documentos encontrados:', querySnapshot.docs.length);
    
    const results = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('📄 Documento:', doc.id, data);
      return {
        id: doc.id,
        userId: data.userId,
        score: data.score,
        totalQuestions: data.totalQuestions,
        percentage: data.percentage,
        timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp),
        modulo: data.modulo,
        duration: data.duration,
        answers: data.answers || {},
        questions: data.questions || []
      };
    }) as Result[];
    
    // Ordenar no cliente se necessário
    return results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error('Erro ao buscar resultados:', error);
    return [];
  }
};

export const getRecentResults = async (userId: string, limit: number = 4): Promise<Result[]> => {
  try {
    // Primeira tentativa com ordenação
    let q = query(
      collection(firestoreDB, 'results'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      firestoreLimit(limit)
    );
    
    let querySnapshot;
    try {
      querySnapshot = await getDocs(q);
    } catch (indexError) {
      console.log('⚠️ Erro de índice em getRecentResults, tentando sem ordenação:', indexError);
      // Fallback: consulta sem ordenação
      q = query(
        collection(firestoreDB, 'results'),
        where('userId', '==', userId)
      );
      querySnapshot = await getDocs(q);
    }
    
    const results = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        score: data.score,
        totalQuestions: data.totalQuestions,
        percentage: data.percentage,
        timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp),
        modulo: data.modulo,
        duration: data.duration,
        answers: data.answers || {},
        questions: data.questions || []
      };
    }) as Result[];
    
    // Ordenar no cliente e limitar
    return results
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
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