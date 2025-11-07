'use client';
import { useEffect } from 'react';

export default function AdUnit({
  slot,
  layout = 'in-article',
  format = 'fluid',
  className = '',
}: {
  slot: string;
  layout?: string;
  format?: string;
  className?: string;
}) {
  useEffect(() => {
    // Only initialize ads after the main content has loaded
    const initAds = () => {
      try {
        // @ts-expect-error - adsbygoogle is not in TypeScript types
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e: unknown) {
        console.log('AdSense error:', e);
      }
    };

    // Defer ad loading to improve LCP
    if (typeof window !== 'undefined') {
      // Use requestIdleCallback if available for better performance
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(initAds, { timeout: 1000 });
      } else {
        // Fallback to setTimeout
        setTimeout(initAds, 100);
      }
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', textAlign: 'center' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
      data-ad-slot={slot}
      data-ad-layout={layout}
      data-ad-format={format}
      data-full-width-responsive="true"
    ></ins>
  );
}