import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const FAQPage = () => {
  const faqData = [
    {
      question: "How do I place an order?",
      answer: "Simply browse our products, add items to your cart, and proceed to checkout. You can pay using various payment methods including credit cards and other secure options."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, Mastercard, American Express) and bank transfers. All payments are processed securely through encrypted channels."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-7 business days within the domestic region. Express shipping options are available for faster delivery. International shipping may take 7-21 business days depending on the destination."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
    },
    {
      question: "What if my order arrives damaged?",
      answer: "If your order arrives damaged, please contact our customer service team immediately with photos of the damage. We'll arrange for a replacement or full refund at no cost to you."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in original condition and packaging. Please see our detailed Refund Policy page for complete terms and conditions."
    },
    {
      question: "How do I return an item?",
      answer: "Contact our returns team at returns@marwariluxe.com with your order number. We'll provide you with return instructions and a prepaid shipping label if applicable."
    },
    {
      question: "When will I receive my refund?",
      answer: "Refunds are processed within 3-5 business days after we receive and inspect your returned item. The refund will appear in your original payment method within 5-10 business days."
    },
    {
      question: "Can I exchange an item instead of returning it?",
      answer: "Yes, we offer exchanges for size, color, or similar product variations subject to availability. Contact our customer service team to arrange an exchange."
    },
    {
      question: "Are your products safe to use?",
      answer: "All our products are sourced from reputable manufacturers and comply with relevant safety standards. However, individual reactions may vary. Always read product labels and consult healthcare professionals if you have concerns."
    },
    {
      question: "Do you test products on animals?",
      answer: "We are committed to cruelty-free practices. We do not test on animals and work with suppliers who share this commitment. Many of our products are certified cruelty-free."
    },
    {
      question: "Can I use multiple products together?",
      answer: "While many products can be used together, we recommend consulting the product instructions and possibly a healthcare professional for personalized advice, especially for health supplements."
    },
    {
      question: "What if I have allergies or sensitivities?",
      answer: "Always read ingredient lists carefully and perform patch tests for topical products. If you have known allergies, consult with a healthcare provider before trying new products."
    },
    {
      question: "Do your health calculators provide medical advice?",
      answer: "No, our health calculators and tools are for informational purposes only and should not replace professional medical advice. Always consult healthcare professionals for medical guidance."
    },
    {
      question: "I forgot my password. How do I reset it?",
      answer: "Click the 'Forgot Password' link on the login page and enter your email address. You'll receive instructions to reset your password via email."
    },
    {
      question: "How do I update my account information?",
      answer: "Log into your account and go to the 'Account Settings' or 'Profile' section where you can update your personal information, shipping addresses, and preferences."
    },
    {
      question: "Why can't I access certain features on mobile?",
      answer: "Our website is optimized for mobile devices. If you're experiencing issues, try refreshing the page, clearing your browser cache, or updating your browser to the latest version."
    },
    {
      question: "How do I unsubscribe from emails?",
      answer: "You can unsubscribe by clicking the 'Unsubscribe' link at the bottom of any email we send, or by updating your email preferences in your account settings."
    },
    {
      question: "Do you offer wholesale or bulk pricing?",
      answer: "Yes, we offer special pricing for bulk orders and business customers. Please contact our business development team at business@marwariluxe.com for more information."
    },
    {
      question: "Can I become an affiliate or partner?",
      answer: "We have affiliate and partnership programs available. Please reach out to partnerships@marwariluxe.com with details about your proposal and audience."
    },
    {
      question: "Do you accept product submissions from brands?",
      answer: "We carefully curate our product selection. If you're a brand interested in partnering with us, please submit your proposal to brands@marwariluxe.com."
    },
    {
      question: "How can I contact customer service?",
      answer: "You can reach our customer service team via email at support@marwariluxe.com, phone at +1 (555) 123-4567, or through our contact form. We're available Monday-Friday, 9 AM-6 PM EST."
    }
  ];

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
          <div className="flex items-center mb-4">
            <QuestionMarkCircleIcon className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>
          <p className="text-gray-600">
            Find answers to common questions about our products, services, and policies. 
            Can't find what you're looking for? <Link href="/contact" className="text-purple-600 hover:text-purple-700">Contact us</Link>.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <details key={index} className="group border border-gray-200 rounded-lg">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                <ChevronDownIcon className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
              </summary>
              <div className="px-4 pb-4">
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-purple-100 mb-6">
              Our customer service team is here to help you with any questions not covered in our FAQ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                📧 Contact Support
              </Link>
              <a
                href="tel:+15551234567"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-400 transition-colors"
              >
                📞 Call Us: +1 (555) 123-4567
              </a>
            </div>
            <p className="text-sm text-purple-200 mt-4">
              Available Monday - Friday, 9 AM - 6 PM EST
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/legal/privacy-policy"
              className="text-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-medium text-gray-900">Privacy Policy</div>
            </Link>
            <Link
              href="/legal/terms"
              className="text-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium text-gray-900">Terms & Conditions</div>
            </Link>
            <Link
              href="/legal/refund-policy"
              className="text-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="text-2xl mb-2">💰</div>
              <div className="font-medium text-gray-900">Refund Policy</div>
            </Link>
            <Link
              href="/legal/disclaimer"
              className="text-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="text-2xl mb-2">⚠️</div>
              <div className="font-medium text-gray-900">Disclaimer</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;