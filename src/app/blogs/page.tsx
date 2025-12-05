import type { Metadata } from 'next';
import BlogsClient from '@/components/BlogsClient';

export const metadata: Metadata = {
  title: 'Health & Beauty Blog - Expert Wellness Articles | Marwari Luxe',
  description: 'Discover expert health and beauty insights, wellness tips, and product guides. Stay updated with the latest trends in natural skincare, supplements, and holistic wellness.',
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: 'https://marwariluxe.com/blogs'
  },
  openGraph: {
    title: 'Health & Beauty Blog - Expert Wellness Articles | Marwari Luxe',
    description: 'Discover expert health and beauty insights, wellness tips, and product guides. Stay updated with the latest trends in natural skincare, supplements, and holistic wellness.',
    url: 'https://marwariluxe.com/blogs',
    images: [
      {
        url: '/blogs-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwari Luxe Health & Beauty Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health & Beauty Blog - Expert Wellness Articles | Marwari Luxe',
    description: 'Discover expert health and beauty insights, wellness tips, and product guides from Marwari Luxe.',
    images: ['/blogs-twitter-card.jpg']
  }
};

const BlogsPage = () => {
  return <BlogsClient />;
};

export default BlogsPage;