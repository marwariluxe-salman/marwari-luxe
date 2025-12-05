import type { Metadata } from 'next';
import HealthCategoryClient from '@/components/HealthCategoryClient';

export const metadata: Metadata = {
  title: 'Health & Wellness Products - Premium Supplements & Tools | Marwari Luxe',
  description: 'Discover premium health products, expert wellness advice, and comprehensive tools to enhance your physical and mental well-being. Your journey to optimal health starts here.',
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: 'https://marwariluxe.com/categories/health'
  },
  openGraph: {
    title: 'Health & Wellness Products - Premium Supplements & Tools | Marwari Luxe',
    description: 'Discover premium health products, expert wellness advice, and comprehensive tools to enhance your physical and mental well-being.',
    url: 'https://marwariluxe.com/categories/health',
    images: [
      {
        url: '/health-category-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwari Luxe Health & Wellness Products'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health & Wellness Products - Premium Supplements & Tools | Marwari Luxe',
    description: 'Discover premium health products and expert wellness advice from Marwari Luxe.',
    images: ['/health-category-twitter-card.jpg']
  }
};

const HealthCategoryPage = () => {
  return <HealthCategoryClient />;
};

export default HealthCategoryPage;