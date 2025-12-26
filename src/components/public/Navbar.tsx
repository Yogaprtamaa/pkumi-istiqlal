/**
 * Navbar Component
 * Navbar sticky dengan menu navigasi dan search bar
 * Menggunakan Client Component untuk interaktivitas mobile menu
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MENU_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Toggle search bar
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl font-heading font-bold text-islamGreen transition-colors hover:text-islamGreen-dark"
          >
            <span className="text-2xl">☪</span>
            <span>{SITE_CONFIG.name}</span>
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

          {/* Search & Mobile Menu Toggle */}
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
