'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const CalorieCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain');
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
  } | null>(null);

  const activityLevels = [
    { value: '1.2', label: 'Sedentary (desk job, no exercise)' },
    { value: '1.375', label: 'Lightly active (light exercise 1-3 days/week)' },
    { value: '1.55', label: 'Moderately active (moderate exercise 3-5 days/week)' },
    { value: '1.725', label: 'Very active (hard exercise 6-7 days/week)' },
    { value: '1.9', label: 'Extremely active (very hard exercise, physical job)' },
  ];

  const calculateCalories = () => {
    if (!age || !height || !weight) return;

    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const activityNum = parseFloat(activityLevel);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityNum;

    // Calculate goal calories
    let goalCalories: number;
    switch (goal) {
      case 'lose':
        goalCalories = tdee - 500; // 500 calorie deficit for 1 lb/week loss
        break;
      case 'gain':
        goalCalories = tdee + 300; // 300 calorie surplus for gradual gain
        break;
      default:
        goalCalories = tdee;
    }

    // Calculate macros (protein: 25%, carbs: 45%, fat: 30%)
    const protein = (goalCalories * 0.25) / 4; // 4 calories per gram
    const carbs = (goalCalories * 0.45) / 4; // 4 calories per gram
    const fat = (goalCalories * 0.3) / 9; // 9 calories per gram

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      macros: {
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
      },
    });
  };

  const reset = () => {
    setAge('');
    setHeight('');
    setWeight('');
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔥</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Calorie Calculator</h2>
          <p className="text-gray-600">
            Calculate your daily caloric needs based on your activity level and goals
          </p>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age (years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal
            </label>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="goal"
                  value="lose"
                  checked={goal === 'lose'}
                  onChange={(e) => setGoal(e.target.value as 'maintain' | 'lose' | 'gain')}
                  className="mr-2"
                />
                Lose Weight
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="goal"
                  value="maintain"
                  checked={goal === 'maintain'}
                  onChange={(e) => setGoal(e.target.value as 'maintain' | 'lose' | 'gain')}
                  className="mr-2"
                />
                Maintain Weight
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="goal"
                  value="gain"
                  checked={goal === 'gain'}
                  onChange={(e) => setGoal(e.target.value as 'maintain' | 'lose' | 'gain')}
                  className="mr-2"
                />
                Gain Weight
              </label>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={calculateCalories}
            disabled={!age || !height || !weight}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Calculate Calories
          </button>
          <button
            onClick={reset}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {result.bmr}
                </div>
                <div className="text-sm text-gray-600">BMR (Base Metabolic Rate)</div>
                <div className="text-xs text-gray-500 mt-1">
                  Calories burned at rest
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {result.tdee}
                </div>
                <div className="text-sm text-gray-600">TDEE (Total Daily Energy)</div>
                <div className="text-xs text-gray-500 mt-1">
                  Calories for maintenance
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {result.goalCalories}
                </div>
                <div className="text-sm text-gray-600">Goal Calories</div>
                <div className="text-xs text-gray-500 mt-1">
                  Daily target for your goal
                </div>
              </div>
            </div>

            {/* Macros Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended Macronutrient Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 mb-1">
                    {result.macros.protein}g
                  </div>
                  <div className="text-sm text-gray-600">Protein (25%)</div>
                  <div className="text-xs text-gray-500">4 cal/gram</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-600 mb-1">
                    {result.macros.carbs}g
                  </div>
                  <div className="text-sm text-gray-600">Carbohydrates (45%)</div>
                  <div className="text-xs text-gray-500">4 cal/gram</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600 mb-1">
                    {result.macros.fat}g
                  </div>
                  <div className="text-sm text-gray-600">Fat (30%)</div>
                  <div className="text-xs text-gray-500">9 cal/gram</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This calculator provides estimates based on standard 
            formulas. Individual needs may vary based on metabolism, medical conditions, and 
            other factors. Consult with a healthcare professional or registered dietitian 
            for personalized advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CalorieCalculator;