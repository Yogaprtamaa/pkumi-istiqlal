/**
 * Halaman Detail Rubrik
 * Menampilkan detail artikel rubrik berdasarkan slug
 * Responsive dan Modern UI
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Tag, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { rubrikService } from '@/lib/api';
import { formatDate } from '@/lib/utils';

// Generate metadata dinamis
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const rubrik = await rubrikService.getRubrikBySlug(slug);

    return {
      title: `${rubrik.title} | Portal Berita PKUMI`,
      description: rubrik.excerpt,
    };
  } catch {
    return {
      title: 'Rubrik Tidak Ditemukan | Portal Berita PKUMI',
    };
  }
}

export default async function RubrikDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  let rubrik;

  try {
    const { slug } = await params;
    rubrik = await rubrikService.getRubrikBySlug(slug);
  } catch {
    notFound();
  }

  // Fallback image if thumbnail is null
  const imageUrl = rubrik.thumbnail || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&h=600&fit=crop";

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/rubrik" className="inline-block mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full gap-2 text-gray-600 hover:text-islamGreen hover:bg-islamGreen/10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Kembali ke Rubrik</span>
              <span className="sm:hidden">Kembali</span>
            </Button>
          </Link>

          {/* Category Badge */}
          {rubrik.category && (
            <div className="mb-4">
              <Badge
                className="bg-islamGreen text-white border-0 text-xs sm:text-sm px-3 py-1"
              >
                <BookOpen className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {rubrik.category.name}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-6 leading-tight">
            {rubrik.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
            {rubrik.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 pb-6 border-b border-gray-200">
            {rubrik.student && (
              <>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium text-gray-700">{rubrik.student.name}</span>
                  <span className="text-gray-400">({rubrik.student.nim})</span>
                </div>
                <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-300" />
              </>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(rubrik.published_at)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <article className="mx-auto max-w-4xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Featured Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-8 sm:mb-12">
          <Image
            src={imageUrl}
            alt={rubrik.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Tags */}
        {rubrik.tags && (
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
            <Tag className="h-4 w-4 text-gray-400 mr-1" />
            {rubrik.tags.split(',').map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs px-3 py-1"
              >
                {tag.trim()}
              </Badge>
            ))}
          </div>
        )}

        {/* Article Content */}
        {rubrik.content ? (
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-islamGreen prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-islamGreen prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: rubrik.content }}
          />
        ) : (
          <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Konten artikel sedang dalam proses.</p>
          </div>
        )}
      </article>

      {/* FOOTER NAVIGATION */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Ingin membaca rubrik lainnya?
            </p>
            <Link href="/rubrik">
              <Button className="rounded-full bg-islamGreen hover:bg-islamGreen/90 text-white px-6">
                Lihat Semua Rubrik
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
