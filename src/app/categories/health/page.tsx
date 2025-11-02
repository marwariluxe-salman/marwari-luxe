'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { healthTools } from '@/data/tools';
import AdSpace from '@/components/AdSpace';

const HealthCategoryPage = () => {
  const healthImages = [
    {
      src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
      alt: "Healthy lifestyle with fruits and vegetables",
      title: "Nutrition & Diet"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      alt: "Fitness and exercise equipment",
      title: "Fitness & Exercise"
    },
    {
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=300&fit=crop",
      alt: "Meditation and mental wellness",
      title: "Mental Wellness"
    },
    {
      src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&h=300&fit=crop",
      alt: "Medical consultation and healthcare",
      title: "Healthcare Services"
    },
    {
      src: "https://images.unsplash.com/photo-1594824388853-e4d1acf75d1c?w=500&h=300&fit=crop",
      alt: "Healthy supplements and vitamins",
      title: "Supplements & Vitamins"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              🏥 Health & Wellness
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Discover premium health products, expert wellness advice, and comprehensive tools to enhance your physical and mental well-being. Your journey to optimal health starts here.
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
              <div className="text-4xl font-bold text-green-600 mb-2">{healthTools.length}+</div>
              <p className="text-gray-600">Health Tools</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
              <p className="text-gray-600">Health Products</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">50k+</div>
              <p className="text-gray-600">Happy Customers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <p className="text-gray-600">Expert Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Health Categories with Images */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Health Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our extensive range of health and wellness solutions designed to support every aspect of your well-being.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthImages.map((image, index) => (
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
                    Discover premium products and expert guidance for {image.title.toLowerCase()}.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    Explore Products →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Education Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Health Education & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering you with knowledge and tools to make informed health decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Guides</h2>
              <p className="text-gray-600 mb-4">
                Comprehensive guides on nutrition, exercise, mental health, and preventive care written by medical professionals.
              </p>
              <Link href="/blogs" className="text-green-600 hover:text-green-700 font-medium">
                Read Health Guides →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">🛍️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Products</h2>
              <p className="text-gray-600 mb-4">
                Discover our curated selection of premium health products designed to enhance your wellness journey.
              </p>
              <Link href="/products" className="text-green-600 hover:text-green-700 font-medium">
                Explore Products →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">⚕️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Tools</h2>
              <p className="text-gray-600 mb-4">
                Professional health tools and calculators to monitor and improve your wellness metrics.
              </p>
              <Link href="/tools/health" className="text-green-600 hover:text-green-700 font-medium">
                Try Health Tools →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Health Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Health Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade health calculators and assessment tools to monitor and improve your wellness.
            </p>
          </motion.div>

          <AdSpace size="rectangle" position="middle" className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthTools.filter(tool => tool.featured).map((tool, index) => (
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
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Try Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tools/health"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
            >
              View All Health Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Health Tips
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional advice from healthcare experts to help you live your healthiest life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Hydrated</h3>
              <p className="text-gray-600">
                Drink at least 8 glasses of water daily. Use our Water Intake Calculator to find your personalized hydration needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">🏃</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Regular Exercise</h3>
              <p className="text-gray-600">
                Aim for 150 minutes of moderate exercise weekly. Calculate your target heart rate zones for optimal workouts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">😴</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Sleep</h3>
              <p className="text-gray-600">
                Get 7-9 hours of quality sleep nightly. Use our Sleep Cycle Calculator to optimize your rest schedule.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their health with our premium products and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/products"
                className="bg-white text-green-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Shop Health Products
              </Link>
              <Link
                href="/tools/health"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Try Health Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HealthCategoryPage;