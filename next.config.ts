import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**", // Разрешаем все из public/images/
      },
    ],
  },
};

export default nextConfig;
