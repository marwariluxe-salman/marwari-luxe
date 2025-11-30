import type { Metadata } from 'next';
import SocialMediaClient from '@/components/SocialMediaClient';

export const metadata: Metadata = {
  title: 'Connect With Us - Marwari Luxe Social Media',
  description: 'Follow us on social media for the latest updates, health tips, beauty advice, and exclusive offers. Connect with Marwari Luxe on Facebook, Instagram, Twitter, YouTube, Pinterest, and TikTok.',
  alternates: {
    canonical: 'https://marwariluxe.com/checkout'
  },
  openGraph: {
    title: 'Connect With Us - Marwari Luxe Social Media',
    description: 'Follow us on social media for the latest updates, health tips, beauty advice, and exclusive offers.',
    url: 'https://marwariluxe.com/checkout',
    images: [
      {
        url: '/social-media-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwari Luxe Social Media'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect With Us - Marwari Luxe Social Media',
    description: 'Follow us on social media for the latest updates, health tips, beauty advice, and exclusive offers from Marwari Luxe.',
    images: ['/social-media-twitter-card.jpg']
  }
};

const SocialMediaPage = () => {
  return <SocialMediaClient />;
};

export default SocialMediaPage;