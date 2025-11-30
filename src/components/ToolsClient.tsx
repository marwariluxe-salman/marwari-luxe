'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Tool } from '@/types';

const ToolsClient = ({ tools, category }: { tools: Tool[]; category: string }) => {
  // Define colors based on category
  const getCategoryColors = () => {
    switch (category) {
      case 'Beauty':
        return {
          gradient: 'from-pink-600 to-purple-600',
          accent: 'pink',
          bgAccent: 'bg-pink-100',
          textAccent: 'text-pink-800',
          button: 'bg-pink-600 hover:bg-pink-700',
          ctaGradient: 'from-purple-600 to-pink-600'
        };
      case 'Health':
        return {
          gradient: 'from-green-600 to-blue-600',
          accent: 'green',
          bgAccent: 'bg-green-100',
          textAccent: 'text-green-800',
          button: 'bg-green-600 hover:bg-green-700',
          ctaGradient: 'from-blue-600 to-green-600'
        };
      case 'General':
        return {
          gradient: 'from-blue-600 to-indigo-600',
          accent: 'blue',
          bgAccent: 'bg-blue-100',
          textAccent: 'text-blue-800',
          button: 'bg-blue-600 hover:bg-blue-700',
          ctaGradient: 'from-indigo-600 to-blue-600'
        };
      default:
        return {
          gradient: 'from-purple-600 to-pink-600',
          accent: 'purple',
          bgAccent: 'bg-purple-100',
          textAccent: 'text-purple-800',
          button: 'bg-purple-600 hover:bg-purple-700',
          ctaGradient: 'from-pink-600 to-purple-600'
        };
    }
  };

  const colors = getCategoryColors();

  // Define features based on category
  const getFeatures = () => {
    switch (category) {
      case 'Beauty':
        return [
          {
            icon: '🔬',
            title: 'Expert-Developed',
            description: 'Created in collaboration with dermatologists and beauty professionals for accurate assessments.'
          },
          {
            icon: '💫',
            title: 'Personalized Advice',
            description: 'Get customized beauty routines and product recommendations tailored to your unique needs.'
          },
          {
            icon: '🌟',
            title: 'Always Updated',
            description: 'Our tools are regularly updated with the latest beauty trends and scientific research.'
          }
        ];
      case 'Health':
        return [
          {
            icon: '🩺',
            title: 'Medically Accurate',
            description: 'Based on WHO guidelines and peer-reviewed medical research for reliable health assessments.'
          },
          {
            icon: '📊',
            title: 'Personalized Results',
            description: 'Get customized recommendations based on your age, gender, activity level, and health goals.'
          },
          {
            icon: '🔒',
            title: 'Privacy Focused',
            description: 'Your health data stays private - all calculations are done locally on your device.'
          }
        ];
      case 'General':
        return [
          {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Get instant results without the need for downloads or complex software installations.'
          },
          {
            icon: '🛠️',
            title: 'Multi-Purpose',
            description: 'From calculations to text analysis, our tools cover a wide range of everyday needs.'
          },
          {
            icon: '🔧',
            title: 'Always Available',
            description: 'Access our tools anytime, anywhere with just your web browser - no apps required.'
          }
        ];
      default:
        // For "All" category, show a mix of features
        return [
          {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Get instant results without the need for downloads or complex software installations.'
          },
          {
            icon: '🛠️',
            title: 'Multi-Purpose',
            description: 'From calculations to text analysis, our tools cover a wide range of everyday needs.'
          },
          {
            icon: '🔧',
            title: 'Always Available',
            description: 'Access our tools anytime, anywhere with just your web browser - no apps required.'
          }
        ];
    }
  };

  const features = getFeatures();

  // Define CTA links based on category
  const getCtaLinks = () => {
    switch (category) {
      case 'Beauty':
        return {
          primary: { href: '/products', text: 'Shop Beauty Products' },
          secondary: { href: '/categories/beauty', text: 'Explore Beauty Tips' }
        };
      case 'Health':
        return {
          primary: { href: '/products', text: 'Shop Health Products' },
          secondary: { href: '/categories/health', text: 'Explore Health Tips' }
        };
      case 'General':
        return {
          primary: { href: '/products', text: 'Shop Products' },
          secondary: { href: '/blogs', text: 'Read Our Blog' }
        };
      default:
        return {
          primary: { href: '/products', text: 'Shop Products' },
          secondary: { href: '/blogs', text: 'Read Our Blog' }
        };
    }
  };

  const ctaLinks = getCtaLinks();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${colors.gradient} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {category} Tools & Analyzers
            </h1>
            <p className="text-xl md:text-2xl text-opacity-90 max-w-3xl mx-auto">
              {category === 'Beauty' && 'Discover your perfect beauty routine with our expert-designed tools and analyzers. Get personalized recommendations for skincare, makeup, and hair care.'}
              {category === 'Health' && 'Take control of your health with our scientifically-backed calculators and assessment tools. Monitor your fitness, nutrition, and overall wellness with precision.'}
              {category === 'General' && 'Boost your productivity with our collection of essential utility tools. From calculations to text analysis, we have the tools you need for daily tasks.'}
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
            <div className={`inline-block ${colors.bgAccent} ${colors.textAccent} px-6 py-3 rounded-full font-medium`}>
              {category === 'Beauty' && '💄'}
              {category === 'Health' && '🏥'}
              {category === 'General' && '⚙️'}
              {` ${tools.length} ${category} Tools Available`}
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
            {tools.map((tool, index) => (
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
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors.bgAccent} ${colors.textAccent}`}>
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
                    className={`block w-full ${colors.button} text-white py-2 px-4 rounded-lg transition-colors font-medium`}
                  >
                    Use Tool
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {category === 'Beauty' && 'Why Choose Our Beauty Tools?'}
              {category === 'Health' && 'Why Use Our Health Tools?'}
              {category === 'General' && 'Why Use Our General Tools?'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {category === 'Beauty' && 'Our beauty analyzers are developed with dermatologists and beauty experts to give you professional-grade insights.'}
              {category === 'Health' && 'Our health calculators are designed by medical professionals and based on established clinical guidelines.'}
              {category === 'General' && 'Our utility tools are designed for efficiency and ease of use, helping you complete daily tasks faster.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`bg-gradient-to-r ${colors.ctaGradient} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {category === 'Beauty' && 'Ready to Transform Your Beauty Routine?'}
              {category === 'Health' && 'Take Control of Your Health Journey'}
              {category === 'General' && 'Ready to Boost Your Productivity?'}
            </h2>
            <p className="text-xl text-opacity-90 mb-8 max-w-2xl mx-auto">
              {category === 'Beauty' && 'Join thousands of beauty enthusiasts who have discovered their perfect routine with our tools.'}
              {category === 'Health' && 'Join our community of wellness seekers who are taking control of their health with our tools.'}
              {category === 'General' && 'Join thousands of users who have boosted their productivity with our tools.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={ctaLinks.primary.href}
                className="bg-white text-opacity-90 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {ctaLinks.primary.text}
              </Link>
              <Link
                href={ctaLinks.secondary.href}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-opacity-90 transition-colors"
              >
                {ctaLinks.secondary.text}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ToolsClient;