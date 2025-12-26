/**
 * ProfileContent Component - Client Component untuk halaman profil
 * Menampilkan informasi penulis dan artikel yang ditulis
 * UI Modern dan Responsif
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Twitter,
  Linkedin,
  Instagram,
  ArrowLeft,
  Eye,
  Heart,
  FileText,
  Share2,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Star,
  Verified,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/public/ArticleCard";
import type { Article } from "@/types";

// Type untuk data penulis
export interface Author {
  id: string;
  name: string;
  slug: string;
  email: string;
  avatar?: string;
  bio: string;
  university?: string;
  major?: string;
  location?: string;
  joinDate: string;
  socialMedia?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  stats: {
    articles: number;
    views: number;
    likes: number;
  };
}

// Hook untuk animasi scroll reveal
function useScrollReveal() {
  const refsArray = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    refsArray.current[index] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    refsArray.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return setRef;
}

// Komponen Stats Card dengan animasi modern
function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  color = "green",
  delay = 0 
}: { 
  icon: React.ElementType; 
  value: string | number; 
  label: string;
  color?: "green" | "blue" | "pink";
  delay?: number;
}) {
  const colorClasses = {
    green: "from-islamGreen to-emerald-600 shadow-islamGreen/20",
    blue: "from-blue-500 to-blue-600 shadow-blue-500/20",
    pink: "from-pink-500 to-rose-500 shadow-pink-500/20",
  };

  const bgClasses = {
    green: "bg-islamGreen/5 group-hover:bg-islamGreen/10",
    blue: "bg-blue-500/5 group-hover:bg-blue-500/10",
    pink: "bg-pink-500/5 group-hover:bg-pink-500/10",
  };

  const iconColorClasses = {
    green: "text-islamGreen",
    blue: "text-blue-500",
    pink: "text-pink-500",
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-lg border border-gray-100/80 hover:shadow-2xl hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 bg-linear-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${bgClasses[color]} transition-all duration-500 group-hover:scale-150`} />
      <div className={`absolute -bottom-4 -left-4 w-12 h-12 rounded-full ${bgClasses[color]} transition-all duration-500 group-hover:scale-125`} />
      
      <div className={`relative z-10 w-12 h-12 rounded-xl ${bgClasses[color]} flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        <Icon className={`h-6 w-6 ${iconColorClasses[color]} transition-transform duration-300 group-hover:scale-110`} />
      </div>
      
      <div className="relative z-10">
        <div className="text-3xl font-bold text-gray-900 mb-0.5 tracking-tight">{value}</div>
        <div className="text-sm text-gray-500 font-medium">{label}</div>
      </div>

      <Sparkles className={`absolute bottom-3 right-3 h-4 w-4 ${iconColorClasses[color]} opacity-0 group-hover:opacity-50 transition-all duration-500 group-hover:rotate-12`} />
    </div>
  );
}

interface ProfileContentProps {
  author: Author;
  authorArticles: Article[];
}

export function ProfileContent({ author, authorArticles }: ProfileContentProps) {
  const setRef = useScrollReveal();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50/50">
      {/* Back Button - Fixed Mobile */}
      <div className="fixed top-20 left-4 z-40 lg:hidden">
        <Link href="/artikel">
          <Button 
            size="icon" 
            variant="outline" 
            className="rounded-full bg-white/95 backdrop-blur-md shadow-xl border-0 hover:bg-islamGreen hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Header Banner dengan Gradient Modern */}
      <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
        {/* Multi-layer Animated Background */}
        <div className="absolute inset-0 bg-linear-to-br from-islamGreen via-emerald-600 to-teal-700">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-islamGold/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent" />
          
          {/* Animated Floating Orbs */}
          <div className="absolute top-10 left-[10%] w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-0 right-[15%] w-64 h-64 bg-islamGold/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
          <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
        </div>
        
        {/* Geometric Islamic Pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0L40 15L30 30L20 15L30 0Z" fill="white" />
                <path d="M0 30L10 45L0 60L-10 45L0 30Z" fill="white" />
                <path d="M60 30L70 45L60 60L50 45L60 30Z" fill="white" />
                <circle cx="30" cy="30" r="4" fill="white" />
                <circle cx="0" cy="0" r="2" fill="white" />
                <circle cx="60" cy="0" r="2" fill="white" />
                <circle cx="0" cy="60" r="2" fill="white" />
                <circle cx="60" cy="60" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
          </svg>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-50 to-transparent" />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex absolute top-6 left-6 right-6 justify-between items-center">
          <Link href="/artikel">
            <Button 
              variant="ghost" 
              className="rounded-full bg-white/15 backdrop-blur-xl text-white hover:bg-white hover:text-islamGreen transition-all duration-300 gap-2 border border-white/20 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </Link>
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full bg-white/15 backdrop-blur-xl text-white hover:bg-white hover:text-islamGreen transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Decorative stars */}
        <div className="absolute top-20 right-[20%] opacity-50">
          <Star className="h-4 w-4 text-islamGold fill-islamGold animate-pulse" />
        </div>
        <div className="absolute top-32 right-[30%] opacity-30">
          <Star className="h-3 w-3 text-white fill-white animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute top-16 left-[25%] opacity-40">
          <Star className="h-3 w-3 text-islamGold fill-islamGold animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Card - Modern Glass Design */}
        <div 
          ref={setRef(0)}
          className="relative -mt-32 sm:-mt-40 md:-mt-48 mb-10 sm:mb-14 opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 transition-all duration-700"
        >
          <Card 
            className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-islamGreen/20 via-transparent to-islamGold/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <CardContent className="p-5 sm:p-8 md:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
                
                {/* Avatar Section - Enhanced */}
                <div className="flex flex-col items-center lg:items-start">
                  <div 
                    className="relative group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Multiple glow layers */}
                    <div className={`absolute -inset-3 bg-linear-to-br from-islamGreen via-emerald-500 to-islamGold rounded-3xl blur-xl transition-all duration-500 ${isHovered ? 'opacity-40 scale-105' : 'opacity-20'}`} />
                    <div className={`absolute -inset-2 bg-linear-to-br from-islamGreen to-emerald-600 rounded-2xl transition-all duration-500 ${isHovered ? 'opacity-30' : 'opacity-10'}`} />
                    
                    {/* Avatar Container */}
                    <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 overflow-hidden rounded-2xl border-4 border-white shadow-2xl ring-4 ring-islamGreen/10 transition-all duration-500 group-hover:ring-islamGreen/30">
                      {author.avatar ? (
                        <Image
                          src={author.avatar}
                          alt={author.name}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-islamGreen via-emerald-600 to-teal-600 text-5xl sm:text-6xl font-bold text-white relative overflow-hidden">
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_white_1px,_transparent_1px)] bg-[length:20px_20px]" />
                          </div>
                          <span className="relative z-10 drop-shadow-lg">{author.name.charAt(0)}</span>
                        </div>
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-islamGreen/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Verified Badge - Enhanced */}
                    <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-islamGreen rounded-full blur animate-pulse" />
                        <div className="relative rounded-full bg-linear-to-br from-islamGreen via-emerald-500 to-teal-500 p-2.5 sm:p-3 shadow-xl ring-4 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                          <Verified className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Stats - Compact & Modern */}
                  <div className="flex gap-6 mt-8 lg:hidden">
                    <div className="text-center group cursor-default">
                      <div className="text-2xl font-bold bg-linear-to-r from-islamGreen to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                        {author.stats.articles}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Artikel</div>
                    </div>
                    <div className="w-px bg-gray-200" />
                    <div className="text-center group cursor-default">
                      <div className="text-2xl font-bold bg-linear-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                        {author.stats.views >= 1000 ? `${(author.stats.views / 1000).toFixed(1)}K` : author.stats.views}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Views</div>
                    </div>
                    <div className="w-px bg-gray-200" />
                    <div className="text-center group cursor-default">
                      <div className="text-2xl font-bold bg-linear-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                        {author.stats.likes}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Likes</div>
                    </div>
                  </div>
                </div>

                {/* Info Section - Enhanced */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Name & Badges Row */}
                  <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-4">
                    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                      {author.name}
                    </h1>
                    <div className="flex gap-2">
                      <Badge className="bg-linear-to-r from-islamGreen to-emerald-600 text-white border-0 shadow-lg shadow-islamGreen/25 hover:shadow-xl hover:scale-105 transition-all duration-300 gap-1.5 px-3 py-1">
                        <PenLine className="h-3 w-3" />
                        Penulis Aktif
                      </Badge>
                      {author.stats.articles >= 10 && (
                        <Badge className="bg-linear-to-r from-islamGold to-amber-500 text-white border-0 shadow-lg shadow-amber-500/25 gap-1.5 px-3 py-1">
                          <TrendingUp className="h-3 w-3" />
                          Top Writer
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* University & Major - Enhanced */}
                  {author.university && (
                    <div className="mb-5 p-4 rounded-xl bg-linear-to-r from-islamGreen/5 to-emerald-500/5 border border-islamGreen/10 inline-block lg:block">
                      <p className="text-lg sm:text-xl font-semibold bg-linear-to-r from-islamGreen to-emerald-600 bg-clip-text text-transparent">
                        {author.university}
                      </p>
                      {author.major && (
                        <p className="text-sm sm:text-base text-gray-600 mt-0.5">{author.major}</p>
                      )}
                    </div>
                  )}

                  {/* Meta Info Pills - Enhanced */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-5">
                    {author.location && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-md border border-gray-100 hover:border-islamGreen/30 hover:shadow-lg hover:text-islamGreen hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                        <div className="w-6 h-6 rounded-full bg-islamGreen/10 flex items-center justify-center">
                          <MapPin className="h-3.5 w-3.5 text-islamGreen" />
                        </div>
                        {author.location}
                      </div>
                    )}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-md border border-gray-100 hover:border-islamGreen/30 hover:shadow-lg hover:text-islamGreen hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                      <div className="w-6 h-6 rounded-full bg-islamGreen/10 flex items-center justify-center">
                        <Calendar className="h-3.5 w-3.5 text-islamGreen" />
                      </div>
                      Bergabung{" "}
                      {new Date(author.joinDate).toLocaleDateString("id-ID", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-md border border-gray-100 hover:border-islamGreen/30 hover:shadow-lg hover:text-islamGreen hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                      <div className="w-6 h-6 rounded-full bg-islamGreen/10 flex items-center justify-center">
                        <Mail className="h-3.5 w-3.5 text-islamGreen" />
                      </div>
                      {author.email}
                    </div>
                  </div>

                  {/* Bio - Enhanced */}
                  <div className="relative mb-6">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl">
                      {author.bio}
                    </p>
                  </div>

                  {/* Social Media & Contact Buttons - Enhanced */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <Button
                      className="rounded-full gap-2.5 bg-linear-to-r from-islamGreen to-emerald-600 hover:from-islamGreen-dark hover:to-emerald-700 text-white shadow-xl shadow-islamGreen/30 hover:shadow-2xl hover:shadow-islamGreen/40 hover:scale-105 transition-all duration-300 px-6"
                      asChild
                    >
                      <a href={`mailto:${author.email}`}>
                        <Mail className="h-4 w-4" />
                        Hubungi Saya
                      </a>
                    </Button>

                    {author.socialMedia?.twitter && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-500 hover:text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 h-11 w-11"
                        asChild
                      >
                        <a
                          href={`https://twitter.com/${author.socialMedia.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Twitter"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {author.socialMedia?.instagram && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-2 border-gray-200 hover:border-pink-400 hover:bg-linear-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 h-11 w-11"
                        asChild
                      >
                        <a
                          href={`https://instagram.com/${author.socialMedia.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Instagram"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {author.socialMedia?.linkedin && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 h-11 w-11"
                        asChild
                      >
                        <a
                          href={`https://linkedin.com/in/${author.socialMedia.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Desktop Stats Cards - Enhanced */}
                <div className="hidden lg:grid grid-cols-1 gap-5 shrink-0 w-52">
                  <StatCard 
                    icon={FileText} 
                    value={author.stats.articles} 
                    label="Total Artikel" 
                    color="green"
                    delay={100} 
                  />
                  <StatCard 
                    icon={Eye} 
                    value={author.stats.views >= 1000 ? `${(author.stats.views / 1000).toFixed(1)}K` : author.stats.views} 
                    label="Total Views" 
                    color="blue"
                    delay={200} 
                  />
                  <StatCard 
                    icon={Heart} 
                    value={author.stats.likes} 
                    label="Total Likes" 
                    color="pink"
                    delay={300} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles Section - Enhanced */}
        <div 
          ref={setRef(1)}
          className="pb-16 sm:pb-20 lg:pb-24 opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 transition-all duration-700 delay-200"
        >
          {/* Section Header - Enhanced */}
          <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2.5 bg-linear-to-br from-islamGreen to-emerald-600 rounded-xl shadow-lg shadow-islamGreen/25">
                  <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                Artikel yang Ditulis
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mt-2 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-islamGreen/10 text-islamGreen text-sm font-semibold">
                  {authorArticles.length}
                </span>
                artikel telah dipublikasikan
              </p>
            </div>
            
            {authorArticles.length > 0 && (
              <Link href="/artikel" className="self-start sm:self-auto">
                <Button 
                  variant="outline" 
                  className="rounded-full gap-2 border-2 border-islamGreen text-islamGreen hover:bg-islamGreen hover:text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-6"
                >
                  Lihat Semua
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>

          {authorArticles.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {authorArticles.map((article, index) => (
                <div
                  key={article.id}
                  ref={setRef(index + 2)}
                  className="opacity-0 translate-y-4 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 transition-all duration-500"
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State - Enhanced */
            <Card className="p-10 sm:p-16 text-center border-2 border-dashed border-gray-200 bg-linear-to-br from-gray-50/80 to-white rounded-3xl hover:border-islamGreen/30 transition-colors duration-300">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 animate-ping bg-islamGreen/10 rounded-full" style={{ animationDuration: '3s' }} />
                <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-islamGreen/10 to-emerald-500/10 border-2 border-islamGreen/20">
                  <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-islamGreen" />
                </div>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Belum Ada Artikel
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                {author.name} belum mempublikasikan artikel. Pantau terus untuk update terbaru!
              </p>
              <Link href="/artikel">
                <Button 
                  className="rounded-full gap-2 bg-linear-to-r from-islamGreen to-emerald-600 hover:from-islamGreen-dark hover:to-emerald-700 text-white shadow-xl shadow-islamGreen/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 px-8 py-6 text-base"
                >
                  <Sparkles className="h-5 w-5" />
                  Jelajahi Artikel Lainnya
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
