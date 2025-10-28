import { create } from 'zustand';
import { Result } from '../types/simulado';

interface SimuladoStore {
  results: Result[];
  addResult: (result: Omit<Result, 'id'>) => void;
  getRecentResults: (limit?: number) => Result[];
  getResultById: (id: string) => Result | undefined;
}

export const useSimuladoStore = create<SimuladoStore>((set, get) => ({
  results: [],
  
  addResult: (result) => {
    const newResult: Result = {
      ...result,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    set((state) => ({
      results: [newResult, ...state.results]
    }));
  },
  
  getRecentResults: (limit = 4) => {
    return get().results
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  },
  
  getResultById: (id) => {
    return get().results.find(result => result.id === id);
  },
}));