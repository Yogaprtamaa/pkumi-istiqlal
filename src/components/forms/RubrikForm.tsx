/**
 * Rubrik Form Component
 * Form untuk create/edit Rubrik dengan rich text editor
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, X, Loader2, Newspaper } from 'lucide-react';
import { TrixEditor } from '@/components/ui/trix-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { rubrikService } from '@/lib/api/services/rubrik.service';
import { categoriesService } from '@/lib/api/services/categories.service';
import type { Category, RubrikDetail } from '@/lib/api/types';

interface RubrikFormProps {
  initialData?: RubrikDetail;
  mode?: 'create' | 'edit';
}

export function RubrikForm({ initialData, mode = 'create' }: RubrikFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData?.thumbnail || null);

  // Form state
  const [formData, setFormData] = useState({
    category_id: initialData?.category_id?.toString() || '',
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    tags: initialData?.tags || '',
    content: initialData?.content || '',
    status: initialData?.status || 'draft',
    published_at: initialData?.published_at ? new Date(initialData.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoriesService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Anda harus login sebagai mahasiswa untuk membuat rubrik');
      return;
    }

    if (!formData.category_id || !formData.title || !formData.content) {
      alert('Mohon lengkapi kategori, judul, dan konten');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('category_id', formData.category_id);
      data.append('title', formData.title);
      data.append('excerpt', formData.excerpt);
      data.append('tags', formData.tags);
      data.append('content', formData.content);
      data.append('status', 'draft'); // Always submit as draft
      data.append('published_at', formData.published_at);

      // For rubrik, backend uses polymorphic relationship
      data.append('author_id', user.id.toString());
      data.append('author_type', 'App\\Models\\Student');

      if (thumbnailFile) {
        data.append('thumbnail', thumbnailFile);
      }

      if (mode === 'edit' && initialData) {
        await rubrikService.updateRubrik(initialData.id, data);
        alert('Rubrik berhasil diupdate! Menunggu persetujuan admin.');
      } else {
        await rubrikService.createRubrik(data);
        alert('Rubrik berhasil dikirim! Menunggu persetujuan admin untuk dipublikasikan.');
      }

      router.push('/');
      router.refresh();
    } catch (error: any) {
      console.error('Error submitting rubrik:', error);
      alert(error.message || 'Gagal menyimpan rubrik. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-islamGreen" />
            {mode === 'edit' ? 'Edit Rubrik' : 'Buat Rubrik Baru'}
          </CardTitle>
          <CardDescription>
            {mode === 'edit' ? 'Perbarui rubrik Anda' : 'Tulis artikel menarik untuk rubrik PKUMI'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategori *</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              disabled={isLoadingCategories}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Judul *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Masukkan judul rubrik"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Ringkasan</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Ringkasan singkat rubrik (opsional)"
              rows={3}
            />
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <Label>Konten *</Label>
            <TrixEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Tulis konten rubrik Anda di sini..."
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailPreview ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                <Image
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, atau JPEG (MAX. 2MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleThumbnailChange}
                />
              </label>
            )}
          </div>

          {/* Published At */}
          <div className="space-y-2">
            <Label htmlFor="published_at">Tanggal Publikasi</Label>
            <Input
              id="published_at"
              type="date"
              value={formData.published_at}
              onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
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
          disabled={isSubmitting}
          className="bg-islamGreen hover:bg-islamGreen-dark"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            'Kirim Rubrik'
          )}
        </Button>
      </div>
    </form>
  );
}
