import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  allowedDevOrigins: ['192.168.1.32'],
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
