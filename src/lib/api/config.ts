/**
 * API Configuration
 * Konfigurasi dasar untuk semua API calls
 */

export const API_CONFIG = {
  baseURL: 'https://backend-portal.pkumionline.cloud',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/api/student/login',
    logout: '/api/student/logout',
    profile: '/api/student/profile',
  },
  // Tambahkan endpoints lainnya di sini
} as const;
