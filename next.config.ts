import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Turbopack for faster builds
  turbopack: {
    // Enable Turbopack optimizations
    rules: {
      // Custom rules can be added here
    },
  },
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent.fmnl4-7.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
