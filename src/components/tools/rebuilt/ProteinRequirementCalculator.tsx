'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const ProteinRequirementCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{
    min: number;
    max: number;
    recommendation: string;
  } | null>(null);

  const calculateProtein = useCallback(() => {
    if (!weight) return;

    // Convert weight to kg if needed
    let weightInKg = parseFloat(weight);
    if (unit === 'imperial') {
      weightInKg = parseFloat(weight) * 0.453592; // lbs to kg
    }

    // Calculate protein range based on activity level and goals
    let minMultiplier: number;
    let maxMultiplier: number;
    let recommendation: string;

    switch (activity) {
      case 'sedentary':
        minMultiplier = 0.8;
        maxMultiplier = 1.0;
        recommendation = 'For sedentary individuals, the minimum requirement is adequate.';
        break;
      case 'lightlyActive':
        minMultiplier = 1.0;
        maxMultiplier = 1.2;
        recommendation = 'For lightly active individuals, aim for the mid-range.';
        break;
      case 'active':
        minMultiplier = 1.2;
        maxMultiplier = 1.6;
        recommendation = 'For active individuals, aim for the upper range.';
        break;
      case 'athlete':
        minMultiplier = 1.6;
        maxMultiplier = 2.2;
        recommendation = 'For athletes, aim for the higher end of the range.';
        break;
      default:
        minMultiplier = 0.8;
        maxMultiplier = 1.0;
        recommendation = 'For sedentary individuals, the minimum requirement is adequate.';
    }

    // Adjust for goals
    if (goal === 'muscleGain') {
      minMultiplier += 0.2;
      maxMultiplier += 0.2;
      recommendation += ' For muscle gain, increase protein intake by 0.2g per kg.';
    } else if (goal === 'weightLoss') {
      minMultiplier += 0.2;
      maxMultiplier += 0.2;
      recommendation += ' For weight loss, higher protein helps preserve muscle mass.';
    }

    const minProtein = weightInKg * minMultiplier;
    const maxProtein = weightInKg * maxMultiplier;

    setResult({
      min: parseFloat(minProtein.toFixed(1)),
      max: parseFloat(maxProtein.toFixed(1)),
      recommendation
    });
  }, [weight, activity, goal, unit]);

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
          <div className="text-3xl sm:text-4xl mb-2">🥩</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Protein Requirement Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Determine your daily protein needs based on your lifestyle and fitness goals
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
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="lightlyActive">Lightly Active (light exercise 1-3 days/week)</option>
              <option value="active">Active (moderate exercise 3-5 days/week)</option>
              <option value="athlete">Athlete (intense exercise 6-7 days/week)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="maintain">Maintain current weight</option>
              <option value="weightLoss">Lose weight</option>
              <option value="muscleGain">Gain muscle</option>
            </select>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <button
            onClick={calculateProtein}
            disabled={!weight}
            className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate Protein Needs
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
                {result.min} - {result.max}g
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                Daily Protein Requirement
              </div>
              <p className="text-gray-600">
                Based on your profile, you should consume between {result.min} and {result.max} grams of protein per day.
              </p>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="text-blue-700">{result.recommendation}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Protein Sources (per 100g)</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded-md">Chicken Breast: 31g</div>
                  <div className="bg-gray-50 p-3 rounded-md">Salmon: 25g</div>
                  <div className="bg-gray-50 p-3 rounded-md">Greek Yogurt: 10g</div>
                  <div className="bg-gray-50 p-3 rounded-md">Eggs: 13g</div>
                  <div className="bg-gray-50 p-3 rounded-md">Tofu: 8g</div>
                  <div className="bg-gray-50 p-3 rounded-md">Quinoa: 4g</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Tips for Meeting Protein Goals</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Distribute protein intake evenly across meals</li>
                <li>Include a protein source at every meal</li>
                <li>Choose lean protein sources</li>
                <li>Consider protein supplements if needed</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> These calculations provide general recommendations based on scientific guidelines. 
            Individual protein needs may vary based on health conditions, metabolism, and other factors. 
            Consult with a registered dietitian or healthcare professional for personalized advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProteinRequirementCalculator;