/**
 * Submit Rubrik Page
 * Halaman untuk mengirimkan artikel rubrik baru
 * Memerlukan login untuk mengakses
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Send, 
  Loader2,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { rubriks } from '@/lib/mockData';

export default function SubmitRubrikPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  
  const [title, setTitle] = React.useState('');
  const [rubrikId, setRubrikId] = React.useState('');
  const [excerpt, setExcerpt] = React.useState('');
  const [content, setContent] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/submit/rubrik');
    }
  }, [isAuthenticated, isLoading, router]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Ukuran file maksimal 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setErrors(prev => ({ ...prev, image: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Judul wajib diisi';
    if (title.length > 200) newErrors.title = 'Judul maksimal 200 karakter';
    if (!rubrikId) newErrors.rubrik = 'Pilih rubrik';
    if (!excerpt.trim()) newErrors.excerpt = 'Ringkasan wajib diisi';
    if (excerpt.length > 300) newErrors.excerpt = 'Ringkasan maksimal 300 karakter';
    if (!content.trim()) newErrors.content = 'Konten wajib diisi';
    if (content.length < 100) newErrors.content = 'Konten minimal 100 karakter';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success
    setSubmitStatus('success');
    setIsSubmitting(false);
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setRubrikId('');
    setExcerpt('');
    setContent('');
    setImagePreview(null);
    setSubmitStatus('idle');
    setErrors({});
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-islamGreen" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Success State
  if (submitStatus === 'success') {
    return (
      <div className="min-h-[70vh] bg-gradient-to-br from-white via-islamGreen-pastel/10 to-white">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">
            Artikel Berhasil Dikirim! 🎉
          </h1>
          <p className="mt-4 text-gray-600">
            Terima kasih atas kontribusi Anda. Artikel akan ditinjau oleh tim editor 
            dan akan dipublikasikan setelah disetujui.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={resetForm} variant="outline">
              Kirim Artikel Lain
            </Button>
            <Link href="/">
              <Button className="bg-islamGreen hover:bg-islamGreen-dark">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-islamGreen-pastel/5 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-islamGreen"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          
          <div className="mt-4">
            <h1 className="font-heading text-3xl font-bold text-gray-900">
              ✍️ Kirim Artikel Rubrik
            </h1>
            <p className="mt-2 text-gray-600">
              Bagikan pengetahuan Islami Anda dengan pembaca {' '}
              <span className="font-medium text-islamGreen">Nur Berita</span>
            </p>
          </div>
        </div>

        {/* Author Info */}
        <Card className="mb-6 border-islamGreen-pastel bg-islamGreen-pastel/20 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-islamGreen text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Card className="p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4" />
                Judul Artikel <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul artikel yang menarik..."
                className={errors.title ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              <div className="mt-1 flex justify-between text-xs">
                {errors.title && <span className="text-red-500">{errors.title}</span>}
                <span className={`ml-auto ${title.length > 200 ? 'text-red-500' : 'text-gray-400'}`}>
                  {title.length}/200
                </span>
              </div>
            </div>

            {/* Rubrik Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Pilih Rubrik <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {rubriks.map((rubrik) => (
                  <button
                    key={rubrik.id}
                    type="button"
                    onClick={() => setRubrikId(rubrik.id)}
                    disabled={isSubmitting}
                    className={`relative rounded-lg border-2 p-3 text-center transition-all ${
                      rubrikId === rubrik.id
                        ? 'border-islamGreen bg-islamGreen-pastel/30'
                        : 'border-gray-200 hover:border-islamGreen-pastel'
                    }`}
                  >
                    <div 
                      className="mx-auto mb-2 h-3 w-3 rounded-full"
                      style={{ backgroundColor: rubrik.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {rubrik.name}
                    </span>
                    {rubrikId === rubrik.id && (
                      <CheckCircle className="absolute right-1 top-1 h-4 w-4 text-islamGreen" />
                    )}
                  </button>
                ))}
              </div>
              {errors.rubrik && (
                <p className="mt-1 text-xs text-red-500">{errors.rubrik}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-gray-700">
                Ringkasan <span className="text-red-500">*</span>
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Tulis ringkasan singkat artikel Anda..."
                rows={3}
                className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:border-islamGreen focus:outline-none focus:ring-1 focus:ring-islamGreen ${
                  errors.excerpt ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              <div className="mt-1 flex justify-between text-xs">
                {errors.excerpt && <span className="text-red-500">{errors.excerpt}</span>}
                <span className={`ml-auto ${excerpt.length > 300 ? 'text-red-500' : 'text-gray-400'}`}>
                  {excerpt.length}/300
                </span>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <ImageIcon className="h-4 w-4" />
                Gambar Cover (Opsional)
              </label>
              
              {imagePreview ? (
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-48 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-islamGreen hover:bg-islamGreen-pastel/10">
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Klik untuk upload gambar
                  </span>
                  <span className="mt-1 text-xs text-gray-400">
                    PNG, JPG, WEBP (Max. 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </label>
              )}
              {errors.image && (
                <p className="mt-1 text-xs text-red-500">{errors.image}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
                Konten Artikel <span className="text-red-500">*</span>
              </label>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">Markdown didukung</Badge>
                <Badge variant="secondary" className="text-xs">Min. 100 karakter</Badge>
              </div>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis konten artikel Anda di sini...

Anda bisa menggunakan format Markdown:
- **teks tebal**
- *teks miring*
- ## Heading
- [link](url)
- > Kutipan"
                rows={15}
                className={`w-full rounded-lg border px-3 py-2 font-mono text-sm transition-colors focus:border-islamGreen focus:outline-none focus:ring-1 focus:ring-islamGreen ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              <div className="mt-1 flex justify-between text-xs">
                {errors.content && <span className="text-red-500">{errors.content}</span>}
                <span className="ml-auto text-gray-400">
                  {content.length} karakter
                </span>
              </div>
            </div>

            {/* Guidelines */}
            <div className="rounded-lg bg-amber-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Panduan Penulisan:</p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-amber-700">
                    <li>Pastikan konten sesuai dengan nilai-nilai Islam</li>
                    <li>Cantumkan sumber yang valid (Quran, Hadits, dst)</li>
                    <li>Hindari plagiarisme dan konten kontroversial</li>
                    <li>Gunakan bahasa Indonesia yang baik dan benar</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-islamGreen hover:bg-islamGreen-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Kirim Artikel
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
