'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const BasicCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation: string) => {
    const currentInputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(currentInputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      let result: number;

      switch (operation) {
        case '+':
          result = currentValue + currentInputValue;
          break;
        case '-':
          result = currentValue - currentInputValue;
          break;
        case '*':
          result = currentValue * currentInputValue;
          break;
        case '/':
          result = currentValue / currentInputValue;
          break;
        default:
          return;
      }

      setDisplay(String(result));
      setPrevValue(result);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (prevValue !== null && operation) {
      performOperation('=');
      setOperation(null);
      setPrevValue(null);
      setWaitingForNewValue(true);
    }
  };

  const buttons = [
    { label: 'C', type: 'clear', className: 'bg-red-500 hover:bg-red-600 text-white' },
    { label: '±', type: 'sign', className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '%', type: 'percent', className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '÷', type: 'operation', value: '/', className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    
    { label: '7', type: 'number', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '8', type: 'number', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '9', type: 'number', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '×', type: 'operation', value: '*', className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    
    { label: '4', type: 'number', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '5', type: 'number', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '6', type: 'number', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '−', type: 'operation', value: '-', className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    
    { label: '1', type: 'number', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '2', type: 'number', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '3', type: 'number', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '+', type: 'operation', value: '+', className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    
    { label: '0', type: 'number', className: 'bg-gray-100 hover:bg-gray-200 col-span-2' },
    { label: '.', type: 'decimal', className: 'bg-gray-100 hover:bg-gray-200' },
    { label: '=', type: 'equals', className: 'bg-green-500 hover:bg-green-600 text-white' },
  ];

  const handleButtonClick = (button: {
    label: string;
    type: string;
    value?: string;
    className: string;
  }) => {
    switch (button.type) {
      case 'number':
        inputNumber(button.label);
        break;
      case 'decimal':
        inputDecimal();
        break;
      case 'operation':
        if (button.value) {
          performOperation(button.value);
        }
        break;
      case 'equals':
        calculate();
        break;
      case 'clear':
        clear();
        break;
      case 'sign':
        setDisplay(String(parseFloat(display) * -1));
        break;
      case 'percent':
        setDisplay(String(parseFloat(display) / 100));
        break;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🧮</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Calculator</h2>
          <p className="text-gray-600">
            Perform basic mathematical calculations quickly and easily
          </p>
        </div>

        {/* Display */}
        <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
          <div className="text-right text-3xl font-mono overflow-hidden">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button, index) => (
            <motion.button
              key={index}
              onClick={() => handleButtonClick(button)}
              className={`h-12 rounded-lg font-semibold transition-colors ${button.className}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {button.label}
            </motion.button>
          ))}
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Basic arithmetic operations
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Decimal number support
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Sign change function
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Percentage calculations
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BasicCalculator;