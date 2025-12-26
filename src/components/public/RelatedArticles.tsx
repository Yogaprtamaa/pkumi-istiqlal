/**
 * RelatedArticles Component
 * Grid artikel terkait di halaman single artikel
 */

import { ArticleCard } from './ArticleCard';
import { getRelatedArticles } from '@/lib/mockData';

interface RelatedArticlesProps {
  currentSlug: string;
}

export function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
  const relatedArticles = getRelatedArticles(currentSlug, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-gray-100 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900">
          Artikel Terkait
        </h2>
        <p className="mt-2 text-gray-600">
          Artikel lain yang mungkin menarik untuk Anda baca
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
