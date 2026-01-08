"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import Link from "next/link";

/**
 * Halaman Struktur Organisasi PKUMI (2.2)
 * Menampilkan bagan organisasi dan profil kepemimpinan
 */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Dummy data untuk kepemimpinan
const leadership = [
  {
    name: "Dr. K.H. Ahmad Syaikhu, M.A.",
    role: "Imam Besar Masjid Istiqlal & Ketua BPMI",
    position: "Ketua",
    specialty: "Islamic Leadership",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Prof. Dr. Muhammad Amin Abdullah",
    role: "Direktur PKUMI",
    position: "Direktur Eksekutif",
    specialty: "Islamic Philosophy & Methodology",
    image: "https://images.unsplash.com/photo-1519085360771-9852372fb4d5?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Syafiq A. Mughni, M.A.",
    role: "Wakil Direktur Akademik",
    position: "Wakil Direktur Akademik",
    specialty: "Islamic Jurisprudence (Fiqh)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Taufik Adnan Amal, Lc.",
    role: "Wakil Direktur Riset & Pengembangan",
    position: "Wakil Direktur Riset",
    specialty: "Islamic History & Research",
    image: "https://images.unsplash.com/photo-1507237998372-f92c8d4b538d?q=80&w=600&auto=format&fit=crop",
  },
];

// Unit-unit organisasi
const organizationalUnits = [
  {
    name: "Bagian Akademik",
    head: "Dr. Syafiq A. Mughni, M.A.",
    desc: "Mengelola kurikulum, pembelajaran, dan evaluasi akademik",
    responsibilities: [
      "Pengembangan silabus dan materi ajar",
      "Penjadwalan kelas dan ujian",
      "Evaluasi prestasi mahasantri",
      "Koordinasi dengan dosen pengajar",
    ],
  },
  {
    name: "Bagian Riset & Publikasi",
    head: "Dr. Taufik Adnan Amal, Lc.",
    desc: "Mendorong riset berkualitas dan publikasi ilmiah",
    responsibilities: [
      "Pendampingan tesis & disertasi",
      "Jurnal publikasi PKUMI",
      "Kolaborasi riset internasional",
      "Pengelolaan khazanah digital",
    ],
  },
  {
    name: "Bagian Pendaftaran & Mahasiswa",
    head: "Ust. Husni Syaiful, S.Pd., M.A.",
    desc: "Menangani rekrutmen, admisi, dan kesejahteraan mahasantri",
    responsibilities: [
      "Proses penerimaan mahasiswa baru",
      "Manajemen data mahasantri",
      "Program beasiswa & bantuan finansial",
      "Kegiatan kemahasiswaan",
      "Alumni networking",
    ],
  },
  {
    name: "Bagian Sarana & Prasarana",
    head: "Muhammad Ridho Kurniawan",
    desc: "Mengelola fasilitas dan infrastruktur PKUMI",
    responsibilities: [
      "Perawatan gedung & asrama",
      "Perpustakaan dan fasilitas belajar",
      "IT & sistem informasi",
      "Keamanan dan lingkungan",
    ],
  },
  {
    name: "Bagian Hubungan Masyarakat",
    head: "Dr. Zainal Abidin Syamsudin",
    desc: "Menjalin kerjasama dan komunikasi eksternal",
    responsibilities: [
      "Kerjasama dengan universitas & lembaga",
      "Program pengabdian kepada masyarakat",
      "Publikasi dan media",
      "Acara & seminar publik",
    ],
  },
  {
    name: "Dewan Pengajar & Syaikh",
    head: "Berbagai Syaikh & Profesor",
    desc: "Tim akademik inti PKUMI",
    responsibilities: [
      "Pengajaran mata kuliah",
      "Bimbingan tesis/disertasi",
      "Pengembangan kurikulum",
      "Mentoring akademik",
    ],
  },
];

export default function StrukturPage() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Struktur Organisasi PKUMI</h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Tim profesional yang berdedikasi untuk mewujudkan visi pendidikan Islamic Studies berkualitas tinggi
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== KEPEMIMPINAN UTAMA ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4"
          >
            Kepemimpinan PKUMI
          </motion.h2>
          <p className="text-center text-slate-600 text-lg mb-16 max-w-3xl mx-auto">
            Dipimpin oleh para ulama dan akademisi terkemuka dengan pengalaman bertahun-tahun dalam pendidikan Islamic
            Studies
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-xl overflow-hidden border-2 border-emerald-200 hover:border-emerald-400 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
                    {leader.position}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{leader.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{leader.role}</p>
                  <p className="text-xs text-emerald-600 font-semibold">Spesialisasi: {leader.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STRUKTUR ORGANISASI DIAGRAM ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Bagan Organisasi
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-slate-200 rounded-xl p-8 overflow-auto"
          >
            <div className="min-w-max">
              {/* Simplified hierarchy diagram */}
              <div className="flex flex-col items-center gap-8">
                {/* Level 1: Ketua */}
                <div className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold text-center min-w-max">
                  KETUA: Imam Besar Masjid Istiqlal
                </div>

                {/* Level 2: Direktur */}
                <div className="w-1 h-8 bg-slate-300"></div>
                <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold text-center min-w-max">
                  DIREKTUR PKUMI
                </div>

                {/* Level 3: 2 Wakil Direktur */}
                <div className="w-1 h-8 bg-slate-300"></div>
                <div className="flex gap-24 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-4 bg-slate-300"></div>
                    <div className="bg-emerald-400 text-white px-4 py-2 rounded-lg font-semibold text-sm text-center min-w-max">
                      Wakil Direktur<br />Akademik
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-4 bg-slate-300"></div>
                    <div className="bg-emerald-400 text-white px-4 py-2 rounded-lg font-semibold text-sm text-center min-w-max">
                      Wakil Direktur<br />Riset
                    </div>
                  </div>
                </div>

                {/* Level 4: Bagian-bagian */}
                <div className="w-1 h-8 bg-slate-300"></div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    "Bagian Akademik",
                    "Bagian Riset &\nPublikasi",
                    "Bagian Pendaftaran &\nMahasiswa",
                    "Bagian Sarana &\nPrasarana",
                    "Bagian Hubungan\nMasyarakat",
                    "Dewan Pengajar &\nSyaikh",
                  ].map((unit, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-semibold text-sm text-center min-w-max"
                    >
                      {unit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== UNIT ORGANISASI DETAIL ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Unit-Unit Organisasi
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {organizationalUnits.map((unit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border-2 border-slate-200 hover:border-emerald-400 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Building2 className="text-emerald-600" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{unit.name}</h3>
                    <p className="text-sm text-emerald-600 font-semibold">Kepala: {unit.head}</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">{unit.desc}</p>

                <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-3 text-sm">Tanggung Jawab Utama:</h4>
                  <ul className="space-y-2">
                    {unit.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ingin Mengenal Dosen Kami?</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Jelajahi profil lengkap para syaikh, profesor, dan dosen pengajar yang berdedikasi di PKUMI
          </p>

          <Link
            href="/profil/dosen"
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            Lihat Daftar Dosen →
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
