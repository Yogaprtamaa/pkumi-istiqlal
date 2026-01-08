"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, BookOpen, Users, Award, Clock } from "lucide-react";
import Link from "next/link";

/**
 * Halaman Pendaftaran (6. PENDAFTARAN)
 * Tujuan: Konversi pengunjung menjadi pendaftar
 * Menampilkan syarat, alur seleksi, info beasiswa, dan link ke portal PMB eksternal
 */

const requirements = [
  {
    title: "Persyaratan Akademik",
    desc: "Lulusan minimal S1 dari universitas terakreditasi dengan IPK minimal 3.0",
    icon: BookOpen,
  },
  {
    title: "Kemampuan Bahasa",
    desc: "Pemahaman dasar bahasa Arab atau kemampuan berkomunikasi dalam forum ilmiah",
    icon: Users,
  },
  {
    title: "Motivasi & Komitmen",
    desc: "Surat motivasi kuat dan komitmen untuk menjadi agent of change di masyarakat",
    icon: Award,
  },
  {
    title: "Waktu & Fleksibilitas",
    desc: "Mampu mengikuti pembelajaran penuh waktu (S2: 4 semester, S3: 6-8 semester)",
    icon: Clock,
  },
];

const processSteps = [
  {
    step: 1,
    title: "Pendaftaran Online",
    desc: "Isi formulir di portal PMB dengan kelengkapan dokumen (CV, Ijazah, Sertifikat Bahasa)",
  },
  {
    step: 2,
    title: "Seleksi Administratif",
    desc: "Tim PKUMI memeriksa kelengkapan berkas (7-10 hari kerja)",
  },
  {
    step: 3,
    title: "Ujian Tertulis & Wawancara",
    desc: "Tes pengetahuan Islami dasar, Bahasa, dan wawancara mendalam dengan dosen pembimbing",
  },
  {
    step: 4,
    title: "Pengumuman & Orientasi",
    desc: "Pengumuman hasil seleksi dan pengenalan kehidupan akademik PKUMI",
  },
];

const scholarships = [
  {
    type: "Beasiswa Penuh",
    desc: "Biaya kuliah + Tunjangan hidup bulanan",
    criteria: "Prestasi akademik luar biasa + Kondisi ekonomi",
  },
  {
    type: "Beasiswa Sebagian",
    desc: "Potongan biaya kuliah hingga 75%",
    criteria: "Prestasi akademik baik + Rekomendasi lembaga",
  },
  {
    type: "Beasiswa Asrama",
    desc: "Akomodasi di asrama plus meal plan",
    criteria: "Peserta dari luar Jakarta",
  },
  {
    type: "Bantuan Tugas Akhir",
    desc: "Dana riset untuk tesis/disertasi",
    criteria: "Semua mahasiswa aktif semester akhir",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function PendaftaranPage() {
  // Auto-redirect untuk link langsung ke portal
  const redirectToPMB = () => {
    window.open("https://pmb.pkumionline.cloud/", "_blank");
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Bergabunglah dengan PKUMI
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Menjadi bagian dari komunitas ulama berwawasan global dengan foundation yang kuat dalam Turats Islam
              dan metodologi riset modern.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={redirectToPMB}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Daftar Sekarang <ArrowRight size={20} />
              </motion.button>
              <Link
                href="/"
                className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== QUICK STATS ===== */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <div className="text-4xl font-bold text-amber-400">500+</div>
            <div className="text-slate-300">Mahasantri Aktif</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <div className="text-4xl font-bold text-emerald-400">50+</div>
            <div className="text-slate-300">Dosen & Syaikh</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <div className="text-4xl font-bold text-amber-400">70%</div>
            <div className="text-slate-300">Penerima Beasiswa</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <div className="text-4xl font-bold text-emerald-400">15+</div>
            <div className="text-slate-300">Negara Asal</div>
          </motion.div>
        </div>
      </section>

      {/* ===== PERSYARATAN UMUM ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Persyaratan Pendaftaran
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 gap-8"
          >
            {requirements.map((req, idx) => {
              const IconComponent = req.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <IconComponent className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{req.title}</h3>
                      <p className="text-slate-600">{req.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== ALUR PENDAFTARAN ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Alur Seleksi Penerimaan Kader Baru
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-gradient-to-r from-emerald-400 to-amber-400 transform translate-x-1/2" />
                )}

                <div className="bg-white rounded-xl p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-5 left-6 bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEASISWA ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4"
          >
            Program Beasiswa & Bantuan Finansial
          </motion.h2>
          <p className="text-center text-slate-600 text-lg mb-16">
            PKUMI berkomitmen membuat pendidikan tinggi Islamic Studies dapat diakses oleh semua orang berbakat
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 gap-8"
          >
            {scholarships.map((sch, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-xl border-2 border-amber-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="text-amber-600" size={28} />
                  <h3 className="text-2xl font-bold text-slate-900">{sch.type}</h3>
                </div>
                <p className="text-slate-700 mb-4">{sch.desc}</p>
                <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">Kriteria:</span> {sch.criteria}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12"
          >
            Pertanyaan Umum
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                q: "Apakah ada biaya pendaftaran?",
                a: "Tidak. Pendaftaran sepenuhnya gratis. Anda hanya membayar biaya SPP setelah diterima.",
              },
              {
                q: "Berapa lama proses seleksi?",
                a: "Standar 4-6 minggu mulai dari pendaftaran hingga pengumuman hasil akhir.",
              },
              {
                q: "Apakah harus lancar Bahasa Arab untuk diterima?",
                a: "Tidak harus lancar, tapi kami perlu memastikan kemampuan untuk mengikuti pelajaran. Kami menyediakan kelas intensif bahasa Arab untuk mahasantri baru.",
              },
              {
                q: "Apakah ada asrama untuk mahasiswa?",
                a: "Ya, PKUMI menyediakan asrama berstandar dengan fasilitas lengkap untuk mahasantri yang membutuhkan.",
              },
            ].map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="group bg-white border-2 border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-all cursor-pointer"
              >
                <summary className="flex items-center justify-between p-6 font-semibold text-slate-900 select-none hover:bg-emerald-50">
                  <span>{faq.q}</span>
                  <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 border-t border-slate-100">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap untuk Memulai Perjalanan Anda?</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Klik tombol di bawah untuk mengakses portal pendaftaran PKUMI dan mulai proses seleksi penerimaan
            mahasiswa baru.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={redirectToPMB}
            className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg inline-flex items-center gap-2 transition-colors"
          >
            Buka Portal Pendaftaran <ArrowRight size={22} />
          </motion.button>

          <p className="text-emerald-100 text-sm mt-6">
            Portal PMB: <a href="https://pmb.pkumionline.cloud/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              pmb.pkumionline.cloud
            </a>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
