/**
 * ArticleCard Component
 * Card artikel minimalis dengan hover effect hijau subtle
 */

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Eye, ArrowUpRight } from 'lucide-react';
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
        <Card className="overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          <div className="flex gap-3 sm:gap-4 p-2.5 sm:p-3">
            {/* Thumbnail */}
            <div className="relative h-16 w-16 sm:h-18 sm:w-18 shrink-0 overflow-hidden rounded-lg sm:rounded-xl">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            
            {/* Content */}
            <div className="flex flex-1 flex-col justify-center min-w-0">
              <Badge 
                variant="secondary" 
                className="mb-1 sm:mb-1.5 w-fit text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5"
                style={{ backgroundColor: `${article.rubrik.color}15`, color: article.rubrik.color }}
              >
                {article.rubrik.name}
              </Badge>
              <h3 className="line-clamp-2 text-xs sm:text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-islamGreen">
                {article.title}
              </h3>
              <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
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
      <Link href={`/artikel/${article.slug}`} className="group block h-full">
        <Card className="relative h-full overflow-hidden border-0 shadow-xl transition-all duration-500 hover:shadow-2xl">
          {/* Image */}
          <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-islamGreen/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Arrow Icon */}
            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5 text-white" />
            </div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white md:p-8">
              <Badge className="mb-2 sm:mb-4 bg-islamGreen/90 backdrop-blur-sm font-semibold hover:bg-islamGreen border-0 text-xs sm:text-sm">
                {article.rubrik.name}
              </Badge>
              <h2 className="font-heading text-lg sm:text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl drop-shadow-lg">
                {article.title}
              </h2>
              <p className="mt-2 sm:mt-3 line-clamp-2 text-xs sm:text-sm text-gray-200/90 md:text-base max-w-2xl">
                {article.excerpt}
              </p>
              
              {/* Meta */}
              <div className="mt-3 sm:mt-5 flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2 text-xs sm:text-sm text-gray-300">
                <span className="font-medium text-white">{article.author}</span>
                <span className="h-1 w-1 rounded-full bg-gray-400 hidden sm:block" />
                <span className="hidden sm:inline">{formatDate(article.date)}</span>
                <span className="h-1 w-1 rounded-full bg-gray-400 hidden sm:block" />
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  {article.readTime} menit baca
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
      <Card className="flex h-full flex-col overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-islamGreen/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* Badge Rubrik */}
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <Badge 
              className="border-0 font-semibold shadow-md backdrop-blur-sm text-xs sm:text-sm"
              style={{ backgroundColor: article.rubrik.color, color: 'white' }}
            >
              {article.rubrik.name}
            </Badge>
          </div>
          {/* Read indicator */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs text-white backdrop-blur-sm">
            <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            {article.readTime} min
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-heading text-base sm:text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-islamGreen line-clamp-2">
            {article.title}
          </h3>
          
          <p className="mt-2 sm:mt-2.5 flex-1 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-gray-100 pt-3 sm:pt-4 text-[10px] sm:text-xs text-gray-500">
            <span className="font-medium text-gray-700">{article.author}</span>
            <div className="flex items-center gap-2 sm:gap-3">
              <span>{formatDate(article.date)}</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {formatViews(article.views)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
