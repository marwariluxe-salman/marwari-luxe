import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import { CartProvider } from '@/contexts/CartContext';
import BackToTopButton from '@/components/BackToTopButton';

const Footer = dynamic(() => import('@/components/Footer'));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400','500','600','700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
};

export const metadata: Metadata = {
  title: "Marwari Luxe - Premium Health & Beauty Products | Wellness Essentials Online Store",
  description: "Shop premium health supplements, natural beauty products & wellness tools at Marwari Luxe. Trusted by 10,000+ customers worldwide.",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  authors: [{ name: "Marwari Luxe Team", url: "https://marwariluxe.com/about" }],
  keywords: "health supplements, natural beauty products, wellness tools, skincare, vitamins, fitness accessories, organic beauty, anti-aging products",
  openGraph: {
    title: 'Marwari Luxe - Premium Health & Beauty Products',
    description: 'Shop expert-curated health supplements, natural beauty products & wellness tools.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Marwari Luxe',
    url: 'https://marwariluxe.com',
    images: [{ url: '/marwari-luxe-og-image.jpg', width:1200, height:630, alt:'Marwari Luxe'}]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marwari Luxe - Premium Health & Beauty Products',
    description: 'Shop expert-curated health supplements, natural beauty products & wellness tools.',
    site: '@MarwariLuxe',
    creator: '@MarwariLuxe',
    images: ['/marwari-luxe-twitter-card.jpg']
  },
  formatDetection: { telephone: false },
  alternates: { canonical: 'https://marwariluxe.com' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marwari Luxe",
    "url": "https://marwariluxe.com",
    "logo": "https://marwariluxe.com/marwari-logo.png",
    "description": "Premium health supplements, natural beauty products & wellness tools.",
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

  const serializedStructuredData = JSON.stringify(structuredData);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager - Head */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M5STLSHD');`}} />
        {/* End Google Tag Manager */}
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"/>
        <meta name="description" content="Shop premium health supplements, natural beauty products & wellness tools at Marwari Luxe. Trusted by 10,000+ customers worldwide."/>
      </head>
      <body>
        {/* Google Tag Manager - Noscript */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M5STLSHD"
          height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <div className={`${inter.variable} antialiased w-full overflow-x-hidden`} suppressHydrationWarning>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
          <BackToTopButton />
          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
            strategy="afterInteractive"
            suppressHydrationWarning
          />
        </div>
      </body>
    </html>
  );
}
