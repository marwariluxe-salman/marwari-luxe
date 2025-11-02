import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface WisePaymentProps {
  amount: number;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const WisePayment: React.FC<WisePaymentProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError,
  isLoading,
  setIsLoading,
}) => {
  const [wiseData, setWiseData] = useState({
    email: '',
    sourceCurrency: 'USD',
    targetCurrency: 'USD',
    recipientType: 'email',
    bankAccount: '',
    reference: ''
  });

  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  ];

  const calculateFee = () => {
    // Wise typically charges 0.35% - 2% fee
    const feePercentage = 0.5; // 0.5% for demo
    return (amount * feePercentage) / 100;
  };

  const handleInputChange = (field: string, value: string) => {
    setWiseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWisePayment = async () => {
    // Basic validation
    if (!wiseData.email.trim()) {
      onPaymentError('Email is required for Wise transfer');
      return;
    }
    if (!wiseData.email.includes('@')) {
      onPaymentError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate Wise payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In real implementation, this would use Wise API
      // For demo, we'll simulate successful transfer
      const paymentData = {
        transactionId: `WISE_${Date.now()}`,
        email: wiseData.email,
        amount: amount,
        fee: calculateFee(),
        sourceCurrency: wiseData.sourceCurrency,
        targetCurrency: wiseData.targetCurrency,
        status: 'processing',
        gateway: 'wise'
      };
      
      onPaymentSuccess(paymentData);
    } catch (error) {
      onPaymentError('Wise transfer failed. Please try again.');
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
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-3">💚</span>
          <h3 className="text-xl font-semibold text-green-800">Wise Transfer</h3>
        </div>
        
        <p className="text-green-700 text-sm mb-6">
          Send <strong>${amount.toFixed(2)}</strong> via Wise with low international fees
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-2">
              Recipient Email *
            </label>
            <input
              type="email"
              value={wiseData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="recipient@example.com"
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-800 mb-2">
                From Currency
              </label>
              <select
                value={wiseData.sourceCurrency}
                onChange={(e) => handleInputChange('sourceCurrency', e.target.value)}
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-800 mb-2">
                To Currency
              </label>
              <select
                value={wiseData.targetCurrency}
                onChange={(e) => handleInputChange('targetCurrency', e.target.value)}
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-2">
              Transfer Reference (Optional)
            </label>
            <input
              type="text"
              value={wiseData.reference}
              onChange={(e) => handleInputChange('reference', e.target.value)}
              placeholder="Marwari Luxe Order Payment"
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Fee Breakdown */}
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">💰 Transfer Breakdown:</h4>
            <div className="text-sm text-green-700 space-y-1">
              <div className="flex justify-between">
                <span>Amount to send:</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Wise fee (0.5%):</span>
                <span>${calculateFee().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-green-200 pt-1">
                <span>Total you pay:</span>
                <span>${(amount + calculateFee()).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-100 p-3 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">🌟 Wise Benefits:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Up to 8x cheaper than traditional banks</li>
              <li>• Real exchange rate, no hidden fees</li>
              <li>• Fast international transfers</li>
              <li>• Transparent fee structure</li>
            </ul>
          </div>

          <button
            onClick={handleWisePayment}
            disabled={isLoading || !wiseData.email.trim()}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing Wise Transfer...
              </div>
            ) : (
              `Send $${(amount + calculateFee()).toFixed(2)} via Wise`
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-green-600">
              🔒 Wise is regulated and your money is protected
            </p>
          </div>
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-xs">
            <strong>Demo Mode:</strong> This is a demonstration. Use any email for testing. 
            In production, this would connect to real Wise API for international transfers.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WisePayment;