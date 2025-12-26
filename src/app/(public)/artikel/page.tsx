/**
 * Halaman Daftar Artikel
 * Menampilkan semua artikel dalam grid layout
 */

import { articles, rubriks } from '@/lib/mockData';
import { ArticleCard } from '@/components/public/ArticleCard';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: 'Artikel | Nur Berita',
  description: 'Kumpulan artikel Islami yang mencerahkan dari berbagai rubrik',
};

export default function ArtikelPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="border-b border-gray-100 bg-linear-to-br from-white via-islamGreen-pastel/10 to-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
            Semua Artikel
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            Jelajahi berbagai artikel Islami yang memperkaya wawasan dan mencerahkan hati
          </p>

          {/* Rubrik Filter Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge 
              variant="secondary" 
              className="cursor-pointer bg-islamGreen text-white hover:bg-islamGreen-dark"
            >
              Semua
            </Badge>
            {rubriks.map((rubrik) => (
              <Link key={rubrik.id} href={`/rubrik/${rubrik.slug}`}>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer transition-colors hover:bg-islamGreen-pastel"
                >
                  {rubrik.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-2">
            <button 
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50"
              disabled
            >
              Sebelumnya
            </button>
            <button className="rounded-lg bg-islamGreen px-4 py-2 text-sm font-medium text-white">
              1
            </button>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              2
            </button>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Selanjutnya
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
