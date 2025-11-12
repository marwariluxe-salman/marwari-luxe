import type { Metadata } from 'next';
import { allProducts } from '@/data/products';
import ProductsClient from '@/components/ProductsClient';

export const metadata: Metadata = {
  title: 'Premium Health Supplements & Natural Beauty Products | Marwari Luxe Store',
  description: 'Shop 25+ premium health supplements, natural beauty products & wellness essentials. Vitamins, skincare, protein powders, anti-aging serums. Free shipping over $50.',
  keywords: 'health supplements, natural beauty products, vitamins, skincare products, protein powder, omega-3, probiotics, anti-aging serum, hyaluronic acid, retinol cream, vitamin C serum, collagen peptides, immune support, weight management, hair care, skin care, organic beauty, premium supplements, wellness products, fitness accessories',
  openGraph: {
    title: 'Premium Health Supplements & Natural Beauty Products | Marwari Luxe',
    description: 'Shop 25+ premium health supplements, natural beauty products & wellness essentials. Free shipping over $50.',
    url: 'https://marwari-luxe-web.vercel.app/products',
    type: 'website',
    images: [{
      url: '/marwari-luxe-products-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Marwari Luxe Premium Health and Beauty Products Collection'
    }]
  },
  alternates: {
    canonical: 'https://marwari-luxe-web.vercel.app/products'
  }
};

const ProductsPage = () => {
  return <ProductsClient products={allProducts} />;
};

export default ProductsPage;