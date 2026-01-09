/**
 * ECOSYSTEM INTEGRATION CONFIGURATION
 * Menghubungkan 2 sistem: Portal Berita & Compro (Compliance/Admin)
 * Semua fungsi dapat berjalan lancar dengan shared context & auth
 */

// Ecosystem types
export type Ecosystem = 'portal' | 'compro';
export type UserRole = 'guest' | 'user' | 'contributor' | 'reviewer' | 'admin';

// Feature flags untuk kontrol akses antar ecosystem
export const ECOSYSTEM_CONFIG = {
  // Portal Berita (Public)
  portal: {
    name: 'Portal Berita PKUMI',
    slug: 'portal',
    description: 'Portal berita dan informasi PKUMI',
    public: true,
    routes: {
      home: '/',
      profil: '/profil',
      berita: '/rubrik',
      opini: '/khazanah',
      akademik: '/akademik',
      galeri: '/galeri',
      pendaftaran: '/pendaftaran',
      kontak: '/kontak',
    },
    requiredRole: 'guest',
  },

  // Compro (Admin/Compliance)
  compro: {
    name: 'Compro PKUMI',
    slug: 'compro',
    description: 'Dashboard admin dan manajemen konten',
    public: false,
    routes: {
      dashboard: '/compro/dashboard',
      submissions: '/compro/submissions',
      moderasi: '/compro/moderasi',
      users: '/compro/users',
      analytics: '/compro/analytics',
      settings: '/compro/settings',
    },
    requiredRole: 'admin',
  },
} as const;

// Role-based access control
export const RBAC = {
  guest: {
    canViewPublic: true,
    canSubmitContent: false,
    canModerate: false,
    canManageUsers: false,
    ecosystems: ['portal'],
  },
  user: {
    canViewPublic: true,
    canSubmitContent: false,
    canModerate: false,
    canManageUsers: false,
    ecosystems: ['portal'],
  },
  contributor: {
    canViewPublic: true,
    canSubmitContent: true,
    canModerate: false,
    canManageUsers: false,
    ecosystems: ['portal'],
  },
  reviewer: {
    canViewPublic: true,
    canSubmitContent: true,
    canModerate: true,
    canManageUsers: false,
    ecosystems: ['portal', 'compro'],
  },
  admin: {
    canViewPublic: true,
    canSubmitContent: true,
    canModerate: true,
    canManageUsers: true,
    ecosystems: ['portal', 'compro'],
  },
} as const;

// Feature availability per ecosystem
export const FEATURES = {
  portal: {
    // Public portal features
    browseContent: true,
    viewProfile: true,
    submitArticle: true,
    viewGallery: true,
    contactForm: true,
    registration: true,
    // Compro features
    viewDashboard: false,
    moderateContent: false,
    manageUsers: false,
    viewAnalytics: false,
  },
  compro: {
    // Public portal features (accessible from admin)
    browseContent: true,
    viewProfile: true,
    submitArticle: true,
    viewGallery: true,
    contactForm: true,
    registration: true,
    // Compro features
    viewDashboard: true,
    moderateContent: true,
    manageUsers: true,
    viewAnalytics: true,
  },
} as const;

// API endpoints untuk kedua sistem
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    verify: '/api/auth/verify',
    refresh: '/api/auth/refresh',
  },
  portal: {
    articles: '/api/portal/articles',
    khazanah: '/api/portal/khazanah',
    gallery: '/api/portal/gallery',
    users: '/api/portal/users',
  },
  compro: {
    submissions: '/api/compro/submissions',
    moderasi: '/api/compro/moderasi',
    users: '/api/compro/users',
    analytics: '/api/compro/analytics',
  },
  shared: {
    profile: '/api/user/profile',
    settings: '/api/user/settings',
  },
} as const;

// Storage keys untuk kedua sistem
export const STORAGE_KEYS = {
  auth: {
    token: 'pkumi_auth_token',
    refreshToken: 'pkumi_refresh_token',
    user: 'pkumi_user',
    ecosystem: 'pkumi_current_ecosystem',
  },
  portal: {
    preferences: 'pkumi_portal_preferences',
    history: 'pkumi_portal_history',
  },
  compro: {
    filters: 'pkumi_compro_filters',
    layout: 'pkumi_compro_layout',
  },
} as const;

// Navigation guards untuk akses antar ecosystem
export const NAVIGATION_GUARDS = {
  // Dari portal ke compro
  portalToCompro: (userRole: UserRole): boolean => {
    return RBAC[userRole].ecosystems.includes('compro' as any);
  },
  // Dari compro ke portal
  comproToPortal: (userRole: UserRole): boolean => {
    return RBAC[userRole].ecosystems.includes('portal' as any);
  },
  // Check access ke specific route
  hasRouteAccess: (userRole: UserRole, ecosystem: Ecosystem, route: string): boolean => {
    const allowedEcosystems = RBAC[userRole].ecosystems;
    return allowedEcosystems.includes(ecosystem as any);
  },
} as const;

export default {
  ECOSYSTEM_CONFIG,
  RBAC,
  FEATURES,
  API_ENDPOINTS,
  STORAGE_KEYS,
  NAVIGATION_GUARDS,
};
