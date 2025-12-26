/**
 * Halaman Rubrik - Redesign Konsisten dengan Artikel
 * Menampilkan artikel berdasarkan rubrik/kategori
 * Responsive dan Modern UI
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArticleCard } from '@/components/public/ArticleCard';
import { getRubrikBySlug, getArticlesByRubrik, rubriks } from '@/lib/mockData';

// Generate static params untuk semua rubrik
export async function generateStaticParams() {
  return rubriks.map((rubrik) => ({
    slug: rubrik.slug,
  }));
}

// Generate metadata dinamis
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rubrik = getRubrikBySlug(slug);
  
  if (!rubrik) {
    return {
      title: 'Rubrik Tidak Ditemukan | Nur Berita',
    };
  }

  return {
    title: `${rubrik.name} | Nur Berita`,
    description: rubrik.description,
  };
}

export default async function RubrikPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const rubrik = getRubrikBySlug(slug);

  // Handle rubrik tidak ditemukan
  if (!rubrik) {
    notFound();
  }

  const articles = getArticlesByRubrik(slug);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER - Konsisten dengan Artikel Page */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/artikel" className="inline-block mb-6">
            <Button variant="ghost" size="sm" className="rounded-full gap-2 text-gray-600 hover:text-islamGreen hover:bg-islamGreen/10 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Kembali ke Artikel</span>
              <span className="sm:hidden">Kembali</span>
            </Button>
          </Link>

          <div className="text-center sm:text-left">
            {/* Rubrik Badge */}
            <Badge 
              variant="outline"
              className="mb-4 px-3 sm:px-4 py-1 text-[10px] sm:text-xs tracking-widest uppercase border-2"
              style={{ borderColor: rubrik.color, color: rubrik.color }}
            >
              <Folder className="mr-1.5 h-3 w-3" />
              Rubrik
            </Badge>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-4">
              {rubrik.name}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
              {rubrik.description}
            </p>

            {/* Other Rubriks - Pills */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center sm:justify-start gap-2">
              {rubriks
                .filter((r) => r.slug !== slug)
                .map((r) => (
                  <Link key={r.id} href={`/rubrik/${r.slug}`}>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                      {r.name}
                    </Badge>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {articles.length > 0 ? (
          <>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-600">
              Menampilkan <span className="font-semibold text-gray-900">{articles.length}</span> artikel dalam rubrik{' '}
              <span className="font-semibold" style={{ color: rubrik.color }}>{rubrik.name}</span>
            </p>
            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          /* Empty State - Konsisten */
          <div className="py-16 sm:py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl sm:rounded-3xl bg-gray-50/50">
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Belum Ada Artikel
            </h3>
            <p className="text-sm sm:text-base text-gray-500 px-4 mb-6">
              Artikel untuk rubrik <span className="font-semibold">{rubrik.name}</span> sedang dalam persiapan.
            </p>
            <Link href="/artikel">
              <Button className="rounded-full bg-islamGreen hover:bg-islamGreen-dark text-white px-6">
                Lihat Artikel Lainnya
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
