"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * Halaman Galeri (5. GALERI)
 * Masonry Grid dengan Lightbox pop-up
 */

const galleryImages = [
  {
    id: 1,
    title: "Kelas Intensif Tafsir",
    category: "Kegiatan Akademik",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?q=80&w=800&auto=format&fit=crop",
    description: "Sesi pembelajaran tafsir dengan pendekatan tradisional dan kontemporer",
  },
  {
    id: 2,
    title: "Upacara Wisuda PKUMI",
    category: "Wisuda",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    description: "Pelepasan sarjana dari program S2 dan S3 PKUMI",
  },
  {
    id: 3,
    title: "Rihlah ke Universitas Al-Azhar",
    category: "Rihlah",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=800&auto=format&fit=crop",
    description: "Kunjungan akademik ke Universitas Al-Azhar, Kairo",
  },
  {
    id: 4,
    title: "Seminar Internasional",
    category: "Seminar",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    description: "Seminar dengan pembicara dari berbagai universitas Islam terkemuka",
  },
  {
    id: 5,
    title: "Diskusi Kitab Kuning",
    category: "Kegiatan Akademik",
    image: "https://images.unsplash.com/photo-1580828795006-25916053331b?q=80&w=800&auto=format&fit=crop",
    description: "Kajian kitab kuning bersama ulama dan mahasantri",
  },
  {
    id: 6,
    title: "Pengabdian Masyarakat",
    category: "Pengabdian",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800&auto=format&fit=crop",
    description: "Program pengabdian kepada masyarakat lokal",
  },
  {
    id: 7,
    title: "Asrama PKUMI",
    category: "Fasilitas",
    image: "https://images.unsplash.com/photo-1634730487020-89adc07fb91f?q=80&w=800&auto=format&fit=crop",
    description: "Fasilitas asrama modern dan nyaman untuk mahasantri",
  },
  {
    id: 8,
    title: "Perpustakaan Digital",
    category: "Fasilitas",
    image: "https://images.unsplash.com/photo-150784272343-583f20270319?q=80&w=800&auto=format&fit=crop",
    description: "Perpustakaan modern dengan koleksi kitab dan jurnal lengkap",
  },
  {
    id: 9,
    title: "Ruang Belajar Bersama",
    category: "Fasilitas",
    image: "https://images.unsplash.com/photo-1599819489335-37cad1d63c84?q=80&w=800&auto=format&fit=crop",
    description: "Ruang diskusi dan belajar bersama yang kondusif",
  },
];

const categories = ["Semua", "Kegiatan Akademik", "Wisuda", "Rihlah", "Seminar", "Pengabdian", "Fasilitas"];

export default function GaleriPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages =
    selectedCategory === "Semua"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Galeri PKUMI</h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Dokumentasi visual aktivitas akademik, kegiatan, dan fasilitas PKUMI
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FILTER KATEGORI ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white sticky top-20 z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MASONRY GRID ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            <AnimatePresence mode="wait">
              {filteredImages.map((image, idx) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedImage(image)}
                  className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-xl border-2 border-slate-200 hover:border-emerald-400 transition-all"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-slate-100">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Overlay dengan Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-lg font-bold text-white mb-1">{image.title}</h3>
                      <p className="text-sm text-slate-200">{image.category}</p>
                      <div className="mt-4 inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Lihat Perbesar
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">Tidak ada gambar dalam kategori ini</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== LIGHTBOX MODAL ===== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-900 text-white rounded-full p-2 z-10"
              >
                <X size={24} />
              </button>

              {/* Image */}
              <div className="w-full max-h-[70vh] overflow-hidden bg-slate-900">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="p-8">
                <div className="inline-block bg-emerald-100 text-emerald-700 text-sm font-bold px-4 py-2 rounded-full mb-4">
                  {selectedImage.category}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{selectedImage.title}</h2>
                <p className="text-slate-600 text-lg mb-6">{selectedImage.description}</p>

                {/* Navigation */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const currentIdx = filteredImages.findIndex((img) => img.id === selectedImage.id);
                      if (currentIdx > 0) {
                        setSelectedImage(filteredImages[currentIdx - 1]);
                      }
                    }}
                    className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition-colors"
                  >
                    ← Sebelumnya
                  </button>
                  <button
                    onClick={() => {
                      const currentIdx = filteredImages.findIndex((img) => img.id === selectedImage.id);
                      if (currentIdx < filteredImages.length - 1) {
                        setSelectedImage(filteredImages[currentIdx + 1]);
                      }
                    }}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors ml-auto"
                  >
                    Selanjutnya →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== STATISTIK ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="text-4xl font-bold text-emerald-400 mb-2">{galleryImages.length}+</div>
            <div className="text-slate-300">Foto Dokumentasi</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="text-4xl font-bold text-amber-400 mb-2">{categories.length - 1}</div>
            <div className="text-slate-300">Kategori Kegiatan</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="text-4xl font-bold text-emerald-400 mb-2">2024-2025</div>
            <div className="text-slate-300">Tahun Akademik</div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
