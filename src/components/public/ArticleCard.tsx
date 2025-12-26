/**
 * ArticleCard Component
 * Card artikel minimalis dengan hover effect hijau subtle
 */

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatViews } from '@/lib/utils';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'horizontal' | 'featured';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  // Variant horizontal untuk sidebar atau list view
  if (variant === 'horizontal') {
    return (
      <Link href={`/artikel/${article.slug}`} className="group block">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-islamGreen/20">
          <div className="flex gap-4 p-4">
            {/* Thumbnail */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <Badge variant="secondary" className="mb-1 text-[10px]">
                {article.rubrik.name}
              </Badge>
              <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-islamGreen">
                {article.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                {formatDate(article.date)}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Variant featured untuk hero section
  if (variant === 'featured') {
    return (
      <Link href={`/artikel/${article.slug}`} className="group block">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-islamGreen/30">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Badge className="mb-3 bg-islamGreen hover:bg-islamGreen-dark">
                {article.rubrik.name}
              </Badge>
              <h2 className="font-heading text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
                {article.title}
              </h2>
              <p className="mt-3 line-clamp-2 text-sm text-gray-200 md:text-base">
                {article.excerpt}
              </p>
              
              {/* Meta */}
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-300">
                <span>{article.author}</span>
                <span>•</span>
                <span>{formatDate(article.date)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime} menit
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Default variant - card standar
  return (
    <Link href={`/artikel/${article.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-islamGreen/20">
        {/* Image */}
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Badge Rubrik */}
          <div className="absolute left-3 top-3">
            <Badge className="bg-islamGreen/90 backdrop-blur-sm hover:bg-islamGreen">
              {article.rubrik.name}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-islamGreen line-clamp-2">
            {article.title}
          </h3>
          
          <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-2">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>{formatDate(article.date)}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {formatViews(article.views)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} min
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
