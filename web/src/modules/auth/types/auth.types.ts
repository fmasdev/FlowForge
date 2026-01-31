// src/modules/auth/types/auth.types.ts

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormValues, string>
>;

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

export interface AuthApiResponse {
  success: boolean;
  message: string;
  data: {};
}

export interface User {
  sub?: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}
