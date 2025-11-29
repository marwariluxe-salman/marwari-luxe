'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, HeartIcon, ShieldCheckIcon, GlobeAltIcon, UsersIcon } from '@heroicons/react/24/outline';

const AboutPageClient = () => {
  const values = [
    {
      icon: <HeartIcon className="h-8 w-8 text-purple-600" />,
      title: "Customer-Centric",
      description: "Your wellness journey is our priority. We're committed to providing products and services that truly enhance your health and beauty."
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-green-600" />,
      title: "Quality Assurance",
      description: "Every product in our collection is carefully selected and tested to meet the highest standards of quality and safety."
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8 text-blue-600" />,
      title: "Global Reach",
      description: "Serving customers worldwide with international shipping and support for multiple currencies and payment methods."
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-orange-600" />,
      title: "Expert Team",
      description: "Our team of health and beauty experts continuously research and curate the best products for your needs."
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "50+", label: "Countries Served" },
    { number: "300+", label: "Curated Products" },
    { number: "25+", label: "Health Calculators" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Marwari Luxe - Premium Health & Beauty Experts
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Marwari Luxe is a global health and beauty platform dedicated to helping people look and feel their best. We combine science-backed advice with practical tips on skincare, nutrition, and wellness. Our mission is to inspire confidence, self-care, and a healthier lifestyle for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story - From Tradition to Innovation
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  Founded in 2020, Marwari Luxe emerged from a deep appreciation for the rich heritage of Ayurvedic wellness practices combined with modern scientific understanding. Our founders, inspired by generations of traditional healing wisdom, recognized the need for accessible, high-quality health and beauty solutions in today's fast-paced world.
                </p>
                <p>
                  We began as a small team passionate about bridging the gap between ancient wellness philosophies and contemporary lifestyle needs. Today, we've grown into a trusted platform serving thousands of customers worldwide, offering carefully curated products that honor both tradition and innovation.
                </p>
                <p>
                  Our journey has been guided by a commitment to authenticity, quality, and customer satisfaction. Every product in our collection undergoes rigorous testing and evaluation to ensure it meets our stringent standards for safety, efficacy, and ethical sourcing.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762816783/4_seitcm.png"
                  alt="Marwari Luxe Heritage"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do, from product selection to customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Numbers that reflect our commitment to enhancing wellness and beauty for people around the globe.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-purple-200">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to your health and beauty journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wellness Expert {item}
                </h3>
                <p className="text-purple-600 mb-3">
                  {item === 1 ? 'Chief Wellness Officer' : item === 2 ? 'Beauty Director' : 'Head of Product Curation'}
                </p>
                <p className="text-gray-600 text-sm">
                  {item === 1 
                    ? '15+ years in holistic health and Ayurvedic practices' 
                    : item === 2 
                    ? 'Certified cosmetologist with expertise in natural beauty' 
                    : 'Pharmaceutical background with focus on supplement quality'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Wellness Community
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Start your journey to better health and enhanced beauty with our premium products and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPageClient;