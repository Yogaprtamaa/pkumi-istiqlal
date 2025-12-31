/**
 * Register Page
 * Halaman pendaftaran akun baru
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { SITE_CONFIG } from '@/lib/constants';

export default function RegisterPage() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuth();
  
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // Password strength indicators
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('Mohon lengkapi semua field');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      setIsSubmitting(false);
      return;
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      setError('Password belum memenuhi kriteria');
      setIsSubmitting(false);
      return;
    }

    // Mock registration - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Auto login after registration
    const success = await login(email, password);
    
    if (success) {
      router.push('/');
    } else {
      setError('Terjadi kesalahan, silakan coba lagi');
    }
    
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-islamGreen" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-white via-islamGreen-pastel/10 to-white">
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-islamGreen"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        {/* Register Card */}
        <Card className="overflow-hidden border-0 shadow-xl">
          {/* Header */}
          <div className="bg-islamGreen px-6 py-8 text-center text-white">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <img
                src="/logo_pku-mi.png"
                alt="PKU-MI Logo"
                className="h-16 w-16 object-contain"
              />
            </div>
            <h1 className="font-heading text-2xl font-bold">
              Bergabung Bersama Kami
            </h1>
            <p className="mt-2 text-islamGreen-pastel">
              Daftar di {SITE_CONFIG.name}
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Buat password"
                    className="pl-10 pr-10"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  {[
                    { key: 'length', label: 'Minimal 8 karakter' },
                    { key: 'uppercase', label: 'Huruf besar' },
                    { key: 'lowercase', label: 'Huruf kecil' },
                    { key: 'number', label: 'Angka' },
                  ].map(({ key, label }) => (
                    <div 
                      key={key}
                      className={`flex items-center gap-2 text-xs ${
                        passwordChecks[key as keyof typeof passwordChecks] 
                          ? 'text-green-600' 
                          : 'text-gray-400'
                      }`}
                    >
                      <Check className="h-3 w-3" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password"
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">Password tidak cocok</p>
                )}
              </div>

              {/* Terms */}
              <div className="text-sm text-gray-600">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-islamGreen focus:ring-islamGreen"
                    required
                  />
                  <span>
                    Saya setuju dengan{' '}
                    <Link href="#" className="text-islamGreen hover:underline">
                      Syarat & Ketentuan
                    </Link>{' '}
                    dan{' '}
                    <Link href="#" className="text-islamGreen hover:underline">
                      Kebijakan Privasi
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-islamGreen hover:bg-islamGreen-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Daftar'
                )}
              </Button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-medium text-islamGreen hover:text-islamGreen-dark">
                Masuk disini
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
