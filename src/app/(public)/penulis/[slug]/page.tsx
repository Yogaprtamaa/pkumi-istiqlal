/**
 * Profile Page - Halaman Profil Penulis/Mahasiswa
 * Menampilkan informasi penulis dan artikel yang ditulis
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleCard } from "@/components/public/ArticleCard";
import { articles } from "@/lib/mockData";

// Type untuk data penulis
interface Author {
  id: string;
  name: string;
  slug: string;
  email: string;
  avatar?: string;
  bio: string;
  university?: string;
  major?: string;
  location?: string;
  joinDate: string;
  socialMedia?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  stats: {
    articles: number;
    views: number;
    likes: number;
  };
}

// Mock data penulis (seharusnya dari database/API)
const authors: Author[] = [
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="relative h-48 bg-gradient-to-br from-islamGreen via-islamGreen-dark to-gray-900">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="relative -mt-32 mb-12">
          <Card className="overflow-hidden border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="relative h-40 w-40 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                    {author.avatar ? (
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-islamGreen text-5xl font-bold text-white">
                        {author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-islamGreen p-2 shadow-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
                    {author.name}
                  </h1>

                  {/* University & Major */}
                  {author.university && (
                    <p className="text-lg font-medium text-islamGreen mb-1">
                      {author.university}
                    </p>
                  )}
                  {author.major && (
                    <p className="text-gray-600 mb-4">{author.major}</p>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 text-sm text-gray-500">
                    {author.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {author.location}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Bergabung{" "}
                      {new Date(author.joinDate).toLocaleDateString("id-ID", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">
                    {author.bio}
                  </p>

                  {/* Social Media & Contact */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full gap-2"
                      asChild
                    >
                      <a href={`mailto:${author.email}`}>
                        <Mail className="h-4 w-4" />
                        Kontak
                      </a>
                    </Button>

                    {author.socialMedia?.twitter && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        asChild
                      >
                        <a
                          href={`https://twitter.com/${author.socialMedia.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {author.socialMedia?.instagram && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        asChild
                      >
                        <a
                          href={`https://instagram.com/${author.socialMedia.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {author.socialMedia?.linkedin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        asChild
                      >
                        <a
                          href={`https://linkedin.com/in/${author.socialMedia.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 shrink-0 md:w-64">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-islamGreen">
                      {author.stats.articles}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Artikel</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-islamGreen">
                      {(author.stats.views / 1000).toFixed(1)}K
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Views</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-islamGreen">
                      {author.stats.likes}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Likes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles Section */}
        <div className="pb-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-islamGreen" />
                Artikel yang Ditulis
              </h2>
              <p className="text-gray-600 mt-1">
                {authorArticles.length} artikel telah dipublikasikan
              </p>
            </div>
          </div>

          {authorArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {authorArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">✍️</div>
              <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">
                Belum Ada Artikel
              </h3>
              <p className="text-gray-600 mb-6">
                {author.name} belum mempublikasikan artikel.
              </p>
              <Link href="/artikel">
                <Button variant="outline">Lihat Artikel Lainnya</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
