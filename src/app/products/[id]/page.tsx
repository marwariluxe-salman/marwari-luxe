'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { allProducts } from '@/data/products';
import { Product } from '@/types';
import Image from 'next/image';
import AdUnit from '@/components/AdUnit';

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Demo sales data - different for each product
  const getDemoSales = (productId: string) => {
    const salesData = {
      'health-001': 1247,
      'health-002': 892,
      'health-003': 1563,
      'beauty-001': 2103,
      'beauty-002': 1789,
      'beauty-003': 956,
      default: Math.floor(Math.random() * 2000) + 500
    };
    return salesData[productId as keyof typeof salesData] || salesData.default;
  };

  // Generate 5 product images
  const getProductImages = (product: Product) => {
    return [
      product.image,
      product.image.replace('300&h=300', '400&h=400'),
      product.image.replace('300&h=300', '500&h=500'),
      product.image.replace('300&h=300', '600&h=600'),
      product.image.replace('300&h=300', '350&h=350'),
    ];
  };

  // Generate detailed product descriptions (300 words each)
  const getDetailedDescription = (product: Product) => {
    const descriptions = {
      'health-001': `This Premium Multivitamin Complex represents the pinnacle of nutritional science, carefully formulated to address the comprehensive wellness needs of modern individuals. Our advanced formula contains 25 essential vitamins and minerals in their most bioavailable forms, ensuring maximum absorption and utilization by your body.

Each capsule delivers optimal doses of Vitamin A for vision and immune support, Vitamin C for antioxidant protection and collagen synthesis, Vitamin D3 for bone health and immune function, and the complete B-complex family for energy metabolism and nervous system support. Essential minerals including iron, zinc, magnesium, and calcium work synergistically to support everything from muscle function to cognitive performance.

What sets this multivitamin apart is our proprietary absorption technology, which includes natural enhancers like black pepper extract and organic acids to maximize nutrient uptake. Unlike synthetic alternatives, our vitamins are derived from whole food sources whenever possible, providing the cofactors and phytonutrients your body recognizes and utilizes most effectively.

Manufactured in FDA-approved facilities with rigorous third-party testing for purity and potency, this supplement is free from artificial colors, flavors, and common allergens. The delayed-release capsules ensure optimal timing of nutrient delivery throughout your day, supporting sustained energy levels and comprehensive health maintenance.

Whether you're an active professional, fitness enthusiast, or simply committed to maintaining optimal health, this multivitamin provides the nutritional insurance your body needs to thrive in today's demanding world.`,
      
      'beauty-001': `Our Hydrating Face Serum combines cutting-edge skincare science with nature's most powerful hydrating ingredients to deliver transformative results for all skin types. This luxurious serum features a potent blend of low and high molecular weight hyaluronic acid, capable of holding up to 1000 times its weight in water for unprecedented hydration.

The star ingredient, stabilized Vitamin C (L-Ascorbic Acid), works at the cellular level to brighten skin tone, reduce hyperpigmentation, and stimulate collagen production for firmer, more youthful-looking skin. Our proprietary delivery system ensures maximum penetration and stability, preventing oxidation while maintaining potency.

Complementing these actives are niacinamide for pore refinement and oil control, peptides for anti-aging benefits, and botanical extracts including green tea and chamomile for their soothing and antioxidant properties. The lightweight, fast-absorbing formula layers beautifully under makeup or moisturizer without pilling or greasiness.

Clinical studies demonstrate visible improvements in skin hydration (up to 72% increase), brightness, and fine line reduction within just 4 weeks of consistent use. The serum's pH-balanced formula (5.5-6.0) maintains your skin's natural acid mantle while delivering powerful actives safely and effectively.

Free from parabens, sulfates, and artificial fragrances, this serum is suitable for sensitive skin and has been dermatologist-tested for safety. The airless pump packaging preserves ingredient integrity while providing precise, hygienic dispensing for optimal results with every application.`,
      
      default: `This premium product represents years of research and development, combining the finest natural ingredients with cutting-edge scientific innovation. Our commitment to quality ensures that every batch meets the highest standards of purity, potency, and safety.

Carefully sourced from trusted suppliers worldwide, each ingredient undergoes rigorous testing and quality control measures. Our manufacturing processes follow strict GMP (Good Manufacturing Practice) guidelines in state-of-the-art facilities that are regularly inspected and certified by independent third parties.

The unique formulation addresses specific health and wellness needs through a synergistic blend of active compounds that work together to deliver optimal results. Whether supporting your daily nutritional requirements or addressing specific health goals, this product provides comprehensive benefits backed by scientific research.

Our dedication to transparency means complete ingredient disclosure with detailed explanations of each component's role and benefits. We believe in empowering our customers with knowledge about what they're putting into their bodies, ensuring informed decisions about their health and wellness journey.

With thousands of satisfied customers worldwide, this product has established itself as a trusted choice for those who refuse to compromise on quality. From sourcing to packaging, every step reflects our unwavering commitment to excellence and your well-being.`
    };
    
    return descriptions[product.id as keyof typeof descriptions] || descriptions.default;
  };

  useEffect(() => {
    if (params.id) {
      const foundProduct = allProducts.find(p => p.id === params.id);
      setProduct(foundProduct || null);
      
      if (foundProduct) {
        const related = allProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const productImages = getProductImages(product);
  const demoSales = getDemoSales(product.id);
  const detailedDescription = getDetailedDescription(product);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <Link href="/products" className="text-purple-600 hover:text-purple-700">
            Products
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-lg shadow-lg h-96"
            >
              <Image
                src={productImages[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={80}
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
              />
            </motion.div>
            
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded border-2 transition-all duration-200 ${
                    selectedImage === index 
                      ? 'border-purple-500 ring-2 ring-purple-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="relative w-full h-16">
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                      quality={60}
                      loading="lazy"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                product.category === 'Health' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-pink-100 text-pink-800'
              }`}>
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4"
            >
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-xl">🔥</span>
                <span className="text-green-800 font-semibold">
                  {demoSales.toLocaleString()} people bought this product
                </span>
              </div>
            </motion.div>

            {/* Ad Unit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="my-6"
            >
              <AdUnit slot="1234567891" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-purple-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              {product.originalPrice && (
                <div className="text-green-600 font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </div>
              )}
              
              <span className="text-purple-600 font-medium">Note: Shipping charges will be applied based on your country. The listed price does not include shipping fees.</span>
            </motion.div>

            

            {/* Affiliate Link Button - Replaces Buy Now */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-4"
            >

              <div className="space-y-3">
                <a
                  href={product.affiliateLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center block"
                >
                  Buy Now - ${product.price.toFixed(2)}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center space-x-2"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-medium">In Stock - Ready to Ship</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {detailedDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="200px"
                        quality={70}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedProduct.title}
                      </h3>
                      <div className="text-lg font-bold text-purple-600">
                        ${relatedProduct.price}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;