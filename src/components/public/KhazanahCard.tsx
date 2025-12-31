/**
 * KhazanahCard Component
 * Card untuk khazanah dengan styling yang konsisten dengan ArticleCard
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { KhazanahItem } from "@/lib/api/types";
import { ContentActionButtons } from "@/components/public/ContentActionButtons";

interface KhazanahCardProps {
  khazanah: KhazanahItem;
  isOwnProfile?: boolean;
}

export function KhazanahCard({ khazanah, isOwnProfile = false }: KhazanahCardProps) {
  // Default fallback image if thumbnail is null or empty
  const imageUrl = (khazanah.thumbnail && khazanah.thumbnail.trim() !== '')
    ? khazanah.thumbnail
    : "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=600&fit=crop"; // Islamic/Arabic calligraphy image

  return (
    <Link href={`/khazanah/${khazanah.slug}`} className="group block">
      <Card className="group h-full overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={khazanah.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Status Badge */}
          {khazanah.status && khazanah.status !== "published" && (
            <div className="absolute top-3 right-3">
              <Badge
                className={`text-xs font-semibold ${
                  khazanah.status === "draft"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-gray-500 hover:bg-gray-600"
                } text-white border-0`}
              >
                {khazanah.status === "draft" ? "Draft" : "Archived"}
              </Badge>
            </div>
          )}

          {/* Category Badge */}
          {khazanah.category && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-blue-500/90 hover:bg-blue-600 backdrop-blur-sm text-white border-0 font-semibold text-xs">
                {khazanah.category.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-heading text-base sm:text-lg font-bold leading-tight text-gray-900 line-clamp-2 mb-2 sm:mb-3 transition-colors group-hover:text-blue-600">
            {khazanah.title}
          </h3>

          {khazanah.excerpt && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
              {khazanah.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatDate(khazanah.published_at)}</span>
              </div>
              {(khazanah.author?.name || khazanah.student?.name) && (
                <div className="flex items-center gap-1.5 font-medium text-gray-700">
                  <span className="text-xs">{khazanah.author?.name || khazanah.student?.name}</span>
                </div>
              )}
            </div>
            {(khazanah.views || khazanah.views_count) && (
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Eye className="h-3.5 w-3.5" />
                <span>{khazanah.views || khazanah.views_count} views</span>
              </div>
            )}

            {/* Action Buttons for own content */}
            <ContentActionButtons
              type="khazanah"
              slug={khazanah.slug}
              status={(khazanah.status as 'draft' | 'published' | 'archived') || 'published'}
              isOwnContent={isOwnProfile}
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
