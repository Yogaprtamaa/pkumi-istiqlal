"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PenelitianPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Penelitian PKUMI</h1>
            <p className="text-xl text-slate-600 mb-8">Repositori judul tesis dan disertasi mahasantri</p>
            <Link href="/akademik" className="text-emerald-600 hover:underline">
              ← Kembali ke Akademik
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-purple-50 border-2 border-purple-300 p-8 rounded-xl">
            <p className="text-purple-900 text-lg">
              🚀 <strong>Halaman ini sedang dikembangkan.</strong> Daftar lengkap penelitian akan ditampilkan di sini.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
