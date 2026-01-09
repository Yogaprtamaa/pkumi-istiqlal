"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Search, Download } from "lucide-react";
import { useState } from "react";

const khazanahItems = [
  {
    title: "Tafsir Al-Maraghi",
    author: "Ahmad Mustafa Al-Maraghi",
    category: "Tafsir",
    jilid: "30 Jilid",
    bahasa: "Arab",
    deskripsi: "Tafsir Al-Quran lengkap dengan pendekatan sosial dan kontekstual"
  },
  {
    title: "Shahih Al-Bukhari",
    author: "Imam Muhammad Al-Bukhari",
    category: "Hadits",
    jilid: "9 Jilid",
    bahasa: "Arab",
    deskripsi: "Koleksi hadits shahih yang paling autentik dalam Islam"
  },
  {
    title: "Al-Muwafaqat fi Ushul Al-Syariah",
    author: "Imam Al-Syatibi",
    category: "Ushul Fiqh",
    jilid: "4 Jilid",
    bahasa: "Arab",
    deskripsi: "Kitab fundamental tentang Maqashid Syariah"
  },
  {
    title: "Ihya Ulumuddin",
    author: "Imam Al-Ghazali",
    category: "Tasawuf",
    jilid: "4 Jilid",
    bahasa: "Arab",
    deskripsi: "Karya monumental tentang spiritualitas dan akhlak Islam"
  },
  {
    title: "Al-Umm",
    author: "Imam Al-Syafi'i",
    category: "Fiqh",
    jilid: "7 Jilid",
    bahasa: "Arab",
    deskripsi: "Kompilasi hukum fiqh mazhab Syafi'i"
  },
  {
    title: "Bidayatul Mujtahid",
    author: "Ibnu Rusyd",
    category: "Fiqh Muqaran",
    jilid: "2 Jilid",
    bahasa: "Arab",
    deskripsi: "Perbandingan pendapat ulama dalam masalah fiqh"
  },
  {
    title: "Tarikh Al-Tabari",
    author: "Imam Al-Tabari",
    category: "Sejarah",
    jilid: "15 Jilid",
    bahasa: "Arab",
    deskripsi: "Sejarah lengkap peradaban Islam dari masa awal"
  },
  {
    title: "Al-Itqan fi Ulum Al-Quran",
    author: "Imam Al-Suyuthi",
    category: "Ulumul Quran",
    jilid: "2 Jilid",
    bahasa: "Arab",
    deskripsi: "Kompilasi lengkap ilmu-ilmu Al-Quran"
  },
  {
    title: "Fathul Bari Syarh Shahih Bukhari",
    author: "Ibnu Hajar Al-Asqalani",
    category: "Syarah Hadits",
    jilid: "13 Jilid",
    bahasa: "Arab",
    deskripsi: "Syarah lengkap Shahih Bukhari"
  }
];

const categories = ["Semua", "Tafsir", "Hadits", "Fiqh", "Ushul Fiqh", "Tasawuf", "Sejarah", "Ulumul Quran", "Syarah Hadits", "Fiqh Muqaran"];

export default function KhazanahPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = khazanahItems.filter(item => {
    const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="text-emerald-200 hover:text-white mb-4 inline-block">
              ← Kembali ke Akademik
            </Link>
            <h1 className="text-4xl font-bold mb-4">Khazanah Digital PKUMI</h1>
            <p className="text-emerald-100 text-lg mb-6">
              Koleksi digital kitab kuning dan manuskrip Islam klasik
            </p>

            {/* Search Box */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Cari kitab atau pengarang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="mb-8 flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Khazanah Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-emerald-100 text-sm">{item.author}</p>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-bold">
                      {item.category}
                    </span>
                    <span>{item.jilid}</span>
                    <span>•</span>
                    <span>{item.bahasa}</span>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {item.deskripsi}
                  </p>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium">
                    <Download size={16} />
                    Akses Kitab
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500">Tidak ada kitab yang sesuai dengan pencarian Anda.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
