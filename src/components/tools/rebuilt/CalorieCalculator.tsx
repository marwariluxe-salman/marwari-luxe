'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const CalorieCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [goal, setGoal] = useState('maintain');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<number | null>(null);

  const calculateCalories = useCallback(() => {
    if (!age || !height || !weight) return;

    // Convert to metric if needed
    let weightInKg = parseFloat(weight);
    let heightInCm = parseFloat(height);

    if (unit === 'imperial') {
      weightInKg = parseFloat(weight) * 0.453592; // lbs to kg
      heightInCm = parseFloat(height) * 2.54; // inches to cm
    }

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseInt(age) + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseInt(age) - 161;
    }

    const tdee = bmr * parseFloat(activity);

    let calories: number;
    switch (goal) {
      case 'lose':
        calories = tdee - 500; // 500 calorie deficit for weight loss
        break;
      case 'gain':
        calories = tdee + 500; // 500 calorie surplus for weight gain
        break;
      default: // maintain
        calories = tdee;
    }

    setResult(Math.round(calories));
  }, [age, height, weight, unit, gender, activity, goal]);

  const reset = useCallback(() => {
    setAge('');
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
          <div className="text-3xl sm:text-4xl mb-2">🔥</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Calorie Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Determine your daily caloric needs based on your activity level and goals
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
              Age (years)
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
          
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="1.2">Sedentary (little or no exercise)</option>
              <option value="1.375">Lightly active (light exercise 1-3 days/week)</option>
              <option value="1.55">Moderately active (moderate exercise 3-5 days/week)</option>
              <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
              <option value="1.9">Extra active (very hard exercise & physical job)</option>
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
              <option value="lose">Lose weight</option>
              <option value="maintain">Maintain weight</option>
              <option value="gain">Gain weight</option>
            </select>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <button
            onClick={calculateCalories}
            disabled={!age || !height || !weight}
            className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate Calories
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
                {result}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                Daily Calories Recommended
              </div>
              <p className="text-gray-600">
                Based on your inputs, you should consume approximately {result} calories per day to {goal === 'lose' ? 'lose weight' : goal === 'gain' ? 'gain weight' : 'maintain your current weight'}.
              </p>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">How to Use This Information</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Track your food intake to stay within this calorie range</li>
                <li>Focus on nutrient-dense whole foods</li>
                <li>Adjust as needed based on your progress</li>
                <li>Consult a nutritionist for personalized advice</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides an estimate based on scientific formulas. 
            Individual needs may vary. Consult with a healthcare professional or registered dietitian 
            for personalized nutritional advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CalorieCalculator;