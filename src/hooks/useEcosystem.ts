/**
 * Hook for ecosystem management
 * Provides functions to check and switch ecosystems
 */

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ECOSYSTEM_CONFIG } from '@/lib/ecosystem-config';

type Ecosystem = 'portal' | 'compro';

export function useEcosystem() {
  const auth = useAuth();

  const canSwitchTo = (ecosystem: Ecosystem): boolean => {
    return auth.canAccessEcosystem(ecosystem);
  };

  const trySwitch = (ecosystem: Ecosystem): boolean => {
    if (!canSwitchTo(ecosystem)) {
      console.warn(`Cannot switch to ${ecosystem} ecosystem - insufficient permissions`);
      return false;
    }
    return auth.switchEcosystem(ecosystem);
  };

  const getEcosystemInfo = (ecosystem: Ecosystem) => {
    return ECOSYSTEM_CONFIG[ecosystem];
  };

  const getCurrentEcosystemInfo = () => {
    return ECOSYSTEM_CONFIG[auth.currentEcosystem];
  };

  const getAccessibleEcosystems = (): Ecosystem[] => {
    const ecosystems: Ecosystem[] = ['portal', 'compro'];
    return ecosystems.filter(eco => canSwitchTo(eco));
  };

  const isInCompro = (): boolean => auth.currentEcosystem === 'compro';

  const isInPortal = (): boolean => auth.currentEcosystem === 'portal';

  return {
    currentEcosystem: auth.currentEcosystem,
    canSwitchTo,
    trySwitch,
    getEcosystemInfo,
    getCurrentEcosystemInfo,
    getAccessibleEcosystems,
    isInCompro,
    isInPortal,
  };
}
