'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('low');
  const [climate, setClimate] = useState('normal');
  const [pregnant, setPregnant] = useState(false);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<number | null>(null);

  const calculateWaterIntake = useCallback(() => {
    if (!weight) return;

    // Convert weight to kg if needed
    let weightInKg = parseFloat(weight);
    if (unit === 'imperial') {
      weightInKg = parseFloat(weight) * 0.453592; // lbs to kg
    }

    // Base calculation: 30-35ml per kg of body weight
    let baseIntake = weightInKg * 33; // ml

    // Adjust for activity level
    if (activity === 'moderate') {
      baseIntake += 500; // ml
    } else if (activity === 'high') {
      baseIntake += 1000; // ml
    }

    // Adjust for climate
    if (climate === 'hot') {
      baseIntake += 500; // ml
    }

    // Adjust for pregnancy/breastfeeding
    if (pregnant) {
      baseIntake += 500; // ml
    }

    // Convert to liters
    const liters = baseIntake / 1000;

    setResult(parseFloat(liters.toFixed(2)));
  }, [weight, activity, climate, pregnant, unit]);

  const reset = useCallback(() => {
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
          <div className="text-3xl sm:text-4xl mb-2">💧</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Water Intake Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Find out how much water you should drink daily for optimal hydration
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="low">Low (sedentary)</option>
              <option value="moderate">Moderate (light exercise 1-3 days/week)</option>
              <option value="high">High (intense exercise 4+ days/week)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Climate
            </label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="normal">Normal</option>
              <option value="hot">Hot/Dry</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="pregnant"
              checked={pregnant}
              onChange={(e) => setPregnant(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="pregnant" className="ml-2 block text-sm text-gray-700">
              Pregnant or breastfeeding
            </label>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <button
            onClick={calculateWaterIntake}
            disabled={!weight}
            className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate Water Intake
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
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {result}L
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                Daily Water Intake Recommendation
              </div>
              <p className="text-gray-600">
                Based on your profile, you should aim to drink approximately {result} liters of water per day.
              </p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-sm text-blue-700">8oz glasses</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="text-2xl font-bold text-blue-600">{Math.round(result * 1000 / 250)}</div>
                  <div className="text-sm text-blue-700">250ml cups</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Tips for Staying Hydrated</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Drink water throughout the day, not just when thirsty</li>
                <li>Carry a reusable water bottle</li>
                <li>Eat water-rich foods like fruits and vegetables</li>
                <li>Drink extra water before, during, and after exercise</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides a general recommendation. 
            Individual water needs may vary based on health conditions, medications, and other factors. 
            Consult with a healthcare professional for personalized advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WaterIntakeCalculator;