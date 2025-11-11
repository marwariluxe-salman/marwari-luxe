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
    { number: "25+", label: "Premium Products" },
    { number: "50+", label: "Countries Served" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  const team = [
    {
      name: "Salman Marwari",
      role: "Founder & CEO",
      image: "https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_auto,dpr_auto/v1762293147/1_iqq4q6.jpg",
      description: "Salman Marwari is the Founder and CEO of Marwari Luxe, a trusted health and beauty platform. As a passionate health and beauty blogger, he creates research-based, easy-to-understand content on skincare, nutrition, and overall wellness. With years of experience in writing and digital health communication, Salman combines science and storytelling to help readers make smarter lifestyle choices. His vision is to build Marwari Luxe into a global brand that educates and inspires people to live healthier, more confident lives."
    },
    {
      name: "Dr. Sarfaraz Alam",
      role: "Chief Health Officer",
      image: "https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_auto,dpr_auto/v1762293147/2_k3mah0.jpg", 
      
      description: "Dr. Sarfaraz Alam is the Chief Health Officer at Marwari Luxe. He holds an MBBS degree with specialization in preventive medicine and nutrition. With over 10 years of medical practice, he ensures that all health-related content published on the platform follows accurate, evidence-based standards. His expertise bridges the gap between modern medicine and everyday wellness, making health information both credible and accessible for readers worldwide."
    },
    {
      name: "Dr. Farha Ali",
      role: "Beauty Specialist",
      image: "https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_auto,dpr_auto/v1762293147/3_obup78.jpg",
      description: "Dr. Farha Ali serves as the Beauty Specialist at Marwari Luxe. She holds a Doctorate in Cosmetic Science and is certified in Advanced Skin and Hair Care Formulations. With her strong background in dermatology and aesthetic medicine, Dr. Farha helps translate complex beauty science into practical advice. Her insights guide readers toward safer, more effective skincare routines while promoting confidence through knowledge and self-care."
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
              Marwari Luxe is a global health and beauty platform dedicated to helping people look and feel their best. We combine science-backed advice with practical tips on skincare, nutrition, and wellness. Our mission is to inspire confidence, self-care, and a healthier lifestyle for everyone.
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
                  Founded in 2020, Marwari Luxe started as a bold vision to make premium health supplements, natural beauty essentials, and modern wellness tools accessible worldwide. Our mission was simple—build a trusted platform that blends authenticity, quality, and customer care in the ever-evolving health and beauty industry.
                </p>
                <p>
                  What began as a handpicked collection of high-quality wellness products has grown into a global e-commerce brand serving thousands of loyal customers across 50+ countries. From organic skincare and herbal supplements to evidence-based wellness tools, every item we offer is carefully selected to support natural beauty and overall well-being.
                </p>
                <p>
                  At Marwari Luxe, we proudly partner with CJ Dropshipping and top affiliate marketing networks, allowing us to bring an ever-expanding range of verified, high-quality brands to our customers. These partnerships ensure we deliver genuine products, smooth fulfillment, and competitive prices—without compromising on trust or transparency.
                </p>
                <p>Today, we continue to grow our reach while staying true to our core values: ingredient transparency, scientific integrity, and customer satisfaction. Every product on our platform is reviewed by our team of certified health and beauty experts who ensure that each formula meets our strict standards of safety, purity, and effectiveness.</p>

                <p>Marwari Luxe is more than a brand—it’s a movement to help people look good, feel better, and live confidently with wellness backed by tradition and science.</p>

                <p>Discover Marwari Luxe — your trusted source for premium health supplements, organic beauty, and wellness tools. Partnered with CJ Dropshipping & affiliates.</p>
                <p>Marwari Luxe blends heritage and innovation to bring you premium health supplements, organic skincare, and wellness tools. As partners with CJ Dropshipping and leading affiliates, we deliver trusted, high-quality products designed to help you live healthier, look radiant, and feel your absolute best.</p>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission – Empowering Global Wellness with Integrity</h3>
                <p className="text-gray-700">
                  At Marwari Luxe, our mission is simple — to make science-backed health and beauty accessible to everyone. We believe wellness should be transparent, effective, and rooted in trust. Every product we offer is carefully evaluated for quality, safety, and proven results.
<br></br><br></br>
Through our partnerships with CJ Dropshipping and leading affiliate programs, we ensure our customers receive premium wellness products at fair prices, delivered worldwide.
<br></br><br></br>
Our goal is to build a trusted global community where people can discover natural solutions that truly work — products that enhance health, boost confidence, and celebrate authentic beauty.
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
                <div className="relative h-64 bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
                  {member.image ? (
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      className="object-cover"
                      fill
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextSibling = e.currentTarget.nextSibling;
                        if (nextSibling && nextSibling instanceof HTMLElement) {
                          nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                  ) : (
                    <div className="text-6xl">👤</div>
                  )}
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