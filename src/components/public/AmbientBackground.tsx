// src/components/AmbientBackground.tsx
import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
      {/* Blob Hijau Besar (Kanan Atas) */}
      <div className="absolute -top-[10%] -right-[10%] w-[800px] h-[800px] bg-green-400/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow" />
      
      {/* Blob Kuning (Tengah Kanan) */}
      <div className="absolute top-[30%] right-[5%] w-[600px] h-[600px] bg-yellow-400/30 rounded-full blur-[100px] mix-blend-multiply" />
      
      {/* Blob Kuning (Kiri Bawah/Tengah) */}
      <div className="absolute top-[40%] -left-[10%] w-[700px] h-[700px] bg-yellow-300/30 rounded-full blur-[120px] mix-blend-multiply" />
      
      {/* Blob Hijau Kecil (Tengah Bawah) */}
      <div className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] bg-green-300/20 rounded-full blur-[100px]" />
    </div>
  );
}