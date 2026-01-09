/**
 * Auth Context
 * Context untuk mengelola state autentikasi user di kedua ecosystem (Portal & Compro)
 * Login bersifat opsional - hanya diperlukan untuk submit konten dan akses Compro
 * 
 * Mendukung 5 role level:
 * - guest: Akses hanya Portal (public)
 * - user: Akses Portal, bisa submit konten
 * - contributor: Same as user (role untuk content creator)
 * - reviewer: Akses Portal + Compro moderasi
 * - admin: Full access Portal dan Compro
 */

'use client';

import * as React from 'react';
import { authService, ApiError } from '@/lib/api';
import { ECOSYSTEM_CONFIG, RBAC } from '@/lib/ecosystem-config';

type Ecosystem = 'portal' | 'compro';
type UserRole = 'guest' | 'user' | 'contributor' | 'reviewer' | 'admin';

interface User {
  id: number;
  nim: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  image: string | null;
  role: UserRole;
  // Student profile fields
  gender?: string | null;
  place_of_birth?: string | null;
  date_of_birth?: string | null;
  student_job?: string | null;
  marital_status?: string | null;
  program?: string | null;
  admission_year?: string | null;
  first_semester?: string | null;
  origin_of_university?: string | null;
  initial_study_program?: string | null;
  graduation_year?: string | null;
  gpa?: number | null;
  address?: string | null;
  street?: string | null;
  rt_rw?: string | null;
  village?: string | null;
  district?: string | null;
  city?: string | null;
  province?: string | null;
  full_address?: string | null;
  father_name?: string | null;
  father_last_education?: string | null;
  father_job?: string | null;
  mother_name?: string | null;
  mother_last_education?: string | null;
  mother_job?: string | null;
  description?: string | null;
  // Article counts
  khazanah_draft_count?: number;
  khazanah_published_count?: number;
  khazanah_archived_count?: number;
  rubrik_draft_count?: number;
  rubrik_published_count?: number;
  rubrik_archived_count?: number;
}

interface AuthContextType {
  // User & Auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Current ecosystem
  currentEcosystem: Ecosystem;
  
  // Auth functions
  login: (nim: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  switchEcosystem: (ecosystem: Ecosystem) => boolean;
  
  // RBAC functions
  hasPermission: (action: string) => boolean;
  canAccessEcosystem: (ecosystem: Ecosystem) => boolean;
  canAccessRoute: (routePath: string) => boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentEcosystem, setCurrentEcosystem] = React.useState<Ecosystem>('portal');

  // Get current user role (default: guest)
  const getUserRole = (): UserRole => {
    if (!user) return 'guest';
    return (user.role as UserRole) || 'user';
  };

  // Check if user has specific permission in current ecosystem
  const hasPermission = (action: string): boolean => {
    const role = getUserRole();
    const permissions = RBAC[role];
    
    if (!permissions) return false;
    
    // Check if ecosystem is in allowed ecosystems for this role
    return permissions.ecosystems.includes(currentEcosystem as any);
  };

  // Check if user can access specific ecosystem
  const canAccessEcosystem = (ecosystem: Ecosystem): boolean => {
    const role = getUserRole();
    const permissions = RBAC[role];
    
    if (!permissions) return false;
    
    return ecosystem in permissions;
  };

  // Check if user can access route
  const canAccessRoute = (routePath: string): boolean => {
    const role = getUserRole();
    const permissions = RBAC[role];
    
    if (!permissions) return false;
    
    // Check if user can access current ecosystem
    return permissions.ecosystems.includes(currentEcosystem as any);
  };

  // Switch ecosystem with validation
  const switchEcosystem = (ecosystem: Ecosystem): boolean => {
    if (!canAccessEcosystem(ecosystem)) {
      console.warn(`User ${user?.nim} cannot access ${ecosystem} ecosystem`);
      return false;
    }
    
    setCurrentEcosystem(ecosystem);
    sessionStorage.setItem('pkumi_current_ecosystem', ecosystem);
    return true;
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('nurberita_user');
      const storedEcosystem = sessionStorage.getItem('pkumi_current_ecosystem') as Ecosystem | null;
      const token = authService.getToken();

      if (storedUser && token) {
        try {
          // Validate token dengan get profile
          const profile = await authService.getProfile();
          const userData: User = {
            ...profile,
            role: (profile.role as UserRole) || 'user',
          };
          setUser(userData);
          localStorage.setItem('nurberita_user', JSON.stringify(userData));
          
          // Restore previous ecosystem or default to portal
          if (storedEcosystem && (storedEcosystem === 'portal' || storedEcosystem === 'compro')) {
            setCurrentEcosystem(storedEcosystem);
          }
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
        role: (response.student.role as UserRole) || 'user',
      };

      setUser(userData);
      localStorage.setItem('nurberita_user', JSON.stringify(userData));
      
      // Default ke portal untuk user baru, atau ke compro jika admin
      const defaultEcosystem = userData.role === 'admin' ? 'compro' : 'portal';
      setCurrentEcosystem(defaultEcosystem);
      sessionStorage.setItem('pkumi_current_ecosystem', defaultEcosystem);
      
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
    setCurrentEcosystem('portal');
    sessionStorage.removeItem('pkumi_current_ecosystem');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        currentEcosystem,
        login,
        logout,
        switchEcosystem,
        hasPermission,
        canAccessEcosystem,
        canAccessRoute,
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
