'use client';

import { UserType } from '@/modules/auth/types/user.types';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { apiService } from '@/services/api/api.service';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async () => {
    setIsLoading(false);
    setIsAuthenticated(true);
    await initAuth();
  };

  const logout = async () => {
    console.log('logout auth context')
    await apiService.post('/auth/logout');
    setUser(null);
    setIsAuthenticated(false);
  };

  const initAuth = async () => {
    try {
      const res = await apiService.get<UserType>('/auth/me');
      setUser(res.data);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
