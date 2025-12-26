"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { SITE_CONFIG } from "@/lib/constants";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isAuthenticated } = useAuth();

  const [email, setEmail] = React.useState("");
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

    if (!email || !password) {
      setError("Mohon isi email dan password");
      setIsSubmitting(false);
      return;
    }

    const success = await login(email, password);

    if (success) {
      router.push(redirectTo);
    } else {
      setError("Email atau password tidak valid");
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

  /* ⬇️ JSX kamu SELURUHNYA tetap sama ⬇️ */
  return <>{/* isi UI login kamu, TIDAK PERLU DIUBAH */}</>;
}
