'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const IntroSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Welcome to{' '}
              <span className="text-purple-600">Marwari Luxe</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Marwari Luxe, we specialize in premium health supplements, natural beauty products, 
              and wellness tools that combine traditional Marwari wisdom with modern scientific research. 
              Our expert-curated collection includes high-quality vitamins, organic skincare essentials, 
              anti-aging serums, and comprehensive health calculators designed to optimize your wellness journey.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From ancient Ayurvedic principles to cutting-edge nutritional science, we bridge traditional 
              wellness practices with evidence-based health solutions. Every product undergoes rigorous 
              quality testing to ensure efficacy, safety, and purity. Whether you're seeking immune support 
              supplements, natural anti-aging skincare, or professional wellness tools, our collection 
              meets the highest standards of quality and authenticity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-4"
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                <div className="text-gray-600">Premium Health & Beauty Products</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center p-4"
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600">Satisfied Global Customers</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center p-4"
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                <div className="text-gray-600">Health & Fitness Tools</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image/Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-48"
              >
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
                  alt="Wellness Products"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-purple-600/20 rounded-lg"></div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-48 mt-8"
              >
                <Image
                  src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=200&fit=crop"
                  alt="Beauty Products"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-pink-600/20 rounded-lg"></div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-48 -mt-8"
              >
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
                  alt="Traditional Heritage"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-orange-600/20 rounded-lg"></div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-48"
              >
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
                  alt="Modern Innovation"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg"></div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center"
              animate={{
                y: [-10, 10],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-2xl">✨</span>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center"
              animate={{
                y: [10, -10],
                rotate: [360, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-xl">🌿</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;