'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const { state: cartState } = useCart();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex-shrink-0">
              {/* Option 1: Text Logo (Current) */}
              {/* <span className="text-xl sm:text-2xl font-bold text-purple-600">Marwari Luxe</span> */}
              
              {/* Option 2: Image Logo (Uncomment to use) */}
              {/* <img 
                src="/marwari logo.png" 
                alt="Marwari Luxe" 
                className="h-8 sm:h-10 w-auto" 
              /> */}
              
              {/* Option 3: Combined Logo (Text + Icon) */}
              <div className="flex items-center space-x-3">
                <img 
                  src="/marwari logo.png" 
                  alt="Marwari Luxe" 
                  className="h-8 sm:h-10 w-auto object-contain" 
                  width={40}
                  height={40}
                />
                <span className="text-xl sm:text-2xl font-bold text-black">Marwari Luxe</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors text-sm lg:text-base">
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors text-sm lg:text-base"
                aria-haspopup="true"
                aria-expanded={isCategoriesOpen}
              >
                Categories
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10"
                  >
                    <Link
                      href="/categories/health"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      🏥 Health & Wellness
                    </Link>
                    <Link
                      href="/categories/beauty"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      💄 Beauty & Cosmetics
                    </Link>
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      🛍️ All Products
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/blogs" className="text-gray-700 hover:text-purple-600 transition-colors text-sm lg:text-base">
              Blogs
            </Link>

            {/* Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors text-sm lg:text-base"
                aria-haspopup="true"
                aria-expanded={isToolsOpen}
              >
                Tools
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10"
                  >
                    <Link
                      href="/tools/health"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      onClick={() => setIsToolsOpen(false)}
                    >
                      Health Tools
                    </Link>
                    <Link
                      href="/tools/beauty"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      onClick={() => setIsToolsOpen(false)}
                    >
                      Beauty Tools
                    </Link>
                    <Link
                      href="/tools/general"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      onClick={() => setIsToolsOpen(false)}
                    >
                      General Tools
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition-colors text-sm lg:text-base">
              Contact
            </Link>

            <Link
              href="/checkout"
              className="relative bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center text-sm lg:text-base"
            >
              <span className="mr-1 sm:mr-2">🔗</span>
              <span className="hidden sm:inline">Social Media</span>
              <span className="sm:hidden">Social</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link
              href="/checkout"
              className="relative bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition-colors flex items-center mr-2"
              aria-label="Social Media"
            >
              <span>🔗</span>
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-md hover:bg-gray-100"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 safe-area-inset-left safe-area-inset-right"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <Link
                href="/"
                className="nav-link block px-3 py-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-md font-medium"
                onClick={closeMenu}
              >
                🏠 Home
              </Link>
              
              <div className="px-3 py-2">
                <span className="font-medium text-gray-900 block py-2">📂 Categories</span>
                <div className="ml-4 mt-1 space-y-1">
                  <Link
                    href="/categories/health"
                    className="nav-link block py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    🏥 Health & Wellness
                  </Link>
                  <Link
                    href="/categories/beauty"
                    className="nav-link block py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    💄 Beauty & Cosmetics
                  </Link>
                  <Link
                    href="/products"
                    className="nav-link block py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    🛍️ All Products
                  </Link>
                </div>
              </div>

              <Link
                href="/blogs"
                className="nav-link block px-3 py-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-md font-medium"
                onClick={closeMenu}
              >
                📖 Blogs
              </Link>

              <div className="px-3 py-2">
                <span className="font-medium text-gray-900 block py-2">🔧 Tools</span>
                <div className="ml-4 mt-1 space-y-1">
                  <Link
                    href="/tools/health"
                    className="nav-link block py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    🏥 Health Tools
                  </Link>
                  <Link
                    href="/tools/beauty"
                    className="nav-link block py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    💄 Beauty Tools
                  </Link>
                  <Link
                    href="/tools/general"
                    className="nav-link block py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    ⚙️ General Tools
                  </Link>
                </div>
              </div>

              <Link
                href="/contact"
                className="nav-link block px-3 py-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-md font-medium"
                onClick={closeMenu}
              >
                📞 Contact
              </Link>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link
                  href="/checkout"
                  className="mobile-btn relative block px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-3 text-center flex items-center justify-center font-medium"
                  onClick={closeMenu}
                >
                  <span className="mr-2">🔗</span>
                  Social Media
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;