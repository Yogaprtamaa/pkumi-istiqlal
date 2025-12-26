/**
 * Navbar Component
 * Navbar sticky dengan menu navigasi, search bar, login button, dan user menu
 * Menggunakan Client Component untuk interaktivitas
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown, 
  User, 
  LogOut, 
  PenSquare, 
  BookOpen,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MENU_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isSubmitMenuOpen, setIsSubmitMenuOpen] = React.useState(false);

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-user-menu]') && !target.closest('[data-submit-menu]')) {
        setIsUserMenuOpen(false);
        setIsSubmitMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Toggle search bar
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100/80 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 text-xl font-heading font-bold text-islamGreen transition-all duration-300 hover:text-islamGreen-dark hover:scale-105"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-islamGreen text-white shadow-md shadow-islamGreen/20">
              <span className="text-lg">☪</span>
            </div>
            <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  // Menu dengan dropdown
                  <>
                    <button
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-islamGreen',
                        activeDropdown === item.label && 'text-islamGreen'
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180'
                      )} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === item.label && (
                      <div className="absolute left-0 top-full w-48 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-islamGreen-pastel/50 hover:text-islamGreen-dark"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Menu biasa tanpa dropdown
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-islamGreen"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            <div className="hidden md:block">
              {isSearchOpen ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Cari artikel..."
                    className="w-64"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSearch}
                    aria-label="Tutup pencarian"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  aria-label="Buka pencarian"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Submit Button (Desktop) */}
            {isAuthenticated && !isLoading && (
              <div className="relative hidden md:block" data-submit-menu>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 border-islamGreen text-islamGreen hover:bg-islamGreen hover:text-white"
                  onClick={() => setIsSubmitMenuOpen(!isSubmitMenuOpen)}
                >
                  <Plus className="h-4 w-4" />
                  Kirim
                  <ChevronDown className={cn(
                    'h-3 w-3 transition-transform',
                    isSubmitMenuOpen && 'rotate-180'
                  )} />
                </Button>
                
                {isSubmitMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5">
                    <Link
                      href="/submit/rubrik"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-islamGreen-pastel/50 hover:text-islamGreen-dark"
                      onClick={() => setIsSubmitMenuOpen(false)}
                    >
                      <PenSquare className="h-4 w-4" />
                      Kirim Artikel Rubrik
                    </Link>
                    <Link
                      href="/submit/khazanah"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-islamGreen-pastel/50 hover:text-islamGreen-dark"
                      onClick={() => setIsSubmitMenuOpen(false)}
                    >
                      <BookOpen className="h-4 w-4" />
                      Kirim Khazanah
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Auth Section */}
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  // User Menu
                  <div className="relative hidden md:block" data-user-menu>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 transition-colors hover:border-islamGreen-pastel hover:bg-gray-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-islamGreen text-sm font-semibold text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {user?.name?.split(' ')[0]}
                      </span>
                      <ChevronDown className={cn(
                        'h-4 w-4 text-gray-500 transition-transform',
                        isUserMenuOpen && 'rotate-180'
                      )} />
                    </button>
                    
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5">
                        {/* User Info */}
                        <div className="border-b border-gray-100 px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        
                        <Link
                          href="#"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          Profil Saya
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Keluar
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // Login Button
                  <Link href="/login" className="hidden md:block">
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-islamGreen hover:bg-islamGreen-dark"
                    >
                      Masuk
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            {/* Mobile Search */}
            <div className="mb-4 px-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Cari artikel..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Mobile User Info */}
            {isAuthenticated && (
              <div className="mb-4 border-b border-gray-100 px-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-islamGreen text-sm font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Items */}
            <div className="space-y-1">
              {MENU_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => 
                          setActiveDropdown(
                            activeDropdown === item.label ? null : item.label
                          )
                        }
                        className="flex w-full items-center justify-between px-4 py-2 text-base font-medium text-gray-700"
                      >
                        {item.label}
                        <ChevronDown className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          activeDropdown === item.label && 'rotate-180'
                        )} />
                      </button>
                      
                      {activeDropdown === item.label && (
                        <div className="ml-4 space-y-1 border-l-2 border-islamGreen-pastel pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block py-2 text-sm text-gray-600 hover:text-islamGreen"
                              onClick={() => setIsMenuOpen(false)}
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
                      className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-islamGreen"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Submit Options */}
              {isAuthenticated && (
                <div className="border-t border-gray-100 pt-3">
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Kontribusi
                  </p>
                  <Link
                    href="/submit/rubrik"
                    className="flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-700 hover:text-islamGreen"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PenSquare className="h-4 w-4" />
                    Kirim Artikel Rubrik
                  </Link>
                  <Link
                    href="/submit/khazanah"
                    className="flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-700 hover:text-islamGreen"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen className="h-4 w-4" />
                    Kirim Khazanah
                  </Link>
                </div>
              )}

              {/* Mobile Auth Actions */}
              <div className="border-t border-gray-100 pt-3">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </button>
                ) : (
                  <div className="px-4 pt-2 space-y-2">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-islamGreen hover:bg-islamGreen-dark">
                        Masuk
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Daftar
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
