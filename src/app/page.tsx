import type { Metadata } from 'next';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import LoadingSkeleton from '@/components/LoadingSkeleton';

// Dynamically import components with lazy loading
const HeroSlider = dynamic(() => import('@/components/HeroSlider'), { 
  ssr: true,
  loading: () => <div className="h-screen w-full bg-gray-200 animate-pulse" />
});

const IntroSection = dynamic(() => import('@/components/IntroSection'), { 
  ssr: true,
  loading: () => <LoadingSkeleton />
});

const BlogSection = dynamic(() => import('@/components/BlogSection'), { 
  ssr: true,
  loading: () => <LoadingSkeleton />
});

const ToolsSection = dynamic(() => import('@/components/ToolsSection'), { 
  ssr: true,
  loading: () => <LoadingSkeleton />
});

const ProductsSection = dynamic(() => import('@/components/ProductsSection'), { 
  ssr: true,
  loading: () => <LoadingSkeleton />
});

const NewsletterSection = dynamic(() => import('@/components/NewsletterSection'), { 
  ssr: true,
  loading: () => <LoadingSkeleton />
});

const AdSpace = dynamic(() => import('@/components/AdSpace'), { 
  ssr: true,
  loading: () => <div className="h-32 w-full bg-gray-100 animate-pulse my-8" />
});

const PerformanceOptimizer = dynamic(() => import('@/components/PerformanceOptimizer'));
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'));

export const metadata: Metadata = {
  title: 'Marwari Luxe - Premium Health Supplements & Natural Beauty Products | Wellness Store',
  description: 'Shop premium health supplements, natural skincare products & wellness tools at Marwari Luxe. Expert-curated vitamins, anti-aging serums, protein powders & health calculators. Free shipping over $50.',
  keywords: 'health supplements, natural beauty products, wellness tools, vitamins, skincare, protein powder, anti-aging serum, health calculator, organic skincare, premium supplements, immune support, weight management, hair care products, skin care routine, natural ingredients, wellness blog, fitness accessories, beauty essentials, marwari heritage wellness',
  openGraph: {
    title: 'Marwari Luxe - Premium Health Supplements & Natural Beauty Products',
    description: 'Shop expert-curated health supplements, natural beauty products & wellness tools. Free shipping over $50.',
    url: 'https://marwariluxe.com',
    type: 'website',
    images: [{
      url: '/marwari-luxe-home-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Marwari Luxe Premium Health and Beauty Products Collection'
    }]
  },
  alternates: {
    canonical: 'https://marwariluxe.com'
  }
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Marwari Luxe - Premium Health & Beauty Products",
    "description": "Shop premium health supplements, natural beauty products & wellness tools. Expert-curated collection for optimal health and beauty.",
    "url": "https://marwariluxe.com",
    "mainEntity": {
      "@type": "Store",
      "name": "Marwari Luxe",
      "image": "https://marwariluxe.com/marwari-logo.png",
      "description": "Premium health supplements, natural beauty products & wellness tools store",
      "paymentAccepted": ["Credit Card"],
      "currenciesAccepted": "USD",
      "priceRange": "$15-$150"
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      {/* Performance Optimizer */}
      <PerformanceOptimizer />
      
      {/* Performance Monitor (development only) */}
      <PerformanceMonitor />
      
      {/* Structured Data for Homepage */}
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
        strategy="afterInteractive"
      />
      
      <HeroSlider />
      <div className="w-full max-w-7xl mx-auto px-4">
        <AdSpace size="banner" position="top" />
      </div>
      <IntroSection />
      <div className="w-full max-w-7xl mx-auto px-4">
        <AdSpace size="rectangle" position="middle" className="w-full" />
      </div>
      <BlogSection />
      <ToolsSection />
      <div className="w-full max-w-7xl mx-auto px-4">
        <AdSpace size="banner" position="middle" className="w-full" />
      </div>
      <ProductsSection />
      <div className="w-full max-w-7xl mx-auto px-4">
        <AdSpace size="rectangle" position="middle" className="w-full" />
      </div>
      <NewsletterSection />
    </div>
  );
}