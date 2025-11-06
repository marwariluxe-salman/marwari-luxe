import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed experimental.optimizeCss because it can require additional optional
  // dependencies (like 'critters') during the build which may not be available
  // in all environments (e.g. Vercel installs). Keep config minimal and stable.
  turbopack: {
    root: __dirname,
  },
  images: {
    domains: ['images.unsplash.com', 'marwariluxe.com', 'localhost', 'res.cloudinary.com', 'api.qrserver.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  // Enable compression for better performance
  compress: true,
  reactStrictMode: false, // Disable for better performance in production
  poweredByHeader: false, // Remove Next.js header
  // Reduce bundle size
  modularizeImports: {
    '@heroicons/react/24/outline': {
      transform: '@heroicons/react/24/outline/{{member}}',
    },
    '@heroicons/react/24/solid': {
      transform: '@heroicons/react/24/solid/{{member}}',
    },
  },
  // SWC minification is enabled by default in Next.js 15
};

export default nextConfig;