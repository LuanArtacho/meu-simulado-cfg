// types/auth.ts
// Definições de tipos para o fluxo de autenticação.

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  // Poderia ter campos adicionais como `name`, `confirmPassword`, etc.
}
