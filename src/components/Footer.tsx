'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blogs', href: '/blogs' },
  ];

  const categoryLinks = [
    { name: 'Health & Wellness', href: '/categories/health', icon: '🏥' },
    { name: 'Beauty & Cosmetics', href: '/categories/beauty', icon: '💄' },
    { name: 'Health Tools', href: '/tools/health', icon: '⚕️' },
    { name: 'Beauty Tools', href: '/tools/beauty', icon: '✨' },
    { name: 'General Tools', href: '/tools/general', icon: '🔧' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/legal/privacy-policy' },
    { name: 'Terms & Conditions', href: '/legal/terms' },
    { name: 'Refund Policy', href: '/legal/refund-policy' },
    { name: 'Disclaimer', href: '/legal/disclaimer' },
    { name: 'FAQ', href: '/legal/faq' },
  ];

  // State for scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll event to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // social icons removed to avoid unused-symbol warnings

  const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );

  return (
    <footer className="bg-gray-900 text-white safe-area-inset-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div>
              {/* Footer Logo - Multiple Options */}
              <h3 className="text-xl sm:text-2xl font-bold text-purple-400 mb-3 sm:mb-4">Marwari Luxe</h3>
              
              {/* Option 1: Add logo image (uncomment to use) */}
              {/* <div className="flex items-center mb-3 sm:mb-4">
                <img src="/logo-white.png" alt="Marwari Luxe" className="h-8 mr-2" />
                <h3 className="text-xl sm:text-2xl font-bold text-purple-400">Marwari Luxe</h3>
              </div> */}
              
              {/* Option 2: Add icon with text (uncomment to use) */}
              {/* <div className="flex items-center mb-3 sm:mb-4">
                <span className="text-3xl mr-2">💎</span>
                <h3 className="text-xl sm:text-2xl font-bold text-purple-400">Marwari Luxe</h3>
              </div> */}
              <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                Your trusted destination for premium health and beauty products. 
                We&apos;re committed to providing high-quality products that enhance 
                your wellness journey and natural beauty.
              </p>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors block py-3 px-3 rounded-md hover:bg-gray-800 text-sm sm:text-base touch-target"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Categories</h4>
              <ul className="space-y-2">
                {categoryLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors block py-3 px-3 rounded-md hover:bg-gray-800 text-sm sm:text-base flex items-center touch-target"
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors block py-3 px-3 rounded-md hover:bg-gray-800 text-sm sm:text-base touch-target"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="mb-4 lg:mb-0">
              <h4 className="text-base sm:text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                Subscribe to our newsletter for the latest health and beauty tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-md text-gray-900 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 touch-target"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition-colors font-medium touch-target">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Marwari Luxe. All rights reserved.</p>
          <p className="mt-1">Designed with ❤️ for your wellness journey</p>
          
          {/* Scroll to Top Button - Always rendered to prevent hydration mismatch */}
          <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 z-50 ${
              showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            aria-label="Scroll to top"
          >
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;