'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  const slides = [
    {
      id: 1,
      title: 'Premium Health Supplements & Wellness Products',
      subtitle: 'Discover scientifically-backed vitamins, minerals & supplements that transform your daily wellness routine. Shop 25+ premium products.',
      image: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_fill,g_auto/v1762471377/1_pllyfb.jpg',
      cta: 'Shop Health Supplements',
      link: '/products',
    },
    {
      id: 2,
      title: 'Natural Anti-Aging Beauty Solutions',
      subtitle: 'Embrace your natural glow with our expert-curated collection of organic skincare, anti-aging serums & cruelty-free beauty essentials.',
      image: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_fill,g_auto/v1762471377/2_gnrg7c.jpg',
      cta: 'Explore Natural Beauty',
      link: '/categories/beauty',
    },
    {
      id: 3,
      title: 'Health Calculators & Wellness Tools',
      subtitle: 'Access 25+ powerful health calculators, BMI tools & fitness trackers to optimize your wellness journey with data-driven insights.',
      image: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_fill,g_auto/v1762471377/5_gifuma.jpg',
      cta: 'Try Wellness Tools',
      link: '/tools',
    },
    {
      id: 4,
      title: 'Expert Health & Beauty Insights Blog',
      subtitle: 'Read science-backed health advice, beauty tips & wellness guides from certified experts. 30+ comprehensive articles updated regularly.',
      image: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_fill,g_auto/v1762471377/3_x5umfy.jpg',
      cta: 'Read Expert Blogs',
      link: '/blogs',
    },
    {
      id: 5,
      title: 'Marwari Heritage Meets Modern Wellness',
      subtitle: 'Experience timeless Ayurvedic wisdom combined with cutting-edge health innovation. Discover our heritage-inspired wellness philosophy.',
      image: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_fill,g_auto/v1762471378/4_seitcm.jpg',
      cta: 'Discover Our Story',
      link: '/about',
    },
    // ADD YOUR CUSTOM SLIDES HERE:
    // {
    //   id: 6,
    //   title: 'Your Custom Title',
    //   subtitle: 'Your custom subtitle description',
    //   image: '/your-custom-image.jpg', // Place image in public folder
    //   cta: 'Your Button Text',
    // },
  ];

  useEffect(() => {
    setIsHydrated(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Fix: Only render floating animation elements on client after mount
  const [floatingPositions, setFloatingPositions] = useState<{left: number; top: number; duration: number; delay: number}[]>([]);

  useEffect(() => {
    if (isHydrated) {
      const positions = Array.from({ length: 6 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }));
      setFloatingPositions(positions);
    }
  }, [isHydrated]);

  // Fix for image sizing - ensure full screen display
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          fill
          priority={currentSlide === 0} // Ensure first slide is prioritized
          className="object-cover w-full h-full"
          sizes="100vw"
          quality={80} // Reduced quality for faster loading
          fetchPriority={currentSlide === 0 ? "high" : "auto"} // Add fetchpriority for LCP optimization
          // Optimize image delivery
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 mobile-text-3xl">
            {slides[currentSlide].title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-gray-200 mobile-text-lg px-2">
            {slides[currentSlide].subtitle}
          </p>
          <div>
            <Link
              href={slides[currentSlide].link}
              className="mobile-btn bg-white/20 hover:bg-white/30 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 inline-block backdrop-blur-sm border border-white/30"
            >
              {slides[currentSlide].cta}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Kept but without purple color */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-colors z-20 p-1 sm:p-2 rounded-full bg-black/20 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-colors z-20 p-1 sm:p-2 rounded-full bg-black/20 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
      </button>

      {/* Floating Animation Elements (client-only) */}
      {isHydrated && floatingPositions.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {floatingPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/30 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* Slide indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;