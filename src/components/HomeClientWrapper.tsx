"use client";

import dynamic from 'next/dynamic';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const IntroSection = dynamic(() => import('@/components/IntroSection'), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

const BlogSection = dynamic(() => import('@/components/BlogSection'), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

const ToolsSection = dynamic(() => import('@/components/ToolsSection'), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

const ProductsSection = dynamic(() => import('@/components/ProductsSection'), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

const NewsletterSection = dynamic(() => import('@/components/NewsletterSection'), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

const PerformanceOptimizer = dynamic(() => import('@/components/PerformanceOptimizer'), { ssr: false });
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), { ssr: false });

export default function HomeClientWrapper() {
  return (
    <>
      <PerformanceOptimizer />
      <PerformanceMonitor />
      <IntroSection />
      <BlogSection />
      <ToolsSection />
      <ProductsSection />
      <NewsletterSection />
    </>
  );
}
