/**
 * Ecosystem Switcher Component
 * Allows users to switch between Portal and Compro ecosystems
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEcosystem } from '@/hooks/useEcosystem';
import { ECOSYSTEM_CONFIG } from '@/lib/ecosystem-config';

export function EcosystemSwitcher() {
  const { user, logout } = useAuth();
  const { currentEcosystem, getAccessibleEcosystems, trySwitch, isInCompro, isInPortal } =
    useEcosystem();
  const [isOpen, setIsOpen] = useState(false);

  const accessibleEcosystems = getAccessibleEcosystems();
  const currentEcoInfo = ECOSYSTEM_CONFIG[currentEcosystem];

  if (!user || accessibleEcosystems.length <= 1) {
    return null;
  }

  const handleSwitch = (ecosystem: 'portal' | 'compro') => {
    trySwitch(ecosystem);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentEcoInfo?.name || 'Portal'}</span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-50"
          >
            {/* Current Ecosystem */}
            <div className="p-4 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-600 mb-2">CURRENT</p>
              <p className="font-semibold text-slate-900">{currentEcoInfo?.name}</p>
              <p className="text-sm text-slate-600">{user.role}</p>
            </div>

            {/* Switch Options */}
            <div className="p-2">
              {accessibleEcosystems.map((ecosystem) => {
                const ecoInfo = ECOSYSTEM_CONFIG[ecosystem];
                const isActive = ecosystem === currentEcosystem;

                return (
                  <button
                    key={ecosystem}
                    onClick={() => handleSwitch(ecosystem)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <p className="font-medium text-sm">{ecoInfo?.name}</p>
                    <p className="text-xs text-slate-600">{ecoInfo?.description || ''}</p>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="border-t border-slate-100 p-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition text-sm">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Ecosystem Badge Component
 * Shows current ecosystem in header/navbar
 */
export function EcosystemBadge() {
  const { currentEcosystem } = useEcosystem();

  const badgeStyles: Record<string, string> = {
    portal: 'bg-emerald-100 text-emerald-700',
    compro: 'bg-amber-100 text-amber-700',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        badgeStyles[currentEcosystem] || badgeStyles.portal
      }`}
    >
      {currentEcosystem === 'compro' ? 'Kompro' : 'Portal'}
    </span>
  );
}

/**
 * Ecosystem Guard Component
 * Shows message when user tries to access ecosystem they don't have permission for
 */
export function EcosystemGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { currentEcosystem, getAccessibleEcosystems } = useEcosystem();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <p className="text-slate-900 font-semibold mb-2">Login Required</p>
          <p className="text-slate-600">Please login to access this page.</p>
        </div>
      </div>
    );
  }

  const accessible = getAccessibleEcosystems();
  if (!accessible.includes(currentEcosystem)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <p className="text-slate-900 font-semibold mb-2">Access Denied</p>
          <p className="text-slate-600 mb-6">
            You don't have permission to access the {currentEcosystem} ecosystem.
          </p>
          <a
            href="/"
            className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Back to Portal
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
