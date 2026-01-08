"use client";

import AmbientBackground from "@/components/public/AmbientBackground"; 
import {
  Globe,
  Users,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Quote,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Calendar,
  FileText,
  GraduationCap,
  Library,
  PlayCircle,
  Clock,
  Book,
  PenTool,
  Scroll
} from "lucide-react";
import Link from "next/link"; 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA BERITA & OPINI (Sesuai Poin 3.1 & 3.2) ---
const newsItems = [
  {
    category: "Berita PKUMI", // 3.1
    title: "PKUMI Gelar Seminar Internasional: Peran Ulama dalam Perdamaian Global",
    date: "12 Jan 2026",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop", 
    desc: "Menghadirkan narasumber dari Universitas Al-Azhar Kairo dan Imam Besar Masjid Istiqlal."
  },
  {
    category: "Rubrik Opini", // 3.2
    title: "Relevansi Turats Islam dalam Menjawab Tantangan Era Digital",
    date: "10 Jan 2026",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop",
    desc: "Oleh: Dr. Ahmad Zaini (Dosen PKUMI) - Sebuah refleksi metodologi istinbath hukum."
  },
  {
    category: "Agenda Akademik", // 4.1
    title: "Jadwal Sidang Munaqasyah Tesis & Disertasi Gelombang I 2026",
    date: "05 Feb 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
    desc: "Diharapkan seluruh mahasantri tingkat akhir segera melengkapi berkas administrasi."
  }
];

// --- DATA GALERI (Sesuai Poin 5.1) ---
const galleryImages = [
  "https://images.unsplash.com/photo-1580828795006-25916053331b?q=80&w=600&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
];

const testimonials = [
  {
    id: 1,
    text: "PKUMI mengajarkan kami tidak hanya teks (nash), tapi juga konteks. Menjadi ulama yang kakinya berpijak di bumi, tapi visinya melangit.",
    name: "Ust. Muhammad Al-Fatih",
    role: "Mahasantri PKUMI (S2)",
  },
  {
    id: 2,
    text: "Fasilitas riset di Masjid Istiqlal sangat mendukung penyelesaian Disertasi saya. Akses langsung ke ulama dunia adalah keunggulan utama.",
    name: "Hj. Siti Aminah, Lc., MA",
    role: "Mahasantri PKUMI (S3)",
  },
];

