/**
 * API Configuration
 * Konfigurasi dasar untuk semua API calls
 */

// Helper to determine base URL based on environment
const getBaseURL = () => {
  // Server-side: always use full URL
  if (typeof window === 'undefined') {
    return 'https://backend-portal.pkumionline.cloud';
  }
  
  // Client-side development: use relative URL for proxy
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // Client-side production: use full URL
  return 'https://backend-portal.pkumionline.cloud';
};

export const API_CONFIG = {
  baseURL: getBaseURL(),
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
    update: '/api/khazanah/save',
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
    update: '/api/rubrik/save',
    delete: '/api/rubrik',
    unpublish: '/api/rubrik',
    archive: '/api/rubrik',
  },
  // Tambahkan endpoints lainnya di sini
} as const;
