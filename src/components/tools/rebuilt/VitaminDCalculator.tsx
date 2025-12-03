'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const VitaminDCalculator = () => {
  const [age, setAge] = useState('');
  const [skinType, setSkinType] = useState('medium');
  const [location, setLocation] = useState('temperate');
  const [sunExposure, setSunExposure] = useState('moderate');
  const [supplements, setSupplements] = useState(false);
  const [result, setResult] = useState<{
    dailyIntake: number;
    weeklySun: string;
    recommendation: string;
  } | null>(null);

  const calculateVitaminD = useCallback(() => {
    if (!age) return;

    const ageNum = parseInt(age);

    // Base recommendation based on age (IU/day)
    let baseIntake: number;
    if (ageNum < 1) {
      baseIntake = 400; // Infants
    } else if (ageNum < 19) {
      baseIntake = 600; // Children/Teens
    } else if (ageNum < 70) {
      baseIntake = 600; // Adults
    } else {
      baseIntake = 800; // Seniors
    }

    // Adjust for skin type
    // Skin types: veryFair, fair, medium, olive, brown, black
    const skinMultiplier = 
      skinType === 'veryFair' ? 1.5 :
      skinType === 'fair' ? 1.3 :
      skinType === 'medium' ? 1.0 :
      skinType === 'olive' ? 0.8 :
      skinType === 'brown' ? 0.6 :
      0.4; // black

    // Adjust for location
    const locationMultiplier = 
      location === 'tropical' ? 1.3 :
      location === 'subTropical' ? 1.1 :
      location === 'temperate' ? 1.0 :
      0.8; // northern

    // Adjust for sun exposure
    const exposureMultiplier = 
      sunExposure === 'minimal' ? 1.5 :
      sunExposure === 'low' ? 1.3 :
      sunExposure === 'moderate' ? 1.0 :
      sunExposure === 'high' ? 0.7 :
      0.5; // veryHigh

    // Calculate adjusted intake
    let adjustedIntake = baseIntake * skinMultiplier * locationMultiplier * exposureMultiplier;

    // If already taking supplements, reduce recommendation
    if (supplements) {
      adjustedIntake *= 0.7;
    }

    // Ensure minimum recommendation of 600 IU for adults
    if (ageNum >= 19 && adjustedIntake < 600) {
      adjustedIntake = 600;
    }

    // Round to nearest 100
    adjustedIntake = Math.round(adjustedIntake / 100) * 100;

    // Calculate weekly sun exposure recommendation
    let weeklySun: string;
    if (sunExposure === 'minimal' || sunExposure === 'low') {
      weeklySun = '15-30 minutes, 3-4 times per week';
    } else if (sunExposure === 'moderate') {
      weeklySun = '10-15 minutes, 2-3 times per week';
    } else {
      weeklySun = '5-10 minutes, 1-2 times per week';
    }

    // Generate recommendation
    let recommendation: string;
    if (adjustedIntake <= 600) {
      recommendation = 'Your vitamin D levels appear adequate with current sun exposure and lifestyle.';
    } else if (adjustedIntake <= 1000) {
      recommendation = 'Consider a vitamin D supplement to reach optimal levels.';
    } else {
      recommendation = 'A vitamin D supplement is recommended to address potential deficiency.';
    }

    setResult({
      dailyIntake: adjustedIntake,
      weeklySun,
      recommendation
    });
  }, [age, skinType, location, sunExposure, supplements]);

  const reset = useCallback(() => {
    setAge('');
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
          <div className="text-3xl sm:text-4xl mb-2">☀️</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Vitamin D Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Calculate recommended vitamin D intake based on your location and lifestyle
          </p>
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
              Skin Type
            </label>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="veryFair">Very Fair (burns easily, never tans)</option>
              <option value="fair">Fair (burns easily, tans minimally)</option>
              <option value="medium">Medium (burns moderately, tans gradually)</option>
              <option value="olive">Olive (burns minimally, tans easily)</option>
              <option value="brown">Brown (rarely burns, tans easily)</option>
              <option value="black">Black (never burns, tans easily)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geographic Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="tropical">Tropical (near equator)</option>
              <option value="subTropical">Sub-tropical (20-30° latitude)</option>
              <option value="temperate">Temperate (30-50° latitude)</option>
              <option value="northern">Northern (above 50° latitude)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sun Exposure
            </label>
            <select
              value={sunExposure}
              onChange={(e) => setSunExposure(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="minimal">Minimal (mostly indoors)</option>
              <option value="low">Low (limited outdoor time)</option>
              <option value="moderate">Moderate (spend time outdoors)</option>
              <option value="high">High (outdoors frequently)</option>
              <option value="veryHigh">Very High (outdoor worker/athlete)</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="supplements"
              checked={supplements}
              onChange={(e) => setSupplements(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="supplements" className="ml-2 block text-sm text-gray-700">
              I currently take vitamin D supplements
            </label>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <button
            onClick={calculateVitaminD}
            disabled={!age}
            className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate Vitamin D Needs
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
                {result.dailyIntake} IU
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                Recommended Daily Intake
              </div>
              <p className="text-gray-600">
                Based on your profile, aim for {result.dailyIntake} IU of vitamin D daily.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-yellow-50 p-4 rounded-md">
                <h3 className="font-semibold text-yellow-800 mb-2">Sun Exposure</h3>
                <p className="text-yellow-700">
                  {result.weeklySun} of sun exposure on arms/legs without sunscreen
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-blue-800 mb-2">Supplementation</h3>
                <p className="text-blue-700">
                  {result.recommendation}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Food Sources (per serving)</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Salmon (3.5 oz)</span>
                  <span>570 IU</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Tuna (3.5 oz)</span>
                  <span>200 IU</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Egg Yolk (1 large)</span>
                  <span>40 IU</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Fortified Milk (8 oz)</span>
                  <span>120 IU</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Fortified Cereal (1 cup)</span>
                  <span>40-100 IU</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Vitamin D Benefits</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Supports bone health and calcium absorption</li>
                <li>Strengthens immune system function</li>
                <li>Promotes muscle function</li>
                <li>May reduce risk of certain diseases</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides general recommendations based on scientific guidelines. 
            Individual vitamin D needs may vary. Consult with a healthcare professional for personalized advice, 
            especially if you suspect deficiency or have health conditions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VitaminDCalculator;