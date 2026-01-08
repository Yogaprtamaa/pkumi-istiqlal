/**
 * Footer Compro
 * Footer khusus untuk website institusi (Compro PKUMI)
 */

'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function FooterCompro() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo_pku-mi.png"
                alt="PKU-MI Logo"
                className="h-12 w-12 object-contain"
              />
              <div>
                <div className="text-white font-bold text-lg">PKUMI</div>
                <div className="text-xs text-slate-400">Masjid Istiqlal</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Pendidikan Kader Ulama Masjid Istiqlal - Melahirkan ulama berwawasan global, moderat, dan berpegang teguh pada Turats Islam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Menu Utama</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/home" className="hover:text-emerald-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-emerald-400 transition-colors">
                  Profil PKUMI
                </Link>
              </li>
              <li>
                <Link href="/akademik" className="hover:text-emerald-400 transition-colors">
                  Akademik
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-emerald-400 transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/pendaftaran" className="hover:text-emerald-400 transition-colors">
                  Pendaftaran
                </Link>
              </li>
            </ul>
          </div>

          {/* Akademik Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Akademik</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/akademik/agenda" className="hover:text-emerald-400 transition-colors">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="/akademik/kurikulum" className="hover:text-emerald-400 transition-colors">
                  Kurikulum
                </Link>
              </li>
              <li>
                <Link href="/akademik/jurnal" className="hover:text-emerald-400 transition-colors">
                  Jurnal
                </Link>
              </li>
              <li>
                <Link href="/akademik/kalender" className="hover:text-emerald-400 transition-colors">
                  Kalender
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Masjid Istiqlal, Jl. Taman Wijaya Kusuma, Jakarta Pusat</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+62 21 3811708</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@pkumi.ac.id</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm">Media Sosial</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com/pkumi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/pkumi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/pkumi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/pkumi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Pendidikan Kader Ulama Masjid Istiqlal (PKUMI). All rights reserved.
          </p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Portal Berita
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/kontak" className="hover:text-emerald-400 transition-colors">
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
