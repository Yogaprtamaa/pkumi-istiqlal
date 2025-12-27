/**
 * HeroSection Component
 * Hero besar di homepage dengan featured article
 */

import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, FileText, Users, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleCard } from './ArticleCard';
import { SITE_CONFIG } from '@/lib/constants';
import { getLatestArticles } from '@/lib/mockData';

export function HeroSection() {
  // Ambil artikel terbaru untuk featured
  const latestArticles = getLatestArticles(4);
  const featuredArticle = latestArticles[0];
  const sideArticles = latestArticles.slice(1, 4);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-islamGreen-pastel/20 via-white to-white">
      {/* Background Pattern (subtle) */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E7D32' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-islamGreen/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-islamGreen-pastel/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Hero Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-islamGreen/20 bg-white/80 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-islamGreen shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
            Portal Berita Islami Terpercaya
          </div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-islamGreen via-islamGreen-dark to-islamGreen bg-clip-text text-transparent">
                Assalamualaikum,
              </span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8.5C50 2 150 2 198 8.5" stroke="#A5D6A7" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
            <br />
            <span className="mt-2 sm:mt-3 block text-xl sm:text-4xl md:text-5xl lg:text-6xl">Selamat Datang di {SITE_CONFIG.name}</span>
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 px-2">
            {SITE_CONFIG.tagline} — Menyajikan artikel Islami yang mencerahkan, 
            kajian mendalam, dan khazanah ilmu yang bermanfaat.
          </p>
          
          {/* Quick Stats */}
          <div className="mt-6 sm:mt-8 flex justify-center gap-4 sm:gap-8 text-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-islamGreen/10">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-islamGreen" />
              </div>
              <div className="text-left">
                <p className="text-base sm:text-xl font-bold text-gray-900">500+</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Artikel</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-islamGreen/10">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-islamGreen" />
              </div>
              <div className="text-left">
                <p className="text-base sm:text-xl font-bold text-gray-900">100K+</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Pembaca</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-islamGreen/10">
                <PenLine className="h-4 w-4 sm:h-5 sm:w-5 text-islamGreen" />
              </div>
              <div className="text-left">
                <p className="text-base sm:text-xl font-bold text-gray-900">50+</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Penulis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <ArticleCard article={featuredArticle} variant="featured" />
          </div>

          {/* Side Articles */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-gray-700">
                Terpopuler
              </h2>
            </div>
            {sideArticles.map((article, index) => (
              <div 
                key={article.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ArticleCard 
                  article={article} 
                  variant="horizontal" 
                />
              </div>
            ))}
            
            {/* View All Button */}
            <Link href="/artikel" className="mt-auto pt-2">
              <Button variant="outline" className="w-full group border-2 border-islamGreen text-islamGreen font-semibold hover:bg-islamGreen hover:text-white transition-all duration-300">
                Lihat Semua Artikel
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
