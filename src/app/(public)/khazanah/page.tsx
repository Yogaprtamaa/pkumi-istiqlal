/**
 * Halaman Khazanah - Redesign Konsisten dengan Artikel
 * Konten spesial: tafsir, hadits, doa, kisah
 * Responsive dan Modern UI
 */

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { BookOpen, BookMarked, HandHeart, Users, Search, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { khazanah } from '@/lib/mockData';

// Icon mapping untuk setiap type
const typeIcons = {
  tafsir: BookOpen,
  hadits: BookMarked,
  doa: HandHeart,
  kisah: Users,
};

// Label mapping untuk setiap type
const typeLabels = {
  tafsir: 'Tafsir',
  hadits: 'Hadits',
  doa: 'Doa',
  kisah: 'Kisah',
};

// Warna mapping untuk setiap type
const typeColors = {
  tafsir: '#2E7D32',
  hadits: '#1565C0',
  doa: '#6A1B9A',
  kisah: '#EF6C00',
};

const ITEMS_PER_PAGE = 6;

export default function KhazanahPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Filter khazanah
  const filteredKhazanah = useMemo(() => {
    return khazanah.filter((item) => {
      const matchType = activeFilter === 'all' || item.type === activeFilter;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredKhazanah.length / ITEMS_PER_PAGE);
  const paginatedKhazanah = filteredKhazanah.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Toggle expand item
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      document.getElementById('khazanah-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      document.getElementById('khazanah-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER - Konsisten dengan Artikel */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-islamGreen text-islamGreen px-3 sm:px-4 py-1 text-[10px] sm:text-xs tracking-widest uppercase"
          >
            <BookOpen className="mr-1.5 h-3 w-3" />
            Khazanah Ilmu
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-4">
            Khazanah Islam
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Perbendaharaan ilmu Islam yang mencerahkan — tafsir Al-Quran, 
            hadits pilihan, doa sehari-hari, dan kisah inspiratif.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* FILTER BAR - Konsisten dengan Artikel */}
        <div
          id="khazanah-grid"
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-100 scroll-mt-24"
        >
          {/* Kategori Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'secondary'}
              onClick={() => { setActiveFilter('all'); setCurrentPage(1); }}
              size="sm"
              className={`rounded-full px-4 sm:px-6 text-xs sm:text-sm transition-all ${
                activeFilter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua
            </Button>

            {Object.entries(typeLabels).map(([type, label]) => {
              const Icon = typeIcons[type as keyof typeof typeIcons];
              const color = typeColors[type as keyof typeof typeColors];
              return (
                <Button
                  key={type}
                  variant={activeFilter === type ? 'default' : 'outline'}
                  onClick={() => { setActiveFilter(type); setCurrentPage(1); }}
                  size="sm"
                  className={`rounded-full px-3 sm:px-5 text-xs sm:text-sm border transition-all gap-1.5 ${
                    activeFilter === type
                      ? 'text-white border-transparent'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-transparent'
                  }`}
                  style={activeFilter === type ? { backgroundColor: color } : {}}
                >
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>{label}</span>
                </Button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 xl:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari khazanah..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="pl-10 rounded-full border-gray-200 bg-gray-50 focus:bg-white transition-all h-10 sm:h-11 text-sm"
            />
          </div>
        </div>

        {/* KHAZANAH GRID */}
        {paginatedKhazanah.length > 0 ? (
          <>
            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedKhazanah.map((item) => {
                const Icon = typeIcons[item.type as keyof typeof typeIcons];
                const color = typeColors[item.type as keyof typeof typeColors];
                const isExpanded = expandedItems.includes(item.id);

                return (
                  <Card 
                    key={item.id}
                    className="group overflow-hidden border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <Badge 
                          className="border-0 font-semibold shadow-md backdrop-blur-sm text-xs gap-1"
                          style={{ backgroundColor: color }}
                        >
                          <Icon className="h-3 w-3" />
                          {typeLabels[item.type as keyof typeof typeLabels]}
                        </Badge>
                      </div>

                      {/* Title on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 drop-shadow-lg">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-5">
                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
                        {item.excerpt}
                      </p>
                      
                      {/* Content - Expandable */}
                      <div 
                        className={`prose prose-sm prose-islamGreen max-w-none text-gray-700 text-xs sm:text-sm overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-96' : 'max-h-20 sm:max-h-24'
                        }`}
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />

                      {/* Expand Button */}
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="mt-3 flex items-center gap-1 text-xs font-medium text-islamGreen hover:text-islamGreen-dark transition-colors"
                      >
                        {isExpanded ? 'Tutup' : 'Baca Selengkapnya'}
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Source */}
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          <span className="font-medium text-gray-700">Sumber:</span> {item.source}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
              Maaf, tidak ada khazanah untuk kategori{' '}
              <span className="font-bold">
                &quot;{activeFilter === 'all' ? 'Semua' : typeLabels[activeFilter as keyof typeof typeLabels]}&quot;
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