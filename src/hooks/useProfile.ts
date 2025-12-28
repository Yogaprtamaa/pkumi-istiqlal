/**
 * useProfile Hook
 * Custom hook untuk mengelola profile data
 */

'use client';

import { useState, useEffect } from 'react';
import { authService, type Student } from '@/lib/api';

export function useProfile() {
  const [profile, setProfile] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.getProfile();
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError('Gagal memuat profil');
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchProfile();
  };

  return {
    profile,
    isLoading,
    error,
    refetch,
  };
}
