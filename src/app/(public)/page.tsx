/**
 * Homepage
 * Halaman utama portal berita Islami
 * Menampilkan Hero + Artikel Terbaru + Khazanah Carousel
 */

import Link from 'next/link';
import { ArrowRight, PenSquare, BookOpen, Users, Star } from 'lucide-react';
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
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-10 gap-4">
            <div>
              <span className="inline-block rounded-full bg-islamGreen/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-islamGreen mb-2 sm:mb-3">
                📰 Artikel
              </span>
              <h2 className="font-heading text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
                Artikel Terbaru
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 max-w-lg">
                Bacaan terkini untuk memperkaya wawasan Islami Anda
              </p>
            </div>
            <Link href="/artikel" className="hidden sm:block">
              <Button variant="outline" className="group border-2 border-islamGreen text-islamGreen font-semibold hover:bg-islamGreen hover:text-white">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-10 text-center sm:hidden">
            <Link href="/artikel">
              <Button variant="outline" className="w-full max-w-xs border-2 border-islamGreen text-islamGreen font-semibold">
                Lihat Semua Artikel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Rubrik Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-gray-50/80 via-white to-white py-16 lg:py-20">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-islamGreen-pastel/30 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-islamGreen-pastel/30 blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-islamGreen/10 px-4 py-1.5 text-sm font-semibold text-islamGreen mb-3">
              📂 Kategori
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Jelajahi Rubrik
            </h2>
            <p className="mt-3 text-gray-600 max-w-lg mx-auto">
              Temukan artikel sesuai topik yang Anda minati
            </p>
          </div>

          {/* Rubrik Grid */}
          <div className="grid gap-3 sm:gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {rubriks.map((rubrik) => (
              <Link
                key={rubrik.id}
                href={`/rubrik/${rubrik.slug}`}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Background gradient on hover */}
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(135deg, ${rubrik.color}08 0%, ${rubrik.color}15 100%)` }}
                />
                
                {/* Accent Color Bar */}
                <div 
                  className="absolute left-0 top-0 h-1 w-full transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: rubrik.color }}
                />
                
                {/* Icon */}
                <div 
                  className="relative mb-2 sm:mb-4 inline-flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ backgroundColor: `${rubrik.color}15` }}
                >
                  <span className="text-lg sm:text-2xl" style={{ color: rubrik.color }}>☪</span>
                </div>
                
                <h3 className="relative font-heading text-sm sm:text-lg font-bold text-gray-900 transition-colors group-hover:text-islamGreen">
                  {rubrik.name}
                </h3>
                <p className="relative mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed hidden sm:block">
                  {rubrik.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="relative mt-2 sm:mt-4 flex items-center text-xs sm:text-sm font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ color: rubrik.color }}>
                  Lihat <span className="hidden sm:inline">&nbsp;artikel</span>
                  <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Khazanah Section */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-10 gap-4">
            <div>
              <span className="inline-block rounded-full bg-purple-100 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-purple-700 mb-2 sm:mb-3">
                📚 Khazanah
              </span>
              <h2 className="font-heading text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl">
                Pilihan Khazanah
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 max-w-lg">
                Tafsir, hadits, doa, dan kisah inspiratif untuk mencerahkan hati
              </p>
            </div>
            <Link href="/khazanah" className="hidden sm:block">
              <Button variant="outline" className="group border-2 border-purple-600 text-purple-600 font-semibold hover:bg-purple-600 hover:text-white">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Khazanah Carousel */}
          <KhazanahCarousel items={khazanah} />
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-islamGreen via-islamGreen-dark to-islamGreen py-10 sm:py-16 lg:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl">✉️</span>
          </div>
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            Dapatkan Artikel Terbaru
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-islamGreen-pastel/90">
            Berlangganan newsletter kami dan dapatkan artikel Islami langsung di inbox Anda setiap minggu.
          </p>
          
          {/* Newsletter Form Placeholder */}
          <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="rounded-xl border-2 border-white/20 bg-white/10 px-4 sm:px-5 py-3 sm:py-3.5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:w-80 backdrop-blur-sm text-sm sm:text-base"
            />
            <Button className="bg-white text-islamGreen hover:bg-gray-100 font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-black/10">
              Berlangganan
            </Button>
          </div>
          
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-islamGreen-pastel/80">
            🔒 Kami menghargai privasi Anda. Berhenti berlangganan kapan saja.
          </p>
        </div>
      </section>

      {/* Contributor CTA Section */}
      <section className="py-10 sm:py-16 lg:py-24 bg-linear-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-4xl bg-white shadow-xl sm:shadow-2xl border border-gray-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E7D32' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            {/* Green accent */}
            <div className="absolute left-0 top-0 h-1.5 sm:h-2 w-full bg-linear-to-r from-islamGreen via-islamGreen-light to-islamGreen" />
            
            <div className="relative grid gap-8 p-5 sm:p-8 md:grid-cols-2 md:p-12 lg:gap-16 lg:p-16">
              {/* Content */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-islamGreen/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-islamGreen">
                  <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-islamGreen animate-pulse" />
                  Bergabung Bersama Kami
                </span>
                <h2 className="mt-4 sm:mt-6 font-heading text-xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                  Jadilah Kontributor Nur Berita
                </h2>
                <p className="mt-3 sm:mt-5 text-gray-600 text-sm sm:text-lg leading-relaxed">
                  Bagikan pengetahuan Islami Anda kepada jutaan pembaca. Tulis artikel rubrik atau 
                  khazanah dan berkontribusi dalam menyebarkan kebaikan.
                </p>
                
                {/* Stats */}
                <div className="mt-5 sm:mt-8 flex gap-4 sm:gap-8">
                  <div>
                    <div className="text-xl sm:text-3xl font-extrabold text-islamGreen">500+</div>
                    <div className="text-xs sm:text-sm text-gray-500">Artikel</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-3xl font-extrabold text-islamGreen">50+</div>
                    <div className="text-xs sm:text-sm text-gray-500">Kontributor</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-3xl font-extrabold text-islamGreen">100K+</div>
                    <div className="text-xs sm:text-sm text-gray-500">Pembaca</div>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="mt-6 sm:mt-10 flex flex-col gap-3 sm:gap-4 sm:flex-row">
                  <Link href="/submit/rubrik">
                    <Button size="lg" className="w-full bg-islamGreen hover:bg-islamGreen-dark sm:w-auto font-bold text-sm sm:text-base px-5 sm:px-8 shadow-lg shadow-islamGreen/20">
                      <PenSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Kirim Artikel Rubrik
                    </Button>
                  </Link>
                  <Link href="/submit/khazanah">
                    <Button size="lg" variant="outline" className="w-full border-2 border-islamGreen text-islamGreen hover:bg-islamGreen hover:text-white sm:w-auto font-bold text-sm sm:text-base px-5 sm:px-8">
                      <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Kirim Khazanah
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Features */}
              <div className="flex items-center">
                <div className="space-y-3 sm:space-y-5 w-full">
                  <div className="flex gap-3 sm:gap-5 rounded-xl sm:rounded-2xl bg-gray-50/80 p-4 sm:p-5 transition-all duration-300 hover:bg-islamGreen-pastel/20 hover:shadow-md">
                    <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-islamGreen/10 shadow-sm">
                      <PenSquare className="h-5 w-5 sm:h-7 sm:w-7 text-islamGreen" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-lg">Tulis dengan Mudah</h3>
                      <p className="mt-1 sm:mt-1.5 text-xs sm:text-base text-gray-600">
                        Editor sederhana dengan dukungan Markdown untuk menulis artikel
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-5 rounded-xl sm:rounded-2xl bg-gray-50/80 p-4 sm:p-5 transition-all duration-300 hover:bg-islamGreen-pastel/20 hover:shadow-md">
                    <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-islamGreen/10 shadow-sm">
                      <Users className="h-5 w-5 sm:h-7 sm:w-7 text-islamGreen" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-lg">Jangkau Pembaca Luas</h3>
                      <p className="mt-1 sm:mt-1.5 text-xs sm:text-base text-gray-600">
                        Artikel Anda dibaca oleh ribuan muslim di seluruh Indonesia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 sm:gap-5 rounded-xl sm:rounded-2xl bg-gray-50/80 p-4 sm:p-5 transition-all duration-300 hover:bg-islamGreen-pastel/20 hover:shadow-md">
                    <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-islamGreen/10 shadow-sm">
                      <Star className="h-5 w-5 sm:h-7 sm:w-7 text-islamGreen" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-lg">Pahala Jariyah</h3>
                      <p className="mt-1 sm:mt-1.5 text-xs sm:text-base text-gray-600">
                        Setiap ilmu yang bermanfaat adalah amal jariyah yang terus mengalir
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
