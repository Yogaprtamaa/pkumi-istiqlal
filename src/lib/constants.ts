/**
 * Constants untuk Portal Berita Islami
 * Berisi warna, menu items, dan konfigurasi global
 */

import { MenuItem, FooterQuote } from '@/types';

// Warna tema PKUMI
export const COLORS = {
  // Primary: Emerald Green
  primary: '#10B981',
  primaryDark: '#15803D',
  primaryLight: '#DCFCE7',
  
  // Secondary: Slate/Dark Grey
  secondary: '#475569',
  secondaryDark: '#1E293B',
  secondaryLight: '#F1F5F9',
  
  // Accent: Amber/Gold
  accent: '#F59E0B',
  accentDark: '#D97706',
  accentLight: '#FFFBEB',
  
  // Neutral
  background: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceAlt: '#FAFBFC',
  text: '#0F172A',
  textSecondary: '#475569',
  border: '#E2E8F0',
} as const;

// ============= MENU COMPRO (Website Institusi) =============
export const COMPRO_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Beranda',
    href: '/home',
  },
  {
    label: 'Profil',
    href: '/profil',
    submenu: [
      { label: 'Tentang PKUMI', href: '/profil' },
      { label: 'Struktur Organisasi', href: '/profil/struktur' },
      { label: 'Dosen Pengajar', href: '/profil/dosen' },
    ]
  },
  {
    label: 'Akademik',
    href: '/akademik',
    submenu: [
      { label: 'Agenda', href: '/akademik/agenda' },
      { label: 'Penelitian', href: '/akademik/penelitian' },
      { label: 'Mata Kuliah', href: '/akademik/matkul' },
      { label: 'Kalender Akademik', href: '/akademik/kalender' },
      { label: 'Jurnal', href: '/akademik/jurnal' },
      { label: 'Khazanah PKUMI', href: '/akademik/khazanah' },
      { label: 'Kurikulum', href: '/akademik/kurikulum' },
    ]
  },
  {
    label: 'Galeri',
    href: '/galeri',
  },
  {
    label: 'Pendaftaran',
    href: '/pendaftaran',
  },
  {
    label: 'Kontak',
    href: '/kontak',
  },
];

// ============= MENU PORTAL BERITA =============
export const PORTAL_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Beranda',
    href: '/',
  },
  {
    label: 'Khazanah',
    href: '/khazanah',
  },
  {
    label: 'Rubrik',
    href: '/rubrik',
  },
  // {
  //   label: 'Penulis',
  //   href: '/penulis',
  // },
];

// ============= MENU LEGACY (Backwards compatibility) =============
export const MENU_ITEMS: MenuItem[] = PORTAL_MENU_ITEMS;

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
  name: 'Portal Berita PKUMI',
  tagline: 'Platform Khazanah & Rubrik Kader Ulama',
  description: 'Platform menulis untuk para kader Pendidikan Kader Ulama Masjid Istiqlal. Berbagi ilmu, khazanah Islam, dan karya tulis yang bermanfaat untuk umat.',
} as const;
