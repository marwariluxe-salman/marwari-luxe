import React from 'react';
import type { Metadata } from 'next';
import AboutPageClient from '@/components/AboutPageClient';

// SEO Metadata for About Page
export const metadata: Metadata = {
  title: 'About Marwari Luxe - Premium Health & Beauty Brand | Our Story & Mission',
  description: 'Learn about Marwari Luxe - your trusted partner in premium health supplements and natural beauty products. Discover our heritage, mission, and commitment to quality wellness solutions since 2020.',
  keywords: 'about marwari luxe, health beauty brand, wellness company story, premium supplements, natural beauty products, ayurvedic heritage, wellness mission, quality assurance, global shipping, expert team',
  openGraph: {
    title: 'About Marwari Luxe - Premium Health & Beauty Brand Story',
    description: 'Discover Marwari Luxe story - premium health supplements & natural beauty products combining traditional wisdom with modern science.',
    url: 'https://marwari-luxe-web.vercel.app/about',
    type: 'website'
  },
  alternates: {
    canonical: 'https://marwari-luxe-web.vercel.app/about'
  }
};

const AboutPage = () => {
  return <AboutPageClient />;
};

export default AboutPage;