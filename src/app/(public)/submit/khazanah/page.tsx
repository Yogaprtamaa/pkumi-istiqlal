/**
 * Submit Khazanah Page
 * Page untuk membuat khazanah baru
 */

import { Metadata } from 'next';
import { KhazanahForm } from '@/components/forms/KhazanahForm';

export const metadata: Metadata = {
  title: 'Buat Khazanah Baru | PKUMI',
  description: 'Buat dan bagikan khazanah ilmu Anda',
};

export default function SubmitKhazanahPage() {
  return (
    <div className="container max-w-4xl py-8">
      <KhazanahForm mode="create" />
    </div>
  );
}
