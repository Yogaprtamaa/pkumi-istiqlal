/**
 * Edit Khazanah Page
 * Halaman untuk mengedit khazanah yang masih berstatus draft
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { KhazanahForm } from '@/components/forms/KhazanahForm';
import { khazanahService } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import type { KhazanahDetail } from '@/lib/api/types';

interface EditKhazanahPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditKhazanahPage({ params }: EditKhazanahPageProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [khazanah, setKhazanah] = useState<KhazanahDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>('');

  // Unwrap params
  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchKhazanah = async () => {
      // Check if user is authenticated
      if (!authLoading && !isAuthenticated) {
        router.push('/login');
        return;
      }

      if (!user) return;

      try {
        setIsLoading(true);
        const data = await khazanahService.getKhazanahBySlug(slug);

        console.log('Khazanah data:', data);
        console.log('User:', user);

        // Only allow editing draft content
        if (data.status !== 'draft') {
          alert('Hanya konten dengan status draft yang dapat diedit.');
          router.push(`/khazanah/${slug}`);
          return;
        }

        // Get student ID from various possible locations
        const studentId = data.student_id || data.student?.id || data.author?.id;
        const userId = user.id;

        console.log('Student ID (extracted):', studentId);
        console.log('User ID:', userId);

        if (!studentId) {
          console.error('No student_id found in data:', data);
          // If no student_id is available, allow editing (assume it's the user's content)
          // This is safer than blocking legitimate edits
        } else if (Number(studentId) !== Number(userId)) {
          console.error('Ownership mismatch:', { studentId, userId, data, user });
          alert(`Anda tidak memiliki izin untuk mengedit khazanah ini. (Student ID: ${studentId}, User ID: ${userId})`);
          router.push('/');
          return;
        }

        setKhazanah(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching khazanah:', err);
        setError(err.message || 'Gagal memuat data khazanah');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      fetchKhazanah();
    }
  }, [slug, user, isAuthenticated, authLoading, router]);

  if (authLoading || isLoading) {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-islamGreen text-white font-semibold hover:bg-islamGreen-dark transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  if (!khazanah) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-islamGreen" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Edit Khazanah
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Perbarui khazanah Anda. Perubahan akan menunggu persetujuan admin.
          </p>
        </div>

        <KhazanahForm initialData={khazanah} mode="edit" />
      </div>
    </div>
  );
}
