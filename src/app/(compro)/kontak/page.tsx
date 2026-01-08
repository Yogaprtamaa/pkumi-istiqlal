"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Smartphone, Globe } from "lucide-react";

/**
 * Halaman Kontak (7. KONTAK)
 * Tujuan: Memudahkan komunikasi dan lokasi
 */

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    details: ["Masjid Istiqlal", "Jl. Taman Wijaya Kusuma 1", "Jakarta Pusat 12190, Indonesia"],
    highlight: "Markas pusat PKUMI",
  },
  {
    icon: Phone,
    title: "Telepon",
    details: ["+62 21 3818-1100", "+62 21 3818-9999"],
    highlight: "Hubungi bagian pendaftaran",
  },
  {
    icon: Smartphone,
    title: "WhatsApp",
    details: ["+62 812-3456-7890", "Respon cepat, jam kerja"],
    highlight: "Chat untuk pertanyaan cepat",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@pkumionline.cloud", "pendaftaran@pkumionline.cloud"],
    highlight: "Pengajuan formulir & dokumen",
  },
];

const workingHours = [
  { day: "Senin - Jumat", hours: "08:00 - 17:00 WIB" },
  { day: "Sabtu", hours: "08:00 - 14:00 WIB" },
  { day: "Minggu & Libur Nasional", hours: "Tutup" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi pengiriman - dalam implementasi nyata, kirim ke backend
    console.log("Form data:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Hubungi Kami</h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Tim PKUMI siap membantu menjawab semua pertanyaan dan kebutuhan Anda
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT INFO CARDS ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all"
                >
                  <div className="bg-emerald-100 p-3 rounded-lg w-fit mb-4">
                    <IconComponent className="text-emerald-600" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <div className="space-y-2 mb-4">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-slate-600 text-sm font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                    {item.highlight}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT: MAP & FORM ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* LEFT: MAP */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} className="order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden shadow-lg h-full min-h-[500px]">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4690693908156!2d106.8271529!3d-6.1656333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3d5c3b5c5cd%3A0x5c5c5c5c5c5c5c5c!2sMasjid%20Istiqlal%20Jakarta!5e0!3m2!1sid!2sid!4v1234567890"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Masjid Istiqlal - PKUMI"
                ></iframe>
              </div>
            </motion.div>

            {/* RIGHT: FORM & HOURS */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="order-1 lg:order-2 space-y-8"
            >
              {/* Contact Form */}
              <div className="bg-white border-2 border-emerald-200 rounded-xl p-8 hover:border-emerald-400 transition-all">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan Kepada Kami</h2>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-emerald-50 border-2 border-emerald-300 text-emerald-700 px-6 py-4 rounded-lg flex items-center gap-3"
                  >
                    <span className="text-2xl">✓</span>
                    <div>
                      <p className="font-semibold">Pesan terkirim berhasil!</p>
                      <p className="text-sm">Tim kami akan merespon dalam 24 jam.</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Subjek</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder="Subjek pesan Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Pesan</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-400 focus:outline-none transition-colors resize-none"
                      placeholder="Tuliskan pesan Anda di sini..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send size={20} /> Kirim Pesan
                  </motion.button>
                </form>
              </div>

              {/* Working Hours */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-amber-600" size={28} />
                  <h3 className="text-2xl font-bold text-slate-900">Jam Operasional</h3>
                </div>

                <div className="space-y-4">
                  {workingHours.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-amber-200 last:border-b-0">
                      <span className="font-semibold text-slate-900">{item.day}</span>
                      <span className="text-slate-600">{item.hours}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-slate-600 mt-6 bg-white bg-opacity-70 p-4 rounded-lg">
                  Untuk pertanyaan mendesak, hubungi kami melalui WhatsApp yang tersedia 24/7 dengan respons otomatis.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== DEPARTMENTS ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16"
          >
            Hubungi Departemen Spesifik
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                dept: "Pendaftaran & Admisi",
                email: "pendaftaran@pkumionline.cloud",
                phone: "+62 21-XXXX-1111",
                desc: "Pertanyaan tentang penerimaan mahasiswa baru, persyaratan, dan beasiswa.",
              },
              {
                dept: "Akademik & Kurikulum",
                email: "akademik@pkumionline.cloud",
                phone: "+62 21-XXXX-2222",
                desc: "Kurikulum, jadwal kuliah, silabus, dan hal akademik lainnya.",
              },
              {
                dept: "Penelitian & Riset",
                email: "riset@pkumionline.cloud",
                phone: "+62 21-XXXX-3333",
                desc: "Tesis, disertasi, jurnal publikasi, dan kegiatan riset.",
              },
              {
                dept: "Mahasiswa & Alumni",
                email: "mahasiswa@pkumionline.cloud",
                phone: "+62 21-XXXX-4444",
                desc: "Beasiswa, asrama, career development, dan alumni networking.",
              },
              {
                dept: "Hubungan Masyarakat",
                email: "humas@pkumionline.cloud",
                phone: "+62 21-XXXX-5555",
                desc: "Kerjasama, program keterlibatan komunitas, dan acara publik.",
              },
              {
                dept: "IT & Teknologi",
                email: "it@pkumionline.cloud",
                phone: "+62 21-XXXX-6666",
                desc: "Portal online, website, dan dukungan teknis digital.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-emerald-400 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">{item.dept}</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-emerald-600 flex-shrink-0" size={20} />
                    <a href={`mailto:${item.email}`} className="text-emerald-600 hover:underline text-sm break-all">
                      {item.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-emerald-600 flex-shrink-0" size={20} />
                    <a href={`tel:${item.phone}`} className="text-slate-600 text-sm">
                      {item.phone}
                    </a>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL MEDIA ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
          >
            Ikuti Kami di Media Sosial
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: "f", name: "Facebook", link: "https://facebook.com/pkumionline" },
              { icon: "🐦", name: "Twitter/X", link: "https://twitter.com/pkumionline" },
              { icon: "📷", name: "Instagram", link: "https://instagram.com/pkumionline" },
              { icon: "▶", name: "YouTube", link: "https://youtube.com/pkumionline" },
              { icon: "in", name: "LinkedIn", link: "https://linkedin.com/company/pkumionline" },
              { icon: "🔗", name: "TikTok", link: "https://tiktok.com/@pkumionline" },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              >
                {social.icon} {social.name}
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
