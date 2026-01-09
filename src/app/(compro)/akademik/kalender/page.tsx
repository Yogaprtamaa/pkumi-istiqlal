"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar as CalendarIcon } from "lucide-react";

const kalenderData = [
  {
    bulan: "Januari 2026",
    kegiatan: [
      { tanggal: "6-10", nama: "Pendaftaran Semester Genap", type: "akademik" },
      { tanggal: "13", nama: "Pembukaan Semester Genap", type: "akademik" },
      { tanggal: "13-17", nama: "Minggu Orientasi Mahasantri Baru", type: "orientasi" },
      { tanggal: "20", nama: "Perkuliahan Dimulai", type: "kuliah" }
    ]
  },
  {
    bulan: "Februari 2026",
    kegiatan: [
      { tanggal: "3-7", nama: "Pekan Matrikulasi Bahasa Arab", type: "workshop" },
      { tanggal: "14", nama: "Seminar Metodologi Penelitian", type: "seminar" },
      { tanggal: "20-28", nama: "Ujian Tengah Semester", type: "ujian" }
    ]
  },
  {
    bulan: "Maret 2026",
    kegiatan: [
      { tanggal: "2-6", nama: "Workshop Penulisan Artikel Jurnal", type: "workshop" },
      { tanggal: "15", nama: "Deadline Pengumpulan Proposal Tesis", type: "akademik" },
      { tanggal: "20-31", nama: "Sidang Proposal Tesis Gelombang I", type: "sidang" }
    ]
  },
  {
    bulan: "April 2026",
    kegiatan: [
      { tanggal: "5", nama: "Libur Isra Mi'raj", type: "libur" },
      { tanggal: "10-12", nama: "Seminar Internasional Islamic Studies", type: "seminar" },
      { tanggal: "20-25", nama: "Pekan Riset Lapangan", type: "riset" }
    ]
  },
  {
    bulan: "Mei 2026",
    kegiatan: [
      { tanggal: "1", nama: "Libur Hari Buruh", type: "libur" },
      { tanggal: "5-15", nama: "Ujian Akhir Semester", type: "ujian" },
      { tanggal: "18-22", nama: "Sidang Munaqasyah Tesis", type: "sidang" },
      { tanggal: "25", nama: "Pengumuman Hasil Semester Genap", type: "akademik" }
    ]
  },
  {
    bulan: "Juni 2026",
    kegiatan: [
      { tanggal: "1-5", nama: "Libur Semester", type: "libur" },
      { tanggal: "8", nama: "Wisuda PKUMI Angkatan 2024", type: "wisuda" },
      { tanggal: "15-19", nama: "Pelatihan Dakwah Digital", type: "workshop" }
    ]
  }
];

const typeColors: Record<string, string> = {
  akademik: "bg-blue-100 text-blue-800",
  kuliah: "bg-emerald-100 text-emerald-800",
  ujian: "bg-red-100 text-red-800",
  sidang: "bg-purple-100 text-purple-800",
  seminar: "bg-amber-100 text-amber-800",
  workshop: "bg-cyan-100 text-cyan-800",
  orientasi: "bg-pink-100 text-pink-800",
  riset: "bg-teal-100 text-teal-800",
  libur: "bg-slate-100 text-slate-600",
  wisuda: "bg-yellow-100 text-yellow-800"
};

export default function KalenderPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="text-emerald-200 hover:text-white mb-4 inline-block">
              ← Kembali ke Akademik
            </Link>
            <h1 className="text-4xl font-bold mb-4">Kalender Akademik PKUMI</h1>
            <p className="text-emerald-100 text-lg">
              Timeline kegiatan akademik tahun 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {kalenderData.map((bulan, bulanIndex) => (
              <motion.div
                key={bulanIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: bulanIndex * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200"
              >
                <div className="bg-emerald-600 text-white px-6 py-4 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <CalendarIcon size={24} />
                    <h2 className="text-xl font-bold">{bulan.bulan}</h2>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {bulan.kegiatan.map((kegiatan, kegiatanIndex) => (
                    <div key={kegiatanIndex} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 text-center">
                        <div className="bg-slate-100 rounded-lg px-2 py-1 text-sm font-bold text-slate-700">
                          {kegiatan.tanggal}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {kegiatan.nama}
                        </h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${typeColors[kegiatan.type]}`}>
                          {kegiatan.type.charAt(0).toUpperCase() + kegiatan.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
