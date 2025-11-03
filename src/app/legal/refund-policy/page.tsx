import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const RefundPolicyPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Refund, Resend and Returns Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()} | Effective Date: January 1, 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              As an affiliate marketer, Marwari Luxe does not directly sell products. We earn commissions by promoting products from third-party retailers. 
              This refund policy outlines the process for handling disputes related to products purchased through our affiliate links.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important:</strong> All disputes must be opened with the original retailer. Marwari Luxe will assist customers in directing their complaints to the appropriate retailer.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Role as an Affiliate</h2>
            <p className="text-gray-700 mb-6">
              Marwari Luxe is an affiliate marketing website and does not directly handle product sales, shipping, or customer service. 
              When you purchase products through our affiliate links, you are buying directly from the retailer. 
              We earn a commission for referring customers to these retailers.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Orders Delayed</h2>
            <p className="text-gray-700 mb-4">
              For delayed orders, please contact the original retailer directly. We recommend:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Tracking your order using the provided tracking number</li>
              <li>Contacting the retailer's customer service department</li>
              <li>Allowing adequate time for international shipping (7-30 business days for most products)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Special Cases:</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>USA shipments: Considered delayed after 45 days</li>
              <li>Brazil shipments: Considered delayed after 110 days due to customs</li>
              <li>Special shipping methods: May have different delivery timeframes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Orders Not Received</h2>
            <p className="text-gray-700 mb-4">
              If your tracking information shows the order was delivered but you haven't received it:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Contact your local post office with the tracking number</li>
              <li>Obtain a non-delivery certification from the post office if required</li>
              <li>Check if the package was delivered to a neighbor or alternative address</li>
              <li>Contact the retailer's customer service with all relevant documentation</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Products Damaged</h2>
            <p className="text-gray-700 mb-4">
              If you receive a damaged product:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Document the damage with clear photos or videos</li>
              <li>Contact the retailer within 30 days of delivery</li>
              <li>Provide the order number and damage documentation</li>
              <li>Follow the retailer's return process</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Incorrect or Missing Products</h2>
            <p className="text-gray-700 mb-4">
              If you receive incorrect or missing items:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Contact the retailer immediately with your order details</li>
              <li>Provide photos of the incorrect items received</li>
              <li>Include screenshots of the original order confirmation</li>
              <li>Follow the retailer's process for corrections</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. How Marwari Luxe Can Help</h2>
            <p className="text-gray-700 mb-4">
              While we don't handle the products directly, we're here to assist you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Provide the original retailer's contact information</li>
              <li>Help you locate your order details and tracking information</li>
              <li>Guide you through the dispute process with the retailer</li>
              <li>Offer general advice on international shipping and customs</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Information</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Force Majeure</h3>
            <p className="text-gray-700 mb-4">
              Neither Marwari Luxe nor the retailers are responsible for delays or issues caused by events beyond our control, 
              including but not limited to: natural disasters, epidemics, customs delays, strikes, wars, or government restrictions.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Return Process</h3>
            <p className="text-gray-700 mb-4">
              If a return is required:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Contact the retailer first to obtain return authorization</li>
              <li>Follow the retailer's specific return instructions</li>
              <li>Package items securely to prevent damage during return shipping</li>
              <li>Keep all shipping documentation and receipts</li>
              <li>Note that international return shipping can be expensive and time-consuming</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Unacceptable Disputes</h3>
            <p className="text-gray-700 mb-4">
              The following disputes are typically not accepted by retailers:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Buyer's change of mind or personal preferences</li>
              <li>Incorrect shipping addresses provided by the customer</li>
              <li>Failure to clear customs in certain countries</li>
              <li>Tracking information deleted by logistics companies</li>
              <li>Products detained due to customs or import restrictions</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For assistance with affiliate-related questions or to be directed to the appropriate retailer:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                <strong>Email:</strong> support@marwariluxe.com<br/>
                {/* <strong>Phone:</strong> +1 (555) 123-4567<br/> */}
                <strong>Response Time:</strong> Within 24-48 business hours
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> This policy applies to purchases made through Marwari Luxe affiliate links. 
                For products purchased directly from retailers, please refer to their individual refund policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;