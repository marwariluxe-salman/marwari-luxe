'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    description: string;
  } | null>(null);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInMeters: number;
    let weightInKg: number;

    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100; // cm to meters
      weightInKg = parseFloat(weight);
    } else {
      heightInMeters = parseFloat(height) * 0.0254; // inches to meters
      weightInKg = parseFloat(weight) * 0.453592; // pounds to kg
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category: string;
    let description: string;

    if (bmi < 18.5) {
      category = 'Underweight';
      description = 'You are below the normal weight range. Consider consulting with a healthcare provider.';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      description = 'You are in the healthy weight range. Keep maintaining your current lifestyle!';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      description = 'You are above the normal weight range. Consider a balanced diet and regular exercise.';
    } else {
      category = 'Obese';
      description = 'You are in the obese range. It&apos;s recommended to consult with a healthcare provider.';
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      description
    });
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setResult(null);
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-blue-600';
    if (bmi >= 18.5 && bmi < 25) return 'text-green-600';
    if (bmi >= 25 && bmi < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBMIBarPosition = (bmi: number) => {
    const minBMI = 15;
    const maxBMI = 35;
    const position = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
    return Math.max(0, Math.min(100, position));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mobile-card bg-white rounded-lg shadow-lg p-4 sm:p-6"
      >
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-3xl sm:text-4xl mb-2">⚖️</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">BMI Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Calculate your Body Mass Index to assess if you&apos;re in a healthy weight range
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-gray-100 rounded-lg p-1 flex w-full sm:w-auto">
            <button
              onClick={() => setUnit('metric')}
              className={`flex-1 sm:flex-none px-4 py-3 rounded-md font-medium transition-colors mobile-btn ${
                unit === 'metric' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`flex-1 sm:flex-none px-4 py-3 rounded-md font-medium transition-colors mobile-btn ${
                unit === 'imperial' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
              }`}
            >
              Imperial
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === 'metric' ? '175' : '69'}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? '70' : '154'}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <button
            onClick={calculateBMI}
            disabled={!height || !weight}
            className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate BMI
          </button>
          <button
            onClick={reset}
            className="mobile-btn w-full px-4 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-t pt-6"
          >
            <div className="text-center mb-6">
              <div className={`text-4xl font-bold ${getBMIColor(result.bmi)} mb-2`}>
                {result.bmi}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {result.category}
              </div>
              <p className="text-gray-600">
                {result.description}
              </p>
            </div>

            {/* BMI Scale */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
              <div className="relative h-4 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full">
                <div
                  className="absolute top-0 w-2 h-4 bg-gray-800 rounded-full transform -translate-x-1"
                  style={{ left: `${getBMIBarPosition(result.bmi)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
              </div>
            </div>

            {/* BMI Categories */}
            <div className="grid grid-cols-1 gap-2 text-sm mobile-text-sm">
              <div className="flex items-center p-2 rounded-md">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <span>Underweight: &lt; 18.5</span>
              </div>
              <div className="flex items-center p-2 rounded-md">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span>Normal: 18.5 - 24.9</span>
              </div>
              <div className="flex items-center p-2 rounded-md">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                <span>Overweight: 25 - 29.9</span>
              </div>
              <div className="flex items-center p-2 rounded-md">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                <span>Obese: ≥ 30</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> BMI is a screening tool and is not intended to diagnose 
            disease or illness. Please consult with a qualified healthcare professional for 
            personalized advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BMICalculator;