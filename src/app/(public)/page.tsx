/**
 * Homepage
 * Halaman utama portal berita Islami
 * Menampilkan Hero + Artikel Terbaru + Khazanah Carousel
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/public/HeroSection';
import { ArticleCard } from '@/components/public/ArticleCard';
import { KhazanahCarousel } from '@/components/public/KhazanahCarousel';
import { getLatestArticles, rubriks, khazanah } from '@/lib/mockData';

export default function HomePage() {
  // Ambil artikel terbaru (skip 4 pertama yang sudah di hero)
  const latestArticles = getLatestArticles(10).slice(4);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Artikel Terbaru Section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                Artikel Terbaru
              </h2>
              <p className="mt-2 text-gray-600">
                Bacaan terkini untuk memperkaya wawasan Islami Anda
              </p>
            </div>
            <Link href="/artikel" className="hidden sm:block">
              <Button variant="ghost" className="group">
                Lihat Semua
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Articles Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 text-center sm:hidden">
            <Link href="/artikel">
              <Button variant="outline" className="w-full max-w-xs">
                Lihat Semua Artikel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Rubrik Section */}
      <section className="border-y border-gray-100 bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
              Jelajahi Rubrik
            </h2>
            <p className="mt-2 text-gray-600">
              Temukan artikel sesuai topik yang Anda minati
            </p>
          </div>

          {/* Rubrik Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {rubriks.map((rubrik) => (
              <Link
                key={rubrik.id}
                href={`/rubrik/${rubrik.slug}`}
                className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-islamGreen/20"
              >
                {/* Accent Color Bar */}
                <div 
                  className="absolute left-0 top-0 h-1 w-full transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: rubrik.color }}
                />
                
                <h3 className="font-heading text-lg font-semibold text-gray-900 transition-colors group-hover:text-islamGreen">
                  {rubrik.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {rubrik.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Khazanah Section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                Pilihan Khazanah
              </h2>
              <p className="mt-2 text-gray-600">
                Tafsir, hadits, doa, dan kisah inspiratif untuk mencerahkan hati
              </p>
            </div>
            <Link href="/khazanah" className="hidden sm:block">
              <Button variant="ghost" className="group">
                Lihat Semua
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Khazanah Carousel */}
          <div className="mt-8">
            <KhazanahCarousel items={khazanah} />
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-islamGreen py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Dapatkan Artikel Terbaru
          </h2>
          <p className="mt-3 text-islamGreen-pastel">
            Berlangganan newsletter kami dan dapatkan artikel Islami langsung di inbox Anda setiap minggu.
          </p>
          
          {/* Newsletter Form Placeholder */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 sm:w-80"
            />
            <Button className="bg-white text-islamGreen hover:bg-gray-100">
              Berlangganan
            </Button>
          </div>
          
          <p className="mt-4 text-xs text-islamGreen-pastel/80">
            Kami menghargai privasi Anda. Berhenti berlangganan kapan saja.
          </p>
        </div>
      </section>
    </>
  );
}
