/**
 * Halaman Rubrik - Redesign dengan Filter Category
 * Menampilkan artikel berdasarkan kategori/rubrik
 * Responsive dan Modern UI dengan Filter
 */

'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Search, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RubrikCard } from '@/components/public/RubrikCard';
import { categoryService, rubrikService } from '@/lib/api';
import type { Category, RubrikItem } from '@/lib/api/types';

// Warna mapping untuk setiap category (same as khazanah)
const categoryColors = {
  tafsir: '#2E7D32',
  hadits: '#1565C0',
  fiqih: '#1565C0',
  akhlak: '#2E7D32',
  'tazkiyatun-nafs': '#6A1B9A',
  keluarga: '#C62828',
  muamalah: '#EF6C00',
  opini: '#EF6C00',
  'pemikiran-ulama': '#6A1B9A',
  'sejarah-islam': '#C62828',
};

export default function RubrikPage() {
  const [activeFilter, setActiveFilter] = useState<number | 'all'>('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [rubriks, setRubriks] = useState<RubrikItem[]>([]);
  const [isLoadingRubriks, setIsLoadingRubriks] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Debounce search input - only apply if 3+ characters or empty
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim() === '' || searchInput.trim().length >= 3) {
        setSearchQuery(searchInput.trim());
        setCurrentPage(1); // Reset to page 1 when search changes
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch rubriks when filters change
  useEffect(() => {
    const fetchRubriks = async () => {
      try {
        setIsLoadingRubriks(true);
        const response = await rubrikService.getPublishedRubrik({
          search: searchQuery,
          category_id: activeFilter === 'all' ? undefined : activeFilter,
          page: currentPage,
          per_page: 9,
        });

        setRubriks(response.data.data);
        setTotalPages(response.data.last_page);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error('Failed to fetch rubriks:', error);
        setRubriks([]);
        setTotalPages(1);
        setTotalItems(0);
      } finally {
        setIsLoadingRubriks(false);
      }
    };

    fetchRubriks();
  }, [searchQuery, activeFilter, currentPage]);

  // Handlers
  const handleFilterChange = (filter: number | 'all') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      document.getElementById('rubrik-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      document.getElementById('rubrik-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-islamGreen text-islamGreen px-3 sm:px-4 py-1 text-[10px] sm:text-xs tracking-widest uppercase"
          >
            <BookOpen className="mr-1.5 h-3 w-3" />
            Artikel
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-4">
            Rubrik Artikel
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Jelajahi artikel inspiratif dan edukatif seputar Islam dari berbagai kategori rubrik.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* FILTER BAR */}
        <div
          id="rubrik-grid"
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-100 scroll-mt-24"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'secondary'}
              onClick={() => handleFilterChange('all')}
              size="sm"
              className={`rounded-full px-4 sm:px-6 text-xs sm:text-sm transition-all ${
                activeFilter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua
            </Button>

            {isLoadingCategories ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 sm:h-9 w-20 sm:w-24 bg-gray-200 rounded-full animate-pulse"
                />
              ))
            ) : (
              categories.map((category) => {
                const colorKey = category.slug as keyof typeof categoryColors;
                const color = categoryColors[colorKey] || '#2E7D32';

                return (
                  <Button
                    key={category.id}
                    variant={activeFilter === category.id ? 'default' : 'outline'}
                    onClick={() => handleFilterChange(category.id)}
                    size="sm"
                    className={`rounded-full px-3 sm:px-5 text-xs sm:text-sm border transition-all ${
                      activeFilter === category.id
                        ? 'text-white border-transparent'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-transparent'
                    }`}
                    style={activeFilter === category.id ? { backgroundColor: color } : {}}
                  >
                    {category.name}
                  </Button>
                );
              })
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 xl:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari artikel... (min. 3 karakter)"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 rounded-full border-gray-200 bg-gray-50 focus:bg-white transition-all h-10 sm:h-11 text-sm"
            />
            {searchInput.trim().length > 0 && searchInput.trim().length < 3 && (
              <p className="absolute -bottom-5 left-0 text-xs text-gray-500 mt-1">
                Minimal 3 karakter untuk mencari
              </p>
            )}
          </div>
        </div>

        {/* RUBRIKS GRID */}
        {isLoadingRubriks ? (
          // Loading skeleton
          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-200 animate-pulse" />
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                  <div className="pt-3 border-t border-gray-100 flex justify-between">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : rubriks.length > 0 ? (
          <>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-600">
              Menampilkan <span className="font-semibold text-gray-900">{totalItems}</span> rubrik
              {activeFilter !== 'all' && (
                <span>
                  {' '}dalam kategori{' '}
                  <span className="font-semibold text-islamGreen">
                    {categories.find(cat => cat.id === activeFilter)?.name || ''}
                  </span>
                </span>
              )}
            </p>
            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {rubriks.map((rubrik) => (
                <RubrikCard key={rubrik.id} rubrik={rubrik} />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-12 sm:mt-16 lg:mt-20 flex justify-center">
                <div className="inline-flex items-center gap-1 sm:gap-2 p-1 rounded-full bg-gray-50 border border-gray-200 shadow-xs">
                  <Button
                    variant="ghost"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    size="sm"
                    className="rounded-full px-3 sm:px-4 text-xs sm:text-sm text-gray-600 disabled:text-gray-300 hover:bg-white hover:text-islamGreen"
                  >
                    <span className="hidden sm:inline">Sebelumnya</span>
                    <span className="sm:hidden">Prev</span>
                  </Button>

                  <div className="flex items-center px-2 gap-1">
                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-gray-900 font-bold shadow-xs text-xs sm:text-sm border border-gray-100">
                      {currentPage}
                    </span>
                    <span className="text-gray-400 text-xs sm:text-sm">
                      / {totalPages}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    size="sm"
                    className="rounded-full px-3 sm:px-4 text-xs sm:text-sm text-gray-900 font-medium hover:bg-white hover:shadow-xs hover:text-islamGreen disabled:text-gray-300"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <span className="sm:hidden">Next</span>
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Empty State
          <div className="py-16 sm:py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl sm:rounded-3xl bg-gray-50/50">
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Tidak ditemukan
            </h3>
            <p className="text-sm sm:text-base text-gray-500 px-4">
              Maaf, tidak ada rubrik untuk kategori{' '}
              <span className="font-bold">
                &quot;{activeFilter === 'all'
                  ? 'Semua'
                  : categories.find(cat => cat.id === activeFilter)?.name || ''}&quot;
              </span>
              {searchQuery && (
                <span> dengan kata kunci &quot;{searchQuery}&quot;</span>
              )}
            </p>
            <Button
              variant="link"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
                setSearchInput('');
              }}
              className="text-islamGreen mt-4 text-sm"
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
