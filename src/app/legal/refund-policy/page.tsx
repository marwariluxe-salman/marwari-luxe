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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-6">
              At Marwari Luxe, we are committed to your satisfaction. If you are not completely satisfied with your purchase, 
              we offer a comprehensive return and refund policy to ensure your peace of mind.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return Period</h2>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <p className="text-purple-800 font-semibold">
                📅 You have 30 days from the date of delivery to return most items for a full refund.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Eligible Items for Return</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Returnable Items</h3>
                <ul className="list-disc pl-5 text-green-700 space-y-1">
                  <li>Unopened beauty products in original packaging</li>
                  <li>Health supplements with unbroken seals</li>
                  <li>Accessories in new condition</li>
                  <li>Defective or damaged items</li>
                  <li>Items not as described</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-3">❌ Non-Returnable Items</h3>
                <ul className="list-disc pl-5 text-red-700 space-y-1">
                  <li>Opened or used beauty products</li>
                  <li>Perishable health items</li>
                  <li>Customized or personalized products</li>
                  <li>Digital products or services</li>
                  <li>Items purchased on final sale</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return Conditions</h2>
            <p className="text-gray-700 mb-4">To be eligible for a return, items must meet the following conditions:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Items must be in original condition and packaging</li>
              <li>All tags and labels must be attached</li>
              <li>Items must be clean and free from damage</li>
              <li>Original receipt or proof of purchase required</li>
              <li>Return must be initiated within the 30-day return period</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Return Items</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">📦 Step-by-Step Return Process</h3>
              <ol className="list-decimal pl-5 text-blue-700 space-y-2">
                <li><strong>Contact Us:</strong> Email returns@marwariluxe.com or call +1 (555) 123-4567</li>
                <li><strong>Provide Details:</strong> Include your order number and reason for return</li>
                <li><strong>Receive Instructions:</strong> We'll send you a return authorization and shipping label</li>
                <li><strong>Package Items:</strong> Securely package items in original packaging</li>
                <li><strong>Ship Items:</strong> Use the provided shipping label and drop off at authorized location</li>
                <li><strong>Track Return:</strong> Monitor your return using the tracking number provided</li>
              </ol>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Processing</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Processing Time</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Inspection:</strong> 2-3 business days after we receive your return</li>
              <li><strong>Refund Processing:</strong> 3-5 business days after approval</li>
              <li><strong>Bank Processing:</strong> 5-10 business days depending on your bank</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Refund Method</h3>
            <p className="text-gray-700 mb-6">
              Refunds will be processed to the original payment method used for the purchase. If the original payment method 
              is no longer available, we may issue store credit or arrange an alternative refund method.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exchanges</h2>
            <p className="text-gray-700 mb-4">
              We offer exchanges for the following situations:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Size exchanges for applicable products</li>
              <li>Color variations (subject to availability)</li>
              <li>Defective item replacements</li>
              <li>Damaged during shipping</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Costs</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🆓 Free Return Shipping</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Defective items</li>
                  <li>• Wrong item sent</li>
                  <li>• Damaged during shipping</li>
                  <li>• Our error</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">💰 Customer Pays Shipping</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Change of mind</li>
                  <li>• Size/color exchange</li>
                  <li>• Customer error</li>
                  <li>• Non-defective returns</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Special Circumstances</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Damaged or Defective Items</h3>
            <p className="text-gray-700 mb-4">
              If you receive a damaged or defective item, please contact us immediately. We will provide a prepaid return 
              label and expedite your replacement or refund.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Late Returns</h3>
            <p className="text-gray-700 mb-4">
              Returns initiated after the 30-day period may be accepted at our discretion and may be subject to a restocking fee.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">International Returns</h3>
            <p className="text-gray-700 mb-6">
              International customers are responsible for return shipping costs and any customs duties. Please contact our 
              support team for specific instructions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gift Returns</h2>
            <p className="text-gray-700 mb-6">
              Items purchased as gifts can be returned by the recipient. Refunds for gift purchases will be issued as store 
              credit unless the original purchaser requests the refund.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Our Returns Team</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">📞 Need Help with Your Return?</h3>
              <div className="text-purple-700">
                <p className="mb-2"><strong>Email:</strong> returns@marwariluxe.com</p>
                <p className="mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="mb-2"><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
                <p className="mb-4"><strong>Address:</strong> Marwari Luxe Returns Department<br/>123 Business Street, City, State 12345</p>
                <p className="text-sm">
                  <strong>Response Time:</strong> We respond to all return inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;