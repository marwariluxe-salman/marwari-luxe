import type { Metadata } from 'next';
import ToolsClient from '@/components/ToolsClient';
import { healthTools } from '@/data/tools';

export const metadata: Metadata = {
  title: 'Health Tools & Calculators - Marwari Luxe Wellness Tools',
  description: 'Take control of your health with our scientifically-backed calculators and assessment tools. Monitor your fitness, nutrition, and overall wellness with precision.',
  alternates: {
    canonical: 'https://marwariluxe.com/tools/health'
  },
  openGraph: {
    title: 'Health Tools & Calculators - Marwari Luxe Wellness Tools',
    description: 'Take control of your health with our scientifically-backed calculators and assessment tools.',
    url: 'https://marwariluxe.com/tools/health',
    images: [
      {
        url: '/health-tools-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwari Luxe Health Tools & Calculators'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Tools & Calculators - Marwari Luxe Wellness Tools',
    description: 'Take control of your health with our scientifically-backed calculators and assessment tools from Marwari Luxe.',
    images: ['/health-tools-twitter-card.jpg']
  }
};

const HealthToolsPage = () => {
  return <ToolsClient tools={healthTools} category="Health" />;
};

export default HealthToolsPage;