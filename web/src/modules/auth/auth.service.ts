import { UserType } from '@/modules/auth/types/user.types';
import { apiService } from '@/services/api/api.service';


export const authService = {
  login: async (email: string, password: string) => 
    await apiService.post<{ token: string; user: UserType }>('/auth/login', { email, password }),

  profile: async () =>
    apiService.get<UserType>('/auth/profile'),
};