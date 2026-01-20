// src/modules/auth/auth.service.ts

import { ForgotPasswordResponse } from '@/modules/auth/types/auth.types';
import { UserType } from '@/modules/auth/types/user.types';
import { apiService } from '@/services/api/api.service';
import { ApiResponse } from '@/types/api.types';

export const authService = {
  login: async (email: string, password: string): Promise<ApiResponse> =>
    await apiService.post<{ token: string; user: UserType }>('/auth/login', {
      email,
      password,
    }),

  forgotPassword: async (email: string): Promise<ApiResponse> =>
    await apiService.post<ForgotPasswordResponse>('/auth/forgot-password', {
      email,
    }),

  register: async (formValues: object): Promise<ApiResponse> =>
    await apiService.post('/auth/register', formValues),

  logout: async (): Promise<ApiResponse> =>
    await apiService.post('/auth/logout'),

  me: async (): Promise<ApiResponse<UserType>> =>
    await apiService.get<UserType>('/auth/me'),
};
