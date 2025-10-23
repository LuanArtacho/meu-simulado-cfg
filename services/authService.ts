// services/authService.ts
// Este arquivo lida com toda a lógica de autenticação, abstraindo as chamadas
// diretas ao Firebase Auth das telas (componentes de UI).

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth';
import { LoginCredentials, RegisterCredentials } from '../types/auth';
import { auth } from './firebaseConfig';

// Função para lidar com o login de um usuário
export const signIn = async ({ email, password }: LoginCredentials): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    // Em um app real, trataríamos diferentes tipos de erro aqui.
    console.error("Erro no login:", error);
    throw new Error('Email ou senha inválidos.');
  }
};

// Função para registrar um novo usuário
export const signUp = async ({ email, password }: RegisterCredentials): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Aqui você poderia, por exemplo, salvar informações adicionais do usuário no Firestore.
    return userCredential.user;
  } catch (error) {
    console.error("Erro no cadastro:", error);
    throw new Error('Não foi possível criar a conta. Tente outro e-mail.');
  }
};

// Função para fazer logout do usuário
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro no logout:", error);
    throw new Error('Não foi possível sair.');
  }
};
