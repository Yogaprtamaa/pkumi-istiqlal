/**
 * Homepage - Redesign "Editorial Layout"
 * Fixed: Variable naming matching mockData.ts (imageUrl & rubrik.name)
 */

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PenSquare, BookOpen, ArrowUpRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/public/HeroSection';
import { KhazanahCarousel } from '@/components/public/KhazanahCarousel';
import { getLatestArticles, rubriks, khazanah } from '@/lib/mockData';

export default function HomePage() {
  // DATA PREPARATION
  // Kita ambil lebih banyak artikel untuk membuat layout yang variatif
  const allArticles = getLatestArticles(10).slice(4); 
  
  // Destructuring untuk layout asimetris
  const [mainFeature, secondaryFeature, ...standardArticles] = allArticles;

  return (
    <main className="bg-white selection:bg-islamGreen/20 selection:text-islamGreen-dark">
      
      {/* 1. HERO SECTION */}
      <div className="relative pb-12 lg:pb-24">
        <HeroSection />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* 2. LATEST ARTICLES - THE "EDITORIAL GRID" */}
      <section className="py-12 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-gray-100 pb-6">
          <div className="max-w-2xl">
            <span className="text-islamGreen font-bold tracking-widest text-xs uppercase mb-2 block">
              Kurasi Redaksi
            </span>
            <h2 className="font-heading text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Sorotan <span className="text-islamGreen">Utama</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500 hidden lg:block text-right max-w-xs leading-relaxed">
              Analisis mendalam dan berita terkini pilihan redaksi untuk wawasan Anda.
            </p>
            <Link href="/artikel">
              <Button variant="ghost" className="rounded-full hover:bg-islamGreen/5 text-islamGreen font-bold group">
                Arsip Lengkap <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* A. KOLOM KIRI (8 cols) - Feature Story Besar */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <article className="group relative w-full overflow-hidden rounded-3xl bg-gray-900 shadow-xl min-h-[500px] lg:min-h-[600px] flex items-end">
              <Image 
                 // FIX: Menggunakan 'imageUrl' sesuai data Anda
                 src={mainFeature?.imageUrl || '/placeholder.jpg'} 
                 alt={mainFeature?.title || 'Featured Article'}
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
              />
              <div className="relative z-10 p-6 lg:p-10 w-full bg-linear-to-t from-black/90 via-black/50 to-transparent">
                <span className="inline-block px-3 py-1 bg-islamGreen text-white text-xs font-bold rounded mb-3">
                  {/* FIX: Menggunakan 'rubrik.name' sesuai data Anda */}
                  {mainFeature?.rubrik?.name || 'Utama'}
                </span>
                <h3 className="font-heading text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  <Link href={`/artikel/${mainFeature?.slug}`} className="hover:underline decoration-islamGreen decoration-2 underline-offset-4">
                    {mainFeature?.title}
                  </Link>
                </h3>
                <p className="text-gray-300 text-lg line-clamp-2 max-w-2xl mb-6">
                  {mainFeature?.excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 relative overflow-hidden">
                       <div className="absolute inset-0 bg-islamGreen/50" />
                    </div>
                    <span>{mainFeature?.author || 'Redaksi'}</span>
                  </div>
                  <span className="w-1 h-1 bg-white/50 rounded-full" />
                  <span>{mainFeature?.readTime} min baca</span>
                </div>
              </div>
            </article>
          </div>

          {/* B. KOLOM KANAN (4 cols) - List Vertikal & Secondary */}
          <div className="lg:col-span-4 flex flex-col gap-8 h-full">
            <article className="relative bg-gray-50 rounded-3xl p-6 lg:p-8 border border-gray-100 flex-1 flex flex-col justify-between hover:border-islamGreen/30 transition-colors group">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="w-10 h-1 bg-islamGreen rounded-full" />
                  <ArrowUpRight className="text-gray-400 group-hover:text-islamGreen transition-colors" />
                </div>
                <h4 className="font-heading text-2xl font-bold text-gray-900 mb-3 group-hover:text-islamGreen transition-colors">
                  <Link href={`/artikel/${secondaryFeature?.slug}`}>
                    {secondaryFeature?.title}
                  </Link>
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {secondaryFeature?.excerpt}
                </p>
              </div>
              
              <div className="relative h-48 w-full rounded-xl overflow-hidden mt-4">
                 <Image 
                    // FIX: Menggunakan 'imageUrl'
                    src={secondaryFeature?.imageUrl || '/placeholder.jpg'}
                    fill
                    className="object-cover"
                    alt="Secondary"
                 />
              </div>
            </article>

            {/* Quick List */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-sm">
              <h5 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-6">Terbaru Hari Ini</h5>
              <div className="space-y-6">
                {standardArticles.slice(0, 3).map((article, idx) => (
                  <div key={article.id} className="group flex gap-4 items-start">
                    <span className="text-2xl font-heading font-bold text-gray-200 group-hover:text-islamGreen transition-colors">0{idx+1}</span>
                    <div>
                      <h6 className="font-bold text-gray-900 leading-snug group-hover:text-islamGreen transition-colors text-sm lg:text-base">
                        <Link href={`/artikel/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h6>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {/* Format Tanggal Sederhana */}
                        {new Date(article.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. RUBRIK / CATEGORY */}
      <section className="py-16 bg-gray-50 border-y border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-2xl font-bold text-gray-900">Jelajahi Topik</h3>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-islamGreen"></div>
               <div className="w-2 h-2 rounded-full bg-gray-300"></div>
               <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide snap-x">
            {rubriks.map((rubrik) => (
              <Link
                key={rubrik.id}
                href={`/rubrik/${rubrik.slug}`}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center text-xl transition-colors group-hover:bg-white"
                    style={{ backgroundColor: `${rubrik.color}15`, color: rubrik.color }}
                  >
                    ☪
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                </div>
                
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-islamGreen transition-colors">
                  {rubrik.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {rubrik.description}
                </p>
                
                <div 
                  className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: rubrik.color }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* 4. KHAZANAH */}
      <section className="py-20 lg:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-bold mb-6">
                  <BookOpen className="w-4 h-4" /> Khazanah Islam
                </span>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                  Menyelami Samudra <br/>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-purple-400">
                    Hikmah & Ilmu
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
                  Kumpulan tafsir, hadits shahih, dan kisah inspiratif para sahabat untuk menyejukkan hati di tengah hiruk pikuk dunia.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/khazanah">
                    <Button size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 h-12">
                      Buka Pustaka
                    </Button>
                  </Link>
                  <Button variant="ghost" className="rounded-full text-purple-700 hover:bg-purple-50 gap-2 h-12">
                    <PlayCircle className="w-5 h-5" /> Video Kajian
                  </Button>
                </div>
              </div>

              <div className="relative">
                 <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
                 <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-islamGreen/20 rounded-full blur-3xl" />
                 
                 <div className="relative bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white/50 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <KhazanahCarousel items={khazanah} />
                 </div>
              </div>
           </div>
        </div>
      </section>


      {/* 5. CONTRIBUTOR & NEWSLETTER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Contributor Card */}
          <div className="bg-gray-50 rounded-[2.5rem] p-8 lg:p-12 border border-gray-100 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                <PenSquare className="w-64 h-64" />
             </div>
             
             <div className="relative z-10 h-full flex flex-col justify-between">
               <div>
                 <h3 className="font-heading text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
                   Suara Anda,<br/>Amal Jariyah Anda.
                 </h3>
                 <p className="text-gray-600 text-lg mb-8 max-w-md">
                   Bergabunglah dengan 50+ kontributor lainnya. Tulisan yang bermanfaat adalah sedekah yang tak terputus.
                 </p>
               </div>
               
               <div className="space-y-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"></div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">+50</div>
                  </div>
                  <Link href="/submit/rubrik">
                    <Button variant="outline" className="w-full sm:w-auto rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all">
                      Mulai Menulis
                    </Button>
                  </Link>
               </div>
             </div>
          </div>

          {/* Newsletter Card */}
          <div className="bg-islamGreen rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden text-white flex flex-col justify-center">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }} />

            <div className="relative z-10">
              <div className="mb-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl">
                ✉️
              </div>
              <h3 className="font-heading text-3xl lg:text-4xl font-extrabold mb-4">
                Intisari Mingguan
              </h3>
              <p className="text-islamGreen-pastel/90 text-lg mb-8">
                Satu email setiap Jumat. Tanpa spam. Hanya artikel terbaik minggu ini.
              </p>

              <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="alamat@email.com" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 transition-all font-medium"
                />
                <Button className="w-full bg-white text-islamGreen hover:bg-gray-100 font-bold text-lg h-14 rounded-xl shadow-lg shadow-black/10">
                  Langganan Gratis
                </Button>
              </form>
              <p className="text-xs text-white/60 mt-4 text-center">
                Bisa berhenti berlangganan kapan saja.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}