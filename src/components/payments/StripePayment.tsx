import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PaymentData {
  transactionId: string;
  email?: string;
  amount: number;
  currency?: string;
  status?: string;
  gateway?: string;
}

interface StripePaymentProps {
  amount: number;
  onPaymentSuccess: (paymentData: PaymentData) => void;
  onPaymentError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError,
  isLoading,
  setIsLoading,
}) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const handleStripePayment = async () => {
    // Basic validation
    if (!cardData.cardNumber.replace(/\\s/g, '') || cardData.cardNumber.replace(/\\s/g, '').length < 16) {
      onPaymentError('Please enter a valid card number');
      return;
    }
    if (!cardData.expiryDate || cardData.expiryDate.length < 5) {
      onPaymentError('Please enter a valid expiry date');
      return;
    }
    if (!cardData.cvv || cardData.cvv.length < 3) {
      onPaymentError('Please enter a valid CVV');
      return;
    }
    if (!cardData.cardholderName.trim()) {
      onPaymentError('Please enter cardholder name');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // In real implementation, this would use Stripe Elements API
      // For demo, we'll simulate successful payment
      const paymentData = {
        transactionId: `STRIPE_${Date.now()}`,
        cardLast4: cardData.cardNumber.slice(-4),
        amount: amount,
        currency: 'USD',
        status: 'succeeded',
        gateway: 'stripe'
      };
      
      onPaymentSuccess(paymentData);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Stripe payment failed. Please try again.';
      onPaymentError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-3">💙</span>
          <h3 className="text-xl font-semibold text-purple-800">Stripe Payment</h3>
        </div>
        
        <p className="text-purple-700 text-sm mb-6">
          Enter your card details to securely pay <strong>${amount.toFixed(2)}</strong>
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-800 mb-2">
              Card Number *
            </label>
            <input
              type="text"
              value={cardData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-800 mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                value={cardData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-800 mb-2">
                CVV *
              </label>
              <input
                type="text"
                value={cardData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                placeholder="123"
                maxLength={4}
                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-800 mb-2">
              Cardholder Name *
            </label>
            <input
              type="text"
              value={cardData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div className="bg-purple-100 p-3 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">🌟 Stripe Benefits:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Supports 135+ currencies worldwide</li>
              <li>• Bank-level security & encryption</li>
              <li>• Instant payment processing</li>
              <li>• PCI DSS compliant</li>
            </ul>
          </div>

          <button
            onClick={handleStripePayment}
            disabled={isLoading || !cardData.cardNumber || !cardData.cardholderName}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing Stripe Payment...
              </div>
            ) : (
              `Pay $${amount.toFixed(2)} with Stripe`
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-purple-600">
              🔒 Your card information is secure and encrypted
            </p>
          </div>
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-xs">
            <strong>Demo Mode:</strong> Use test card: 4242 4242 4242 4242, any future expiry, any CVV. 
            In production, this would use real Stripe Elements.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StripePayment;