'use client';

import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical images
    const preloadImages = () => {
      const images = [
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_1600,dpr_auto,c_fill,g_auto/v1762471377/1_pllyfb.jpg',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864930/Marwari-luxe_dnwxfa.jpg',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863551/blog2-3_vldipi.png'
      ];

      images.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize resource loading
    const optimizeResourceLoading = () => {
      // Add resource hints for critical third-party domains
      const domains = [
        'https://res.cloudinary.com',
        'https://pagead2.googlesyndication.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Implement efficient lazy loading
    const implementLazyLoading = () => {
      // Use Intersection Observer for better lazy loading
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              observer.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Reduce main thread work
    const reduceMainThreadWork = () => {
      // Defer non-critical JavaScript
      const scripts = document.querySelectorAll('script[data-defer]');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.getAttribute('src') || '';
        newScript.async = true;
        document.body.appendChild(newScript);
        script.remove();
      });
    };

    // Optimize animations
    const optimizeAnimations = () => {
      // Use transform and opacity for better performance
      const style = document.createElement('style');
      style.textContent = `
        .will-change-transform {
          will-change: transform;
        }
        .will-change-opacity {
          will-change: opacity;
        }
      `;
      document.head.appendChild(style);
    };

    // Execute optimizations
    preloadImages();
    optimizeResourceLoading();
    implementLazyLoading();
    reduceMainThreadWork();
    optimizeAnimations();

    // Cleanup function
    return () => {
      // Remove any added elements if needed
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;