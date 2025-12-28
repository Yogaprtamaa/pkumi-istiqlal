"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, User as UserIcon, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { SITE_CONFIG } from "@/lib/constants";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isAuthenticated } = useAuth();

  const [nim, setNim] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const redirectTo = searchParams.get("redirect") || "/";

  React.useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!nim || !password) {
      setError("Mohon isi NIM dan password");
      setIsSubmitting(false);
      return;
    }

    const success = await login(nim, password);

    if (success) {
      router.push(redirectTo);
    } else {
      setError("NIM atau password tidak valid");
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
    <div className="min-h-[80vh] bg-linear-to-br from-white via-islamGreen-pastel/10 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-islamGreen/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-islamGreen/5 blur-3xl"></div>

      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-all hover:text-islamGreen hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        {/* Login Card */}
        <Card className="overflow-hidden border-0 shadow-2xl rounded-3xl">
          {/* Header */}
          <div className="bg-linear-to-br from-islamGreen to-islamGreen-dark px-8 py-10 text-center text-white relative overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <pattern
                  id="login-pattern"
                  patternUnits="userSpaceOnUse"
                  width="10"
                  height="10"
                >
                  <circle cx="5" cy="5" r="1" fill="white" />
                </pattern>
                <rect fill="url(#login-pattern)" width="100%" height="100%" />
              </svg>
            </div>

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shadow-lg relative z-10">
              <span className="text-4xl">☪</span>
            </div>
            <h1 className="font-heading text-3xl font-extrabold relative z-10">
              Selamat Datang
            </h1>
            <p className="mt-3 text-islamGreen-pastel text-lg relative z-10">
              Masuk ke {SITE_CONFIG.name}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {/* Info Box */}
            <div className="mb-6 rounded-2xl bg-blue-50 p-5 text-sm text-blue-800 border border-blue-100">
              <p className="font-semibold flex items-center gap-2">
                <span className="text-lg">💡</span> Login bersifat opsional
              </p>
              <p className="mt-2 text-blue-600 leading-relaxed">
                Anda bisa membaca artikel tanpa login. Login hanya diperlukan
                untuk mengirim konten baru.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NIM Field */}
              <div>
                <label
                  htmlFor="nim"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  NIM
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="nim"
                    type="text"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    placeholder="20230001"
                    className="pl-12 h-12 rounded-xl border-gray-200 focus:border-islamGreen focus:ring-islamGreen"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="pl-12 pr-12 h-12 rounded-xl border-gray-200 focus:border-islamGreen focus:ring-islamGreen"
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
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-islamGreen focus:ring-islamGreen"
                  />
                  <span className="text-gray-600">Ingat saya</span>
                </label>
                <Link
                  href="#"
                  className="text-islamGreen hover:text-islamGreen-dark font-medium"
                >
                  Lupa password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-islamGreen hover:bg-islamGreen-dark rounded-xl text-base font-semibold shadow-lg shadow-islamGreen/20 transition-all hover:shadow-xl hover:shadow-islamGreen/30"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-400 font-medium">atau</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-islamGreen hover:text-islamGreen-dark transition-colors"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50/80 p-5 text-center">
          <p className="font-semibold text-gray-700 flex items-center justify-center gap-2">
            <span className="text-lg">🔑</span> Demo Credentials
          </p>
          <p className="mt-2 text-sm text-gray-500">
            NIM: <span className="font-mono font-semibold">20230001</span> | Password: <span className="font-mono font-semibold">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
