import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed experimental.optimizeCss because it can require additional optional
  // dependencies (like 'critters') during the build which may not be available
  // in all environments (e.g. Vercel installs). Keep config minimal and stable.
  turbopack: {
    root: __dirname,
  },
  images: {
    loader: 'default',
    domains: ['images.unsplash.com', 'marwariluxe.com', 'localhost', 'res.cloudinary.com', 'api.qrserver.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
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
  // Enable webpack bundle analysis
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact in client production builds
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    return config;
  },
  // Add headers for caching
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|gif|png|webp|avif|svg|ico|woff|woff2|ttf|eot|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Vercel specific optimizations
  experimental: {
    optimizePackageImports: [
      '@heroicons/react/24/outline',
      '@heroicons/react/24/solid',
    ],
  },
};

export default nextConfig;