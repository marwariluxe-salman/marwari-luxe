'use client';

import { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Check if window is defined (browser environment)
      if (typeof window !== 'undefined') {
        // Show button when scrolled down 50px
        if (window.pageYOffset > 50) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Only add event listener in browser environment
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility);
      
      // Check on initial load
      toggleVisibility();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', toggleVisibility);
      }
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        backgroundColor: '#9333ea',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        fontSize: '24px',
        fontWeight: 'bold'
      }}
      className="touch-target"
    >
      ↑
    </button>
  );
};

export default BackToTopButton;