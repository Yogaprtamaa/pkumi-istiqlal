"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, GraduationCap } from "lucide-react";

const matkulData = [
  {
    semester: "Semester 1",
    courses: [
      { code: "TFS101", name: "Tafsir Ayat Ahkam", sks: 3, dosen: "Prof. Dr. Abdullah Al-Hakim" },
      { code: "HDT101", name: "Hadits Hukum", sks: 3, dosen: "Dr. Ahmad Zainuddin" },
      { code: "USF101", name: "Ushul Fiqh Klasik", sks: 4, dosen: "Dr. Muhammad Hassan" },
      { code: "AQD101", name: "Aqidah Islam", sks: 2, dosen: "Prof. Dr. Yusuf Mahmud" },
      { code: "BHS101", name: "Bahasa Arab Akademik", sks: 3, dosen: "Dr. Fatimah Azzahra" }
    ]
  },
  {
    semester: "Semester 2",
    courses: [
      { code: "TFS201", name: "Metode Tafsir Kontemporer", sks: 3, dosen: "Prof. Dr. Siti Aminah" },
      { code: "HDT201", name: "Kritik Matan Hadits", sks: 3, dosen: "Dr. Husain Abdullah" },
      { code: "FQH201", name: "Fiqh Muamalah", sks: 4, dosen: "Dr. Abdul Malik Karim" },
      { code: "SJR201", name: "Sejarah Peradaban Islam", sks: 2, dosen: "Dr. Zainab Hasan" },
      { code: "MTD201", name: "Metodologi Penelitian", sks: 3, dosen: "Dr. Umar Faruq Ibrahim" }
    ]
  },
  {
    semester: "Semester 3",
    courses: [
      { code: "TFS301", name: "Tafsir Sosial (Tafsir Al-Manar)", sks: 3, dosen: "Prof. Dr. Abdullah Al-Hakim" },
      { code: "FQH301", name: "Fiqh Siyasah", sks: 3, dosen: "Dr. Muhammad Hassan" },
      { code: "USF301", name: "Maqashid Syariah", sks: 4, dosen: "Prof. Dr. Yusuf Mahmud" },
      { code: "DKW301", name: "Dakwah dan Media Digital", sks: 2, dosen: "Dr. Fatimah Azzahra" },
      { code: "SEM301", name: "Seminar Proposal Tesis", sks: 2, dosen: "Tim Pembimbing" }
    ]
  },
  {
    semester: "Semester 4",
    courses: [
      { code: "THM401", name: "Penulisan Tesis", sks: 6, dosen: "Pembimbing Masing-masing" },
      { code: "KOL401", name: "Kolokium Hasil Riset", sks: 2, dosen: "Tim Penguji" }
    ]
  }
];

export default function MatkulsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="text-emerald-200 hover:text-white mb-4 inline-block">
              ← Kembali ke Akademik
            </Link>
            <h1 className="text-4xl font-bold mb-4">Mata Kuliah PKUMI</h1>
            <p className="text-emerald-100 text-lg">
              Daftar mata kuliah program S2 Islamic Studies
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {matkulData.map((semester, semIndex) => (
            <motion.div
              key={semIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: semIndex * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-emerald-600" size={24} />
                  <h2 className="text-xl font-bold text-slate-900">{semester.semester}</h2>
                  <span className="ml-auto text-sm text-slate-600">
                    {semester.courses.reduce((sum, c) => sum + c.sks, 0)} SKS Total
                  </span>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {semester.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="text-emerald-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                                {course.code}
                              </span>
                              <h3 className="font-bold text-slate-900">{course.name}</h3>
                            </div>
                            <p className="text-sm text-slate-600 flex items-center gap-2">
                              <span className="flex items-center gap-1">
                                <Clock size={14} className="text-slate-400" />
                                {course.sks} SKS
                              </span>
                              <span className="text-slate-400">•</span>
                              <span>{course.dosen}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
