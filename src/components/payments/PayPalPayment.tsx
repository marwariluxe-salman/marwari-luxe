import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PayPalPaymentProps {
  amount: number;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentError,
  isLoading,
  setIsLoading,
}) => {
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'login' | 'confirm' | 'processing'>('login');
  const [accountBalance, setAccountBalance] = useState(0);
  const [localError, setLocalError] = useState('');

  const handlePayPalLogin = async () => {
    setLocalError(''); // Clear any previous errors
    
    if (!paypalEmail.trim()) {
      setLocalError('PayPal email is required');
      return;
    }
    if (!paypalPassword.trim()) {
      setLocalError('PayPal password is required');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate PayPal login authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, any email with password "demo123" works
      if (paypalPassword === 'demo123') {
        setIsLoggedIn(true);
        setPaymentStep('confirm');
        // Simulate account balance
        setAccountBalance(Math.floor(Math.random() * 1000) + 100);
        setLocalError(''); // Clear errors on success
      } else {
        // Show inline error instead of calling onPaymentError
        setLocalError('Login failed! For demo mode, please use password "demo123" with any email address.');
      }
    } catch (error) {
      setLocalError('PayPal login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayPalPayment = async () => {
    setIsLoading(true);
    setPaymentStep('processing');
    
    try {
      // Simulate payment processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Check if user has sufficient balance
      if (accountBalance >= amount) {
        const paymentData = {
          transactionId: `PAYPAL_${Date.now()}`,
          email: paypalEmail,
          amount: amount,
          currency: 'USD',
          status: 'completed',
          gateway: 'paypal',
          accountBalance: accountBalance - amount
        };
        
        onPaymentSuccess(paymentData);
      } else {
        onPaymentError('Insufficient PayPal balance. Please add funds or use a linked card.');
        setPaymentStep('confirm');
      }
    } catch (error) {
      onPaymentError('PayPal payment failed. Please try again.');
      setPaymentStep('confirm');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPaymentStep('login');
    setPaypalPassword('');
    setAccountBalance(0);
    setLocalError(''); // Clear any errors
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-3">🔴</span>
          <h3 className="text-xl font-semibold text-blue-800">PayPal Payment</h3>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="ml-auto text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Logout
            </button>
          )}
        </div>
        
        {/* Login Step */}
        {paymentStep === 'login' && (
          <>
            {/* Demo Instructions Banner */}
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Demo Mode Instructions</h4>
                  <p className="text-green-700 text-sm">
                    <strong>Email:</strong> Use any email address (e.g., test@example.com)<br/>
                    <strong>Password:</strong> Use exactly <code className="bg-green-100 px-1 rounded font-mono">demo123</code>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-blue-700 text-sm mb-6">
              Login to your PayPal account to pay <strong>${amount.toFixed(2)}</strong>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">
                  PayPal Email Address *
                </label>
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => {
                    setPaypalEmail(e.target.value);
                    if (localError) setLocalError(''); // Clear error when user types
                  }}
                  placeholder="Enter your PayPal email"
                  className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">
                  PayPal Password * 
                  <span className="text-xs text-green-600 font-normal">(Demo: use "demo123")</span>
                </label>
                <input
                  type="password"
                  value={paypalPassword}
                  onChange={(e) => {
                    setPaypalPassword(e.target.value);
                    if (localError) setLocalError(''); // Clear error when user types
                  }}
                  placeholder="Enter demo123 for testing"
                  className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              {/* Inline Error Display */}
              {localError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm flex items-center">
                    <span className="mr-2">⚠️</span>
                    {localError}
                  </p>
                </div>
              )}

              <button
                onClick={handlePayPalLogin}
                disabled={isLoading || !paypalEmail.trim() || !paypalPassword.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login to PayPal'
                )}
              </button>
            </div>
          </>
        )}

        {/* Payment Confirmation Step */}
        {paymentStep === 'confirm' && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-green-800 mb-2">✅ Logged in successfully!</h4>
              <p className="text-green-700 text-sm">
                Welcome back, <strong>{paypalEmail}</strong>
              </p>
            </div>

            <div className="bg-white border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-3">💰 Account Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">PayPal Balance:</span>
                  <span className="font-medium">${accountBalance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Amount:</span>
                  <span className="font-medium">-${amount.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Remaining Balance:</span>
                  <span className={accountBalance >= amount ? 'text-green-600' : 'text-red-600'}>
                    ${(accountBalance - amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {accountBalance < amount && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Insufficient balance. Payment will be charged to your linked card or bank account.
                </p>
              </div>
            )}

            <button
              onClick={handlePayPalPayment}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing Payment...
                </div>
              ) : (
                `Confirm Payment - $${amount.toFixed(2)}`
              )}
            </button>
          </>
        )}

        {/* Processing Step */}
        {paymentStep === 'processing' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Processing Payment...</h4>
            <p className="text-blue-700 text-sm">Please wait while we process your PayPal payment securely.</p>
          </div>
        )}

        {/* Benefits Section - Only show during login */}
        {paymentStep === 'login' && (
          <>
            <div className="bg-blue-100 p-3 rounded-lg mt-6">
              <h4 className="font-medium text-blue-800 mb-2">✨ PayPal Benefits:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Buyer Protection Program</li>
                <li>• Instant payment confirmation</li> 
                <li>• Pay with PayPal balance or linked cards</li>
                <li>• Secure encrypted transactions</li>
              </ul>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-blue-600">
                🔒 Your PayPal information is secure and encrypted
              </p>
            </div>
          </>
        )}

        {/* Demo Mode Notice */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-xs">
            <strong>💡 Demo Mode:</strong> This simulates real PayPal login and payment processing.<br/>
            <strong>Quick Test:</strong> Email: <code className="bg-yellow-100 px-1 rounded">test@demo.com</code>, Password: <code className="bg-yellow-100 px-1 rounded">demo123</code>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PayPalPayment;