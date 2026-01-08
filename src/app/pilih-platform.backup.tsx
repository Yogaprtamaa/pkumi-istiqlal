/**
 * Landing Page / Root Page
 * Gateway untuk memilih antara Compro dan Portal Berita
 */

'use client';

import { motion } from 'framer-motion';
import { Globe, Newspaper, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-amber-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto w-full z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-100 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-slate-700">Selamat Datang di PKUMI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Pilih Platform
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Akses informasi institusi atau baca artikel terkini dari mahasiswa dan dosen PKUMI
          </p>
        </motion.div>

        {/* Platform Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Compro Card */}
          <Link href="/home">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative bg-white rounded-3xl p-10 shadow-xl border border-slate-100 hover:border-emerald-200 transition-all overflow-hidden cursor-pointer h-full"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <Globe className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Compro PKUMI
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Informasi institusi, profil dosen, struktur organisasi, kurikulum, dan galeri kegiatan kampus.
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-8">
                  {[
                    'Profil & Sejarah PKUMI',
                    'Struktur Organisasi',
                    'Program Akademik',
                    'Galeri & Dokumentasi',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all">
                  Jelajahi Compro
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Portal Berita Card */}
          <Link href="/khazanah">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative bg-white rounded-3xl p-10 shadow-xl border border-slate-100 hover:border-amber-200 transition-all overflow-hidden cursor-pointer h-full"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                  <Newspaper className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Portal Berita
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Baca artikel Khazanah dan Rubrik dari mahasiswa, dosen, dan kontributor PKUMI.
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-8">
                  {[
                    'Artikel Khazanah Ilmiah',
                    'Rubrik Opini & Esai',
                    'Trending & Popular',
                    'Submit Artikel Sendiri',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-4 transition-all">
                  Baca Artikel
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </Link>

        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-slate-500">
            📚 Pendidikan Kader Ulama Masjid Istiqlal (PKUMI) • Jakarta, Indonesia
          </p>
        </motion.div>

      </div>
    </div>
  );
}
