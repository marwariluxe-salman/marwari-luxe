import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import { CartProvider } from '@/contexts/CartContext';
import BackToTopButton from '@/components/BackToTopButton';

const Footer = dynamic(() => import('@/components/Footer'));

// Use only one clean font for better performance
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap', // Add font-display swap for better performance
  weight: ['400', '500', '600', '700'], // Limit font weights for smaller bundle
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#9333ea' }, { media: '(prefers-color-scheme: dark)', color: '#7c3aed' }]
};

export const metadata: Metadata = {
  title: "Marwari Luxe - Premium Health & Beauty Products | Wellness Essentials Online Store",
  description: "Shop premium health supplements, natural beauty products & wellness tools at Marwari Luxe. Expert-curated skincare, vitamins, fitness accessories with free shipping over $50. Trusted by 10,000+ customers worldwide.",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  authors: [{ name: "Marwari Luxe Team", url: "https://marwari-luxe-web.vercel.app/about" }],
  keywords: "health supplements, natural beauty products, wellness tools, skincare essentials, vitamins minerals, fitness accessories, organic beauty, anti-aging products, immune support, weight management, hair care, skin care routine, health calculators, wellness blog, premium supplements, beauty serum, protein powder, probiotics, omega-3, vitamin D, collagen peptides, hyaluronic acid, retinol products, sunscreen SPF, natural ingredients, cruelty-free beauty, sustainable wellness, marwari heritage wellness",
  openGraph: {
    title: 'Marwari Luxe - Premium Health & Beauty Products | Wellness Essentials Store',
    description: 'Shop expert-curated health supplements, natural beauty products & wellness tools. Free shipping over $50. Trusted by 10,000+ customers worldwide.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Marwari Luxe',
    url: 'https://marwari-luxe-web.vercel.app',
    images: [{
      url: '/marwari-luxe-og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Marwari Luxe Premium Health and Beauty Products'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marwari Luxe - Premium Health & Beauty Products | Wellness Essentials',
    description: 'Shop expert-curated health supplements, natural beauty products & wellness tools. Free shipping over $50. Trusted by 10,000+ customers.',
    site: '@MarwariLuxe',
    creator: '@MarwariLuxe',
    images: ['/marwari-luxe-twitter-card.jpg']
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Marwari Luxe Wellness'
  },
  formatDetection: {
    telephone: false
  },
  alternates: {
    canonical: 'https://marwari-luxe-web.vercel.app'
  },
  category: 'Health & Beauty',
  classification: 'Business'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  // Ensure consistent serialization of structured data to prevent hydration mismatches
  const serializedStructuredData = JSON.stringify(structuredData);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="p:domain_verify" content="aab945e83f0913b86a2eb25bfc0f8ff8"/>
        <meta name="msapplication-TileColor" content="#9333ea" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXX" />
        
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TYSD6BMBCJ" strategy="beforeInteractive" />
        <Script id="gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TYSD6BMBCJ');
          `}
        </Script>
        
        {/* Preconnect to critical third-party domains */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        
        {/* Preload hero image */}
        <link rel="preload" as="image" href="https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_1600,dpr_auto,c_fill,g_auto/v1762471377/1_pllyfb.jpg" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        
        {/* Resource hints for better performance */}
        <link rel="prefetch" href="/products" />
        <link rel="prefetch" href="/blogs" />
        <link rel="prefetch" href="/tools" />
        
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://marwari-luxe-web.vercel.app" />
        {/* PWA meta tags */}
        <meta name="theme-color" content="#9333ea" />
        <meta name="application-name" content="Marwari Luxe" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Marwari Luxe" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${inter.variable} antialiased touch-manipulation w-full overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Load Google Ads asynchronously after main content */}
        <Script 
          id="google-ads"
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
        />
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        {/* Placing the button outside the CartProvider to ensure it renders */}
        <BackToTopButton />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializedStructuredData,
          }}
          strategy="afterInteractive"
          suppressHydrationWarning
        />
      </body>
    </html>
  );
}