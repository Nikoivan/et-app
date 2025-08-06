import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: '/images/**'
      }
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'ay-petry.ru', pathname: '/images/**' }
    ]
  }
};

export default nextConfig;
