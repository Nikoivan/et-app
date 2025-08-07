import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
