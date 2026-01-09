"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Search, MessageCircle, Phone, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA FAQ LENGKAP ---
// Pastikan teks question di sini SAMA dengan yang di HomeFAQSection tadi
const faqData = [
  {
    category: "Pendaftaran",
    items: [
      {
        question: "Bagaimana syarat pendaftaran menjadi Mahasantri PKUMI?",
        answer: "Calon mahasantri harus memiliki ijazah S1 untuk program S2, atau S2 untuk program S3. Selain itu, diperlukan kemampuan bahasa Arab yang memadai, hafalan Al-Quran minimal 5 juz, dan lulus seleksi administrasi serta wawancara. Dokumen yang dibutuhkan meliputi fotokopi ijazah, transkrip nilai, surat rekomendasi dari ulama/pembimbing, dan essay motivasi."
      },
      {
        question: "Kapan jadwal seleksi penerimaan kader baru dimulai?",
        answer: "Seleksi penerimaan kader baru PKUMI dibuka 2 kali dalam setahun, yaitu pada gelombang I (Januari-Maret) dan gelombang II (Juli-September). Pendaftaran dilakukan secara online melalui website resmi PKUMI."
      },
      {
        question: "Apakah ada batasan usia untuk mendaftar?",
        answer: "Untuk program S2, usia maksimal adalah 35 tahun, sedangkan untuk program S3 adalah 40 tahun pada saat pendaftaran."
      },
      {
        question: "Berapa biaya pendaftaran PKUMI?",
        answer: "Biaya pendaftaran untuk program S2 adalah Rp 500.000,- dan untuk program S3 adalah Rp 750.000,-."
      }
    ]
  },
  {
    category: "Beasiswa & Biaya",
    items: [
      {
        question: "Apakah beasiswa PKUMI mencakup biaya asrama di Istiqlal?",
        answer: "Ya, beasiswa penuh PKUMI mencakup biaya pendidikan, asrama di lingkungan Masjid Istiqlal, konsumsi harian, dan tunjangan buku. Mahasantri penerima beasiswa juga mendapat akses penuh ke perpustakaan digital PKUMI."
      },
      {
        question: "Apakah ada program beasiswa parsial?",
        answer: "Ya, tersedia beasiswa parsial untuk mahasantri yang tidak memenuhi kriteria beasiswa penuh namun memiliki potensi akademik yang baik."
      },
      {
        question: "Berapa biaya kuliah per semester di PKUMI?",
        answer: "Biaya kuliah untuk program S2 adalah Rp 12.000.000,- per semester, sedangkan untuk program S3 adalah Rp 15.000.000,- per semester."
      }
    ]
  },
  {
    category: "Program Studi",
    items: [
        {
            question: "Apa saja program studi yang tersedia di PKUMI?",
            answer: "PKUMI menawarkan program S2 dan S3 dalam bidang Islamic Studies dengan konsentrasi Tafsir, Hadits, Fiqh, Aqidah, Sejarah, dan Dakwah."
        }
    ]
  }
];

// --- KOMPONEN LOGIC UTAMA ---
function FAQContent() {
  const searchParams = useSearchParams();
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. EFEK SAAT HALAMAN DIMUAT (Tangkap Link dari Home)
  useEffect(() => {
    // Ambil teks dari URL (?q=...)
    const queryFromUrl = searchParams.get('q');
    
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl); // Isi kotak pencarian otomatis
      
      // Cari dan BUKA otomatis pertanyaan yang cocok
      // Kita loop data untuk mencari index mana yang cocok dengan query
      faqData.forEach((category, catIdx) => {
        category.items.forEach((item, itemIdx) => {
          if (item.question === queryFromUrl) {
            setOpenIndex(`${catIdx}-${itemIdx}`); // Buka accordionnya
          }
        });
      });
    }
  }, [searchParams]);

  const toggleFAQ = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  // 2. FILTER DATA (Agar yang tampil hanya yang dicari)
  const filteredFAQ = faqData.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pusat Bantuan</h1>
          <p className="text-emerald-100 text-lg mb-8">Cari jawaban seputar pendaftaran dan akademik</p>

          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Ketik pertanyaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-xl transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setOpenIndex(null); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* List FAQ */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-500">Pertanyaan tidak ditemukan.</p>
              <button onClick={() => setSearchQuery('')} className="text-emerald-600 font-bold mt-2 hover:underline">
                Tampilkan Semua
              </button>
            </div>
          ) : (
            filteredFAQ.map((category, catIndex) => (
              <div key={catIndex} className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3 px-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  {category.category}
                </h2>

                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => {
                    // Kunci unik untuk setiap item
                    // Logic ini penting agar accordion tahu mana yang harus dibuka
                    // Kita cari index asli item ini di array utama (bukan array filtered) untuk konsistensi key jika mau advanced,
                    // tapi pakai kombinasi catIndex-itemIndex dari filtered list juga sudah cukup visualnya.
                    // AGAR LEBIH AKURAT SAAT SEARCH: Kita generate key unik base on content string jika index berubah saat filter.
                    // Tapi agar simple, kita pakai catIndex dari map filtered saja.
                    
                    const key = `${category.category}-${item.question}`; // Gunakan string biar unik saat difilter
                    const isOpen = openIndex === `${catIndex}-${itemIndex}` || openIndex === key || (searchQuery && category.items.length === 1); 

                    return (
                      <div 
                        key={key} 
                        className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-emerald-500 shadow-md' : 'border-slate-200 hover:border-emerald-300'}`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : key)}
                          className="w-full px-6 py-4 text-left flex items-start justify-between gap-4"
                        >
                          <span className={`font-semibold leading-relaxed ${isOpen ? 'text-emerald-700' : 'text-slate-800'}`}>
                            {item.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            className={`flex-shrink-0 mt-1 ${isOpen ? 'text-emerald-600' : 'text-slate-400'}`}
                          >
                            <ChevronDown size={20} />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/50 mt-2">
                                <div className="pt-4">{item.answer}</div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      
      {/* Footer Contact (Sama seperti sebelumnya) */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
            <h3 className="font-bold text-slate-800 mb-2">Masih ada pertanyaan?</h3>
            <p className="text-slate-600 mb-6">Hubungi admin kami langsung via WhatsApp atau Email.</p>
            <div className="flex justify-center gap-4">
                 <a href="https://wa.me/62812345678" className="flex items-center gap-2 text-emerald-700 font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-emerald-200 hover:bg-emerald-100 transition"><MessageCircle size={18}/> Chat WA</a>
                 <a href="mailto:info@pkumi.ac.id" className="flex items-center gap-2 text-slate-700 font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition"><Mail size={18}/> Email</a>
            </div>
        </div>
      </section>
    </main>
  );
}

// WAJIB SUSPENSE
export default function FAQPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
      <FAQContent />
    </Suspense>
  );
}