// --- DATA AKADEMIK LENGKAP (Sesuai List 4.1 - 4.7) ---
const akademikItems = [
    { title: "Agenda", icon: Calendar, link: "/akademik/agenda", desc: "Jadwal Kuliah & Seminar" }, // 4.1
    { title: "Penelitian", icon: Scroll, link: "/akademik/penelitian", desc: "Judul Disertasi & Tesis" }, // 4.2
    { title: "Mata Kuliah", icon: Book, link: "/akademik/matkul", desc: "Silabus Pembelajaran" }, // 4.3
    { title: "Kalender", icon: Clock, link: "/akademik/kalender", desc: "Kalender Akademik" }, // 4.4
    { title: "Jurnal", icon: FileText, link: "/akademik/jurnal", desc: "Publikasi Ilmiah PKUMI" }, // 4.5
    { title: "Khazanah", icon: Library, link: "/akademik/khazanah", desc: "Khazanah PKUMI" }, // 4.6
    { title: "Kurikulum", icon: GraduationCap, link: "/akademik/kurikulum", desc: "Struktur Program Studi" }, // 4.7
    { title: "Pendaftaran", icon: PenTool, link: "/pendaftaran", desc: "Penerimaan Kader Baru" }, // 6
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [currentTesti, setCurrentTesti] = useState(0);

  const nextTesti = () => setCurrentTesti((p) => (p === testimonials.length - 1 ? 0 : p + 1));
  const prevTesti = () => setCurrentTesti((p) => (p === 0 ? testimonials.length - 1 : p - 1));

  return (
    <main className="relative font-sans text-slate-800 bg-slate-50 overflow-hidden">
      
      {/* Background Ambient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30 mix-blend-multiply filter"></div>
         <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30 mix-blend-multiply filter"></div>
      </div>

      {/* =========================================
          1. BERANDA / TAMPILAN UTAMA (1.1)
      ========================================= */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8 z-10">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-sm font-semibold">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
                    </span>
                    Penerimaan Kader Ulama Baru Dibuka
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                  Pendidikan Kader Ulama <br/>
                  <span className="text-emerald-700">Masjid Istiqlal</span>
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
                  Melahirkan ulama berwawasan global, moderat (Wasathiyah), dan berpegang teguh pada Turats Islam untuk peradaban dunia.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                    {/* Link ke 6. Pendaftaran */}
                    <Link href="/pendaftaran" className="group relative px-8 py-4 bg-emerald-700 text-white rounded-full font-bold overflow-hidden shadow-lg shadow-emerald-700/30 hover:shadow-emerald-700/50 transition-all hover:-translate-y-1">
                        <span className="relative z-10">Daftar Sekarang</span>
                        <div className="absolute inset-0 bg-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                    </Link>
                    {/* Link ke 2. Profil */}
                    <Link href="/profil" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition-all hover:-translate-y-1 shadow-sm">
                        Profil PKUMI
                    </Link>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60">
                    {[
                        { num: "S2 & S3", label: "Program Studi" },
                        { num: "Istiqlal", label: "Pusat Kajian" },
                        { num: "Global", label: "Jaringan Ulama" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <p className="text-2xl font-bold text-slate-900">{stat.num}</p>
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block h-full"
            >
                <div className="relative z-10 w-[90%] ml-auto aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                    {/* Gambar Masjid Istiqlal / Suasana Belajar */}
                    <img 
                        src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=800&auto=format&fit=crop" 
                        alt="Masjid Istiqlal" 
                        className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                        <p className="font-bold text-lg">Pusat Peradaban Islam</p>
                        <p className="text-sm text-slate-200">Jakarta, Indonesia</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* =========================================
          2. PROFIL (2.1 - 2.3)
      ========================================= */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
                
                <div className="lg:col-span-5 space-y-6 top-32 sticky">
                    <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Tentang PKUMI</span>
                    <h2 className="text-4xl font-bold text-slate-900 leading-tight">Mewujudkan Ulama Wasathiyah yang Responsif Zaman</h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        PKUMI adalah lembaga pendidikan kader ulama di bawah naungan Badan Pengelola Masjid Istiqlal (BPMI).
                    </p>
                    <div className="flex flex-col gap-3 pt-4">
                        {/* 2.1 Visi Misi & Sejarah */}
                        <Link href="/profil/tentang" className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors group">
                           <div className="bg-white p-2 rounded-lg shadow-sm group-hover:text-emerald-600 transition-colors"><Library size={24}/></div>
                           <div>
                             <h4 className="font-bold text-slate-900">Sejarah & Visi Misi</h4>
                             <p className="text-sm text-slate-500">Filosofi pendirian PKUMI.</p>
                           </div>
                           <ArrowRight className="ml-auto text-slate-300 group-hover:text-emerald-600" size={20}/>
                        </Link>
                        {/* 2.2 Struktur Management */}
                        <Link href="/profil/struktur" className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors group">
                           <div className="bg-white p-2 rounded-lg shadow-sm group-hover:text-emerald-600 transition-colors"><Users size={24}/></div>
                           <div>
                             <h4 className="font-bold text-slate-900">Struktur Management</h4>
                             <p className="text-sm text-slate-500">Pimpinan & Pengelola PKUMI.</p>
                           </div>
                           <ArrowRight className="ml-auto text-slate-300 group-hover:text-emerald-600" size={20}/>
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                    <div className="space-y-6 mt-12">
                        {/* 2.3 Daftar Dosen Pengajar */}
                        <Link href="/profil/dosen" className="block group">
                            <div className="bg-slate-100 rounded-3xl p-8 h-80 flex flex-col justify-end relative overflow-hidden group">
                                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt="Dosen PKUMI"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                                <div className="relative z-10 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-bold text-xl">Daftar Dosen Pengajar</h3>
                                        <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-1"/>
                                    </div>
                                    <p className="text-sm text-slate-200">Ulama Nasional & Internasional.</p>
                                </div>
                            </div>
                        </Link>
                        
                        {/* Shortchut ke Kurikulum (4.7) */}
                        <div className="bg-emerald-800 rounded-3xl p-8 text-white relative overflow-hidden">
                             <GraduationCap size={48} className="mb-6 opacity-80"/>
                             <h3 className="font-bold text-2xl mb-2">Kurikulum PKUMI</h3>
                             <p className="text-emerald-100 text-sm mb-6">Integrasi Keislaman dan Keindonesiaan.</p>
                             <Link href="/akademik/kurikulum" className="inline-block text-sm font-bold border-b border-emerald-400 pb-1">Lihat Mata Kuliah</Link>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-amber-400 rounded-3xl p-8 text-slate-900 relative overflow-hidden">
                             <Globe size={48} className="mb-6 opacity-80"/>
                             <h3 className="font-bold text-2xl mb-2">Jaringan Ulama</h3>
                             <p className="text-slate-800 text-sm mb-6">Kerjasama dengan Universitas Timur Tengah & Barat.</p>
                             <Link href="/profil" className="inline-block text-sm font-bold border-b border-slate-900 pb-1">Lihat Mitra</Link>
                        </div>
                        <div className="bg-slate-100 rounded-3xl p-8 h-80 flex flex-col justify-end relative overflow-hidden group">
                             <img src="https://images.unsplash.com/photo-1507842217121-9e96e4763672?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt="Khazanah"/>
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                             <div className="relative z-10 text-white">
                                <h3 className="font-bold text-xl mb-2">Khazanah PKUMI</h3>
                                <p className="text-sm text-slate-200">Akses ribuan kitab klasik dan karya ulama.</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* =========================================
          4. AKADEMIK (LENGKAP 4.1 - 4.7)
      ========================================= */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-emerald-600 font-bold uppercase text-sm mb-2 block">Menu Akademik</span>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Layanan Akademik Mahasantri</h2>
                <p className="text-slate-500">Akses informasi perkuliahan, penelitian, dan publikasi ilmiah.</p>
            </div>

            {/* Grid Menu Akademik */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {akademikItems.map((item, i) => (
                    <Link href={item.link} key={i}>
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all text-center group h-full flex flex-col items-center justify-center min-h-[220px]"
                        >
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <item.icon size={26} />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* =========================================
          3. BERITA (3.1) & OPINI (3.2)
      ========================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
             <div className="flex justify-between items-end mb-12">
                <div>
                    <span className="text-emerald-600 font-bold uppercase text-sm mb-2 block">Kabar Kampus</span>
                    <h2 className="text-3xl font-bold text-slate-900">Berita & Rubrik Opini</h2>
                </div>
                <Link href="/berita" className="hidden md:flex items-center gap-2 font-bold text-slate-600 hover:text-emerald-600 transition">
                    Lihat Semua Berita <ArrowRight size={18}/>
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {newsItems.map((item, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="h-56 overflow-hidden relative">
                            {/* Kategori Label */}
                            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10 shadow-sm ${item.category === 'Rubrik Opini' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                {item.category}
                            </span>
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-4 font-medium uppercase tracking-wide">
                                <Calendar size={12} /> {item.date}
                            </div>
                            <h3 className="font-bold text-slate-900 text-xl mb-4 leading-snug group-hover:text-emerald-700 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
                                {item.desc}
                            </p>
                            <span className="text-emerald-600 text-sm font-bold flex items-center gap-2">
                                Baca Selengkapnya <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* =========================================
          5. GALERI (5.1 Dokumentasi Kegiatan)
      ========================================= */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div>
                    <span className="text-emerald-400 font-bold uppercase text-sm mb-2 block">Dokumentasi</span>
                    <h2 className="text-3xl font-bold">Galeri Kegiatan PKUMI</h2>
                </div>
                <Link href="/galeri" className="px-6 py-2 border border-slate-600 rounded-full hover:bg-white hover:text-slate-900 transition text-sm">Lihat Semua Dokumentasi</Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((src, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className={`relative rounded-xl overflow-hidden group bg-slate-800 ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
                    >
                        <img src={src} alt="Kegiatan PKUMI" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"/>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                            <PlayCircle className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100 duration-300" size={48}/>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* =========================================
          TESTIMONI MAHASANTRI
      ========================================= */}
      <section className="py-24 bg-emerald-50/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <Quote size={48} className="text-emerald-200 mx-auto mb-8 fill-emerald-100" />
            
            <div className="relative h-64 md:h-48 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentTesti}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-full"
                    >
                        <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed mb-6">
                            "{testimonials[currentTesti].text}"
                        </p>
                        <div>
                            <h5 className="font-bold text-slate-900 text-lg">{testimonials[currentTesti].name}</h5>
                            <p className="text-emerald-600 text-sm font-bold uppercase tracking-wide">{testimonials[currentTesti].role}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button onClick={prevTesti} className="p-3 rounded-full bg-white shadow-sm hover:shadow-md text-slate-600 hover:text-emerald-600 transition"><ChevronLeft/></button>
                <button onClick={nextTesti} className="p-3 rounded-full bg-white shadow-sm hover:shadow-md text-slate-600 hover:text-emerald-600 transition"><ChevronRight/></button>
            </div>
        </div>
      </section>

      {/* =========================================
          8. FAQ 
      ========================================= */}
      <section className="py-20 bg-white border-t border-slate-100">
         <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-8">Pertanyaan Umum (FAQ)</h2>
            <div className="grid gap-4 text-left">
                {[
                    "Bagaimana syarat pendaftaran menjadi Mahasantri PKUMI?",
                    "Apakah beasiswa PKUMI mencakup biaya asrama di Istiqlal?",
                    "Kapan jadwal seleksi penerimaan kader baru dimulai?"
                ].map((q, i) => (
                    <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition cursor-pointer">
                        <span className="font-medium text-slate-700">{q}</span>
                        <HelpCircle size={20} className="text-slate-400"/>
                    </div>
                ))}
            </div>
            <Link href="/faq" className="inline-block mt-8 text-emerald-600 font-bold hover:underline">Lihat Semua FAQ</Link>
         </div>
      </section>

      {/* =========================================
          7. KONTAK (Section Khusus)
      ========================================= */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-2 block">Hubungi Kami</span>
                    <h2 className="text-4xl font-bold mb-6">Sekretariat PKUMI</h2>
                    <p className="text-slate-300 text-lg mb-8">
                        Silakan hubungi kami atau kunjungi langsung kantor sekretariat di lingkungan Masjid Istiqlal.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-slate-800 p-3 rounded-lg text-emerald-400"><MapPin size={24}/></div>
                            <div>
                                <h5 className="font-bold text-white">Alamat</h5>
                                <p className="text-slate-400 text-sm">Masjid Istiqlal, Jl. Taman Wijaya Kusuma, Ps. Baru, Jakarta Pusat 10710</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-slate-800 p-3 rounded-lg text-emerald-400"><Phone size={24}/></div>
                            <div>
                                <h5 className="font-bold text-white">Telepon / WhatsApp</h5>
                                <p className="text-slate-400 text-sm">+62 21 345 6789</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-slate-800 p-3 rounded-lg text-emerald-400"><Mail size={24}/></div>
                            <div>
                                <h5 className="font-bold text-white">Email</h5>
                                <p className="text-slate-400 text-sm">sekretariat@pkumi.ac.id</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Map Placeholder */}
                <div className="bg-slate-800 rounded-3xl h-80 w-full overflow-hidden flex items-center justify-center border border-slate-700">
                    <div className="text-center opacity-50">
                        <MapPin size={48} className="mx-auto mb-2"/>
                        <p>Peta Lokasi Masjid Istiqlal</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* =========================================
          FOOTER (Sesuai Sitemap)
      ========================================= */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="space-y-6">
                <h4 className="text-3xl font-bold text-white tracking-tight">PKU-MI</h4>
                <p className="text-sm leading-relaxed">
                    Pendidikan Kader Ulama Masjid Istiqlal.<br/>
                    Membangun Peradaban Islam dari Jakarta untuk Dunia.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"><Facebook size={18}/></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"><Instagram size={18}/></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"><Twitter size={18}/></a>
                </div>
            </div>

            {/* 2. Profil & 3. Berita */}
            <div>
                <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Profil & Berita</h5>
                <ul className="space-y-3 text-sm">
                    <li><Link href="/profil/tentang" className="hover:text-emerald-400 transition">Tentang PKUMI (Visi & Misi)</Link></li>
                    <li><Link href="/profil/struktur" className="hover:text-emerald-400 transition">Struktur Management</Link></li>
                    <li><Link href="/profil/dosen" className="hover:text-emerald-400 transition">Daftar Dosen Pengajar</Link></li>
                    <li><Link href="/berita" className="hover:text-emerald-400 transition">Berita PKUMI</Link></li>
                    <li><Link href="/berita/opini" className="hover:text-emerald-400 transition">Rubrik Opini</Link></li>
                </ul>
            </div>

            {/* 4. Akademik */}
            <div>
                <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Akademik</h5>
                <ul className="space-y-3 text-sm">
                    <li><Link href="/akademik/agenda" className="hover:text-emerald-400 transition">Agenda</Link></li>
                    <li><Link href="/akademik/penelitian" className="hover:text-emerald-400 transition">Penelitian (Tesis/Disertasi)</Link></li>
                    <li><Link href="/akademik/matkul" className="hover:text-emerald-400 transition">Mata Kuliah</Link></li>
                    <li><Link href="/akademik/kalender" className="hover:text-emerald-400 transition">Kalender Akademik</Link></li>
                    <li><Link href="/akademik/jurnal" className="hover:text-emerald-400 transition">Jurnal</Link></li>
                    <li><Link href="/akademik/khazanah" className="hover:text-emerald-400 transition">Khazanah PKUMI</Link></li>
                    <li><Link href="/akademik/kurikulum" className="hover:text-emerald-400 transition">Kurikulum</Link></li>
                </ul>
            </div>

            {/* 5, 6, 7, 8 Lainnya */}
            <div>
                <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Menu Lainnya</h5>
                <ul className="space-y-3 text-sm">
                    <li><Link href="/pendaftaran" className="hover:text-emerald-400 transition text-emerald-400 font-bold">Pendaftaran Online</Link></li>
                    <li><Link href="/galeri" className="hover:text-emerald-400 transition">Galeri Kegiatan</Link></li>
                    <li><Link href="/faq" className="hover:text-emerald-400 transition">FAQ</Link></li>
                    <li><Link href="/kontak" className="hover:text-emerald-400 transition">Kontak Kami</Link></li>
                </ul>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
            <p>&copy; 2026 Pendidikan Kader Ulama Masjid Istiqlal. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </main>
  );
}