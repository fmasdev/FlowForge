// src/modules/auth/auth.service.ts

import { ForgotPasswordResponse } from '@/modules/auth/types/auth.types';
import { UserType } from '@/modules/auth/types/user.types';
import { apiService } from '@/services/api/api.service';

export const authService = {
  login: async (email: string, password: string) => 
    await apiService.post<{ token: string; user: UserType }>('/auth/login', { email, password }),

  forgotPassword: async (email: string) =>
    await apiService.post<ForgotPasswordResponse>('/auth/forgot-password', { email }),

  register: async (formValues: object) => 
    await apiService.post('/auth/register', formValues),

  logout: async () => 
    await apiService.post('/auth/logout'),

  me: async () => 
    await apiService.get<UserType>('/auth/me')
};