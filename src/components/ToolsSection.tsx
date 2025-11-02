'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { featuredTools } from '@/data/tools';

const ToolsSection = () => {
  // Take 3 health and 3 beauty tools
  const healthTools = featuredTools.filter(tool => tool.category === 'Health');
  const beautyTools = featuredTools.filter(tool => tool.category === 'Beauty');
  const displayTools = [...healthTools, ...beautyTools];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="mobile-text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Health & Beauty Tools
          </h2>
          <p className="mobile-text-base text-gray-600 max-w-2xl mx-auto px-4">
            Access our collection of powerful tools designed to help you make informed decisions about your health and beauty routine.
          </p>
        </motion.div>

        <div className="mobile-grid gap-4 sm:gap-6 lg:gap-8">
          {displayTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="mobile-card bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center">
                <motion.div
                  className="text-3xl sm:text-4xl mb-3 sm:mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {tool.icon}
                </motion.div>
                <h3 className="mobile-text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {tool.title}
                </h3>
                <p className="mobile-text-sm text-gray-600 mb-4 leading-relaxed">
                  {tool.description}
                </p>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    tool.category === 'Health' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {tool.category}
                  </span>
                </div>
                <Link
                  href={`/tools/${tool.id}`}
                  className="mobile-btn inline-block w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Use Tool
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link
            href="/tools"
            className="mobile-btn inline-flex items-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            View All Tools
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsSection;