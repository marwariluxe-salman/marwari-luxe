'use client';

import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical images
    const preloadImages = () => {
      const images = [
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_1600,dpr_auto,c_fill,g_auto/v1762471377/1_pllyfb.jpg',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864930/Marwari-luxe_dnwxfa.jpg',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761863551/blog2-3_vldipi.png',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_600,dpr_auto,c_fill,g_auto/v1762817015/1_pllyfb.png',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_600,dpr_auto,c_fill,g_auto/v1762817052/2_gnrg7c.png'
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
        'https://pagead2.googlesyndication.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];

      domains.forEach(domain => {
        // Check if preconnect link already exists
        if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          document.head.appendChild(link);
        }
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
        }, {
          rootMargin: '100px 0px', // Start loading 100px before entering viewport for smoother experience
          threshold: 0.01
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
        /* Optimize scrolling performance */
        .smooth-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      `;
      document.head.appendChild(style);
    };

    // Implement efficient font loading
    const optimizeFontLoading = () => {
      // Add font-display swap for better performance
      const fontStyles = document.createElement('style');
      fontStyles.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
      `;
      document.head.appendChild(fontStyles);
    };

    // Optimize image loading
    const optimizeImageLoading = () => {
      // Add loading="lazy" to all images that don't have it
      document.querySelectorAll('img:not([loading]):not([priority])').forEach(img => {
        // Don't lazy load above-the-fold images
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.5) { // Lazy load images below 50% of viewport
          img.setAttribute('loading', 'lazy');
        }
      });
    };

    // Implement efficient event handling
    const optimizeEventHandling = () => {
      // Use passive event listeners where possible
      const events = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
      events.forEach(event => {
        document.addEventListener(event, () => {}, { passive: true });
      });
    };

    // Optimize CSS delivery
    const optimizeCSSDelivery = () => {
      // Move non-critical CSS to load after critical content
      const nonCriticalStyles = document.querySelectorAll('link[rel="stylesheet"][data-non-critical]');
      nonCriticalStyles.forEach(element => {
        const link = element as HTMLLinkElement;
        link.setAttribute('media', 'print');
        link.addEventListener('load', () => {
          link.setAttribute('media', 'all');
        });
      });
    };

    // Implement efficient data fetching
    const optimizeDataFetching = () => {
      // Prefetch data for likely next pages
      const prefetchLinks = document.querySelectorAll('a[data-prefetch]');
      prefetchLinks.forEach(link => {
        const url = link.getAttribute('href');
        if (url) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = url;
          document.head.appendChild(prefetchLink);
        }
      });
      
      // Prefetch critical navigation paths
      const criticalPaths = ['/products', '/blogs', '/tools', '/categories/health', '/categories/beauty'];
      criticalPaths.forEach(path => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = path;
        document.head.appendChild(prefetchLink);
      });
    };

    // Execute optimizations
    preloadImages();
    optimizeResourceLoading();
    implementLazyLoading();
    reduceMainThreadWork();
    optimizeAnimations();
    optimizeFontLoading();
    optimizeImageLoading();
    optimizeEventHandling();
    optimizeCSSDelivery();
    optimizeDataFetching();

    // Cleanup function
    return () => {
      // Remove any added elements if needed
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;