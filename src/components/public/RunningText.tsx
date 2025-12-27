/**
 * RunningText Component - Ticker/Marquee untuk judul artikel
 * Animasi smooth dengan infinite scroll dan hover pause
 */

'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Newspaper, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Article {
  id: string;
  title: string;
  slug: string;
  rubrik: {
    name: string;
    color?: string;
  };
}

interface RunningTextProps {
  articles: Article[];
  className?: string;
}

export function RunningText({ articles, className }: RunningTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplikasi artikel untuk seamless loop
  const duplicatedArticles = [...articles, ...articles, ...articles];

  return (
    <div 
      className={cn(
        'relative w-full overflow-hidden bg-islamGreen',
        className
      )}
      onMouseEnter={() => {
        setIsPaused(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsHovered(false);
      }}
    >
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 0L35 10L30 20L25 10L30 0z'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient edges for smooth fade - rounded corners */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-islamGreen via-islamGreen/80 to-transparent z-10 pointer-events-none rounded-l-2xl" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-islamGreen via-islamGreen/80 to-transparent z-10 pointer-events-none rounded-r-2xl" />

      {/* Label Badge */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-3 sm:pl-6">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
          <div className="relative">
            <Newspaper className="h-4 w-4 text-white" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-islamGold rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-islamGold rounded-full" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide hidden sm:inline">
            TERKINI
          </span>
        </div>
      </div>

      {/* Running Text Container */}
      <div 
        ref={containerRef}
        className="relative flex py-3 sm:py-4"
      >
        <div 
          className={cn(
            'flex items-center gap-6 sm:gap-8 animate-marquee whitespace-nowrap',
            isPaused && 'animation-paused'
          )}
          style={{
            animationDuration: '60s',
          }}
        >
          {duplicatedArticles.map((article, index) => (
            <Link
              key={`${article.id}-${index}`}
              href={`/artikel/${article.slug}`}
              className="group flex items-center gap-3 sm:gap-4 transition-all duration-300"
            >
              {/* Separator Dot */}
              <span className="flex items-center gap-2">
                <Sparkles className={cn(
                  'h-3 w-3 sm:h-4 sm:w-4 text-islamGold transition-all duration-300',
                  isHovered && 'animate-spin'
                )} style={{ animationDuration: '3s' }} />
              </span>

              {/* Rubrik Badge */}
              <span 
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white group-hover:text-islamGreen group-hover:scale-105"
              >
                {article.rubrik.name}
              </span>

              {/* Article Title */}
              <span className="text-sm sm:text-base font-medium text-white/95 group-hover:text-white transition-all duration-300 max-w-[200px] sm:max-w-[300px] lg:max-w-[400px] truncate group-hover:max-w-none">
                {article.title}
              </span>

              {/* Arrow on hover */}
              <ChevronRight className="h-4 w-4 text-white/60 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div 
          className={cn(
            'flex items-center gap-6 sm:gap-8 animate-marquee whitespace-nowrap',
            isPaused && 'animation-paused'
          )}
          style={{
            animationDuration: '60s',
          }}
          aria-hidden="true"
        >
          {duplicatedArticles.map((article, index) => (
            <Link
              key={`${article.id}-dup-${index}`}
              href={`/artikel/${article.slug}`}
              className="group flex items-center gap-3 sm:gap-4 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Sparkles className={cn(
                  'h-3 w-3 sm:h-4 sm:w-4 text-islamGold transition-all duration-300',
                  isHovered && 'animate-spin'
                )} style={{ animationDuration: '3s' }} />
              </span>

              <span 
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full bg-white/20 text-white border border-white/30 transition-all duration-300 group-hover:bg-white group-hover:text-islamGreen group-hover:scale-105"
              >
                {article.rubrik.name}
              </span>

              <span className="text-sm sm:text-base font-medium text-white/95 group-hover:text-white transition-all duration-300 max-w-[200px] sm:max-w-[300px] lg:max-w-[400px] truncate group-hover:max-w-none">
                {article.title}
              </span>

              <ChevronRight className="h-4 w-4 text-white/60 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>

      {/* Right fade edge */}
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-linear-to-l from-islamGreen to-transparent z-10" />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee linear infinite;
        }
        
        .animation-paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
