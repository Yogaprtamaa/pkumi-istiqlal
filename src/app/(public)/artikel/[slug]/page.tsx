/**
 * Single Artikel Page - Editorial Redesign
 * Fokus: Readability, Typography, dan Sticky Context
 */

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Eye, Calendar, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ReadingProgress } from '@/components/ui/ReadingProgress'; // Pastikan komponen ini sudah dibuat
import { getArticleBySlug, articles, getRelatedArticles } from '@/lib/mockData';
import { formatDate, formatViews } from '@/lib/utils';

// Generate static params
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) return { title: 'Artikel Tidak Ditemukan | Nur Berita' };

  return {
    title: `${article.title} | Nur Berita`,
    description: article.excerpt,
  };
}

export default async function SingleArtikelPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  // Ambil artikel terkait untuk sidebar
  const sidebarRelated = getRelatedArticles(slug, 3);

  return (
    <>
      {/* 1. PROGRESS BAR (Client Component) */}
      <ReadingProgress />

      <article className="min-h-screen bg-white pb-20">
        
        {/* 2. EDITORIAL HEADER 
            Judul diletakkan di atas gambar (White Background) untuk keterbacaan maksimal 
        */}
        <header className="pt-8 pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center sm:text-left">
          {/* Breadcrumb / Navigasi Balik Simpel */}
          <div className="mb-6">
            <Link href="/artikel" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-islamGreen transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Arsip
            </Link>
          </div>

          {/* Kategori */}
          <Link href={`/rubrik/${article.rubrik.slug}`}>
            <span className="inline-block mb-4 text-islamGreen font-bold tracking-widest text-xs uppercase">
              {article.rubrik.name}
            </span>
          </Link>

          {/* JUDUL UTAMA (Typography Besar) */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-6">
            {article.title}
          </h1>

          {/* Excerpt / Lead Paragraph */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8 font-serif">
            {article.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-b border-gray-100 py-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-islamGreen/10 flex items-center justify-center text-islamGreen font-bold text-lg">
                {article.author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 text-sm">{article.author}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(article.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1 text-islamGreen font-medium"><Clock className="h-3 w-3" /> {article.readTime} min baca</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
               {/* Share Buttons Kecil */}
               <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#1877F2] hover:bg-blue-50"><Facebook className="h-5 w-5"/></Button>
               <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#1DA1F2] hover:bg-sky-50"><Twitter className="h-5 w-5"/></Button>
               <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#0A66C2] hover:bg-blue-50"><Linkedin className="h-5 w-5"/></Button>
               <Button variant="ghost" size="icon" className="text-gray-400 hover:text-islamGreen hover:bg-islamGreen/10"><Share2 className="h-5 w-5"/></Button>
            </div>
          </div>
        </header>


        {/* 3. IMMERSIVE HERO IMAGE 
            Lebar penuh tapi tidak memenuhi tinggi layar (Cinematic aspect ratio)
        */}
        <div className="w-full max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 mb-12">
           <div className="relative aspect-[21/9] w-full sm:rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl pointer-events-none" />
           </div>
           <p className="text-center text-xs text-gray-400 mt-3 italic">
              Ilustrasi: Dokumentasi Nur Berita / Unsplash
           </p>
        </div>


        {/* 4. CONTENT GRID WITH STICKY SIDEBAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: Main Content (8 cols) */}
            <div className="lg:col-span-8">
              <div 
                className={`
                  prose prose-lg prose-slate max-w-none
                  prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900
                  prose-p:text-gray-700 prose-p:leading-8
                  prose-a:text-islamGreen prose-a:no-underline prose-a:font-bold hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-islamGreen prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:text-gray-800 prose-blockquote:rounded-r-lg
                  prose-img:rounded-2xl prose-img:shadow-md
                  
                  /* Drop Caps Styling - Huruf pertama paragraf pertama besar */
                  [&>p:first-of-type]:first-letter:text-5xl 
                  [&>p:first-of-type]:first-letter:font-heading 
                  [&>p:first-of-type]:first-letter:font-bold 
                  [&>p:first-of-type]:first-letter:mr-3 
                  [&>p:first-of-type]:first-letter:float-left 
                  [&>p:first-of-type]:first-letter:leading-[0.8]
                  [&>p:first-of-type]:first-letter:text-islamGreen
                `}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags Section */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                 <div className="flex flex-wrap gap-2 mb-8">
                    {['Islam', 'Kajian', article.rubrik.name, 'Viral'].map(tag => (
                       <Badge key={tag} variant="secondary" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg cursor-pointer transition-colors">
                          #{tag}
                       </Badge>
                    ))}
                 </div>

                 {/* Bottom Action Card */}
                 <div className="bg-islamGreen/5 border border-islamGreen/10 rounded-2xl p-6 sm:p-8 text-center">
                    <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">Apakah artikel ini bermanfaat?</h3>
                    <p className="text-gray-600 mb-6 text-sm">Bantu sebarkan kebaikan dengan membagikan artikel ini kepada kerabat Anda.</p>
                    <div className="flex justify-center gap-3">
                       <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-2">
                          <MessageCircle className="w-4 h-4" /> Share via WhatsApp
                       </Button>
                       <Button variant="outline" className="gap-2 border-gray-300">
                          <Bookmark className="w-4 h-4" /> Simpan
                       </Button>
                    </div>
                 </div>
              </div>
            </div>


            {/* RIGHT COLUMN: Sticky Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-8">
               <div className="sticky top-24 space-y-8">
                  
                  {/* Author Card (Mini Profile) */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
                     <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Tentang Penulis</h4>
                     <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-full bg-islamGreen text-white flex items-center justify-center text-xl font-bold shrink-0">
                           {article.author.charAt(0)}
                        </div>
                        <div>
                           <h5 className="font-bold text-gray-900 text-lg">{article.author}</h5>
                           <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                              Kontributor aktif di Nur Berita. Spesialis kajian fiqih dan muamalah kontemporer.
                           </p>
                           <Button variant="link" className="p-0 h-auto text-islamGreen mt-2 text-sm font-bold">
                              Lihat Profil &rarr;
                           </Button>
                        </div>
                     </div>
                  </div>

                  {/* Related / More from Rubrik */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                     <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-islamGreen rounded-full"></span>
                        Lainnya di {article.rubrik.name}
                     </h4>
                     <div className="space-y-6">
                        {sidebarRelated.map((item, idx) => (
                           <Link key={item.id} href={`/artikel/${item.slug}`} className="group block">
                              <h5 className="font-bold text-gray-800 text-sm leading-snug mb-1 group-hover:text-islamGreen transition-colors">
                                 {item.title}
                              </h5>
                              <span className="text-xs text-gray-400">{formatViews(item.views)} pembaca</span>
                           </Link>
                        ))}
                     </div>
                     <Link href={`/rubrik/${article.rubrik.slug}`}>
                        <Button variant="outline" className="w-full mt-6 bg-white border-gray-200 text-gray-600 hover:text-islamGreen">
                           Lihat Semua
                        </Button>
                     </Link>
                  </div>

               </div>
            </aside>

          </div>
        </div>
      </article>
    </>
  );
}