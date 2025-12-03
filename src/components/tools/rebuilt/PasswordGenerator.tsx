'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  const generatePassword = useCallback(() => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Characters to exclude if selected
    const similarChars = 'il1Lo0O';
    const ambiguousChars = '{}[]()/\\\'"`~,;.<>';

    let charset = '';
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;
    
    // Remove excluded characters
    if (excludeSimilar) {
      charset = charset.split('').filter(char => !similarChars.includes(char)).join('');
    }
    
    if (excludeAmbiguous) {
      charset = charset.split('').filter(char => !ambiguousChars.includes(char)).join('');
    }
    
    // Ensure at least one character set is selected
    if (charset.length === 0) {
      setPassword('Please select at least one character type');
      return;
    }
    
    let generatedPassword = '';
    const charsetLength = charset.length;
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      generatedPassword += charset[randomIndex];
    }
    
    setPassword(generatedPassword);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous]);

  const copyToClipboard = useCallback(() => {
    if (password) {
      navigator.clipboard.writeText(password);
      // Could add a toast notification here
    }
  }, [password]);

  const reset = useCallback(() => {
    setLength(12);
    setIncludeUppercase(true);
    setIncludeLowercase(true);
    setIncludeNumbers(true);
    setIncludeSymbols(true);
    setExcludeSimilar(false);
    setExcludeAmbiguous(false);
    setPassword('');
  }, []);

  // Generate initial password
  useState(() => {
    generatePassword();
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mobile-card bg-white rounded-lg shadow-lg p-4 sm:p-6"
      >
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-3xl sm:text-4xl mb-2">🔐</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Password Generator</h2>
          <p className="mobile-text-sm text-gray-600">
            Create strong, secure passwords to protect your accounts
          </p>
        </div>

        <div className="space-y-6">
          {/* Password Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Password
            </label>
            <div className="flex">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none text-base"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-r-md transition-colors font-medium"
              >
                Copy
              </button>
            </div>
          </div>
          
          {/* Password Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="128"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span>128</span>
            </div>
          </div>
          
          {/* Character Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="uppercase"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="uppercase" className="ml-2 block text-sm text-gray-700">
                Include Uppercase Letters (A-Z)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="lowercase"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="lowercase" className="ml-2 block text-sm text-gray-700">
                Include Lowercase Letters (a-z)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="numbers"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="numbers" className="ml-2 block text-sm text-gray-700">
                Include Numbers (0-9)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="symbols"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="symbols" className="ml-2 block text-sm text-gray-700">
                Include Symbols (!@#$%^&*)
              </label>
            </div>
          </div>
          
          {/* Exclusion Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="excludeSimilar"
                checked={excludeSimilar}
                onChange={(e) => setExcludeSimilar(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="excludeSimilar" className="ml-2 block text-sm text-gray-700">
                Exclude Similar Characters (i, l, 1, L, o, 0, O)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="excludeAmbiguous"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="excludeAmbiguous" className="ml-2 block text-sm text-gray-700">
                Exclude Ambiguous Characters (&#123;&#39;&#125;&#91;&#93;()/-\')
              </label>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={generatePassword}
              className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Generate Password
            </button>
            <button
              onClick={reset}
              className="mobile-btn w-full px-4 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Reset Settings
            </button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">Password Security Tips</h3>
          <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
            <li>Use a unique password for each account</li>
            <li>Make passwords at least 12 characters long</li>
            <li>Include a mix of character types</li>
            <li>Use a password manager to store passwords securely</li>
            <li>Change passwords regularly, especially after security breaches</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This password generator creates cryptographically secure 
            passwords using browser-based randomness. However, always ensure you're using the latest 
            version of your browser for optimal security. For maximum security, consider using a 
            reputable password manager.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordGenerator;