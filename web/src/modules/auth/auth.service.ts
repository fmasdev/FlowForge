// src/modules/auth/auth.service.ts

import { AuthApiResponse, User } from '@/modules/auth/types/auth.types';
import { apiService } from '@/services/api/api.service';
import { ItemApiResponse } from '@/services/api/api.types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthApiResponse> =>
    await apiService.post<{ token: string; user: User }>('/auth/login', {
      email,
      password,
    }),

  forgotPassword: async (email: string): Promise<AuthApiResponse> =>
    await apiService.post('/auth/forgot-password', {
      email,
    }),

  register: async (formValues: object): Promise<AuthApiResponse> =>
    await apiService.post('/auth/register', formValues),

  logout: async (): Promise<AuthApiResponse> =>
    await apiService.post('/auth/logout'),

  me: async (): Promise<ItemApiResponse<User>> =>
    await apiService.get('/auth/me'),
};
