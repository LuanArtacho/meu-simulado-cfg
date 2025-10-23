import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    // Login temporário com credenciais fixas
    if (email === 'admin123@test.com' && password === '123') {
      // Simular usuário logado
      const mockUser = {
        uid: 'admin123',
        email: 'admin123@test.com',
        emailVerified: true,
      } as any;
      setUser(mockUser);
      return;
    }
    
    // Tentar Firebase se não for as credenciais de teste
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Email ou senha inválidos');
    }
  };

  const logout = async () => {
    // Limpar usuário mock se for o admin de teste
    if (user?.email === 'admin123@test.com') {
      setUser(null);
      return;
    }
    
    // Logout do Firebase para outros usuários
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}