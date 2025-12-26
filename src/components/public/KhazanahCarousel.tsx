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
import type { Khazanah } from '@/types';

interface KhazanahCarouselProps {
  items: Khazanah[];
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

  // Mapping type ke label yang readable
  const typeLabels = {
    tafsir: 'Tafsir',
    hadits: 'Hadits',
    doa: 'Doa',
    kisah: 'Kisah',
  };

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full shrink-0">
              <Link href={`/khazanah#${item.slug}`} className="group block">
                <Card className="overflow-hidden">
                  <div className="relative aspect-21/9 md:aspect-3/1">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex items-center p-6 md:p-10">
                      <div className="max-w-xl text-white">
                        <Badge className="mb-3 bg-islamGreen hover:bg-islamGreen-dark">
                          <BookOpen className="mr-1 h-3 w-3" />
                          {typeLabels[item.type]}
                        </Badge>
                        <h3 className="font-heading text-xl font-bold leading-tight md:text-2xl lg:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-gray-200 md:text-base">
                          {item.excerpt}
                        </p>
                        <p className="mt-3 text-xs text-islamGreen-pastel md:text-sm">
                          Sumber: {item.source}
                        </p>
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
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 shadow-lg hover:bg-white"
        onClick={goToPrevious}
        aria-label="Sebelumnya"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </Button>
      
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 shadow-lg hover:bg-white"
        onClick={goToNext}
        aria-label="Selanjutnya"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </Button>

      {/* Dots Indicator */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === currentIndex 
                ? 'w-6 bg-islamGreen' 
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            )}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
