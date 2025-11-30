import type { Metadata } from 'next';
import ToolsClient from '@/components/ToolsClient';
import { beautyTools } from '@/data/tools';

export const metadata: Metadata = {
  title: 'Beauty Tools & Analyzers - Marwari Luxe Beauty Tools',
  description: 'Discover your perfect beauty routine with our expert-designed tools and analyzers. Get personalized recommendations for skincare, makeup, and hair care.',
  alternates: {
    canonical: 'https://marwariluxe.com/tools/beauty'
  },
  openGraph: {
    title: 'Beauty Tools & Analyzers - Marwari Luxe Beauty Tools',
    description: 'Discover your perfect beauty routine with our expert-designed tools and analyzers.',
    url: 'https://marwariluxe.com/tools/beauty',
    images: [
      {
        url: '/beauty-tools-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwari Luxe Beauty Tools & Analyzers'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beauty Tools & Analyzers - Marwari Luxe Beauty Tools',
    description: 'Discover your perfect beauty routine with our expert-designed tools and analyzers from Marwari Luxe.',
    images: ['/beauty-tools-twitter-card.jpg']
  }
};

const BeautyToolsPage = () => {
  return <ToolsClient tools={beautyTools} category="Beauty" />;
};

export default BeautyToolsPage;