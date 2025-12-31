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
    changePassword: '/api/student/change-password',
  },
  categories: {
    list: '/api/categories',
  },
  khazanah: {
    published: '/api/khazanah/published',
    detail: '/api/khazanah',
    popular: '/api/khazanah/popular',
    trending: '/api/khazanah/trending',
    create: '/api/khazanah',
    update: '/api/khazanah',
    delete: '/api/khazanah',
    unpublish: '/api/khazanah',
    archive: '/api/khazanah',
  },
  artikel: {
    published: '/api/artikel/published',
  },
  rubrik: {
    published: '/api/rubrik/published',
    detail: '/api/rubrik',
    popular: '/api/rubrik/popular',
    trending: '/api/rubrik/trending',
    create: '/api/rubrik',
    update: '/api/rubrik',
    delete: '/api/rubrik',
    unpublish: '/api/rubrik',
    archive: '/api/rubrik',
  },
  // Tambahkan endpoints lainnya di sini
} as const;
