import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const TermsConditionsPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-6">
              Welcome to Marwari Luxe. These Terms and Conditions ("Terms") govern your use of our website and services. 
              By accessing or using our website, you agree to be bound by these Terms. If you do not agree with these Terms, 
              please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Definitions</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>"Company"</strong> refers to Marwari Luxe</li>
              <li><strong>"Service"</strong> refers to our website and related services</li>
              <li><strong>"User"</strong> refers to anyone who accesses or uses our Service</li>
              <li><strong>"Content"</strong> refers to all information, data, text, images, and other materials</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use of Our Service</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Eligibility</h3>
            <p className="text-gray-700 mb-4">
              You must be at least 18 years old to use our Service. By using our Service, you represent and warrant that you 
              meet this age requirement.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Registration</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>You may need to create an account to access certain features</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You are responsible for all activities that occur under your account</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Products and Services</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Product Information</h3>
            <p className="text-gray-700 mb-4">
              We strive to provide accurate product descriptions and pricing. However, we do not warrant that product 
              descriptions or other content is accurate, complete, reliable, or error-free.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Pricing</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>All prices are subject to change without notice</li>
              <li>Prices include applicable taxes unless otherwise stated</li>
              <li>We reserve the right to correct pricing errors</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Orders and Payment</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Order Acceptance</h3>
            <p className="text-gray-700 mb-4">
              Your order constitutes an offer to purchase products. We reserve the right to accept or decline your order 
              for any reason, including product availability, pricing errors, or suspected fraudulent activity.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Payment Terms</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Payment is required at the time of order placement</li>
              <li>We accept various payment methods as displayed on our website</li>
              <li>All payments are processed securely through third-party payment processors</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping and Delivery</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Shipping times are estimates and may vary</li>
              <li>Risk of loss passes to you upon delivery</li>
              <li>You are responsible for providing accurate shipping information</li>
              <li>Additional charges may apply for expedited shipping</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns and Refunds</h2>
            <p className="text-gray-700 mb-6">
              Please refer to our <Link href="/legal/refund-policy" className="text-purple-600 hover:text-purple-700">Refund Policy</Link> for 
              detailed information about returns, exchanges, and refunds.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">You may not use our Service:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 mb-6">
              The Service and its original content, features, and functionality are and will remain the exclusive property of 
              Marwari Luxe and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimers</h2>
            <p className="text-gray-700 mb-6">
              The information on this website is provided on an "as is" basis without any warranties, express or implied. 
              We make no representations about the suitability, reliability, availability, timeliness, and accuracy of the 
              information contained on the website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              In no event shall Marwari Luxe, nor its directors, employees, partners, agents, suppliers, or affiliates, be 
              liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which Marwari Luxe operates, 
              without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to 
              provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@marwariluxe.com<br/>
                <strong>Phone:</strong> +1 (555) 123-4567<br/>
                <strong>Address:</strong> 123 Business Street, City, State 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;