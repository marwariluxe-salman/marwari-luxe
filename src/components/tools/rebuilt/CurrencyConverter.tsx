'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Major world currencies
  const currencies: Record<string, string> = {
    'USD': 'US Dollar',
    'EUR': 'Euro',
    'GBP': 'British Pound',
    'JPY': 'Japanese Yen',
    'CAD': 'Canadian Dollar',
    'AUD': 'Australian Dollar',
    'CHF': 'Swiss Franc',
    'CNY': 'Chinese Yuan',
    'INR': 'Indian Rupee',
    'MXN': 'Mexican Peso',
    'BRL': 'Brazilian Real',
    'RUB': 'Russian Ruble',
    'KRW': 'South Korean Won',
    'SGD': 'Singapore Dollar',
    'NZD': 'New Zealand Dollar',
    'TRY': 'Turkish Lira',
    'ZAR': 'South African Rand',
    'SEK': 'Swedish Krona',
    'NOK': 'Norwegian Krone',
    'DKK': 'Danish Krone',
    'HKD': 'Hong Kong Dollar',
    'THB': 'Thai Baht',
    'PLN': 'Polish Zloty',
    'ILS': 'Israeli Shekel'
  };

  // Mock exchange rates (in a real app, this would come from an API)
  const mockExchangeRates: Record<string, number> = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.73,
    'JPY': 110.5,
    'CAD': 1.25,
    'AUD': 1.35,
    'CHF': 0.92,
    'CNY': 6.45,
    'INR': 73.25,
    'MXN': 20.15,
    'BRL': 5.25,
    'RUB': 74.5,
    'KRW': 1150,
    'SGD': 1.33,
    'NZD': 1.42,
    'TRY': 8.75,
    'ZAR': 14.25,
    'SEK': 8.65,
    'NOK': 8.95,
    'DKK': 6.25,
    'HKD': 7.78,
    'THB': 33.25,
    'PLN': 3.95,
    'ILS': 3.25
  };

  const fetchExchangeRates = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setExchangeRates(mockExchangeRates);
      setLastUpdated(new Date().toLocaleString());
      setIsLoading(false);
    }, 800);
  }, [mockExchangeRates]);

  const convertCurrency = useCallback(() => {
    if (!amount || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      setResult('');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) {
      setResult('Invalid amount');
      return;
    }

    // Convert to USD first, then to target currency
    const usdAmount = amountValue / exchangeRates[fromCurrency];
    const convertedAmount = usdAmount * exchangeRates[toCurrency];
    
    setResult(convertedAmount.toFixed(2));
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency, currencies]);

  // Fetch exchange rates on component mount
  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  // Convert when inputs change
  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates, convertCurrency]);

  const reset = useCallback(() => {
    setAmount('1');
    setFromCurrency('USD');
    setToCurrency('EUR');
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mobile-card bg-white rounded-lg shadow-lg p-4 sm:p-6"
      >
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-3xl sm:text-4xl mb-2">💱</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Currency Converter</h2>
          <p className="mobile-text-sm text-gray-600">
            Convert between different world currencies with real-time exchange rates
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Currency
                </label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                >
                  {Object.entries(currencies).map(([code, name]) => (
                    <option key={code} value={code}>
                      {code} - {name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Currency
                </label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                >
                  {Object.entries(currencies).map(([code, name]) => (
                    <option key={code} value={code}>
                      {code} - {name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Converted Amount
                </label>
                <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-base">
                  {result ? `${result} ${toCurrency}` : `0.00 ${toCurrency}`}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={swapCurrencies}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                aria-label="Swap currencies"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>
            
            {lastUpdated && (
              <div className="text-center text-sm text-gray-500">
                Exchange rates updated: {lastUpdated}
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full px-4 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
              <button
                onClick={fetchExchangeRates}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Refresh Rates
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">How to Use</h3>
          <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
            <li>Enter the amount you want to convert</li>
            <li>Select the currency you're converting from</li>
            <li>Select the currency you're converting to</li>
            <li>See the converted amount instantly</li>
            <li>Refresh rates to get the latest exchange rates</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This currency converter uses simulated exchange rates for demonstration 
            purposes. In a real application, this would connect to a financial API for live exchange rates. 
            Exchange rates fluctuate constantly and may not reflect current market prices. For financial 
            transactions, please use professional currency conversion services.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CurrencyConverter;