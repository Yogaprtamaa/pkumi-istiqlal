"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, MapPin, User } from "lucide-react";

const agendaItems = [
  {
    date: "15 Januari 2026",
    time: "08:00 - 10:00 WIB",
    title: "Kuliah Tafsir Al-Quran - Semester Genap",
    lecturer: "Prof. Dr. Abdullah Al-Hakim",
    location: "Ruang Kuliah 1, Masjid Istiqlal",
    type: "Kuliah"
  },
  {
    date: "18 Januari 2026",
    time: "13:00 - 15:00 WIB",
    title: "Seminar Internasional: Wasathiyah dalam Konteks Global",
    lecturer: "Dr. Muhammad Hassan (Universitas Al-Azhar)",
    location: "Auditorium Utama",
    type: "Seminar"
  },
  {
    date: "22 Januari 2026",
    time: "09:00 - 12:00 WIB",
    title: "Ujian Tengah Semester - Ushul Fiqh",
    lecturer: "Dr. Ahmad Zainuddin",
    location: "Ruang Ujian A",
    type: "Ujian"
  },
  {
    date: "25 Januari 2026",
    time: "14:00 - 16:00 WIB",
    title: "Workshop Metodologi Penelitian",
    lecturer: "Dr. Siti Aminah, MA",
    location: "Lab Riset PKUMI",
    type: "Workshop"
  },
  {
    date: "30 Januari 2026",
    time: "08:00 - 17:00 WIB",
    title: "Sidang Munaqasyah Tesis Gelombang I",
    lecturer: "Tim Penguji",
    location: "Aula PKUMI",
    type: "Sidang"
  },
  {
    date: "5 Februari 2026",
    time: "10:00 - 12:00 WIB",
    title: "Kuliah Tamu: Fiqh Muamalah Kontemporer",
    lecturer: "Prof. Dr. Yusuf Al-Qaradawi (via Zoom)",
    location: "Ruang Multimedia",
    type: "Kuliah Tamu"
  }
];

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="text-emerald-200 hover:text-white mb-4 inline-block">
              ← Kembali ke Akademik
            </Link>
            <h1 className="text-4xl font-bold mb-4">Agenda Akademik PKUMI</h1>
            <p className="text-emerald-100 text-lg">
              Jadwal kuliah, seminar, ujian, dan kegiatan akademik lainnya
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6">
            {agendaItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.type === 'Kuliah' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'Seminar' ? 'bg-purple-100 text-purple-800' :
                        item.type === 'Ujian' ? 'bg-red-100 text-red-800' :
                        item.type === 'Workshop' ? 'bg-amber-100 text-amber-800' :
                        item.type === 'Sidang' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {item.type}
                      </span>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar size={14} />
                        <span>{item.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-emerald-600" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-emerald-600" />
                        <span>{item.lecturer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-emerald-600" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
