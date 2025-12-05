import type { Metadata } from 'next';
import BeautyCategoryClient from '@/components/BeautyCategoryClient';

export const metadata: Metadata = {
  title: 'Beauty & Cosmetics - Premium Beauty Products & Tools | Marwari Luxe',
  description: 'Unleash your natural beauty with our premium cosmetics, expert beauty advice, and personalized tools. Transform your beauty routine with professional-grade products and cutting-edge techniques.',
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: 'https://marwariluxe.com/categories/beauty'
  },
  openGraph: {
    title: 'Beauty & Cosmetics - Premium Beauty Products & Tools | Marwari Luxe',
    description: 'Unleash your natural beauty with our premium cosmetics, expert beauty advice, and personalized tools.',
    url: 'https://marwariluxe.com/categories/beauty',
    images: [
      {
        url: '/beauty-category-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwari Luxe Beauty & Cosmetics'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beauty & Cosmetics - Premium Beauty Products & Tools | Marwari Luxe',
    description: 'Unleash your natural beauty with our premium cosmetics and expert beauty advice from Marwari Luxe.',
    images: ['/beauty-category-twitter-card.jpg']
  }
};

const BeautyCategoryPage = () => {
  return <BeautyCategoryClient />;
};

export default BeautyCategoryPage;