import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const DisclaimerPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700">
                The information provided on this website is for general informational purposes only and should not be 
                considered as professional medical, health, or beauty advice. Always consult with qualified professionals 
                before making decisions related to your health and wellness.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">General Information</h2>
            <p className="text-gray-700 mb-6">
              This disclaimer applies to the Marwari Luxe website, products, services, and all related content. By using 
              our website and services, you acknowledge and agree to the terms set forth in this disclaimer. We operate as 
              an affiliate marketing platform and do not directly sell products. All products are fulfilled through our 
              trusted partner CJ Dropshipping.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Affiliate Marketing Relationship</h2>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">🔗 Partnership with CJ Dropshipping</h3>
              <ul className="list-disc pl-5 text-purple-700 space-y-2">
                <li>We are an affiliate marketing website and earn commissions through CJ Dropshipping</li>
                <li>All products are fulfilled and shipped directly by CJ Dropshipping</li>
                <li>We do not handle inventory, shipping, or customer service for products</li>
                <li>Product prices and availability are managed by CJ Dropshipping</li>
                <li>Any issues with orders should be directed to CJ Dropshipping customer service</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Health and Medical Disclaimer</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
              <h3 className="text-xl font-semibold text-red-800 mb-3">⚠️ Medical Information Disclaimer</h3>
              <ul className="list-disc pl-5 text-red-700 space-y-2">
                <li>The health information provided is not intended to diagnose, treat, cure, or prevent any disease</li>
                <li>Our products and content are not a substitute for professional medical advice</li>
                <li>Individual results may vary and are not guaranteed</li>
                <li>Always consult your healthcare provider before starting any new health regimen</li>
                <li>Do not ignore professional medical advice based on information from our website</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Information Disclaimer</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Accuracy of Information</h3>
            <p className="text-gray-700 mb-4">
              While we strive to provide accurate and up-to-date information about our products:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Product descriptions, ingredients, and specifications may be subject to change by CJ Dropshipping</li>
              <li>Images may not reflect the exact appearance of products</li>
              <li>Availability and pricing information may vary as managed by CJ Dropshipping</li>
              <li>We recommend checking product labels before use</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Individual Results</h3>
            <p className="text-gray-700 mb-6">
              Results from using our products may vary from person to person. Factors such as age, skin type, health condition, 
              lifestyle, and adherence to usage instructions can affect outcomes. Testimonials and reviews reflect individual 
              experiences and should not be considered typical results.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Beauty and Cosmetic Disclaimer</h2>
            <div className="bg-pink-50 border-l-4 border-pink-400 p-6 mb-6">
              <h3 className="text-xl font-semibold text-pink-800 mb-3">💄 Beauty Product Information</h3>
              <ul className="list-disc pl-5 text-pink-700 space-y-2">
                <li>Skin reactions and allergies may occur - always perform patch tests</li>
                <li>Results may vary based on individual skin type and condition</li>
                <li>Beauty advice is for informational purposes only</li>
                <li>Consult a dermatologist for specific skin concerns</li>
                <li>Follow product instructions and discontinue use if irritation occurs</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tool and Calculator Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              Our website may include various health and beauty calculators and tools:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Results are estimates and should not replace professional assessment</li>
              <li>Tools are provided for educational and informational purposes only</li>
              <li>Accuracy of calculations depends on the information you provide</li>
              <li>We are not responsible for decisions made based on tool results</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Content</h2>
            <p className="text-gray-700 mb-6">
              Our website may contain links to third-party websites, advertisements, or content including links to CJ Dropshipping. 
              We do not endorse or take responsibility for the accuracy, completeness, or reliability of third-party content. 
              Users access third-party content at their own risk.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Consultation</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <div className="flex items-start">
                <InformationCircleIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">When to Seek Professional Help</h3>
                  <p className="text-blue-700 mb-3">
                    You should consult qualified professionals in the following situations:
                  </p>
                  <ul className="list-disc pl-5 text-blue-700 space-y-1">
                    <li>Before starting any new health or wellness program</li>
                    <li>If you have existing medical conditions</li>
                    <li>When experiencing adverse reactions to products</li>
                    <li>For personalized health or beauty advice</li>
                    <li>If you have concerns about product suitability</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              To the fullest extent permitted by law, Marwari Luxe disclaims all liability for any damages, injuries, or 
              adverse effects that may result from the use of our products, website, or services. This includes but is not 
              limited to direct, indirect, incidental, consequential, or punitive damages. As an affiliate marketing platform, 
              we are not responsible for product fulfillment, shipping, or customer service which are handled by CJ Dropshipping.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Age Restrictions</h2>
            <p className="text-gray-700 mb-6">
              Our products and services are intended for use by adults 18 years and older unless specifically stated otherwise. 
              Products intended for minors should be used under adult supervision and with appropriate professional guidance.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Regulatory Information</h2>
            <p className="text-gray-700 mb-6">
              Our products have not been evaluated by the Food and Drug Administration (FDA) unless specifically stated. 
              Products are not intended to diagnose, treat, cure, or prevent any disease. Claims made about our products 
              are based on available research and user testimonials. Product compliance and regulatory adherence are managed 
              by CJ Dropshipping.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Disclaimer</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated 
              revision date. Your continued use of our website and services after changes constitutes acceptance of the 
              updated disclaimer.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this disclaimer or need clarification on any points:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> marwariluxe@gmail.com<br/>
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Remember:</strong> This disclaimer is an important legal document. Please read it carefully and 
                consult with legal or medical professionals if you have any questions about its contents or implications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;