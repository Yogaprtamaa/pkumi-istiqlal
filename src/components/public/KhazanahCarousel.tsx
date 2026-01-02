/**
 * KhazanahCarousel Component
 * Carousel sederhana untuk konten Khazanah
 */

'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { KhazanahItem } from '@/lib/api/types';

interface KhazanahCarouselProps {
  items: KhazanahItem[];
}

export function KhazanahCarousel({ items }: KhazanahCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-scroll setiap 5 detik
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[1.5rem] shadow-xl sm:shadow-2xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full shrink-0">
              <Link href={`/khazanah/${item.slug}`} className="group block">
                <Card className="overflow-hidden border-0">
                  <div className="relative aspect-video sm:aspect-21/9 md:aspect-16/9 lg:aspect-16/10 xl:aspect-4/3 bg-gradient-to-br from-purple-100 to-indigo-200">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700">
                        <BookOpen className="w-24 h-24 sm:w-32 sm:h-32 text-white/30" />
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/30 sm:from-black/85 sm:via-black/60 sm:to-transparent" />

                    {/* Decorative Pattern - hidden on mobile */}
                    <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 hidden sm:block">
                      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id="khazanah-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                          <circle cx="10" cy="10" r="2" fill="white" />
                        </pattern>
                        <rect fill="url(#khazanah-pattern)" width="100%" height="100%" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center p-4 sm:p-8 md:p-10 lg:p-12 xl:p-16">
                      <div className="max-w-2xl text-white">
                        {item.category && (
                          <Badge className="mb-2 sm:mb-4 lg:mb-5 bg-islamGreen hover:bg-islamGreen-dark shadow-lg shadow-islamGreen/30 px-2.5 sm:px-4 lg:px-5 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm lg:text-base font-semibold">
                            <BookOpen className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                            {item.category.name}
                          </Badge>
                        )}
                        <h3 className="font-heading text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight drop-shadow-lg line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="mt-2 sm:mt-4 lg:mt-5 line-clamp-2 text-xs sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed">
                          {item.excerpt}
                        </p>
                        <div className="mt-3 sm:mt-5 lg:mt-6 flex items-center gap-2 sm:gap-3">
                          <div className="h-0.5 sm:h-1 w-6 sm:w-10 lg:w-12 rounded-full bg-islamGreen"></div>
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-islamGreen-pastel font-medium">
                            {item.student?.name || item.author?.name || 'PKUMI'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
        onClick={goToPrevious}
        aria-label="Sebelumnya"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-gray-700" />
      </Button>
      
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
        onClick={goToNext}
        aria-label="Selanjutnya"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-gray-700" />
      </Button>

      {/* Dots Indicator */}
      <div className="mt-4 sm:mt-6 lg:mt-8 flex justify-center gap-1.5 sm:gap-2.5 lg:gap-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-2 sm:h-2.5 lg:h-3 rounded-full transition-all duration-300',
              index === currentIndex 
                ? 'w-6 sm:w-8 lg:w-10 bg-islamGreen shadow-md shadow-islamGreen/30' 
                : 'w-2 sm:w-2.5 lg:w-3 bg-gray-300 hover:bg-islamGreen/50'
            )}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
