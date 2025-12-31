/**
 * QuoteOfTheDay Component
 * Menampilkan quote Islami (ayat/hadits) yang berganti setiap hari
 */

'use client';

import { FOOTER_QUOTES } from '@/lib/constants';
import { Quote } from 'lucide-react';

export function QuoteOfTheDay() {
  // Ambil quote berdasarkan hari ini (agar konsisten sepanjang hari)
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const quoteIndex = dayOfYear % FOOTER_QUOTES.length;
  const quote = FOOTER_QUOTES[quoteIndex];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-islamGreen via-islamGreen-dark to-islamGreen-dark p-8 lg:p-12 text-white shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Quote className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-islamGreen-pastel">
              Hikmah Hari Ini
            </p>
            <p className="text-xs text-white/80">
              {today.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <blockquote className="mb-4">
          <p className="text-xl lg:text-2xl font-serif italic leading-relaxed text-white/95">
            "{quote.text}"
          </p>
        </blockquote>

        <p className="text-sm font-medium text-islamGreen-pastel">
          — {quote.source}
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
    </div>
  );
}
