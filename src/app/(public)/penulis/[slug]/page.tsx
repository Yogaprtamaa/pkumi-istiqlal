/**
 * Profile Page - Halaman Profil Penulis/Mahasiswa
 * Server Component untuk SSG dan metadata
 */

import { notFound } from "next/navigation";
import { ProfileContent, type Author } from "@/components/public/ProfileContent";
import { articles } from "@/lib/mockData";

// Mock data penulis (seharusnya dari database/API)
const authors: Author[] = [
  {
    id: "0",
    name: "Admin",
    slug: "admin",
    email: "admin@dummy.com",
    avatar: "",
    bio: "Administrator portal berita Nur Berita. Mengelola konten dan memastikan kualitas artikel yang dipublikasikan.",
    university: "Nur Berita Media",
    major: "Content Management",
    location: "Indonesia",
    joinDate: "2024-01-01",
    socialMedia: {
      instagram: "nurberita",
    },
    stats: {
      articles: 0,
      views: 0,
      likes: 0,
    },
  },
  {
    id: "1",
    name: "Ahmad Fauzi",
    slug: "ahmad-fauzi",
    email: "ahmad.fauzi@example.com",
    avatar: "/images/authors/ahmad-fauzi.jpg",
    bio: "Mahasiswa Jurusan Syariah yang tertarik dengan kajian fiqih kontemporer dan perbandingan mazhab. Aktif menulis artikel tentang hukum Islam dalam kehidupan modern.",
    university: "UIN Syarif Hidayatullah Jakarta",
    major: "Hukum Keluarga Islam",
    location: "Jakarta, Indonesia",
    joinDate: "2024-01-15",
    socialMedia: {
      twitter: "ahmadfauzi",
      instagram: "ahmad.fauzi",
      linkedin: "ahmadfauzi",
    },
    stats: {
      articles: 12,
      views: 45230,
      likes: 892,
    },
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    slug: "siti-nurhaliza",
    email: "siti.nurhaliza@example.com",
    bio: "Pencinta kajian tafsir dan ilmu Al-Quran. Berfokus pada studi perempuan dalam perspektif Islam dan sejarah peradaban Islam.",
    university: "UIN Sunan Kalijaga Yogyakarta",
    major: "Ilmu Al-Quran dan Tafsir",
    location: "Yogyakarta, Indonesia",
    joinDate: "2023-09-20",
    socialMedia: {
      instagram: "siti.nurhaliza",
      linkedin: "sitinurhaliza",
    },
    stats: {
      articles: 18,
      views: 67890,
      likes: 1245,
    },
  },
];

// Fungsi untuk mendapatkan penulis berdasarkan slug
function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

// Fungsi untuk mendapatkan artikel berdasarkan penulis
function getArticlesByAuthor(authorName: string) {
  return articles.filter((article) => article.author === authorName);
}

// Generate static params
export async function generateStaticParams() {
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Profil Tidak Ditemukan | Nur Berita",
    };
  }

  return {
    title: `${author.name} - Penulis | Nur Berita`,
    description: author.bio,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const authorArticles = getArticlesByAuthor(author.name);

  return <ProfileContent author={author} authorArticles={authorArticles} />;
}
