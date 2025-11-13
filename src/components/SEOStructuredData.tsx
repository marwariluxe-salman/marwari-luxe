'use client';

import Script from 'next/script';

const SEOStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marwari Luxe",
    "url": "https://marwari-luxe-web.vercel.app",
    "logo": "https://marwari-luxe-web.vercel.app/marwari-logo.png",
    "description": "Premium health supplements, natural beauty products & wellness tools. Expert-curated collection for optimal health and beauty.",
    "sameAs": [
      "https://facebook.com/marwariluxe",
      "https://instagram.com/marwariluxe",
      "https://twitter.com/marwariluxe"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "marwariluxe@gmail.com"
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
      strategy="afterInteractive"
      suppressHydrationWarning
    />
  );
};

export default SEOStructuredData;