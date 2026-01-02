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
  // Proxy API requests untuk menghindari CORS di development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend-portal.pkumionline.cloud/api/:path*',
      },
    ];
  },
};

export default nextConfig;
