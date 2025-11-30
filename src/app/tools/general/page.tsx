import type { Metadata } from 'next';
import ToolsClient from '@/components/ToolsClient';
import { generalTools } from '@/data/tools';

export const metadata: Metadata = {
  title: 'General Utility Tools - Marwari Luxe Productivity Tools',
  description: 'Boost your productivity with our collection of essential utility tools. From calculations to text analysis, we have the tools you need for daily tasks.',
  alternates: {
    canonical: 'https://marwariluxe.com/tools/general'
  },
  openGraph: {
    title: 'General Utility Tools - Marwari Luxe Productivity Tools',
    description: 'Boost your productivity with our collection of essential utility tools. From calculations to text analysis, we have the tools you need for daily tasks.',
    url: 'https://marwariluxe.com/tools/general',
    images: [
      {
        url: '/general-tools-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwari Luxe General Utility Tools'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'General Utility Tools - Marwari Luxe Productivity Tools',
    description: 'Boost your productivity with our collection of essential utility tools from Marwari Luxe.',
    images: ['/general-tools-twitter-card.jpg']
  }
};

const GeneralToolsPage = () => {
  return <ToolsClient tools={generalTools} category="General" />;
};

export default GeneralToolsPage;