/**
 * Type definitions untuk Portal Berita Islami
 * Semua interface dan type yang digunakan di seluruh aplikasi
 */

// Interface untuk artikel berita
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML string
  rubrik: Rubrik;
  author: string;
  date: string;
  imageUrl: string;
  views: number;
  readTime: number; // dalam menit
}

// Interface untuk rubrik/kategori
export interface Rubrik {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string; // warna accent untuk rubrik
}

// Interface untuk konten Khazanah (tafsir, hadits, dll)
export interface Khazanah {
  id: string;
  title: string;
  slug: string;
  type: 'tafsir' | 'hadits' | 'doa' | 'kisah';
  excerpt: string;
  content: string;
  source: string;
  imageUrl: string;
}

// Interface untuk menu item navigasi
export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
  submenu?: MenuItem[];
}

// Interface untuk footer quote (ayat/hadits)
export interface FooterQuote {
  text: string;
  source: string;
}
