import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
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
