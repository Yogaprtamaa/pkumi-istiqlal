/**
 * Homepage - Portal Khazanah & Rubrik PKUMI
 * Redesigned untuk fokus pada Khazanah dan Rubrik dengan 5 section utama
 */

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PenSquare, BookOpen, TrendingUp, Star, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuoteOfTheDay } from '@/components/public/QuoteOfTheDay';
import { KhazanahCarousel } from '@/components/public/KhazanahCarousel';
import { khazanahService } from '@/lib/api/services/khazanah.service';
import { rubrikService } from '@/lib/api/services/rubrik.service';
import type { KhazanahItem, RubrikItem } from '@/lib/api/types';

// Revalidate cache every 60 seconds to ensure fresh popular/trending data
export const revalidate = 60;

export default async function HomePage() {
  // Fetch data dari API
  let featuredRubrik: RubrikItem | null = null;
  let trendingRubrik: RubrikItem[] = [];
  let popularRubrik: RubrikItem[] = [];
  let popularKhazanah: KhazanahItem[] = [];

  try {
    console.log('Homepage: Starting data fetch...');

    // Fetch semua data secara parallel
    // TEMPORARY: Gunakan published endpoints jika popular/trending belum tersedia di backend
    const [
      trendingRubrikData,
      popularRubrikData,
      popularKhazanahData,
    ] = await Promise.all([
      rubrikService.getTrendingRubrik({ per_page: 6 }).catch(err => {
        console.error('Error fetching trending rubrik:', err);
        console.error('Falling back to published rubrik');
        return rubrikService.getPublishedRubrikItems({ per_page: 6 }).catch(() => []);
      }),
      rubrikService.getPopularRubrik({ per_page: 6 }).catch(err => {
        console.error('Error fetching popular rubrik:', err);
        console.error('Falling back to published rubrik');
        return rubrikService.getPublishedRubrikItems({ per_page: 6 }).catch(() => []);
      }),
      khazanahService.getPopularKhazanah({ per_page: 6 }).catch(err => {
        console.error('Error fetching popular khazanah:', err);
        console.error('Falling back to published khazanah');
        return khazanahService.getPublishedKhazanahItems({ per_page: 6 }).catch(() => []);
      }),
    ]);

    trendingRubrik = trendingRubrikData || [];
    popularRubrik = popularRubrikData || [];
    popularKhazanah = popularKhazanahData || [];

    console.log('Homepage data fetched:', {
      trendingCount: trendingRubrik.length,
      popularRubrikCount: popularRubrik.length,
      popularKhazanahCount: popularKhazanah.length,
    });
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    // Set default empty arrays jika error
    trendingRubrik = [];
    popularRubrik = [];
    popularKhazanah = [];
  }

  // Featured rubrik adalah item pertama dari trending
  if (trendingRubrik.length > 0) {
    featuredRubrik = trendingRubrik[0];
  }

  return (
    <main className="bg-white selection:bg-islamGreen/20 selection:text-islamGreen-dark">

      {/* ========== SECTION 1: HERO WITH QUOTE OF THE DAY ========== */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Quote of the Day */}
          <div className="mb-12 lg:mb-16">
            <QuoteOfTheDay />
          </div>

          {/* Featured Rubrik */}
          {featuredRubrik && (
            <div className="group relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
              <div className="absolute inset-0">
                {featuredRubrik.thumbnail ? (
                  <Image
                    src={featuredRubrik.thumbnail}
                    alt={featuredRubrik.title}
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-islamGreen via-islamGreen-dark to-emerald-800 flex items-center justify-center">
                    <BookOpen className="w-32 h-32 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              <div className="relative z-10 p-8 lg:p-16">
                <span className="mb-4 inline-block rounded-full bg-islamGreen px-4 py-1.5 text-sm font-bold text-white">
                  Rubrik Terbaru
                </span>

                <h1 className="mb-4 font-heading text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                  <Link
                    href={`/rubrik/${featuredRubrik.slug}`}
                    className="hover:text-islamGreen-pastel transition-colors"
                  >
                    {featuredRubrik.title}
                  </Link>
                </h1>

                <p className="mb-8 max-w-3xl text-lg text-gray-300 leading-relaxed">
                  {featuredRubrik.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-islamGreen flex items-center justify-center text-sm font-bold">
                      {featuredRubrik.author?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div>
                      <p className="font-medium">{featuredRubrik.author?.name || 'Anonymous'}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(featuredRubrik.published_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  {featuredRubrik.category && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-white/50" />
                      <span className="inline-flex items-center gap-1 text-sm">
                        <span className="text-islamGreen-pastel">•</span> {featuredRubrik.category.name}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* ========== SECTION 2: RUBRIK TRENDING 🔥 ========== */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Flame className="h-6 w-6 text-orange-500" />
              <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
                Trending Minggu Ini
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-gray-900">
              Rubrik <span className="text-islamGreen">Populer</span>
            </h2>
          </div>
          <Link href="/rubrik">
            <Button variant="outline" className="gap-2 rounded-full border-islamGreen text-islamGreen hover:bg-islamGreen hover:text-white">
              Lihat Semua Rubrik
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trendingRubrik.slice(0, 6).map((article, idx) => (
            <article
              key={article.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {article.thumbnail ? (
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                    <Flame className="w-16 h-16 text-orange-400" />
                  </div>
                )}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    #{idx + 1} Trending
                  </span>
                </div>
              </div>

              <div className="p-6">
                {article.category && (
                  <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-islamGreen">
                    {article.category.name}
                  </span>
                )}

                <h3 className="mb-3 font-heading text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-islamGreen transition-colors">
                  <Link href={`/rubrik/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="mb-4 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{article.author?.name || 'Anonymous'}</span>
                  <span>{new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ========== SECTION 3: KHAZANAH PILIHAN 📚 ========== */}
      <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-islamGreen/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-semibold mb-6 shadow-sm">
                <BookOpen className="h-5 w-5" />
                Khazanah Islam
              </div>

              <h2 className="font-heading text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Menyelami Samudra
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 mt-2">
                  Hikmah & Ilmu
                </span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                Kumpulan tafsir, hadits shahih, doa pilihan, dan kisah inspiratif para sahabat untuk menyejukkan hati di tengah hiruk pikuk dunia.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">200+</p>
                    <p className="text-sm text-gray-500">Tafsir & Hadits</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-islamGreen/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-islamGreen" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">50+</p>
                    <p className="text-sm text-gray-500">Kisah Sahabat</p>
                  </div>
                </div>
              </div>

              <Link href="/khazanah">
                <Button
                  size="lg"
                  className="rounded-2xl bg-purple-600 hover:bg-purple-700 text-white px-8 h-14 text-lg shadow-lg shadow-purple-600/25 hover:shadow-xl transition-all"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Jelajahi Khazanah
                </Button>
              </Link>
            </div>

            {/* Right Carousel */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-400/20 rounded-3xl rotate-12 blur-sm hidden sm:block" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-islamGold/20 rounded-2xl -rotate-12 blur-sm hidden sm:block" />

              <div className="relative bg-white/60 backdrop-blur-md p-4 lg:p-6 rounded-3xl border border-white/60 shadow-2xl">
                <KhazanahCarousel items={popularKhazanah} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========== SECTION 4: RUBRIK POPULAR ⭐ ========== */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold uppercase tracking-wider text-yellow-600">
                Favorit Pembaca
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-gray-900">
              Rubrik <span className="text-islamGreen">Terpopuler</span>
            </h2>
          </div>
          <Link href="/rubrik">
            <Button variant="outline" className="gap-2 rounded-full border-islamGreen text-islamGreen hover:bg-islamGreen hover:text-white">
              Arsip Lengkap
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {popularRubrik.map((article) => (
            <article
              key={article.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {article.thumbnail ? (
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-amber-200">
                    <Star className="w-16 h-16 text-yellow-400 fill-yellow-400" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    <Star className="h-3 w-3 fill-white" />
                    Popular
                  </div>
                </div>
              </div>

              <div className="p-6">
                {article.category && (
                  <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-islamGreen">
                    {article.category.name}
                  </span>
                )}

                <h3 className="mb-3 font-heading text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-islamGreen transition-colors">
                  <Link href={`/rubrik/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="mb-4 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{article.author?.name || 'Anonymous'}</span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {(article.views || article.views_count || 0).toLocaleString()} views
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ========== SECTION 5: CONTRIBUTOR & CTA ========== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-islamGreen via-islamGreen-dark to-islamGreen p-12 lg:p-16 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <PenSquare className="h-8 w-8 text-white" />
            </div>

            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold mb-6">
              Bergabunglah dengan Para Kader PKUMI
            </h2>

            <p className="text-xl text-islamGreen-pastel/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Tulisan yang bermanfaat adalah sedekah yang tak terputus. Jadilah bagian dari 50+ kontributor yang menyebarkan ilmu dan hikmah melalui platform ini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/submit/rubrik">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-xl bg-white text-islamGreen hover:bg-gray-100 font-bold text-lg h-14 px-8 shadow-lg"
                >
                  <PenSquare className="w-5 h-5 mr-2" />
                  Kirim Rubrik
                </Button>
              </Link>
              <Link href="/submit/khazanah">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-xl border-2 border-white text-white hover:bg-white/10 font-bold text-lg h-14 px-8"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Kirim Khazanah
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-islamGreen-dark"></div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
                  +50
                </div>
              </div>
              <p className="text-sm text-white/80">
                Kontributor aktif bergabung bersama kami
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
