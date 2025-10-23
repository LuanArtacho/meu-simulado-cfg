// services/firestoreService.ts
// Responsável por toda a comunicação com o Cloud Firestore.
// Abstrai a lógica de busca de questões e salvamento de resultados.

import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { Question, Result } from '../types/simulado';
import { firestoreDB } from './firebaseConfig';

/**
 * Busca questões de um módulo específico ou todas as questões.
 * @param modulo - O nome do módulo (ex: "modulo1") ou null para o simulado completo.
 * @returns Uma promessa que resolve para um array de questões.
 * * Exemplo de como adicionar novos módulos:
 * Basta criar documentos no Firestore com o campo "modulo" correspondente.
 * Ex: { question: "...", options: [...], answer: "...", modulo: "modulo3" }
 */
export const fetchQuestions = async (modulo: string | null): Promise<Question[]> => {
  try {
    const questionsCollection = collection(firestoreDB, 'questions');
    
    // Se um módulo for especificado, filtra por ele. Senão, busca tudo.
    const q = modulo 
      ? query(questionsCollection, where("modulo", "==", modulo))
      : questionsCollection;
      
    const querySnapshot = await getDocs(q);
    
    const questions: Question[] = [];
    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() } as Question);
    });
    
    return questions;
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    throw new Error("Não foi possível carregar as questões do simulado.");
  }
};

/**
 * Salva o resultado de um simulado no Firestore.
 * @param resultData - Os dados do resultado a serem salvos.
 */
export const saveResult = async (resultData: Omit<Result, 'id' | 'timestamp'>): Promise<void> => {
  try {
    const resultsCollection = collection(firestoreDB, 'results');
    await addDoc(resultsCollection, {
      ...resultData,
      timestamp: serverTimestamp() // Usa o timestamp do servidor para consistência
    });
    console.log("Resultado salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar resultado:", error);
    throw new Error("Não foi possível salvar seu resultado.");
  }
};
