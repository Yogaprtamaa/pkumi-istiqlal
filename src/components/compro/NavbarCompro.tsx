/**
 * Navbar Compro
 * Navbar khusus untuk website institusi (Compro PKUMI)
 * Modifikasi: Menu Desktop Center (Absolute Positioning)
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMPRO_MENU_ITEMS } from '@/lib/constants';

export function NavbarCompro() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Detect scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (activeDropdown && !target.closest('[data-dropdown]')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  // Prevent body scroll when mobile menu open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActiveMenu = (href: string) => {
    if (href === '/home') {
      return pathname === '/home';
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200'
            : 'bg-white/80 backdrop-blur-xl border-b border-slate-100'
        )}
      >
        <nav className="mx-auto max-w-7xl px-6">
          {/* PARENT CONTAINER: Relative agar child absolute mengacu ke sini */}
          <div className="flex h-20 items-center justify-between relative">
            
            {/* 1. LOGO (KIRI) */}
            <Link
              href="/home"
              className="flex items-center gap-3 text-xl font-bold text-slate-900 hover:text-emerald-700 transition-colors z-10"
            >
              <img
                src="/logo_pku-mi.png"
                alt="PKU-MI Logo"
                className="h-14 w-14 object-contain"
              />
              <div className="hidden sm:block">
                <div className="text-lg leading-tight">PKUMI</div>
                <div className="text-xs font-normal text-slate-600">Masjid Istiqlal</div>
              </div>
            </Link>

            {/* 2. DESKTOP MENU (CENTER ABSOLUTE) */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {COMPRO_MENU_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  data-dropdown
                >
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className={cn(
                          'flex items-center gap-1 text-sm font-semibold transition-colors',
                          activeDropdown === item.label
                            ? 'text-emerald-700'
                            : 'text-slate-700 hover:text-emerald-700'
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            activeDropdown === item.label && 'rotate-180'
                          )}
                        />
                      </button>

                      {activeDropdown === item.label && (
                        // Dropdown menu centering
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-xl bg-white py-2 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                          {item.submenu.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'relative text-sm font-semibold transition-colors',
                        isActiveMenu(item.href)
                          ? 'text-emerald-700'
                          : 'text-slate-700 hover:text-emerald-700'
                      )}
                    >
                      {item.label}
                      {isActiveMenu(item.href) && (
                        <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* 3. TOMBOL MOBILE / KANAN (TETAP DI KANAN) */}
            <div className="flex items-center gap-4 z-10">
              
              {/* Jika ingin mengaktifkan tombol Portal Berita di Desktop, uncomment ini: */}
              {/* <Link
                href="/"
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold hover:bg-amber-200 transition-colors"
              >
                <Newspaper className="w-4 h-4" />
                Portal
              </Link> */}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-emerald-700 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 lg:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <span className="text-lg font-bold text-slate-900">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-80px)] p-6">
          {COMPRO_MENU_ITEMS.map((item) => (
            <div key={item.label} className="mb-4">
              {item.submenu ? (
                <>
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.label ? null : item.label
                      )
                    }
                    className="flex items-center justify-between w-full text-left text-slate-900 font-semibold mb-2"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        activeDropdown === item.label && 'rotate-180'
                      )}
                    />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="ml-4 space-y-2">
                      {item.submenu.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'block text-slate-900 font-semibold hover:text-emerald-700 transition-colors',
                    isActiveMenu(item.href) && 'text-emerald-700'
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Switch to Portal in Mobile */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 bg-amber-100 text-amber-700 rounded-lg font-semibold hover:bg-amber-200 transition-colors justify-center"
            >
              <Newspaper className="w-5 h-5" />
              Portal Berita
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}