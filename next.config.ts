import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Konfigurasi untuk remote images (Unsplash)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
