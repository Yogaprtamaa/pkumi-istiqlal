"use client";

import { motion } from "framer-motion";
import { Users, Globe, BookOpen, Lightbulb, Award } from "lucide-react";
import Link from "next/link";

/**
 * Halaman Profil - Tentang PKUMI (2.1)
 * Membangun kepercayaan (trust) dan kredibilitas lembaga
 */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  {
    icon: BookOpen,
    title: "Pendidikan Holistik",
    desc: "Menggabungkan Turats Islam klasik dengan metodologi riset modern",
  },
  {
    icon: Users,
    title: "Komunitas Global",
    desc: "Mahasantri dari 15+ negara menciptakan pembelajaran lintas budaya",
  },
  {
    icon: Lightbulb,
    title: "Riset Berkualitas",
    desc: "Mendorong kontribusi ilmiah yang relevan untuk pembangunan masyarakat",
  },
  {
    icon: Award,
    title: "Sertifikasi Internasional",
    desc: "Gelar S2 & S3 yang diakui secara internasional",
  },
];

const subPages = [
  {
    title: "Tentang PKUMI",
    desc: "Sejarah, Visi, dan Misi",
    icon: "📖",
    href: "/profil",
  },
  {
    title: "Struktur Organisasi",
    desc: "Kepemimpinan dan jajarannya",
    icon: "🏢",
    href: "/profil/struktur",
  },
  {
    title: "Dosen Pengajar",
    desc: "Profil Syaikh & Tim Akademik",
    icon: "👨‍🎓",
    href: "/profil/dosen",
  },
];

export default function ProfilPage() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Tentang PKUMI</h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Pendidikan Kader Ulama Masjid Istiqlal: Membangun Ulama Berwawasan Global dengan Fondasi Turats Islam Klasik
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SPLIT SCREEN: SEJARAH ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Text */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Sejarah Pendirian PKUMI</h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Pendidikan Kader Ulama Masjid Istiqlal (PKUMI) didirikan oleh Badan Pembina Masjid Istiqlal (BPMI)
                  dengan visi menciptakan ulama yang komprehensif dan relevan di era modern.
                </p>
                <p>
                  Berawal dari kebutuhan akan pemimpin agama yang mampu menguasai ilmu Islam klasik sekaligus memiliki
                  wawasan global dan kemampuan riset ilmiah, PKUMI dikembangkan sebagai pusat pendidikan tinggi Islam
                  di bawah payung Masjid Istiqlal.
                </p>
                <p>
                  Dengan dukungan dari para syaikh dan profesor terkemuka, PKUMI berkomitmen untuk mencetak generasi
                  ulama yang tidak hanya berpengetahuan mendalam tetapi juga mampu berkontribusi aktif dalam memecahkan
                  masalah-masalah kontemporer umat Islam.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                    <Globe className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Jangkauan Global</h4>
                    <p className="text-slate-600">Jaringan dengan universitas Islam terkemuka di dunia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                    <Lightbulb className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Inovasi Berkelanjutan</h4>
                    <p className="text-slate-600">Mengembangkan kurikulum yang relevan dengan kebutuhan zaman</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-emerald-100 to-slate-100 rounded-xl overflow-hidden aspect-video flex items-center justify-center border-4 border-emerald-200"
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f70d504f0?q=80&w=800&auto=format&fit=crop"
                alt="Masjid Istiqlal"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== VISI & MISI ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* VISI */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-xl border-3 border-emerald-300">
              <h3 className="text-3xl font-bold text-emerald-700 mb-4">VISI</h3>
              <p className="text-lg text-slate-700 leading-relaxed font-semibold">
                Mencetak Ulama Berwawasan Global & Wasathiyah yang Mampu Menjadi Jembatan Antara Tradisi Islam Klasik
                dan Modernitas, serta Berkontribusi Positif dalam Memecahkan Tantangan Umat di Era Digital.
              </p>
            </motion.div>

            {/* MISI */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-xl border-3 border-amber-300">
              <h3 className="text-3xl font-bold text-amber-700 mb-4">MISI</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </span>
                  <span className="text-slate-700">
                    Menyelenggarakan pendidikan tinggi Islamic Studies berbasis Turats dan riset akademik modern
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </span>
                  <span className="text-slate-700">
                    Mengembangkan metodologi istinbath hukum Islam yang kontekstual dan relevan
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </span>
                  <span className="text-slate-700">
                    Mempromosikan kerjasama internasional dalam riset dan pengembangan keilmuan Islam
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== KEUNGGULAN PKUMI ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Keunggulan Kompetitif PKUMI
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border-2 border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all"
                >
                  <div className="bg-emerald-100 p-3 rounded-lg w-fit mb-4">
                    <IconComponent className="text-emerald-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== EKSPLOR BAGIAN LAIN ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Jelajahi Lebih Lanjut
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {subPages.map((page, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={page.href}
                  className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-emerald-400 hover:shadow-lg transition-all group block"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{page.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{page.title}</h3>
                  <p className="text-slate-600 mb-4">{page.desc}</p>
                  <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                    Pelajari <span>→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tertarik Bergabung dengan PKUMI?</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Jalani perjalanan pendidikan yang mengubah hidup dan menjadi ulama yang memberikan dampak positif bagi umat
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pendaftaran"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              Daftar Sekarang →
            </Link>
            <Link
              href="/kontak"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
