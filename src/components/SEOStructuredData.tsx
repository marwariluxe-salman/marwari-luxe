'use client';

import Script from 'next/script';

interface SEOStructuredDataProps {
  type: 'Organization' | 'Product' | 'Article' | 'WebPage' | 'Store';
  data: Record<string, any>;
}

const SEOStructuredData = ({ type, data }: SEOStructuredDataProps) => {
  const generateStructuredData = () => {
    const baseData: any = {
      "@context": "https://schema.org",
      "@type": type,
      ...data
    };

    // Add organization data for all types
    if (type !== 'Organization') {
      baseData.publisher = {
        "@type": "Organization",
        "name": "Marwari Luxe",
        "url": "https://marwariluxe.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://marwariluxe.com/marwari-logo.png"
        }
      };
    }

    return JSON.stringify(baseData);
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: generateStructuredData()
      }}
    />
  );
};

export default SEOStructuredData;