'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { beautyTools } from '@/data/tools';


const BeautyToolsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Beauty Tools & Analyzers
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto">
              Discover your perfect beauty routine with our expert-designed tools and analyzers. 
              Get personalized recommendations for skincare, makeup, and hair care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Count */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block bg-pink-100 text-pink-800 px-6 py-3 rounded-full font-medium">
              💄 {beautyTools.length} Beauty Tools Available
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {beautyTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6 text-center">
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tool.icon}
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {tool.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                      {tool.category}
                    </span>
                  </div>
                  
                  {tool.featured && (
                    <div className="mb-4">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                        ⭐ Featured
                      </span>
                    </div>
                  )}
                  
                  <Link
                    href={`/tools/${tool.id}`}
                    className="block w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                  >
                    Use Tool
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Beauty Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Beauty Tools?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our beauty analyzers are developed with dermatologists and beauty experts to give you professional-grade insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center p-6"
            >
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert-Developed
              </h3>
              <p className="text-gray-600">
                Created in collaboration with dermatologists and beauty professionals for accurate assessments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="text-4xl mb-4">💫</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Personalized Advice
              </h3>
              <p className="text-gray-600">
                Get customized beauty routines and product recommendations tailored to your unique needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6"
            >
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Always Updated
              </h3>
              <p className="text-gray-600">
                Our tools are regularly updated with the latest beauty trends and scientific research.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Beauty Categories */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Beauty Categories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-3xl mb-3">🧴</div>
              <h3 className="font-semibold text-gray-900 mb-2">Skincare</h3>
              <p className="text-sm text-gray-600">Skin type analysis, routine builder</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-3xl mb-3">💄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Makeup</h3>
              <p className="text-sm text-gray-600">Shade matching, color palettes</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-3xl mb-3">💇</div>
              <h3 className="font-semibold text-gray-900 mb-2">Hair Care</h3>
              <p className="text-sm text-gray-600">Hair type analysis, care tips</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-3xl mb-3">🌞</div>
              <h3 className="font-semibold text-gray-900 mb-2">Sun Protection</h3>
              <p className="text-sm text-gray-600">SPF calculator, skin protection</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beauty Tips Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Beauty Tips & Insights
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💡 Pro Tip</h3>
              <p className="text-gray-700">
                Use our Skin Type Analyzer before building your skincare routine to ensure you choose products that work best for your unique skin needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎨 Color Match</h3>
              <p className="text-gray-700">
                Our Foundation Shade Finder helps you find your perfect match across multiple brands, saving you time and money on returns.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Your Perfect Beauty Routine
            </h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Unlock your beauty potential with our personalized tools and expert recommendations for radiant skin and perfect makeup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View All Tools
              </Link>
              <Link
                href="/tools/health"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
              >
                Health Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BeautyToolsPage;