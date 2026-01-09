"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, User, Calendar } from "lucide-react";

const penelitianItems = [
  {
    title: "Konsep Wasathiyah dalam Tafsir Al-Maraghi: Analisis Metodologis",
    author: "Ahmad Fadhil Al-Hakim",
    program: "S3 Tafsir",
    year: "2025",
    status: "Selesai"
  },
  {
    title: "Penerapan Maqashid Syariah dalam Hukum Ekonomi Islam Kontemporer",
    author: "Siti Khadijah Azzahra",
    program: "S2 Fiqh",
    year: "2025",
    status: "Selesai"
  },
  {
    title: "Kritik Hadits Imam Al-Bukhari: Studi Perbandingan dengan Metodologi Orientalis",
    author: "Muhammad Ridwan Syarif",
    program: "S3 Hadits",
    year: "2026",
    status: "Berjalan"
  },
  {
    title: "Dakwah Digital: Efektivitas Media Sosial dalam Penyebaran Islam Moderat",
    author: "Fatimah Zahra Rahmani",
    program: "S2 Dakwah",
    year: "2026",
    status: "Berjalan"
  },
  {
    title: "Pluralisme Agama dalam Perspektif Filsafat Islam: Telaah Pemikiran Ibn Arabi",
    author: "Husain Abdullah Al-Farabi",
    program: "S3 Aqidah",
    year: "2026",
    status: "Berjalan"
  },
  {
    title: "Peran Ulama Nusantara dalam Perkembangan Ilmu Hadits di Asia Tenggara",
    author: "Zainab Hasan Putri",
    program: "S2 Sejarah Islam",
    year: "2025",
    status: "Selesai"
  },
  {
    title: "Ijtihad Kolektif dalam Fatwa MUI: Analisis Ushul Fiqh Kontemporer",
    author: "Abdul Malik Karim",
    program: "S3 Ushul Fiqh",
    year: "2026",
    status: "Proposal"
  },
  {
    title: "Konsep Jihad dalam Al-Quran: Respons terhadap Radikalisme dan Ekstremisme",
    author: "Umar Faruq Ibrahim",
    program: "S2 Tafsir",
    year: "2026",
    status: "Berjalan"
  }
];

export default function PenelitianPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="text-emerald-200 hover:text-white mb-4 inline-block">
              ← Kembali ke Akademik
            </Link>
            <h1 className="text-4xl font-bold mb-4">Penelitian PKUMI</h1>
            <p className="text-emerald-100 text-lg">
              Repositori judul tesis dan disertasi mahasantri PKUMI
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {penelitianItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-emerald-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-3 leading-snug">
                      {item.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        <span>{item.program} - {item.year}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                        item.status === 'Berjalan' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
