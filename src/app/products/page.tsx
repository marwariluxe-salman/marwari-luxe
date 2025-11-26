import type { Metadata } from 'next';
import { allProducts } from '@/data/products';
import ProductsClient from '@/components/ProductsClient';

export const metadata: Metadata = {
  title: 'All Products - Marwari Luxe Health & Beauty Essentials',
  description: 'Browse our complete collection of premium health supplements, natural beauty products, and wellness tools. Shop by category, read expert reviews, and enjoy free shipping on orders over $50.',
  alternates: {
    canonical: 'https://www.marwariluxe.com/products'
  },
  openGraph: {
    title: 'All Products - Marwari Luxe Health & Beauty Essentials',
    description: 'Browse our complete collection of premium health supplements, natural beauty products, and wellness tools. Shop by category, read expert reviews, and enjoy free shipping on orders over $50.',
    url: 'https://www.marwariluxe.com/products',
    images: [
      {
        url: '/products-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwari Luxe Premium Health Supplements & Beauty Products Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Products - Marwari Luxe Health & Beauty Essentials',
    description: 'Browse our complete collection of premium health supplements, natural beauty products, and wellness tools. Shop by category and enjoy free shipping on orders over $50.',
    images: ['/products-twitter-card.jpg']
  }
};

const ProductsPage = () => {
  return <ProductsClient products={allProducts} />;
};

export default ProductsPage;