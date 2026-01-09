/**
 * Auth Guard Middleware
 * Fungsi untuk melindungi routes berdasarkan role dan ecosystem
 */

import { ECOSYSTEM_CONFIG, RBAC } from '@/lib/ecosystem-config';

type UserRole = 'guest' | 'user' | 'contributor' | 'reviewer' | 'admin';
type Ecosystem = 'portal' | 'compro';

/**
 * Check if route requires authentication
 */
export function isRouteProtected(pathname: string): boolean {
  const protectedPrefixes = ['/compro', '/submit', '/profile'];
  return protectedPrefixes.some(prefix => pathname.startsWith(prefix));
}

/**
 * Get required role for specific route
 */
export function getRequiredRoleForRoute(pathname: string): UserRole {
  // Compro routes require admin or reviewer
  if (pathname.startsWith('/compro')) {
    return 'reviewer';
  }
  
  // Submit routes require contributor
  if (pathname.startsWith('/submit')) {
    return 'contributor';
  }
  
  // Profile routes require authentication
  if (pathname.startsWith('/profile')) {
    return 'user';
  }
  
  return 'guest';
}

/**
 * Get required ecosystem for specific route
 */
export function getRequiredEcosystemForRoute(pathname: string): Ecosystem {
  if (pathname.startsWith('/compro')) {
    return 'compro';
  }
  return 'portal';
}

/**
 * Check role hierarchy (lower level can't access higher)
 * guest < user = contributor < reviewer < admin
 */
export function hasRoleAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    guest: 0,
    user: 1,
    contributor: 1,
    reviewer: 2,
    admin: 3,
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * Get list of accessible routes for specific role
 */
export function getAccessibleRoutes(role: UserRole, ecosystem: Ecosystem): string[] {
  const rbacRole = RBAC[role];
  if (!rbacRole) return ['/'];
  
  // Check if role can access this ecosystem
  if (!rbacRole.ecosystems.includes(ecosystem as any)) {
    return ['/'];
  }
  
  // Get ecosystem config routes
  const ecosystemConfig = ECOSYSTEM_CONFIG[ecosystem];
  if (!ecosystemConfig) return ['/'];
  
  // Return routes from ecosystem config
  return Object.values(ecosystemConfig.routes);
}

/**
 * Determine redirect path based on role and ecosystem
 */
export function getDefaultRedirectPath(role: UserRole, ecosystem: Ecosystem): string {
  if (!role || role === 'guest') {
    return '/';
  }
  
  if (ecosystem === 'compro') {
    if (role === 'admin' || role === 'reviewer') {
      return '/compro/dashboard';
    }
  }
  
  if (role === 'contributor' || role === 'user') {
    return '/';
  }
  
  return '/';
}

/**
 * Check if route transition is allowed
 */
export function canTransitionToRoute(
  currentRole: UserRole,
  targetRoute: string,
  targetEcosystem: Ecosystem
): boolean {
  const requiredRole = getRequiredRoleForRoute(targetRoute);
  const routeEcosystem = getRequiredEcosystemForRoute(targetRoute);
  
  // Check role access
  if (!hasRoleAccess(currentRole, requiredRole)) {
    return false;
  }
  
  // Check ecosystem access
  const rolePermissions = RBAC[currentRole];
  if (!rolePermissions || !(targetEcosystem in rolePermissions)) {
    return false;
  }
  
  return true;
}

/**
 * Get audit trail for route access
 */
export function createAccessLog(
  userId: number | undefined,
  role: UserRole,
  targetRoute: string,
  allowed: boolean,
  timestamp: Date = new Date()
): {
  userId?: number;
  role: UserRole;
  targetRoute: string;
  allowed: boolean;
  timestamp: Date;
} {
  return {
    userId,
    role,
    targetRoute,
    allowed,
    timestamp,
  };
}
