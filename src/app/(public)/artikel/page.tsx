"use client";

/**
 * Halaman Daftar Artikel - Carousel Static + Dynamic Filtering + Pagination
 * Fitur:
 * 1. Carousel: 5 Artikel teratas (Static)
 * 2. Grid: Sisa artikel dengan Filter Kategori & Search (Client Side)
 * 3. Pagination: Membatasi tampilan hanya 6 artikel per halaman (Client Side)
 */

import React, { useCallback, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { articles, rubriks } from "@/lib/mockData";
import { ArticleCard } from "@/components/public/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Embla Imports
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const ITEMS_PER_PAGE = 6; // Batas artikel per halaman

export default function ArtikelPage() {
  // --- STATE MANAGEMENT ---
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State halaman aktif

  // --- CAROUSEL SETUP ---
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // --- DATA PROCESSING ---
  // 1. Pisahkan Data: 5 untuk Carousel, Sisanya untuk Grid
  const carouselArticles = articles.slice(0, 5);
  const remainingArticles = articles.slice(5);

  // 2. Reset Halaman ke 1 jika Filter/Search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  // 3. FILTERING LOGIC (Semua data diproses dulu)
  const filteredArticles = useMemo(() => {
    return remainingArticles.filter((article) => {
      const matchRubrik =
        activeFilter === "all" || article.rubrik.slug === activeFilter;
      const matchSearch = article.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchRubrik && matchSearch;
    });
  }, [remainingArticles, activeFilter, searchQuery]);

  // 4. PAGINATION LOGIC (Potong data sesuai halaman)
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // --- HANDLERS ---
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      // Opsional: Scroll sedikit ke atas grid saat ganti halaman
      document
        .getElementById("article-grid")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      document
        .getElementById("article-grid")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Safety Check
  if (!articles || articles.length === 0) {
    return <div className="text-center py-20">Belum ada data artikel.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-islamGreen text-islamGreen px-4 py-1 text-xs tracking-widest uppercase"
          >
            Arsip Redaksi
          </Badge>
          <h1 className="font-heading text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tight mb-4">
            Artikel & Wawasan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Menyelami samudra ilmu melalui tulisan-tulisan pilihan yang
            mencerahkan akal dan menenangkan hati.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* === FEATURED CAROUSEL === */}
        <section className="mb-20 relative group/carousel">
          <div
            className="overflow-hidden rounded-3xl border border-gray-100 shadow-xl"
            ref={emblaRef}
          >
            <div className="flex touch-pan-y backface-hidden">
              {carouselArticles.map((featuredArticle) => (
                <div
                  className="flex-[0_0_100%] min-w-0 relative"
                  key={featuredArticle.id}
                >
                  <div className="grid lg:grid-cols-2 gap-0 bg-white h-full">
                    <div className="relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                      <Image
                        src={featuredArticle.imageUrl}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-white relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Badge className="bg-islamGreen text-white border-none">
                          {featuredArticle.rubrik.name}
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />{" "}
                          {featuredArticle.readTime} min baca
                        </span>
                      </div>
                      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight line-clamp-3">
                        <Link
                          href={`/artikel/${featuredArticle.slug}`}
                          className="hover:text-islamGreen transition-colors"
                        >
                          {featuredArticle.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 text-lg mb-8 line-clamp-3 leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-islamGreen">
                            {featuredArticle.author.charAt(0)}
                          </div>
                          <div className="text-sm">
                            <p className="font-bold text-gray-900">
                              {featuredArticle.author}
                            </p>
                            <p className="text-gray-500">
                              {new Date(
                                featuredArticle.date
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <Link href={`/artikel/${featuredArticle.slug}`}>
                          <Button
                            size="icon"
                            className="rounded-full bg-gray-900 hover:bg-islamGreen transition-colors h-12 w-12"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Nav Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hidden lg:flex hover:text-islamGreen opacity-0 group-hover/carousel:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hidden lg:flex hover:text-islamGreen opacity-0 group-hover/carousel:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </section>

        {/* === FILTER BAR & SEARCH === */}
        <div
          id="article-grid"
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-8 border-b border-gray-100 scroll-mt-24"
        >
          {/* Kategori Filters */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <Button
              variant={activeFilter === "all" ? "default" : "secondary"}
              onClick={() => setActiveFilter("all")}
              className={`rounded-full px-6 transition-all ${
                activeFilter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Semua
            </Button>

            {rubriks.map((rubrik) => (
              <Button
                key={rubrik.id}
                variant={activeFilter === rubrik.slug ? "default" : "outline"}
                onClick={() => setActiveFilter(rubrik.slug)}
                className={`rounded-full px-6 border transition-all ${
                  activeFilter === rubrik.slug
                    ? "bg-islamGreen text-white border-islamGreen hover:bg-islamGreen-dark"
                    : "border-gray-200 text-gray-600 hover:border-islamGreen hover:text-islamGreen bg-transparent"
                }`}
              >
                {rubrik.name}
              </Button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari judul artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full border-gray-200 bg-gray-50 focus:bg-white transition-all h-11"
            />
          </div>
        </div>

        {/* === MAIN ARTICLE GRID (PAGINATED) === */}
        {paginatedArticles.length > 0 ? (
          <>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in zoom-in duration-500">
              {paginatedArticles.map((article) => (
                <div key={article.id} className="h-full flex flex-col">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>

            {/* === PAGINATION CONTROLS === */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center">
                <div className="inline-flex items-center gap-2 p-1 rounded-full bg-gray-50 border border-gray-200 shadow-xs">
                  <Button
                    variant="ghost"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="rounded-full px-4 text-gray-600 disabled:text-gray-300 hover:bg-white hover:text-islamGreen"
                  >
                    Sebelumnya
                  </Button>

                  <div className="flex items-center px-2 gap-1">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-900 font-bold shadow-xs text-sm border border-gray-100">
                      {currentPage}
                    </span>
                    <span className="text-gray-400 text-sm">
                      dari {totalPages}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="rounded-full px-4 text-gray-900 font-medium hover:bg-white hover:shadow-xs hover:text-islamGreen disabled:text-gray-300"
                  >
                    Selanjutnya
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Empty State
          <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Tidak ditemukan
            </h3>
            <p className="text-gray-500">
              Maaf, tidak ada artikel untuk kategori{" "}
              <span className="font-bold">
                &quot;{activeFilter === "all" ? "Semua" : activeFilter}&quot;
              </span>
              {searchQuery && (
                <span> dengan kata kunci &quot;{searchQuery}&quot;</span>
              )}
              .
            </p>
            <Button
              variant="link"
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="text-islamGreen mt-4"
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
