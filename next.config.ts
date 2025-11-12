import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    useCache: true
  },
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: '/images/**'
      }
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ay-petry.ru',
        pathname: '/images/**',
        port: ''
      }
    ]
  }
};

export default nextConfig;
