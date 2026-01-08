/**
 * Navbar Component
 * Navbar sticky dengan menu navigasi, search bar, login button, dan user menu
 * Mobile: Sidebar dari kanan dengan smooth animation
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  PenSquare,
  BookOpen,
  Plus,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PORTAL_MENU_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isSubmitMenuOpen, setIsSubmitMenuOpen] = React.useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = React.useState<
    string | null
  >(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Detect scroll for navbar animation
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [isMenuOpen]);

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("[data-user-menu]") &&
        !target.closest("[data-submit-menu]")
      ) {
        setIsUserMenuOpen(false);
        setIsSubmitMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Check if menu item is active
  const isActiveMenu = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 ease-out",
          isScrolled
            ? "mx-auto mt-2 w-[95%] lg:w-[90%] max-w-6xl rounded-2xl bg-white/95 backdrop-blur-xl shadow-lg shadow-black/[0.08] border border-gray-200/60"
            : "w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/80"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-semibold text-slate-900 transition-colors hover:text-emerald-700"
            >
              <img
                src="/logo_pku-mi.png"
                alt="PKU-MI Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {PORTAL_MENU_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    // Menu dengan dropdown
                    <>
                      <button
                        className={cn(
                          "flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-islamGreen",
                          activeDropdown === item.label && "text-islamGreen"
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            activeDropdown === item.label && "rotate-180"
                          )}
                        />
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
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-all duration-300 group",
                        isActiveMenu(item.href)
                          ? "text-islamGreen"
                          : "text-gray-700 hover:text-islamGreen"
                      )}
                    >
                      {item.label}
                      {/* Active indicator with animation */}
                      <span
                        className={cn(
                          "absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-islamGreen via-islamGreen-dark to-islamGreen rounded-full transition-all duration-300 ease-out",
                          isActiveMenu(item.href)
                            ? "w-full -translate-x-1/2 opacity-100"
                            : "w-0 -translate-x-1/2 opacity-0 group-hover:w-full group-hover:opacity-100"
                        )}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Switch to Compro Button */}
              <Link
                href="/home"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold hover:bg-emerald-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Compro
              </Link>

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
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform",
                        isSubmitMenuOpen && "rotate-180"
                      )}
                    />
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
                          {user?.name?.split(" ")[0]}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-gray-500 transition-transform",
                            isUserMenuOpen && "rotate-180"
                          )}
                        />
                      </button>

                      {isUserMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5">
                          {/* User Info */}
                          <div className="border-b border-gray-100 px-4 py-3">
                            <p className="text-sm font-medium text-gray-900">
                              {user?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              NIM: {user?.nim}
                            </p>
                          </div>

                          <Link
                            href={`/penulis/${user?.nim || 'profile'}`}
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
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
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
                aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 z-[101] h-dvh w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden overflow-hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 bg-white">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-heading font-bold text-islamGreen"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="/logo_pku-mi.png"
                alt="PKU-MI Logo"
                className="h-16 w-16 object-contain"
              />
              <span className="truncate">{SITE_CONFIG.name}</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              className="hover:bg-gray-100 shrink-0 ml-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content - Scrollable */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* User Profile Section - Only for authenticated users */}
            {isAuthenticated && (
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-islamGreen to-islamGreen-dark text-white font-semibold shadow-md">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate text-sm">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      NIM: {user?.nim}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/penulis/${user?.nim || 'profile'}`}
                  className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Lihat Profil
                </Link>
              </div>
            )}

            {/* Navigation Menu - Always visible */}
            <div className="p-4 space-y-1">
              <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Menu
              </p>
              {PORTAL_MENU_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="space-y-0.5">
                      <button
                        onClick={() =>
                          setMobileExpandedMenu(
                            mobileExpandedMenu === item.label
                              ? null
                              : item.label
                          )
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-islamGreen-pastel/30 hover:text-islamGreen-dark transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            mobileExpandedMenu === item.label && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Accordion Content */}
                      {mobileExpandedMenu === item.label && (
                        <div className="ml-2 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-islamGreen-pastel/30 hover:text-islamGreen-dark transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300",
                        isActiveMenu(item.href)
                          ? "bg-islamGreen text-white shadow-md shadow-islamGreen/25"
                          : "text-gray-700 hover:bg-islamGreen-pastel/30 hover:text-islamGreen-dark"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {/* Active indicator badge */}
                      {isActiveMenu(item.href) && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                      )}
                      <span className={isActiveMenu(item.href) ? "ml-2" : ""}>
                        {item.label}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Section - Only for authenticated users */}
            {isAuthenticated && (
              <div className="border-t border-gray-200 p-4 space-y-1">
                <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Kontribusi
                </p>
                <Link
                  href="/submit/rubrik"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-islamGreen-pastel/30 hover:text-islamGreen-dark transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PenSquare className="h-5 w-5" />
                  <span>Kirim Artikel Rubrik</span>
                </Link>
                <Link
                  href="/submit/khazanah"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-islamGreen-pastel/30 hover:text-islamGreen-dark transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Kirim Khazanah</span>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar Footer - Auth Actions */}
          <div className="border-t border-gray-200 p-4 bg-white space-y-3">
            {/* Switch to Compro */}
            <Link
              href="/home"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-100 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-200 transition-colors"
            >
              <Globe className="w-5 h-5" />
              Compro PKUMI
            </Link>

            {isAuthenticated ? (
              <Button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                variant="outline"
                className="w-full justify-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 h-11"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            ) : (
              <div className="space-y-2.5">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  <Button className="w-full bg-islamGreen hover:bg-islamGreen-dark h-11 font-medium">
                    Masuk
                  </Button>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 h-11 font-medium"
                  >
                    Daftar Akun
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
