import type { Metadata } from 'next';
import ToolsClient from '@/components/ToolsClient';
import { tools } from '@/data/tools';

export const metadata: Metadata = {
  title: 'Wellness Tools & Calculators - Health & Beauty Assessments | Marwari Luxe',
  description: 'Access our comprehensive collection of health, beauty, and general wellness tools. Make informed decisions about your wellness journey with our scientifically-backed calculators and analyzers.',
  alternates: {
    canonical: 'https://marwariluxe.com/tools'
  },
  openGraph: {
    title: 'Wellness Tools & Calculators - Health & Beauty Assessments | Marwari Luxe',
    description: 'Access our comprehensive collection of health, beauty, and general wellness tools. Make informed decisions about your wellness journey.',
    url: 'https://marwariluxe.com/tools',
    images: [
      {
        url: '/tools-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwari Luxe Wellness Tools & Calculators'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wellness Tools & Calculators - Health & Beauty Assessments | Marwari Luxe',
    description: 'Access our comprehensive collection of health, beauty, and general wellness tools from Marwari Luxe.',
    images: ['/tools-twitter-card.jpg']
  }
};

const ToolsPage = () => {
  return <ToolsClient tools={tools} category="All" />;
};

export default ToolsPage;