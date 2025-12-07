'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const DateCalculator = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [calculationType, setCalculationType] = useState<'difference' | 'add' | 'subtract'>('difference');
  const [unit, setUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days');
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Set today's date as default for both fields
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!startDate) setStartDate(today);
    if (!endDate) setEndDate(today);
  }, [startDate, endDate]);

  const calculateDifference = useCallback(() => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      setResult('');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError('Invalid date format');
      setResult('');
      return;
    }

    if (start > end) {
      setError('Start date must be before end date');
      setResult('');
      return;
    }

    setError('');
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch (unit) {
      case 'days':
        setResult(`${diffDays} days`);
        break;
      case 'weeks':
        setResult(`${Math.floor(diffDays / 7)} weeks and ${diffDays % 7} days`);
        break;
      case 'months':
        const diffMonths = Math.abs(
          end.getMonth() - start.getMonth() + 
          (12 * (end.getFullYear() - start.getFullYear()))
        );
        setResult(`${diffMonths} months`);
        break;
      case 'years':
        const diffYears = end.getFullYear() - start.getFullYear();
        setResult(`${diffYears} years`);
        break;
    }
  }, [startDate, endDate]);

  const addSubtractDate = useCallback(() => {
    if (!startDate) {
      setError('Please select a start date');
      setResult('');
      return;
    }

    if (amount <= 0) {
      setError('Please enter a positive amount');
      setResult('');
      return;
    }

    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      setError('Invalid date format');
      setResult('');
      return;
    }

    setError('');
    const resultDate = new Date(start);

    if (calculationType === 'add') {
      switch (unit) {
        case 'days':
          resultDate.setDate(resultDate.getDate() + amount);
          break;
        case 'weeks':
          resultDate.setDate(resultDate.getDate() + (amount * 7));
          break;
        case 'months':
          resultDate.setMonth(resultDate.getMonth() + amount);
          break;
        case 'years':
          resultDate.setFullYear(resultDate.getFullYear() + amount);
          break;
      }
    } else {
      switch (unit) {
        case 'days':
          resultDate.setDate(resultDate.getDate() - amount);
          break;
        case 'weeks':
          resultDate.setDate(resultDate.getDate() - (amount * 7));
          break;
        case 'months':
          resultDate.setMonth(resultDate.getMonth() - amount);
          break;
        case 'years':
          resultDate.setFullYear(resultDate.getFullYear() - amount);
          break;
      }
    }

    setResult(`Result date: ${resultDate.toISOString().split('T')[0]}`);
  }, [startDate, amount, unit, calculationType]);

  const handleCalculate = useCallback(() => {
    if (calculationType === 'difference') {
      calculateDifference();
    } else {
      addSubtractDate();
    }
  }, [calculationType, calculateDifference, addSubtractDate]);

  const resetForm = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
    setCalculationType('difference');
    setUnit('days');
    setAmount(0);
    setResult('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Date Calculator</h1>
            <p className="opacity-90">Calculate date differences or add/subtract time periods</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Calculation Type</label>
                <select
                  value={calculationType}
                  onChange={(e) => setCalculationType(e.target.value as 'difference' | 'add' | 'subtract')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="difference">Date Difference</option>
                  <option value="add">Add Time Period</option>
                  <option value="subtract">Subtract Time Period</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'days' | 'weeks' | 'months' | 'years')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            {/* Date inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {calculationType === 'difference' ? 'Start Date' : 'Reference Date'}
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {calculationType === 'difference' ? (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Amount</label>
                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount..."
                  />
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCalculate}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
              >
                Calculate
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
              >
                Reset
              </motion.button>
            </div>

            {/* Result display */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">Result</h3>
                <p className="text-2xl font-bold text-green-700">{result}</p>
              </motion.div>
            )}

            {/* Information section */}
            <div className="mt-8 bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">About Date Calculations</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Date Difference:</strong> Calculates the time between two dates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Add/Subtract:</strong> Adds or subtracts time periods from a reference date</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>All calculations account for leap years and varying month lengths</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-gray-600 text-sm"
        >
          <p>
            Note: This calculator provides estimates only. For precise financial or legal calculations,
            please consult with a qualified professional.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DateCalculator;