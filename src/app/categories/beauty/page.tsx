'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { beautyTools } from '@/data/tools';
import AdSpace from '@/components/AdSpace';

const BeautyCategoryPage = () => {
  const beautyImages = [
    {
      src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=300&fit=crop",
      alt: "Skincare products and routine",
      title: "Skincare & Anti-Aging"
    },
    {
      src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=300&fit=crop",
      alt: "Professional makeup and cosmetics",
      title: "Makeup & Cosmetics"
    },
    {
      src: "https://images.unsplash.com/photo-1560869713-7d0b29837158?w=500&h=300&fit=crop",
      alt: "Hair care and styling",
      title: "Hair Care & Styling"
    },
    {
      src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=300&fit=crop",
      alt: "Nail care and manicure",
      title: "Nail Care & Art"
    },
    {
      src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=300&fit=crop",
      alt: "Natural beauty and organic products",
      title: "Natural & Organic Beauty"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              💄 Beauty & Cosmetics
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 max-w-4xl mx-auto leading-relaxed">
              Unleash your natural beauty with our premium cosmetics, expert beauty advice, and personalized tools. Transform your beauty routine with professional-grade products and cutting-edge techniques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSpace size="banner" position="top" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-pink-600 mb-2">{beautyTools.length}+</div>
              <p className="text-gray-600">Beauty Tools</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-pink-600 mb-2">25+</div>
              <p className="text-gray-600">Beauty Products</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-pink-600 mb-2">75k+</div>
              <p className="text-gray-600">Beauty Enthusiasts</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-pink-600 mb-2">100+</div>
              <p className="text-gray-600">Premium Brands</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beauty Categories with Images */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Premium Beauty Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our extensive collection of beauty products and services designed to enhance your natural radiance and boost your confidence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beautyImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Explore premium {image.title.toLowerCase()} products from top international brands.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Shop Collection →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beauty Education Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Beauty Education & Tutorials
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the art of beauty with expert tutorials, tips, and personalized guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">🎨</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Makeup Tutorials</h2>
              <p className="text-gray-600 mb-4">
                Step-by-step makeup tutorials from professional artists covering everything from everyday looks to special occasions.
              </p>
              <Link href="/blogs" className="text-pink-600 hover:text-pink-700 font-medium">
                Watch Tutorials →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-rose-50 p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">🛍️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Products</h2>
              <p className="text-gray-600 mb-4">
                Discover our curated selection of premium beauty products designed to enhance your natural radiance.
              </p>
              <Link href="/products" className="text-pink-600 hover:text-pink-700 font-medium">
                Explore Products →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">💅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Beauty Tools</h2>
              <p className="text-gray-600 mb-4">
                Professional beauty tools and analyzers to help you find your perfect beauty routine.
              </p>
              <Link href="/tools/beauty" className="text-pink-600 hover:text-pink-700 font-medium">
                Try Beauty Tools →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Beauty Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Beauty Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional beauty analyzers and personalized recommendation tools to help you find your perfect beauty routine.
            </p>
          </motion.div>

          <AdSpace size="rectangle" position="middle" className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beautyTools.filter(tool => tool.featured).map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-5xl mb-6">{tool.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{tool.title}</h3>
                  <p className="text-gray-600 mb-6">{tool.description}</p>
                  <Link
                    href={`/tools/${tool.id}`}
                    className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                  >
                    Try Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tools/beauty"
              className="inline-block bg-pink-600 text-white px-8 py-4 rounded-lg hover:bg-pink-700 transition-colors font-semibold text-lg"
            >
              View All Beauty Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Beauty Tips Section */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Beauty Tips
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional beauty advice from makeup artists and skincare experts to help you look and feel your best.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">🧴</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Know Your Skin</h3>
              <p className="text-gray-600">
                Understanding your skin type is crucial. Use our Skin Type Analyzer to build a personalized skincare routine.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">💄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect Foundation</h3>
              <p className="text-gray-600">
                Find your ideal foundation shade using our Foundation Shade Finder. Test multiple brands and formulas easily.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">🌞</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sun Protection</h3>
              <p className="text-gray-600">
                Daily SPF is essential for healthy skin. Calculate your optimal sun protection with our SPF Calculator.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest Beauty Trends
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest beauty trends and must-have products loved by beauty enthusiasts worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-xl"
            >
              <div className="text-3xl mb-4">✨</div>
              <h3 className="font-bold text-gray-900 mb-2">Glow Serums</h3>
              <p className="text-sm text-gray-600">Vitamin C & Hyaluronic Acid</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl"
            >
              <div className="text-3xl mb-4">💋</div>
              <h3 className="font-bold text-gray-900 mb-2">Liquid Lipsticks</h3>
              <p className="text-sm text-gray-600">Long-lasting & Transfer-proof</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-rose-100 to-pink-100 p-6 rounded-xl"
            >
              <div className="text-3xl mb-4">👁️</div>
              <h3 className="font-bold text-gray-900 mb-2">Eye Palettes</h3>
              <p className="text-sm text-gray-600">Neutral & Bold Collections</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-xl"
            >
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="font-bold text-gray-900 mb-2">Blush & Bronzer</h3>
              <p className="text-sm text-gray-600">Natural & Sculpting Shades</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Your Perfect Beauty Routine
            </h2>
            <p className="text-xl text-pink-100 mb-10 max-w-3xl mx-auto">
              Join our community of beauty lovers and unlock your full potential with personalized recommendations and premium products.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/products"
                className="bg-white text-pink-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Shop Beauty Products
              </Link>
              <Link
                href="/tools/beauty"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-pink-600 transition-colors"
              >
                Try Beauty Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BeautyCategoryPage;