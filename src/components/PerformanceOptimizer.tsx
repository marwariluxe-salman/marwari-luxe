'use client';

import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical images with proper LCP optimization
    const preloadImages = () => {
      const images = [
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto:good,w_1600,dpr_auto,c_fill,g_auto/v1762471377/1_pllyfb.jpg',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto:good,w_800,dpr_auto,c_fill,g_auto/v1761864930/Marwari-luxe_dnwxfa.jpg',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto:good,w_800,dpr_auto,c_fill,g_auto/v1761863551/blog2-3_vldipi.png',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto:good,w_600,dpr_auto,c_fill,g_auto/v1762817015/1_pllyfb.png',
        'https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto:good,w_600,dpr_auto,c_fill,g_auto/v1762817052/2_gnrg7c.png'
      ];

      images.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
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

    // Implement efficient lazy loading with better CLS prevention
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

    // Optimize animations for better performance
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

    // Implement efficient font loading with better FOUT handling
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

    // Optimize image loading with CLS prevention
    const optimizeImageLoading = () => {
      // Add loading="lazy" to all images that don't have it
      document.querySelectorAll('img:not([loading]):not([priority])').forEach(img => {
        // Don't lazy load above-the-fold images
        const rect = (img as HTMLElement).getBoundingClientRect();
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

    // Fix CLS issues by reserving space for ads and dynamic content
    const fixCLS = () => {
      // Reserve space for ad containers to prevent layout shifts
      const adContainers = document.querySelectorAll('[class*="ad"], [class*="advertisement"]');
      adContainers.forEach(container => {
        const el = container as HTMLElement;
        // Set explicit dimensions to prevent CLS
        if (!el.style.height) {
          el.style.height = '250px'; // Standard ad height
        }
        if (!el.style.minHeight) {
          el.style.minHeight = '250px';
        }
        el.style.backgroundColor = '#f3f4f6'; // Light gray background
      });

      // Reserve space for images without dimensions
      const imagesWithoutDimensions = document.querySelectorAll('img:not([width]):not([height])');
      imagesWithoutDimensions.forEach(imgElement => {
        const img = imgElement as HTMLImageElement;
        // Wait for image to load to get natural dimensions
        img.onload = () => {
          const { naturalWidth, naturalHeight } = img;
          if (naturalWidth && naturalHeight) {
            // Set aspect ratio to prevent CLS when image loads
            const aspectRatio = naturalHeight / naturalWidth;
            if (img.parentElement) {
              img.parentElement.style.setProperty('--img-aspect-ratio', aspectRatio.toString());
            }
            img.style.aspectRatio = aspectRatio.toString();
          }
        };
      });

      // Add CSS for aspect ratio preservation
      const aspectRatioCSS = document.createElement('style');
      aspectRatioCSS.textContent = `
        img {
          aspect-ratio: var(--img-aspect-ratio, auto);
          object-fit: cover;
        }
      `;
      document.head.appendChild(aspectRatioCSS);
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
    fixCLS();

    // Cleanup function
    return () => {
      // Remove any added elements if needed
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;