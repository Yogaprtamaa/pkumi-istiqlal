/**
 * Constants untuk Portal Berita Islami
 * Berisi warna, menu items, dan konfigurasi global
 */

import { MenuItem, FooterQuote } from '@/types';

// Warna tema Islami
export const COLORS = {
  primary: '#2E7D32',      // Hijau tua utama
  secondary: '#4CAF50',    // Hijau sedang
  pastel: '#A5D6A7',       // Hijau pastel
  accent: '#1B5E20',       // Hijau sangat tua untuk hover
  background: '#FFFFFF',   // Putih
  surface: '#F5F5F5',      // Abu-abu sangat lembut
  surfaceAlt: '#FAFAFA',   // Abu-abu hampir putih
  text: '#212121',         // Hampir hitam untuk teks
  textSecondary: '#757575', // Abu-abu untuk teks sekunder
  border: '#E0E0E0',       // Border sangat halus
} as const;

// Menu navigasi utama
export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Beranda',
    href: '/',
  },
  {
    label: 'Rubrik',
    href: '/rubrik',
  },
  {
    label: 'Khazanah',
    href: '/khazanah',
  },
];

// Koleksi quote untuk footer (ayat & hadits pendek)
export const FOOTER_QUOTES: FooterQuote[] = [
  {
    text: 'Sesungguhnya bersama kesulitan ada kemudahan.',
    source: 'QS. Al-Insyirah: 6',
  },
  {
    text: 'Dan Tuhanmu berfirman: Berdoalah kepada-Ku, niscaya akan Kuperkenankan bagimu.',
    source: 'QS. Ghafir: 60',
  },
  {
    text: 'Barangsiapa bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya.',
    source: 'QS. At-Talaq: 2',
  },
  {
    text: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.',
    source: 'HR. Ahmad',
  },
  {
    text: 'Tersenyum di hadapan saudaramu adalah sedekah.',
    source: 'HR. Tirmidzi',
  },
];

// Site metadata
export const SITE_CONFIG = {
  name: 'Nur Berita',
  tagline: 'Portal Berita Islami Terpercaya',
  description: 'Sumber informasi Islami yang mencerahkan, menyajikan berita, kajian, dan khazanah Islam dengan pendekatan modern dan terpercaya.',
} as const;
