'use client';

import React from 'react';
import Link from 'next/link';
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
    { number: "25+", label: "Premium Products" },
    { number: "50+", label: "Countries Served" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/images/team/sarah.jpg",
      description: "Health & wellness expert with 15+ years experience in premium product curation."
    },
    {
      name: "Dr. Michael Chen",
      role: "Chief Health Officer",
      image: "/images/team/michael.jpg", 
      description: "Licensed physician specializing in preventive medicine and nutritional wellness."
    },
    {
      name: "Emma Rodriguez",
      role: "Beauty Specialist",
      image: "/images/team/emma.jpg",
      description: "Certified cosmetologist with expertise in natural and organic beauty products."
    }
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
              Your trusted partner in premium health supplements, natural beauty products, and wellness tools. 
              Dedicated to enhancing your wellness journey with scientifically-backed, high-quality products 
              that combine traditional Marwari heritage with modern innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story - Marwari Heritage Meets Modern Wellness
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, Marwari Luxe began as a passionate mission to make premium health supplements, 
                  natural beauty products, and wellness tools accessible to health-conscious consumers worldwide. 
                  Our founders recognized the growing need for a trusted e-commerce platform that combines 
                  quality assurance, authentic ingredients, and exceptional customer service in the health and beauty industry.
                </p>
                <p>
                  What started as a carefully curated collection of handpicked wellness products has evolved into 
                  a comprehensive online marketplace serving thousands of customers across 50+ countries. We believe 
                  that everyone deserves access to premium health supplements, organic skincare products, and 
                  evidence-based wellness tools that enhance natural beauty and support optimal health outcomes.
                </p>
                <p>
                  Today, Marwari Luxe continues expanding our global reach while maintaining unwavering commitment 
                  to product quality, ingredient transparency, and customer satisfaction. Every health supplement, 
                  beauty product, and wellness tool we offer is meticulously selected by our team of certified 
                  health experts who understand the critical importance of purity, effectiveness, and safety 
                  in wellness products.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To empower individuals on their wellness journey by providing access to 
                  premium, authentic health and beauty products that enhance natural beauty 
                  and promote overall well-being.
                </p>
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
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make.
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
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and customer satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-purple-100 text-sm md:text-base">
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
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate experts behind Marwari Luxe, dedicated to bringing you the best in health and beauty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-64 bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
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