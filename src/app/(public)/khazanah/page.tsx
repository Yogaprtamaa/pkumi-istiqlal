/**
 * Halaman Khazanah - Redesign Konsisten dengan Artikel
 * Konten spesial: tafsir, hadits, doa, kisah
 * Responsive dan Modern UI
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  BookMarked,
  HandHeart,
  Users,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryService } from "@/lib/api/services/category.service";
import { khazanahService } from "@/lib/api/services/khazanah.service";
import type { Category, KhazanahItem } from "@/lib/api/types";

// Icon mapping untuk setiap type
const typeIcons = {
  tafsir: BookOpen,
  hadits: BookMarked,
  doa: HandHeart,
  kisah: Users,
};

// Warna mapping untuk setiap type
const typeColors = {
  tafsir: "#2E7D32",
  hadits: "#1565C0",
  fiqih: "#1565C0",
  doa: "#6A1B9A",
  kisah: "#EF6C00",
  opini: "#EF6C00",
  "pemikiran-ulama": "#6A1B9A",
  "sejarah-islam": "#C62828",
};

const ITEMS_PER_PAGE = 6;

export default function KhazanahPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState(""); // For input display
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [khazanahItems, setKhazanahItems] = useState<KhazanahItem[]>([]);
  const [isLoadingKhazanah, setIsLoadingKhazanah] = useState(true);
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
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Debounce search input - only apply if 3+ characters or empty
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only set searchQuery if input is empty or has 3+ characters
      if (searchInput.trim() === "" || searchInput.trim().length >= 3) {
        setSearchQuery(searchInput.trim());
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch khazanah data whenever filters change
  useEffect(() => {
    const fetchKhazanah = async () => {
      try {
        setIsLoadingKhazanah(true);

        // Find category ID from slug if filter is not 'all'
        let categoryId: number | undefined;
        if (activeFilter !== "all") {
          const category = categories.find((cat) => cat.slug === activeFilter);
          categoryId = category?.id;
        }

        const response = await khazanahService.getPublishedKhazanah({
          category_id: categoryId,
          per_page: ITEMS_PER_PAGE,
          search: searchQuery || undefined,
          page: currentPage,
        });

        setKhazanahItems(response.data.data);
        setTotalPages(response.data.last_page);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error("Failed to fetch khazanah:", error);
        setKhazanahItems([]);
        setTotalPages(1);
        setTotalItems(0);
      } finally {
        setIsLoadingKhazanah(false);
      }
    };

    // Only fetch if categories are loaded (to get category_id)
    if (!isLoadingCategories) {
      fetchKhazanah();
    }
  }, [activeFilter, searchQuery, currentPage, categories, isLoadingCategories]);

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      document
        .getElementById("khazanah-grid")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      document
        .getElementById("khazanah-grid")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setCurrentPage(1); // Reset to page 1 when search changes
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
            Perbendaharaan ilmu Islam yang mencerahkan — tafsir Al-Quran, hadits
            pilihan, doa sehari-hari, dan kisah inspiratif.
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
              variant={activeFilter === "all" ? "default" : "secondary"}
              onClick={() => handleFilterChange("all")}
              size="sm"
              className={`rounded-full px-4 sm:px-6 text-xs sm:text-sm transition-all ${
                activeFilter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Semua
            </Button>

            {isLoadingCategories
              ? // Loading skeleton for categories
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 sm:h-9 w-20 sm:w-24 bg-gray-200 rounded-full animate-pulse"
                  />
                ))
              : categories.map((category) => {
                  // Map category slug to icon (fallback to BookOpen if not found)
                  const iconKey = category.slug as keyof typeof typeIcons;
                  const Icon = typeIcons[iconKey] || BookOpen;

                  // Map category slug to color (fallback to islamGreen if not found)
                  const colorKey = category.slug as keyof typeof typeColors;
                  const color = typeColors[colorKey] || "#2E7D32";

                  return (
                    <Button
                      key={category.id}
                      variant={
                        activeFilter === category.slug ? "default" : "outline"
                      }
                      onClick={() => handleFilterChange(category.slug)}
                      size="sm"
                      className={`rounded-full px-3 sm:px-5 text-xs sm:text-sm border transition-all gap-1.5 ${
                        activeFilter === category.slug
                          ? "text-white border-transparent"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 bg-transparent"
                      }`}
                      style={
                        activeFilter === category.slug
                          ? { backgroundColor: color }
                          : {}
                      }
                    >
                      <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{category.name}</span>
                    </Button>
                  );
                })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 xl:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari khazanah... (min. 3 karakter)"
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

        {/* KHAZANAH GRID */}
        {isLoadingKhazanah ? (
          // Loading skeleton
          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : khazanahItems.length > 0 ? (
          <>
            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {khazanahItems.map((item) => {
                const iconKey = item.category?.slug as keyof typeof typeIcons;
                const Icon = typeIcons[iconKey] || BookOpen;
                const colorKey = item.category?.slug as keyof typeof typeColors;
                const color = typeColors[colorKey] || "#2E7D32";
                const imageUrl = (item.thumbnail && item.thumbnail.trim() !== '')
                  ? item.thumbnail
                  : "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=600&fit=crop";

                return (
                  <Link key={item.id} href={`/khazanah/${item.slug}`} className="group block">
                    <Card className="h-full overflow-hidden border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Badge */}
                      {item.category && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <Badge
                            className="border-0 font-semibold shadow-md backdrop-blur-sm text-xs gap-1"
                            style={{ backgroundColor: color }}
                          >
                            <Icon className="h-3 w-3" />
                            {item.category.name}
                          </Badge>
                        </div>
                      )}

                      {/* Title on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 drop-shadow-lg">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-5">
                      {/* Excerpt */}
                      {item.excerpt && (
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>
                      )}

                      {/* Tags */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.tags
                            .split(",")
                            .slice(0, 3)
                            .map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                        </div>
                      )}

                      {/* Author & Date */}
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
                        <span>
                          <span className="font-medium text-gray-700">
                            Penulis:
                          </span>{" "}
                          {item.author?.name || item.student?.name || "Anonim"}
                        </span>
                        <span>
                          {new Date(item.published_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  </Link>
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
              Maaf, tidak ada khazanah untuk kategori{" "}
              <span className="font-bold">
                &quot;
                {activeFilter === "all"
                  ? "Semua"
                  : categories.find((cat) => cat.slug === activeFilter)?.name ||
                    activeFilter}
                &quot;
              </span>
              {searchQuery && (
                <span> dengan kata kunci &quot;{searchQuery}&quot;</span>
              )}
            </p>
            <Button
              variant="link"
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
                setSearchInput("");
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
