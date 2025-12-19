import type { NextConfig } from 'next';

export default {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.ekapak.ru',
      },
    ],
  },
} satisfies NextConfig;
