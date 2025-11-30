import { allProducts } from '@/data/products';
import { Product } from '@/types';
import ProductDetailClient from '@/components/ProductDetailClient';

// Function to generate dynamic metadata for product pages
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = allProducts.find(p => p.id === params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found - Marwari Luxe',
      description: 'The product you are looking for could not be found.',
    };
  }
  
  const baseUrl = 'https://marwariluxe.com';
  const productUrl = `${baseUrl}/products/${product.id}`;
  
  return {
    title: `${product.title} - Marwari Luxe Premium ${product.category} Product`,
    description: product.description,
    alternates: {
      canonical: productUrl
    },
    openGraph: {
      title: product.title,
      description: product.description,
      url: productUrl,
      type: 'product',
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.image]
    }
  };
}

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = allProducts.find(p => p.id === params.id) || null;
  
  if (!product) {
    return <ProductDetailClient product={null} relatedProducts={[]} />;
  }
  
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
};

export default ProductDetail;