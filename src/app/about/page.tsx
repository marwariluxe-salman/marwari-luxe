import React from 'react';
import type { Metadata } from 'next';
import AboutPageClient from '@/components/AboutPageClient';

// SEO Metadata for About Page
export const metadata: Metadata = {
  title: 'About Marwari Luxe - Our Heritage, Mission & Values',
  description: 'Discover the story behind Marwari Luxe, our commitment to premium wellness, and how we blend traditional wisdom with modern science for optimal health and beauty.',
  alternates: {
    canonical: 'https://www.marwariluxe.com/about'
  },
  openGraph: {
    title: 'About Marwari Luxe - Our Heritage, Mission & Values',
    description: 'Discover the story behind Marwari Luxe, our commitment to premium wellness, and how we blend traditional wisdom with modern science for optimal health and beauty.',
    url: 'https://www.marwariluxe.com/about',
    images: [
      {
        url: '/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Marwari Luxe - Our Heritage and Mission'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Marwari Luxe - Our Heritage, Mission & Values',
    description: 'Discover the story behind Marwari Luxe, our commitment to premium wellness, and how we blend traditional wisdom with modern science.',
    images: ['/about-twitter-card.jpg']
  }
};

const AboutPage = () => {
  return <AboutPageClient />;
};

export default AboutPage;