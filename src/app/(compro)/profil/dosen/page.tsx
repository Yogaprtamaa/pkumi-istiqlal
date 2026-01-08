"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, Globe } from "lucide-react";

/**
 * Halaman Dosen Pengajar (2.3)
 * Profil singkat Dosen/Syaikh dengan spesialisasi keilmuan
 */

const dosenData = [
  {
    name: "Dr. K.H. Muhammad Amin Abdullah, M.A.",
    gelar: "Syaikh, Dr., M.A.",
    spesialisasi: "Islamic Philosophy & Methodology",
    bio: "Pakar metodologi Islamic Studies dengan pengalaman 30+ tahun di universitas Islam terkemuka",
    keahlian: ["Metodologi Riset Islam", "Filsafat Islam Modern", "Islamic Epistemology"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Syafiq A. Mughni, M.A.",
    gelar: "Dr., M.A., Lc.",
    spesialisasi: "Islamic Jurisprudence (Fiqh)",
    bio: "Spesialis fiqh kontemporer dengan fokus pada aplikasi hukum Islam di era modern",
    keahlian: ["Fiqh Kontemporer", "Qawa'id Fiqhiyyah", "Islamic Law & Modernity"],
    image: "https://images.unsplash.com/photo-1519085360771-9852372fb4d5?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Taufik Adnan Amal, Lc.",
    gelar: "Dr., Lc.",
    spesialisasi: "Islamic History & Thought",
    bio: "Historikus Islam terkemuka dengan publikasi internasional tentang sejarah dan pemikiran Islam",
    keahlian: ["Islamic History", "Islamic Political Thought", "Islamic Modernism"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Prof. Dr. Atho Mudzhar",
    gelar: "Prof., Dr.",
    spesialisasi: "Islamic Law & Society",
    bio: "Professor senior dengan kontribusi signifikan dalam Islamic law dan sosial kemasyarakatan",
    keahlian: ["Islamic Law", "Sociology of Islam", "Legal Pluralism"],
    image: "https://images.unsplash.com/photo-1507237998372-f92c8d4b538d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Hasanuddin", 
    gelar: "Dr.",
    spesialisasi: "Islamic Theology (Tawhid)",
    bio: "Ahli Ilmu Tawhid dengan pendekatan tradisional dan kontemporer",
    keahlian: ["Tawhid", "Islamic Beliefs", "Comparative Theology"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Husnul Hasan Asyari",
    gelar: "Dr., M.A.",
    spesialisasi: "Qur'anic Studies (Tafsir)",
    bio: "Mufassir terkemuka dengan metodologi tafsir yang holistik dan kontekstual",
    keahlian: ["Tafsir Qur'an", "Qur'anic Sciences", "Islamic Exegesis"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Mujib Ridho",
    gelar: "Dr., Lc.",
    spesialisasi: "Hadith Sciences (Musthalah Hadith)",
    bio: "Pakar ilmu hadith dengan kedalaman dalam kritik hadith dan aplikasinya",
    keahlian: ["Hadith Sciences", "Hadith Criticism", "Islamic Jurisprudence"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Ina Laksmintasari",
    gelar: "Dr.",
    spesialisasi: "Islamic Education & Pedagogy",
    bio: "Pendidik berpengalaman dengan fokus pada metodologi pembelajaran Islamic Studies",
    keahlian: ["Islamic Education", "Curriculum Development", "Pedagogy"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Wahyudi Teguh",
    gelar: "Dr., M.Sc.",
    spesialisasi: "Islamic Economics",
    bio: "Ekonom Islam dengan publikasi di jurnal internasional tentang ekonomi syariah",
    keahlian: ["Islamic Economics", "Sharia Finance", "Economic Development"],
    image: "https://images.unsplash.com/photo-1519085360771-9852372fb4d5?q=80&w=600&auto=format&fit=crop",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function DosenPage() {
  const [selectedDosen, setSelectedDosen] = useState<typeof dosenData[0] | null>(null);

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Dosen Pengajar PKUMI</h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Tim akademis terdiri dari Syaikh, Professor, dan Doktor yang berpengalaman dalam bidangnya masing-masing
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== DOSEN GRID ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dosenData.map((dosen, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedDosen(dosen)}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden border-2 border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group"
              >
                {/* Foto */}
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-emerald-100 to-slate-100">
                  <img
                    src={dosen.image}
                    alt={dosen.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
                    {dosen.gelar}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2">{dosen.name}</h3>
                  <p className="text-sm text-emerald-600 font-semibold mb-3">{dosen.spesialisasi}</p>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">{dosen.bio}</p>

                  <button className="text-emerald-600 font-semibold text-sm hover:text-emerald-700 inline-flex items-center gap-2">
                    Profil Lengkap →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DETAIL MODAL ===== */}
      {selectedDosen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDosen(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedDosen.name}</h2>
              <button
                onClick={() => setSelectedDosen(null)}
                className="text-2xl hover:text-emerald-200 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Foto & Gelar */}
              <div className="flex items-start gap-6">
                <img
                  src={selectedDosen.image}
                  alt={selectedDosen.name}
                  className="w-32 h-32 rounded-xl object-cover border-4 border-emerald-200"
                />
                <div>
                  <div className="inline-block bg-emerald-100 text-emerald-700 text-sm font-bold px-4 py-2 rounded-full mb-3">
                    {selectedDosen.gelar}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{selectedDosen.name}</h3>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-2">
                    <BookOpen size={20} /> Spesialisasi: {selectedDosen.spesialisasi}
                  </div>
                </div>
              </div>

              {/* Biodata */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200">
                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award size={24} className="text-amber-600" /> Profil Akademik
                </h4>
                <p className="text-slate-700 leading-relaxed">{selectedDosen.bio}</p>
              </div>

              {/* Keahlian */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Globe size={24} className="text-emerald-600" /> Bidang Keahlian
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedDosen.keahlian.map((skill, idx) => (
                    <div
                      key={idx}
                      className="bg-emerald-50 border-2 border-emerald-200 px-4 py-3 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                        <span className="text-slate-700 font-semibold">{skill}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Tambahan */}
              <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
                <p className="text-blue-900">
                  <strong>Catatan:</strong> Untuk informasi lebih detail tentang jam konsultasi, topik riset, atau jadwal
                  bimbingan, silakan hubungi Bagian Akademik PKUMI.
                </p>
              </div>

              {/* Contact Button */}
              <button
                onClick={() => setSelectedDosen(null)}
                className="w-full bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold py-3 rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ===== STATISTIK ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="text-4xl font-bold text-emerald-400 mb-2">{dosenData.length}+</div>
            <div className="text-slate-300">Dosen Pengajar</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="text-4xl font-bold text-amber-400 mb-2">7</div>
            <div className="text-slate-300">Bidang Spesialisasi</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="text-4xl font-bold text-emerald-400 mb-2">30+</div>
            <div className="text-slate-300">Tahun Pengalaman Rata-rata</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="text-4xl font-bold text-amber-400 mb-2">100+</div>
            <div className="text-slate-300">Publikasi Internasional</div>
          </motion.div>
        </div>
      </section>

      {/* ===== KESEMPATAN KERJASAMA ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ingin Berkolaborasi dengan Tim Kami?</h2>
            <p className="text-lg text-emerald-100 mb-6">
              Hubungi bagian Hubungan Masyarakat dan Riset untuk peluang kerjasama akademik, penelitian bersama, atau
              seminar
            </p>
            <a
              href="/kontak"
              className="inline-block px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors"
            >
              Hubungi Kami →
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
