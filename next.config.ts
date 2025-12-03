import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const nextConfig: NextConfig = {
  // Removed experimental.optimizeCss because it can require additional optional
  // dependencies (like 'critters') during the build which may not be available
  // in all environments (e.g. Vercel installs). Keep config minimal and stable.
  turbopack: {
    root: __dirname,
  },
  devIndicators: {
    position: 'bottom-right',
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  images: {
    loader: 'default',
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression for better performance
  compress: true,
  reactStrictMode: true, // Enable React Strict Mode for better development experience
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
    // Only replace React with Preact in production builds for better development performance
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
    // Enable scroll restoration for better UX
    scrollRestoration: true,
    // CSS optimization requires additional dependencies
    // optimizeCss: true,
  },
  // Compiler optimizations
  compiler: {
    // Remove console logs in production except for errors
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
};

export default withAnalyzer(nextConfig);