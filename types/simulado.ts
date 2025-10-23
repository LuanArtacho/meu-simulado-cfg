// types/simulado.ts
// Arquivo para centralizar as definições de tipos do TypeScript relacionadas ao simulado.
// Isso melhora a organização e a reutilização dos tipos em todo o projeto.

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  modulo: string; // ex: "modulo1", "geral"
}

export interface Result {
  id: string;
  userId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: Date;
  modulo: string; // ex: "completo", "modulo1"
}
