'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const BodyFatPercentageCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{
    bodyFat: number;
    category: string;
    description: string;
  } | null>(null);

  const calculateBodyFat = useCallback(() => {
    if (!waist || !neck || !height || !weight || (gender === 'female' && !hip)) return;

    // Convert measurements to metric if needed
    let waistCm = parseFloat(waist);
    let neckCm = parseFloat(neck);
    let hipCm = parseFloat(hip || '0');
    let heightCm = parseFloat(height);
    let weightKg = parseFloat(weight);

    if (unit === 'imperial') {
      waistCm = parseFloat(waist) * 2.54; // inches to cm
      neckCm = parseFloat(neck) * 2.54; // inches to cm
      hipCm = parseFloat(hip || '0') * 2.54; // inches to cm
      heightCm = parseFloat(height) * 2.54; // inches to cm
      weightKg = parseFloat(weight) * 0.453592; // lbs to kg
    }

    // Calculate body fat percentage using US Navy method
    let bodyFat: number;
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387;
    }

    // Ensure body fat is within reasonable bounds
    bodyFat = Math.max(0, Math.min(100, bodyFat));

    // Determine category
    let category: string;
    let description: string;

    if (gender === 'male') {
      if (bodyFat < 6) {
        category = 'Essential Fat';
        description = 'Below normal range. May indicate health issues.';
      } else if (bodyFat < 14) {
        category = 'Athletes';
        description = 'Typical for male athletes.';
      } else if (bodyFat < 18) {
        category = 'Fitness';
        description = 'Healthy range for physically fit men.';
      } else if (bodyFat < 25) {
        category = 'Average';
        description = 'Normal range for most men.';
      } else {
        category = 'Obese';
        description = 'Above normal range. May indicate health risks.';
      }
    } else {
      if (bodyFat < 14) {
        category = 'Essential Fat';
        description = 'Below normal range. May indicate health issues.';
      } else if (bodyFat < 21) {
        category = 'Athletes';
        description = 'Typical for female athletes.';
      } else if (bodyFat < 25) {
        category = 'Fitness';
        description = 'Healthy range for physically fit women.';
      } else if (bodyFat < 32) {
        category = 'Average';
        description = 'Normal range for most women.';
      } else {
        category = 'Obese';
        description = 'Above normal range. May indicate health risks.';
      }
    }

    setResult({
      bodyFat: parseFloat(bodyFat.toFixed(1)),
      category,
      description
    });
  }, [waist, neck, hip, height, weight, gender, unit]);

  const reset = useCallback(() => {
    setWaist('');
    setNeck('');
    setHip('');
    setHeight('');
    setWeight('');
    setResult(null);
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
          <div className="text-3xl sm:text-4xl mb-2">📊</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Body Fat Percentage Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Estimate your body fat percentage using various measurement methods
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

        {/* Gender Selection */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-3 rounded-md font-medium transition-colors ${
                gender === 'male' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-3 rounded-md font-medium transition-colors ${
                gender === 'female' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waist Circumference ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder={unit === 'metric' ? '80' : '31.5'}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Neck Circumference ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              placeholder={unit === 'metric' ? '35' : '13.8'}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
          
          {gender === 'female' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hip Circumference ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                placeholder={unit === 'metric' ? '95' : '37.4'}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
          )}
          
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
            onClick={calculateBodyFat}
            disabled={!waist || !neck || !height || !weight || (gender === 'female' && !hip)}
            className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate Body Fat %
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
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {result.bodyFat}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                Body Fat Percentage
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                result.category === 'Essential Fat' ? 'bg-red-100 text-red-800' :
                result.category === 'Athletes' ? 'bg-green-100 text-green-800' :
                result.category === 'Fitness' ? 'bg-blue-100 text-blue-800' :
                result.category === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {result.category}
              </div>
              <p className="text-gray-600">
                {result.description}
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Body Fat Categories</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Essential Fat</span>
                  <span>{gender === 'male' ? '<6%' : '<14%'}</span>
                </div>
                <div className="flex justify-between p-2 bg-green-50 rounded">
                  <span>Athletes</span>
                  <span>{gender === 'male' ? '6-13%' : '14-20%'}</span>
                </div>
                <div className="flex justify-between p-2 bg-blue-50 rounded">
                  <span>Fitness</span>
                  <span>{gender === 'male' ? '14-17%' : '21-24%'}</span>
                </div>
                <div className="flex justify-between p-2 bg-yellow-50 rounded">
                  <span>Average</span>
                  <span>{gender === 'male' ? '18-24%' : '25-31%'}</span>
                </div>
                <div className="flex justify-between p-2 bg-red-50 rounded">
                  <span>Obese</span>
                  <span>{gender === 'male' ? '25%+' : '32%+'}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Understanding Body Fat</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Body fat is essential for hormone regulation and organ protection</li>
                <li>Too little body fat can be unhealthy</li>
                <li>Excess body fat increases risk of chronic diseases</li>
                <li>Regular exercise and balanced nutrition help maintain healthy body fat levels</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides an estimate based on the US Navy method. 
            Actual body fat percentage can vary based on genetics, age, and other factors. 
            For precise measurements, consider professional methods like DEXA scans or hydrostatic weighing.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BodyFatPercentageCalculator;