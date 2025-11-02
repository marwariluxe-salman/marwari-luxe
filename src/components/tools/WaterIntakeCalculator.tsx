'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [activityLevel, setActivityLevel] = useState('low');
  const [climate, setClimate] = useState('moderate');
  const [result, setResult] = useState<{
    dailyIntake: number;
    glassesOf250ml: number;
    bottlesOf500ml: number;
    tips: string[];
  } | null>(null);

  const calculateWaterIntake = () => {
    if (!weight) return;

    let weightInKg = parseFloat(weight);
    if (unit === 'lbs') {
      weightInKg = weightInKg * 0.453592; // Convert lbs to kg
    }

    // Base calculation: 35ml per kg of body weight
    let baseIntake = weightInKg * 35;

    // Activity level adjustment
    switch (activityLevel) {
      case 'low':
        baseIntake *= 1.0;
        break;
      case 'moderate':
        baseIntake *= 1.2;
        break;
      case 'high':
        baseIntake *= 1.4;
        break;
      case 'very-high':
        baseIntake *= 1.6;
        break;
    }

    // Climate adjustment
    switch (climate) {
      case 'cold':
        baseIntake *= 0.9;
        break;
      case 'moderate':
        baseIntake *= 1.0;
        break;
      case 'hot':
        baseIntake *= 1.3;
        break;
      case 'very-hot':
        baseIntake *= 1.5;
        break;
    }

    const dailyIntake = Math.round(baseIntake);
    const glassesOf250ml = Math.round(dailyIntake / 250);
    const bottlesOf500ml = Math.round(dailyIntake / 500);

    const tips = [
      'Start your day with a glass of water',
      'Keep a water bottle with you at all times',
      'Set reminders to drink water throughout the day',
      'Eat water-rich foods like fruits and vegetables',
      'Drink water before, during, and after exercise',
    ];

    setResult({
      dailyIntake,
      glassesOf250ml,
      bottlesOf500ml,
      tips,
    });
  };

  const reset = () => {
    setWeight('');
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💧</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Water Intake Calculator</h2>
          <p className="text-gray-600">
            Find out how much water you should drink daily for optimal hydration
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body Weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'kg' ? '70' : '154'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex bg-gray-100 rounded-md">
                <button
                  onClick={() => setUnit('kg')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    unit === 'kg' ? 'bg-blue-600 text-white' : 'text-gray-600'
                  }`}
                >
                  kg
                </button>
                <button
                  onClick={() => setUnit('lbs')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    unit === 'lbs' ? 'bg-blue-600 text-white' : 'text-gray-600'
                  }`}
                >
                  lbs
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low (Sedentary lifestyle)</option>
              <option value="moderate">Moderate (Light exercise 1-3 times/week)</option>
              <option value="high">High (Regular exercise 3-5 times/week)</option>
              <option value="very-high">Very High (Intense exercise 6-7 times/week)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Climate
            </label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cold">Cold (Below 15°C/59°F)</option>
              <option value="moderate">Moderate (15-25°C/59-77°F)</option>
              <option value="hot">Hot (25-35°C/77-95°F)</option>
              <option value="very-hot">Very Hot (Above 35°C/95°F)</option>
            </select>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={calculateWaterIntake}
            disabled={!weight}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Calculate Water Intake
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {result.dailyIntake}ml
                </div>
                <div className="text-sm text-gray-600">Daily Water Intake</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {result.glassesOf250ml}
                </div>
                <div className="text-sm text-gray-600">Glasses (250ml each)</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {result.bottlesOf500ml}
                </div>
                <div className="text-sm text-gray-600">Bottles (500ml each)</div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Hydration Tips
              </h3>
              <ul className="space-y-2">
                {result.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This calculator provides general recommendations. 
            Individual needs may vary based on health conditions, medications, and other factors. 
            Consult with a healthcare provider for personalized advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WaterIntakeCalculator;