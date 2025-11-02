import type { Metadata } from 'next';
import HeroSlider from '@/components/HeroSlider';
import IntroSection from '@/components/IntroSection';
import BlogSection from '@/components/BlogSection';
import ToolsSection from '@/components/ToolsSection';
import ProductsSection from '@/components/ProductsSection';
import NewsletterSection from '@/components/NewsletterSection';
import AdSpace from '@/components/AdSpace';

export const metadata: Metadata = {
  title: 'Marwari Luxe - Premium Health Supplements & Natural Beauty Products | Wellness Store',
  description: 'Shop premium health supplements, natural skincare products & wellness tools at Marwari Luxe. Expert-curated vitamins, anti-aging serums, protein powders & health calculators. Free shipping over $50.',
  keywords: 'health supplements, natural beauty products, wellness tools, vitamins, skincare, protein powder, anti-aging serum, health calculator, organic skincare, premium supplements, immune support, weight management, hair care products, skin care routine, natural ingredients, wellness blog, fitness accessories, beauty essentials, marwari heritage wellness, cruelty-free beauty',
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
  return (
    <div className="min-h-screen">
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
              "paymentAccepted": ["Credit Card", "PayPal", "Stripe", "Wise"],
              "currenciesAccepted": "USD",
              "priceRange": "$15-$150"
            }
          })
        }}
      />
      
      <HeroSlider />
      <AdSpace size="banner" position="top" />
      <IntroSection />
      <AdSpace size="rectangle" position="middle" className="max-w-7xl mx-auto px-4" />
      <BlogSection />
      <ToolsSection />
      <AdSpace size="banner" position="middle" className="max-w-7xl mx-auto px-4" />
      <ProductsSection />
      <AdSpace size="rectangle" position="middle" className="max-w-7xl mx-auto px-4" />
      <NewsletterSection />
    </div>
  );
}