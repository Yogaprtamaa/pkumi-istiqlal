/**
 * HeroSection Component
 * Hero besar di homepage dengan featured article
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-linear-to-br from-white via-islamGreen-pastel/10 to-white">
      {/* Background Pattern (subtle) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E7D32' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Header */}
        <div className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            <span className="text-islamGreen">Assalamualaikum,</span>
            <br />
            <span className="mt-2 block">Selamat Datang di {SITE_CONFIG.name}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {SITE_CONFIG.tagline} — Menyajikan artikel Islami yang mencerahkan, 
            kajian mendalam, dan khazanah ilmu yang bermanfaat.
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <ArticleCard article={featuredArticle} variant="featured" />
          </div>

          {/* Side Articles */}
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-gray-500">
              Terpopuler
            </h2>
            {sideArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                variant="horizontal" 
              />
            ))}
            
            {/* View All Button */}
            <Link href="/artikel" className="mt-2">
              <Button variant="outline" className="w-full group">
                Lihat Semua Artikel
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
