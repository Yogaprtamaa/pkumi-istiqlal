/**
 * Auth Context
 * Context untuk mengelola state autentikasi user
 * Login bersifat opsional - hanya diperlukan untuk submit konten
 */

'use client';

import * as React from 'react';
import { authService, ApiError } from '@/lib/api';

interface User {
  id: number;
  nim: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  image: string | null;
  role: 'user' | 'contributor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (nim: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Check for existing session on mount
  React.useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('nurberita_user');
      const token = authService.getToken();

      if (storedUser && token) {
        try {
          // Validate token dengan get profile
          const profile = await authService.getProfile();
          const userData: User = {
            ...profile,
            role: 'contributor',
          };
          setUser(userData);
          localStorage.setItem('nurberita_user', JSON.stringify(userData));
        } catch (error) {
          // Token invalid, clear storage
          authService.clearToken();
        }
      } else {
        // Clear jika tidak lengkap
        authService.clearToken();
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login function dengan real API
  const login = async (nim: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const response = await authService.login({ nim, password });

      const userData: User = {
        ...response.student,
        role: 'contributor',
      };

      setUser(userData);
      localStorage.setItem('nurberita_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);

      if (error instanceof ApiError) {
        // Handle specific API errors
        return false;
      }

      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await authService.logout();
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
