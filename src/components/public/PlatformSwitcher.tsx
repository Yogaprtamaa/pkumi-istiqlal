/**
 * Platform Switcher Component
 * Toggle antara Compro dan Portal Berita di Navbar
 */

'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PlatformSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Deteksi platform saat ini
  const isInPortal = pathname === '/' ||
                     pathname?.startsWith('/khazanah') || 
                     pathname?.startsWith('/rubrik') || 
                     pathname?.startsWith('/penulis') ||
                     pathname?.startsWith('/submit') ||
                     pathname?.startsWith('/login') ||
                     pathname?.startsWith('/register');
  
  const isInCompro = pathname?.startsWith('/home') || 
                     pathname?.startsWith('/profil') || 
                     pathname?.startsWith('/akademik') ||
                     pathname?.startsWith('/galeri') ||
                     pathname?.startsWith('/pendaftaran') ||
                     pathname?.startsWith('/kontak');

  return (
    <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-full p-1">
      {/* Compro Button */}
      <button
        onClick={() => router.push('/home')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
          isInCompro
            ? 'bg-white text-emerald-700 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        )}
      >
        <Globe className="w-4 h-4" />
        <span>Compro</span>
      </button>

      {/* Portal Button */}
      <button
        onClick={() => router.push('/')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
          isInPortal
            ? 'bg-white text-amber-600 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        )}
      >
        <Newspaper className="w-4 h-4" />
        <span>Portal</span>
      </button>
    </div>
  );
}
