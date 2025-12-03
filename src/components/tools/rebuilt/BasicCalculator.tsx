'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const BasicCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clearDisplay = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const toggleSign = useCallback(() => {
    const value = parseFloat(display);
    if (value > 0) {
      setDisplay('-' + display);
    } else if (value < 0) {
      setDisplay(display.slice(1));
    }
  }, [display]);

  const inputPercent = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  }, [display]);

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPreviousValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const handleEquals = useCallback(() => {
    if (operation && previousValue !== null) {
      performOperation(operation);
      setOperation(null);
      setPreviousValue(null);
    }
  }, [operation, previousValue, performOperation]);

  // Handle keyboard input
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key >= '0' && event.key <= '9') {
      inputDigit(event.key);
    } else if (event.key === '.') {
      inputDecimal();
    } else if (event.key === '+' || event.key === '-') {
      performOperation(event.key);
    } else if (event.key === '*') {
      performOperation('×');
    } else if (event.key === '/') {
      event.preventDefault();
      performOperation('÷');
    } else if (event.key === 'Enter' || event.key === '=') {
      handleEquals();
    } else if (event.key === 'Escape') {
      clearDisplay();
    } else if (event.key === '%') {
      inputPercent();
    }
  }, [inputDigit, inputDecimal, performOperation, handleEquals, clearDisplay, inputPercent]);

  // Add keyboard event listener
  useState(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const CalculatorButton = ({ 
    onClick, 
    className = '', 
    children 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-lg text-lg font-medium transition-all active:scale-95 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mobile-card bg-white rounded-lg shadow-lg p-4 sm:p-6"
      >
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-3xl sm:text-4xl mb-2">🧮</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Basic Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Perform basic mathematical calculations quickly and easily
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="text-right text-3xl font-semibold text-gray-900 h-12 overflow-x-auto whitespace-nowrap">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <CalculatorButton 
            onClick={clearDisplay} 
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            AC
          </CalculatorButton>
          <CalculatorButton 
            onClick={toggleSign} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            ±
          </CalculatorButton>
          <CalculatorButton 
            onClick={inputPercent} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            %
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => performOperation('÷')} 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            ÷
          </CalculatorButton>

          <CalculatorButton 
            onClick={() => inputDigit('7')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            7
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => inputDigit('8')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            8
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => inputDigit('9')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            9
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => performOperation('×')} 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            ×
          </CalculatorButton>

          <CalculatorButton 
            onClick={() => inputDigit('4')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            4
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => inputDigit('5')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            5
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => inputDigit('6')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            6
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => performOperation('-')} 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            -
          </CalculatorButton>

          <CalculatorButton 
            onClick={() => inputDigit('1')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            1
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => inputDigit('2')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            2
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => inputDigit('3')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            3
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => performOperation('+')} 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            +
          </CalculatorButton>

          <CalculatorButton 
            onClick={() => inputDigit('0')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 col-span-2"
          >
            0
          </CalculatorButton>
          <CalculatorButton 
            onClick={inputDecimal} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            .
          </CalculatorButton>
          <CalculatorButton 
            onClick={handleEquals} 
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            =
          </CalculatorButton>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">How to Use</h3>
          <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
            <li>Click buttons or use keyboard to enter numbers and operations</li>
            <li>Press AC to clear the calculator</li>
            <li>Use ± to change the sign of a number</li>
            <li>Press % to convert a number to a percentage</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides basic arithmetic functions only. 
            For complex calculations, scientific, or financial computations, please use specialized tools.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BasicCalculator;