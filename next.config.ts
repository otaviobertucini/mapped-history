import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mapped-history',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
