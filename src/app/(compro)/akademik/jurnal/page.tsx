"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Download, ExternalLink, Calendar } from "lucide-react";

const jurnalItems = [
  {
    title: "Al-Quran dan Hadits dalam Era Digital: Tantangan dan Peluang",
    authors: "Prof. Dr. Abdullah Al-Hakim, Dr. Siti Aminah",
    journal: "Jurnal Islamic Studies PKUMI",
    volume: "Vol. 5 No. 1",
    year: "2026",
    pages: "1-25",
    category: "Tafsir"
  },
  {
    title: "Maqashid Syariah dalam Ekonomi Islam Kontemporer",
    authors: "Dr. Ahmad Zainuddin, Dr. Muhammad Hassan",
    journal: "Jurnal Islamic Studies PKUMI",
    volume: "Vol. 5 No. 1",
    year: "2026",
    pages: "26-48",
    category: "Fiqh"
  },
  {
    title: "Metodologi Kritik Hadits: Perbandingan Ulama Klasik dan Modern",
    authors: "Dr. Husain Abdullah, Dr. Fatimah Azzahra",
    journal: "Jurnal Hadits dan Sunnah",
    volume: "Vol. 12 No. 2",
    year: "2025",
    pages: "101-130",
    category: "Hadits"
  },
  {
    title: "Wasathiyah sebagai Paradigma Moderasi Beragama di Indonesia",
    authors: "Prof. Dr. Yusuf Mahmud, Dr. Zainab Hasan",
    journal: "Jurnal Islamic Studies PKUMI",
    volume: "Vol. 4 No. 2",
    year: "2025",
    pages: "75-98",
    category: "Aqidah"
  },
  {
    title: "Dakwah Digital: Strategi Komunikasi Islam di Media Sosial",
    authors: "Dr. Umar Faruq Ibrahim, Dr. Abdul Malik Karim",
    journal: "Jurnal Dakwah dan Komunikasi Islam",
    volume: "Vol. 8 No. 1",
    year: "2025",
    pages: "45-72",
    category: "Dakwah"
  },
  {
    title: "Peran Ulama Nusantara dalam Perkembangan Ilmu Hadits",
    authors: "Dr. Zainab Hasan, Prof. Dr. Abdullah Al-Hakim",
    journal: "Jurnal Sejarah Peradaban Islam",
    volume: "Vol. 15 No. 3",
    year: "2025",
    pages: "200-235",
    category: "Sejarah"
  }
];

const categoryColors: Record<string, string> = {
  Tafsir: "bg-blue-100 text-blue-800",
  Hadits: "bg-purple-100 text-purple-800",
  Fiqh: "bg-emerald-100 text-emerald-800",
  Aqidah: "bg-amber-100 text-amber-800",
  Dakwah: "bg-pink-100 text-pink-800",
  Sejarah: "bg-cyan-100 text-cyan-800"
};

export default function JurnalPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="text-emerald-200 hover:text-white mb-4 inline-block">
              ← Kembali ke Akademik
            </Link>
            <h1 className="text-4xl font-bold mb-4">Jurnal Ilmiah PKUMI</h1>
            <p className="text-emerald-100 text-lg">
              Publikasi artikel ilmiah dan penelitian Islamic Studies
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="text-emerald-600" size={32} />
              <div>
                <h2 className="text-xl font-bold text-slate-900">Jurnal Islamic Studies PKUMI</h2>
                <p className="text-slate-600 text-sm">ISSN: 2580-1234 (Print) | ISSN: 2580-5678 (Online)</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              Jurnal Islamic Studies PKUMI adalah jurnal ilmiah peer-reviewed yang diterbitkan dua kali setahun (Juni dan Desember). 
              Jurnal ini menerbitkan artikel penelitian, kajian konseptual, dan review buku dalam bidang Islamic Studies.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <ExternalLink size={16} />
              Kunjungi OJS Portal
            </a>
          </div>

          <div className="grid gap-6">
            {jurnalItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-emerald-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-bold text-slate-900 text-lg leading-snug">
                        {item.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[item.category]} flex-shrink-0`}>
                        {item.category}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-3">{item.authors}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {item.year}
                      </span>
                      <span>•</span>
                      <span className="italic">{item.journal}</span>
                      <span>•</span>
                      <span>{item.volume}</span>
                      <span>•</span>
                      <span>Hal. {item.pages}</span>
                    </div>

                    <div className="flex gap-3">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium">
                        <Download size={16} />
                        Download PDF
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
                        <ExternalLink size={16} />
                        Lihat Abstract
                      </button>
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
