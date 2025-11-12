import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Privacy Policy | Marwari Luxe - Data Protection & Privacy Rights',
  description: 'Read Marwari Luxe privacy policy to understand how we collect, use, and protect your personal information. Learn about your privacy rights and data security measures.',
  keywords: 'privacy policy, data protection, personal information, privacy rights, data security, GDPR compliance, cookie policy, information collection, data usage',
  openGraph: {
    title: 'Privacy Policy | Marwari Luxe - Data Protection & Privacy Rights',
    description: 'Understanding how Marwari Luxe protects your personal information and respects your privacy rights.',
    url: 'https://marwari-luxe-web.vercel.app/legal/privacy-policy',
    type: 'website'
  },
  alternates: {
    canonical: 'https://marwari-luxe-web.vercel.app/legal/privacy-policy'
  }
};

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy - Marwari Luxe Data Protection</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction - Your Privacy Matters</h2>
            <p className="text-gray-700 mb-6">
              At Marwari Luxe, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This comprehensive Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
              browse our premium health supplements and natural beauty products, or use our wellness services. As an affiliate marketing platform, 
              we work with trusted partners like CJ Dropshipping to provide you with quality products. We believe in transparency 
              and want you to understand exactly how your data is handled in compliance with applicable data protection laws including GDPR and CCPA.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Name and contact information (email address, phone number, address)</li>
              <li>Account credentials (username, password)</li>
              <li>Order history and preferences</li>
              <li>Newsletter subscription preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Non-Personal Information</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address and location data</li>
              <li>Website usage patterns and analytics</li>
              <li>Marketing and advertising identifiers</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Provide and improve our website and services</li>
              <li>Send promotional materials and newsletters (with your consent)</li>
              <li>Personalize your browsing experience</li>
              <li>Improve our website and services</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
              <li>Facilitate affiliate marketing partnerships</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist in operating our website (including CJ Dropshipping for order fulfillment)</li>
              <li>To comply with legal requirements or protect our rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With affiliate partners for the purpose of processing your orders</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Affiliate Marketing and CJ Dropshipping</h2>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">🤝 Partnership with CJ Dropshipping</h3>
              <p className="text-purple-700 mb-4">
                As an affiliate marketing platform, we partner with CJ Dropshipping to provide you with quality products:
              </p>
              <ul className="list-disc pl-5 text-purple-700 space-y-2">
                <li>When you purchase products through our affiliate links, your order information is shared with CJ Dropshipping for fulfillment</li>
                <li>CJ Dropshipping handles all aspects of order processing, shipping, and customer service</li>
                <li>We may receive commission for purchases made through our affiliate links</li>
                <li>Your personal information shared with CJ Dropshipping is subject to their privacy policy</li>
                <li>We do not store payment information - all payments are processed by CJ Dropshipping</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
              the internet is 100% secure. We work with trusted partners like CJ Dropshipping who also maintain high security standards.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, 
              and understand user preferences. We also use tracking technologies to support our affiliate marketing activities 
              with partners like CJ Dropshipping. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="text-gray-700 mb-6">
              As part of our affiliate marketing operations, your information may be transferred to and maintained on computers 
              located outside of your state, province, country or other governmental jurisdiction where the data protection laws 
              may differ from those in your jurisdiction. This includes transfers to our affiliate partners like CJ Dropshipping 
              who may operate in different countries.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> marwariluxe@gmail.com<br/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;