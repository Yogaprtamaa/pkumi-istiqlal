/**
 * Halaman Rubrik
 * Menampilkan artikel berdasarkan rubrik/kategori
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
      {/* Page Header */}
      <div 
        className="border-b border-gray-100 py-12"
        style={{ 
          background: `linear-gradient(135deg, white 0%, ${rubrik.color}10 50%, white 100%)` 
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/artikel">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Kembali ke Artikel
            </Button>
          </Link>

          {/* Rubrik Badge */}
          <Badge 
            className="mb-4"
            style={{ backgroundColor: rubrik.color }}
          >
            Rubrik
          </Badge>

          <h1 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
            {rubrik.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            {rubrik.description}
          </p>

          {/* Other Rubriks */}
          <div className="mt-6 flex flex-wrap gap-2">
            {rubriks
              .filter((r) => r.slug !== slug)
              .map((r) => (
                <Link key={r.id} href={`/rubrik/${r.slug}`}>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer transition-colors hover:bg-islamGreen-pastel"
                  >
                    {r.name}
                  </Badge>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {articles.length > 0 ? (
          <>
            <p className="mb-6 text-gray-600">
              Menampilkan {articles.length} artikel dalam rubrik {rubrik.name}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">📚</div>
            <h2 className="font-heading text-xl font-semibold text-gray-900">
              Belum Ada Artikel
            </h2>
            <p className="mt-2 text-gray-600">
              Artikel untuk rubrik {rubrik.name} sedang dalam persiapan.
            </p>
            <Link href="/artikel" className="mt-6">
              <Button>Lihat Artikel Lainnya</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
