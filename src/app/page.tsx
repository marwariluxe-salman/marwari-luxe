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



const PerformanceOptimizer = dynamic(() => import('@/components/PerformanceOptimizer'));
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'));

export const metadata: Metadata = {
  title: "Marwari Luxe - Premium Health & Beauty Products | Wellness Essentials Online Store",
  description: "Shop premium health supplements, natural beauty products & wellness tools at Marwari Luxe. Expert-curated skincare, vitamins, fitness accessories with free shipping over $50. Trusted by 10,000+ customers worldwide.",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  authors: [{ name: "Marwari Luxe Team", url: "https://marwariluxe-web.vercel.app/about" }],
  keywords: "health supplements, natural beauty products, wellness tools, skincare essentials, vitamins minerals, fitness accessories, organic beauty, anti-aging products, immune support, weight management, hair care, skin care routine, health calculators, wellness blog, premium supplements, beauty serum, protein powder, probiotics, omega-3, vitamin D, collagen peptides, hyaluronic acid, retinol products, sunscreen SPF, natural ingredients, cruelty-free beauty, sustainable wellness, marwari heritage wellness",
  openGraph: {
    title: 'Marwari Luxe - Premium Health & Beauty Products | Wellness Essentials Store',
    description: 'Shop expert-curated health supplements, natural beauty products & wellness tools. Free shipping over $50. Trusted by 10,000+ customers worldwide.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Marwari Luxe',
    url: 'https://www.marwariluxe.com',
    images: [{
      url: '/marwari-luxe-og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Marwari Luxe Premium Health and Beauty Products'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marwari Luxe - Premium Health & Beauty Products | Wellness Essentials',
    description: 'Shop expert-curated health supplements, natural beauty products & wellness tools. Free shipping over $50. Trusted by 10,000+ customers.',
    site: '@MarwariLuxe',
    creator: '@MarwariLuxe',
    images: ['/marwari-luxe-twitter-card.jpg']
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Marwari Luxe Wellness'
  },
  formatDetection: {
    telephone: false
  },
  alternates: {
    canonical: 'https://www.marwariluxe.com'
  },
  category: 'Health & Beauty',
  classification: 'Business'
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Marwari Luxe",
  "url": "https://www.marwariluxe.com",
  "logo": "https://www.marwariluxe.com/marwari-logo.png",
  "description": "Premium health supplements, natural beauty products & wellness tools. Expert-curated collection for optimal health and beauty.",
  "sameAs": [
    "https://facebook.com/marwariluxe",
    "https://instagram.com/marwariluxe",
    "https://twitter.com/marwariluxe"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "marwariluxe@gmail.com"
  }
};

export default function Home() {
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

      <IntroSection />
      <BlogSection />
      <ToolsSection />

      <ProductsSection />
      <NewsletterSection />
    </div>
  );
}