/**
 * Single Artikel Page
 * Halaman detail artikel dengan konten lengkap
 */

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Eye, Calendar, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RelatedArticles } from '@/components/public/RelatedArticles';
import { getArticleBySlug, articles } from '@/lib/mockData';
import { formatDate, formatViews } from '@/lib/utils';

// Generate static params untuk semua artikel
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata dinamis
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan | Nur Berita',
    };
  }

  return {
    title: `${article.title} | Nur Berita`,
    description: article.excerpt,
  };
}

export default async function SingleArtikelPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  // Handle artikel tidak ditemukan
  if (!article) {
    notFound();
  }

  return (
    <>
      {/* Article Header */}
      <article className="min-h-screen">
        {/* Hero Image */}
        <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-128">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
            <Link href="/artikel">
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Kembali
              </Button>
            </Link>
          </div>

          {/* Article Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-4xl">
              <Link href={`/rubrik/${article.rubrik.slug}`}>
                <Badge className="mb-4 bg-islamGreen hover:bg-islamGreen-dark">
                  {article.rubrik.name}
                </Badge>
              </Link>
              
              <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-200">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime} menit baca
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {formatViews(article.views)} views
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          {/* Share & Bookmark Actions */}
          <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-6">
            <p className="text-lg text-gray-600">
              {article.excerpt}
            </p>
            <div className="hidden gap-2 sm:flex">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Prose Content */}
          <div 
            className="prose prose-lg prose-islamGreen max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags & Share (Bottom) */}
          <div className="mt-12 flex flex-col gap-6 border-t border-gray-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Rubrik:</span>
              <Link href={`/rubrik/${article.rubrik.slug}`}>
                <Badge variant="outline" className="hover:bg-islamGreen-pastel">
                  {article.rubrik.name}
                </Badge>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Bagikan:</span>
              <Button variant="outline" size="sm">
                <Share2 className="mr-1 h-4 w-4" />
                Bagikan
              </Button>
            </div>
          </div>

          {/* Author Box */}
          <div className="mt-8 rounded-xl bg-gray-50 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-islamGreen text-xl font-bold text-white">
                {article.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-gray-900">
                  {article.author}
                </h3>
                <p className="text-sm text-gray-600">
                  Penulis & Kontributor Nur Berita
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <RelatedArticles currentSlug={slug} />
    </>
  );
}
