'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  // cart state not used in this component; omit to avoid unused variable
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
                <Image 
                  src="/marwari logo.png" 
                  alt="Marwari Luxe" 
                  className="object-contain" 
                  width={60}
                  height={60}
                  priority
                />
                <span className="text-2xl sm:text-3xl font-bold text-black">Marwari Luxe</span>
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
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors text-sm lg:text-base touch-target py-2 px-3"
                aria-haspopup="true"
                aria-expanded={isCategoriesOpen}
              >
                Categories
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
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
                </div>
              )}
            </div>

            <Link href="/blogs" className="text-gray-700 hover:text-purple-600 transition-colors text-sm lg:text-base">
              Blogs
            </Link>

            {/* Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors text-sm lg:text-base touch-target py-2 px-3"
                aria-haspopup="true"
                aria-expanded={isToolsOpen}
              >
                Tools
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {isToolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
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
                </div>
              )}
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
              className="text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-md hover:bg-gray-100 touch-target"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 touch-target"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/categories/health"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 touch-target"
              onClick={closeMenu}
            >
              🏥 Health & Wellness
            </Link>
            <Link
              href="/categories/beauty"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 touch-target"
              onClick={closeMenu}
            >
              💄 Beauty & Cosmetics
            </Link>
            <Link
              href="/products"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 touch-target"
              onClick={closeMenu}
            >
              🛍️ All Products
            </Link>
            <Link
              href="/blogs"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 touch-target"
              onClick={closeMenu}
            >
              Blogs
            </Link>
            <Link
              href="/tools/health"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 touch-target"
              onClick={closeMenu}
            >
              Health Tools
            </Link>
            <Link
              href="/tools/beauty"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 touch-target"
              onClick={closeMenu}
            >
              Beauty Tools
            </Link>
            <Link
              href="/tools/general"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 touch-target"
              onClick={closeMenu}
            >
              General Tools
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 touch-target"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;