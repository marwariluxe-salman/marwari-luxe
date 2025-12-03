import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - Marwari Luxe Health & Beauty Experts',
  description: 'Get in touch with Marwari Luxe for personalized wellness advice, product inquiries, or partnership opportunities. Our expert team is here to support your health and beauty journey.',
  alternates: {
    canonical: 'https://marwariluxe.com/contact'
  },
  openGraph: {
    title: 'Contact Us - Marwari Luxe Health & Beauty Experts',
    description: 'Get in touch with Marwari Luxe for personalized wellness advice, product inquiries, or partnership opportunities.',
    url: 'https://marwariluxe.com/contact',
    images: [
      {
        url: '/contact-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Marwari Luxe'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Marwari Luxe Health & Beauty Experts',
    description: 'Get in touch with Marwari Luxe for personalized wellness advice and product inquiries.',
    images: ['/contact-twitter-card.jpg']
  }
};

// social SVG icons removed: not used in this file (ContactClient renders them)

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;