// src/modules/auth/types/auth.types.ts

import { UserType } from '@/modules/auth/types/user.types';

export interface LoginType {
  email: string;
  password: string;
}

export interface ForgotPasswordResponse {
  message: string;
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
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}
