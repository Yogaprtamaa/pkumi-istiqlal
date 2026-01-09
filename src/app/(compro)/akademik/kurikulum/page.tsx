"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, BookOpen, Target, Clock } from "lucide-react";

const programS2 = {
  nama: "Program Magister (S2) Islamic Studies",
  durasi: "2 Tahun (4 Semester)",
  totalSKS: "48 SKS",
  konsentrasi: [
    "Tafsir dan Ilmu Al-Quran",
    "Hadits dan Ilmu Hadits",
    "Fiqh dan Ushul Fiqh",
    "Aqidah dan Filsafat Islam",
    "Dakwah dan Komunikasi Islam",
    "Sejarah dan Peradaban Islam"
  ],
  struktur: [
    {
      kategori: "Mata Kuliah Inti",
      sks: 30,
      deskripsi: "Tafsir Ayat Ahkam, Hadits Hukum, Ushul Fiqh, Metodologi Penelitian, dll"
    },
    {
      kategori: "Mata Kuliah Konsentrasi",
      sks: 12,
      deskripsi: "Sesuai dengan konsentrasi yang dipilih"
    },
    {
      kategori: "Tesis",
      sks: 6,
      deskripsi: "Penelitian dan penulisan tesis"
    }
  ]
};

const programS3 = {
  nama: "Program Doktor (S3) Islamic Studies",
  durasi: "3-4 Tahun (6-8 Semester)",
  totalSKS: "54 SKS",
  konsentrasi: [
    "Tafsir dan Ilmu Al-Quran",
    "Hadits dan Ilmu Hadits",
    "Fiqh dan Ushul Fiqh",
    "Aqidah dan Filsafat Islam"
  ],
  struktur: [
    {
      kategori: "Mata Kuliah Lanjutan",
      sks: 24,
      deskripsi: "Metodologi Riset Lanjutan, Kritik Teks Islam, Hermeneutika, dll"
    },
    {
      kategori: "Seminar & Kolokium",
      sks: 6,
      deskripsi: "Seminar proposal dan hasil riset"
    },
    {
      kategori: "Disertasi",
      sks: 24,
      deskripsi: "Penelitian orisinal dan penulisan disertasi"
    }
  ]
};

const kompetensiLulusan = [
  "Menguasai metodologi tafsir Al-Quran dan hadits dengan pendekatan kontekstual",
  "Mampu melakukan ijtihad dan istinbath hukum sesuai kaidah ushul fiqh",
  "Memiliki wawasan global dan pemahaman mendalam tentang wasathiyah",
  "Mampu berkomunikasi dalam bahasa Arab, Inggris, dan Indonesia dengan baik",
  "Menguasai teknologi informasi untuk dakwah dan riset Islamic Studies",
  "Memiliki integritas moral dan komitmen pada nilai-nilai keislaman"
];

export default function KurikulumPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="text-emerald-200 hover:text-white mb-4 inline-block">
              ← Kembali ke Akademik
            </Link>
            <h1 className="text-4xl font-bold mb-4">Kurikulum PKUMI</h1>
            <p className="text-emerald-100 text-lg">
              Struktur program studi S2 dan S3 Islamic Studies
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Program S2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{programS2.nama}</h2>
                  <div className="flex items-center gap-4 text-blue-100 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {programS2.durasi}
                    </span>
                    <span>•</span>
                    <span>{programS2.totalSKS}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Target size={20} className="text-blue-600" />
                  Konsentrasi Program
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {programS2.konsentrasi.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-600" />
                  Struktur Kurikulum
                </h3>
                <div className="space-y-3">
                  {programS2.struktur.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600 text-lg">{item.sks}</span>
                        <span className="text-xs text-blue-600 ml-1">SKS</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.kategori}</h4>
                        <p className="text-slate-600 text-sm">{item.deskripsi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Program S3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{programS3.nama}</h2>
                  <div className="flex items-center gap-4 text-purple-100 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {programS3.durasi}
                    </span>
                    <span>•</span>
                    <span>{programS3.totalSKS}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Target size={20} className="text-purple-600" />
                  Konsentrasi Program
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {programS3.konsentrasi.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen size={20} className="text-purple-600" />
                  Struktur Kurikulum
                </h3>
                <div className="space-y-3">
                  {programS3.struktur.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-purple-600 text-lg">{item.sks}</span>
                        <span className="text-xs text-purple-600 ml-1">SKS</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.kategori}</h4>
                        <p className="text-slate-600 text-sm">{item.deskripsi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kompetensi Lulusan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-8 border border-emerald-200"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              Kompetensi Lulusan
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {kompetensiLulusan.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-emerald-100">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
