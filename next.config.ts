import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: '/images/**'
      }
    ]
  }
};

export default nextConfig;
