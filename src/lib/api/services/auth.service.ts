/**
 * Auth Service
 * Service untuk mengelola autentikasi user
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { LoginRequest, LoginResponse, Student } from '../types';

class AuthService {
  /**
   * Login user dengan NIM dan password
   */
  async login(credentials: LoginRequest): Promise<LoginResponse['data']> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.auth.login,
      credentials
    );

    // Simpan token ke localStorage
    if (response.data.token) {
      this.setToken(response.data.token);
    }

    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Jika ada endpoint logout di backend
      await apiClient.post(API_ENDPOINTS.auth.logout, {}, true);
    } catch (error) {
      // Ignore error saat logout
      console.error('Logout error:', error);
    } finally {
      // Hapus token dari localStorage
      this.clearToken();
    }
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<Student> {
    const response = await apiClient.get<{ data: { student: Student } }>(
      API_ENDPOINTS.auth.profile,
      true
    );
    return response.data.student;
  }

  /**
   * Simpan token ke localStorage
   */
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nurberita_token', token);
    }
  }

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nurberita_token');
    }
    return null;
  }

  /**
   * Clear token from localStorage
   */
  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nurberita_token');
      localStorage.removeItem('nurberita_user');
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

// Export singleton instance
export const authService = new AuthService();
