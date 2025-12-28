/**
 * Profile Page - Halaman Profil Penulis/Mahasiswa
 * Menggunakan Client Component untuk fetch data real dari API
 */

import { ProfilePageClient } from "@/components/public/ProfilePageClient";

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return {
    title: `Profil ${slug} - Penulis | Nur Berita`,
    description: `Lihat profil dan artikel dari ${slug}`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProfilePageClient slug={slug} />;
}
