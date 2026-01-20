// src/modules/auth/auth.context.ts

'use client';

import { authService } from '@/modules/auth/auth.service';
import { AuthContextType } from '@/modules/auth/types/auth.types';
import { UserType } from '@/modules/auth/types/user.types';
import { createContext, useState, ReactNode, useEffect, JSX } from 'react';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (): Promise<void> => {
    setIsLoading(false);
    setIsAuthenticated(true);
    await initAuth();
  };

  const logout = async (): Promise<void> => {
    await authService.logout;
    setUser(null);
    setIsAuthenticated(false);
  };

  const initAuth = async (): Promise<void> => {
    try {
      const res = await authService.me();
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
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
