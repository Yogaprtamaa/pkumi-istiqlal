/**
 * Submit Rubrik Page
 * Page untuk membuat rubrik baru
 */

import { Metadata } from 'next';
import { RubrikForm } from '@/components/forms/RubrikForm';

export const metadata: Metadata = {
  title: 'Buat Rubrik Baru | PKUMI',
  description: 'Tulis artikel menarik untuk rubrik PKUMI',
};

export default function SubmitRubrikPage() {
  return (
    <div className="container max-w-4xl py-8">
      <RubrikForm mode="create" />
    </div>
  );
}
