/**
 * ProfilePageClient Component
 * Client wrapper untuk fetch profile data dari API
 * Note: API /api/student/profile menggunakan Bearer token, bukan slug
 */

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileContent, type Author } from "./ProfileContent";
import { Loader2 } from "lucide-react";

interface ProfilePageClientProps {
  slug: string;
}

export function ProfilePageClient({ slug }: ProfilePageClientProps) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [author, setAuthor] = useState<Author | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = () => {
      // Cek apakah user login dan slug cocok dengan NIM user
      const isOwnProfile = isAuthenticated && user && user.nim === slug;

      if (isOwnProfile) {
        // User melihat profile sendiri - gunakan data dari AuthContext
        // Data ini sudah di-fetch dari API saat login/mount
        const totalPublished = (user.khazanah_published_count || 0) + (user.rubrik_published_count || 0);

        const authorData: Author = {
          id: user.id.toString(),
          name: user.name,
          slug: user.nim,
          email: user.email,
          avatar: user.image || undefined,
          bio: user.description || `Mahasiswa ${user.program || 'PKUMI'}`,
          university: "PKUMI (Pendidikan Kader Ulama Masjid Istiqlal)",
          major: user.program || "Pendidikan Kader Ulama",
          location: user.full_address || (user.city && user.province ? `${user.city}, ${user.province}` : undefined),
          joinDate: user.admission_year ? `${user.admission_year}-01-01` : "2024-01-01",
          socialMedia: {
            // TODO: Tambahkan field social media di API jika ada
          },
          stats: {
            articles: totalPublished,
            views: 0,
            likes: 0,
          },
          // Student additional info
          nim: user.nim,
          phone: user.phone,
          gender: user.gender,
          place_of_birth: user.place_of_birth,
          date_of_birth: user.date_of_birth,
          marital_status: user.marital_status,
          gpa: user.gpa,
          graduation_year: user.graduation_year,
          // Article counts
          khazanah_draft_count: user.khazanah_draft_count,
          khazanah_published_count: user.khazanah_published_count,
          khazanah_archived_count: user.khazanah_archived_count,
          rubrik_draft_count: user.rubrik_draft_count,
          rubrik_published_count: user.rubrik_published_count,
          rubrik_archived_count: user.rubrik_archived_count,
        };

        setAuthor(authorData);
        setError(null);
      } else if (!isAuthenticated) {
        // User tidak login, tidak bisa akses profile page
        setError("Anda harus login untuk melihat halaman profil");
        setAuthor(null);
      } else {
        // User login tapi mencoba akses profile orang lain
        // API /api/student/profile hanya return profile user yang login
        // Tidak bisa fetch profile orang lain
        setError("Anda hanya bisa melihat profil Anda sendiri");
        setAuthor(null);
      }

      setIsLoading(false);
    };

    if (!authLoading) {
      loadProfileData();
    }
  }, [slug, user, isAuthenticated, authLoading]);

  if (isLoading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-islamGreen" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{error}</h1>
          <p className="text-gray-600 mb-6">
            {!isAuthenticated
              ? "Silakan login terlebih dahulu untuk melihat halaman profil."
              : "API hanya mengizinkan Anda melihat profil Anda sendiri."}
          </p>
          <a
            href={!isAuthenticated ? "/login" : "/"}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-islamGreen text-white font-semibold hover:bg-islamGreen-dark transition-colors"
          >
            {!isAuthenticated ? "Login Sekarang" : "Kembali ke Beranda"}
          </a>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Profil Tidak Ditemukan
          </h1>
          <p className="mt-2 text-gray-600">
            Profil dengan slug &quot;{slug}&quot; tidak ditemukan.
          </p>
        </div>
      </div>
    );
  }

  return <ProfileContent author={author} />;
}
