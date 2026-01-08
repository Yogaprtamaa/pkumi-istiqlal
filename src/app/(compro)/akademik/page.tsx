"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Scroll,
  Book,
  Clock,
  FileText,
  Library,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

/**
 * Halaman Akademik - Hub (4. AKADEMIK)
 * 7 poin akademik dalam grid icon menu yang rapi
 */

const akademikItems = [
  {
    title: "Agenda",
    desc: "Jadwal seminar, kuliah umum, ujian seleksi",
    icon: Calendar,
    link: "/akademik/agenda",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Penelitian",
    desc: "Repositori judul tesis & disertasi mahasantri",
    icon: Scroll,
    link: "/akademik/penelitian",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Mata Kuliah",
    desc: "Daftar silabus pembelajaran per semester",
    icon: Book,
    link: "/akademik/matkul",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Kalender Akademik",
    desc: "Timeline satu tahun ajaran",
    icon: Clock,
    link: "/akademik/kalender",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Jurnal",
    desc: "Link ke OJS dan publikasi PDF jurnal PKUMI",
    icon: FileText,
    link: "/akademik/jurnal",
    color: "from-red-500 to-red-600",
  },
  {
    title: "Khazanah PKUMI",
    desc: "Koleksi digital kitab kuning dan manuskrip",
    icon: Library,
    link: "/akademik/khazanah",
    color: "from-amber-500 to-amber-600",
  },
  {
    title: "Kurikulum",
    desc: "Penjelasan struktur program S2 & S3",
    icon: GraduationCap,
    link: "/akademik/kurikulum",
    color: "from-teal-500 to-teal-600",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AkademikPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Pusat Akademik PKUMI</h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Pusat informasi lengkap untuk civitas akademika: jadwal, riset, kurikulum, jurnal, dan koleksi digital
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== AKADEMIK GRID MENU ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {akademikItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ translateY: -8 }}
                >
                  <Link href={item.link}>
                    <div
                      className={`bg-gradient-to-br ${item.color} text-white p-8 rounded-xl hover:shadow-2xl transition-all cursor-pointer h-full flex flex-col`}
                    >
                      <IconComponent size={48} className="mb-4 opacity-90" />
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90 flex-grow">{item.desc}</p>
                      <div className="mt-4 inline-flex items-center text-sm font-semibold gap-2 group">
                        Akses <span className="group-hover:translate-x-2 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== INFO AKADEMIK ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Informasi Akademik Penting
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Program Studi",
                items: ["Program S2 Islamic Studies", "Program S3 Islamic Studies", "Durasi: 4 & 6-8 semester"],
              },
              {
                title: "Jadwal Penerimaan",
                items: [
                  "Gelombang I: Jan - Maret",
                  "Gelombang II: Jun - Agustus",
                  "Gelombang III: Sept - November",
                ],
              },
              {
                title: "Persyaratan Akademik",
                items: [
                  "Lulusan minimal S1",
                  "IPK minimal 3.0",
                  "Pemahaman bahasa Arab",
                ],
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-emerald-400 transition-all"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <span className="text-emerald-600 font-bold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUICK LINKS ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Link Penting Akademik
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Download Panduan Akademik", icon: "📋" },
              { label: "Portal Pembelajaran Online", icon: "💻" },
              { label: "Sistem Pendaftaran", icon: "📝" },
              { label: "Hub Riset & Tesis", icon: "🔬" },
            ].map((link, idx) => (
              <motion.a
                key={idx}
                href="#"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 p-6 rounded-xl hover:border-emerald-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-4xl mb-3">{link.icon}</div>
                <p className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {link.label}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Butuh Bantuan Akademik?</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Hubungi Bagian Akademik atau Dosen Pembimbing Anda untuk konsultasi mengenai kurikulum, riset, dan
            pengembangan akademik
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontak"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors"
            >
              Hubungi Bagian Akademik →
            </Link>
            <Link
              href="/profil/dosen"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Lihat Daftar Dosen
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
