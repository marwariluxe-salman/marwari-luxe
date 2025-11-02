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
    try {
      // @ts-expect-error - adsbygoogle is not in TypeScript types
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log('AdSense error:', e);
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