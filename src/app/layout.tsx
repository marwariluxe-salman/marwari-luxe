import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
  authors: [{ name: "Marwari Luxe Team", url: "https://marwariluxe.com/about" }],
  keywords: "health supplements, natural beauty products, wellness tools, skincare essentials, vitamins minerals, fitness accessories, organic beauty, anti-aging products, immune support, weight management, hair care, skin care routine, health calculators, wellness blog, premium supplements, beauty serum, protein powder, probiotics, omega-3, vitamin D, collagen peptides, hyaluronic acid, retinol products, sunscreen SPF, natural ingredients, cruelty-free beauty, sustainable wellness, marwari heritage wellness",
  openGraph: {
    title: 'Marwari Luxe - Premium Health & Beauty Products | Wellness Essentials Store',
    description: 'Shop expert-curated health supplements, natural beauty products & wellness tools. Free shipping over $50. Trusted by 10,000+ customers worldwide.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Marwari Luxe',
    url: 'https://marwariluxe.com',
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
    canonical: 'https://marwariluxe.com'
  },
  category: 'Health & Beauty',
  classification: 'Business'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="theme-color" content="#9333ea" />
        <meta name="application-name" content="Marwari Luxe" />
        <meta name="msapplication-TileColor" content="#9333ea" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://marwariluxe.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Marwari Luxe",
            "url": "https://marwariluxe.com",
            "logo": "https://marwariluxe.com/marwari-logo.png",
            "description": "Premium health supplements, natural beauty products & wellness tools. Expert-curated collection for optimal health and beauty.",
            "sameAs": [
              "https://facebook.com/marwariluxe",
              "https://instagram.com/marwariluxe",
              "https://twitter.com/marwariluxe"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-123-4567",
              "contactType": "customer service",
              "email": "support@marwariluxe.com"
            }
          })}
        </script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased touch-manipulation`}
        suppressHydrationWarning
      >
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
