/**
 * Halaman Khazanah
 * Konten spesial: tafsir, hadits, doa, kisah
 */

import Image from 'next/image';
import { BookOpen, BookMarked, HandHeart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { khazanah } from '@/lib/mockData';

export const metadata = {
  title: 'Khazanah | Nur Berita',
  description: 'Tafsir Al-Quran, Hadits Pilihan, Doa Sehari-hari, dan Kisah Inspiratif',
};

// Icon mapping untuk setiap type
const typeIcons = {
  tafsir: BookOpen,
  hadits: BookMarked,
  doa: HandHeart,
  kisah: Users,
};

// Label mapping untuk setiap type
const typeLabels = {
  tafsir: 'Tafsir',
  hadits: 'Hadits',
  doa: 'Doa',
  kisah: 'Kisah',
};

// Warna mapping untuk setiap type
const typeColors = {
  tafsir: '#2E7D32',
  hadits: '#1565C0',
  doa: '#6A1B9A',
  kisah: '#EF6C00',
};

export default function KhazanahPage() {
  // Group khazanah by type
  const groupedKhazanah = khazanah.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof khazanah>);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="border-b border-gray-100 bg-linear-to-br from-white via-islamGreen-pastel/10 to-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-islamGreen">
              <BookOpen className="mr-1 h-3 w-3" />
              Khazanah Ilmu
            </Badge>
            <h1 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Khazanah Islam
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Perbendaharaan ilmu Islam yang mencerahkan — tafsir Al-Quran, 
              hadits pilihan, doa sehari-hari, dan kisah inspiratif para salafus shalih.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {Object.entries(typeLabels).map(([type, label]) => {
              const Icon = typeIcons[type as keyof typeof typeIcons];
              return (
                <a
                  key={type}
                  href={`#${type}`}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-islamGreen hover:shadow-md"
                >
                  <Icon className="h-4 w-4" style={{ color: typeColors[type as keyof typeof typeColors] }} />
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Khazanah Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {Object.entries(groupedKhazanah).map(([type, items]) => {
          const Icon = typeIcons[type as keyof typeof typeIcons];
          const color = typeColors[type as keyof typeof typeColors];
          
          return (
            <section key={type} id={type} className="mb-16 scroll-mt-24 last:mb-0">
              {/* Section Header */}
              <div className="mb-8 flex items-center gap-3">
                <div 
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <h2 className="font-heading text-2xl font-bold text-gray-900">
                  {typeLabels[type as keyof typeof typeLabels]}
                </h2>
              </div>

              {/* Items Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {items.map((item) => (
                  <Card 
                    key={item.id} 
                    id={item.slug}
                    className="group overflow-hidden scroll-mt-24 transition-all duration-300 hover:shadow-lg hover:ring-1"
                    style={{ '--ring-color': `${color}30` } as React.CSSProperties}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute bottom-4 left-4">
                        <Badge style={{ backgroundColor: color }}>
                          <Icon className="mr-1 h-3 w-3" />
                          {typeLabels[type as keyof typeof typeLabels]}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-lg transition-colors group-hover:text-islamGreen">
                        {item.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                        {item.excerpt}
                      </p>
                      
                      {/* Content Preview */}
                      <div 
                        className="prose prose-sm prose-islamGreen max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />

                      <p className="mt-4 text-xs font-medium text-islamGreen">
                        Sumber: {item.source}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
