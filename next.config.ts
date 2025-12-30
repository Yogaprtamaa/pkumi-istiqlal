import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Konfigurasi untuk remote images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend-portal.pkumionline.cloud',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
