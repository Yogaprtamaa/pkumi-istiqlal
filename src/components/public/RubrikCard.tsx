/**
 * RubrikCard Component
 * Card untuk menampilkan rubrik/opini mahasiswa dengan hover effect
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, User, ArrowUpRight, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { RubrikItem } from "@/lib/api/types";
import { ContentActionButtons } from "@/components/public/ContentActionButtons";

interface RubrikCardProps {
  rubrik: RubrikItem;
  variant?: "default" | "horizontal";
  isOwnProfile?: boolean;
}

export function RubrikCard({
  rubrik,
  variant = "default",
  isOwnProfile = false,
}: RubrikCardProps) {
  // Default fallback image if thumbnail is null or empty
  const imageUrl = (rubrik.thumbnail && rubrik.thumbnail.trim() !== '')
    ? rubrik.thumbnail
    : "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=600&fit=crop";

  // Variant horizontal untuk sidebar atau list view
  if (variant === "horizontal") {
    return (
      <Link href={`/rubrik/${rubrik.slug}`} className="group block">
        <Card className="overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          <div className="flex gap-3 sm:gap-4 p-2.5 sm:p-3">
            {/* Thumbnail */}
            <div className="relative h-16 w-16 sm:h-18 sm:w-18 shrink-0 overflow-hidden rounded-lg sm:rounded-xl">
              <Image
                src={imageUrl}
                alt={rubrik.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-center min-w-0">
              {rubrik.category && (
                <Badge
                  variant="secondary"
                  className="mb-1 sm:mb-1.5 w-fit text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 bg-islamGreen/10 text-islamGreen"
                >
                  {rubrik.category.name}
                </Badge>
              )}
              <h3 className="line-clamp-2 text-xs sm:text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-islamGreen">
                {rubrik.title}
              </h3>
              <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                {formatDate(rubrik.published_at)}
              </p>

              {/* Action Buttons for own content */}
              <ContentActionButtons
                type="rubrik"
                slug={rubrik.slug}
                status={(rubrik.status as 'draft' | 'published' | 'archived') || 'published'}
                isOwnContent={isOwnProfile}
              />
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Default variant - card standar
  return (
    <Link href={`/rubrik/${rubrik.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={rubrik.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-islamGreen/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* Badge Category */}
          {rubrik.category && (
            <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
              <Badge
                className="border-0 font-semibold shadow-md backdrop-blur-sm text-xs sm:text-sm bg-islamGreen text-white"
              >
                {rubrik.category.name}
              </Badge>
            </div>
          )}
          {/* Arrow Icon on hover */}
          <div className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-heading text-base sm:text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-islamGreen line-clamp-2">
            {rubrik.title}
          </h3>

          {rubrik.excerpt && (
            <p className="mt-2 sm:mt-2.5 flex-1 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {rubrik.excerpt}
            </p>
          )}

          {/* Tags */}
          {rubrik.tags && (
            <div className="mt-2 flex flex-wrap gap-1">
              {rubrik.tags.split(',').slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="mt-3 sm:mt-4 border-t border-gray-100 pt-3 sm:pt-4">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
              {(rubrik.author?.name || rubrik.student?.name) && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="font-medium text-gray-700 truncate max-w-[120px]">
                    {rubrik.author?.name || rubrik.student?.name}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>{formatDate(rubrik.published_at)}</span>
              </div>
            </div>
            {(rubrik.views || rubrik.views_count) && (
              <div className="flex items-center gap-1 mt-2 text-[10px] sm:text-xs text-gray-500">
                <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>{rubrik.views || rubrik.views_count} views</span>
              </div>
            )}

            {/* Action Buttons for own content */}
            <ContentActionButtons
              type="rubrik"
              slug={rubrik.slug}
              status={(rubrik.status as 'draft' | 'published' | 'archived') || 'published'}
              isOwnContent={isOwnProfile}
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
