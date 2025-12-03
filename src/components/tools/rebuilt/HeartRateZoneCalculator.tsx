'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const HeartRateZoneCalculator = () => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [result, setResult] = useState<{
    maxHR: number;
    reserveHR: number;
    zones: {
      name: string;
      range: string;
      percentage: string;
      description: string;
    }[];
  } | null>(null);

  const calculateHeartRateZones = useCallback(() => {
    if (!age || !restingHR) return;

    const ageNum = parseInt(age);
    const restingHRNum = parseInt(restingHR);

    // Calculate Maximum Heart Rate (MHR)
    const maxHR = 220 - ageNum;

    // Calculate Heart Rate Reserve (HRR)
    const reserveHR = maxHR - restingHRNum;

    // Calculate zones using Karvonen formula: Target HR = ((MHR - Resting HR) × %Intensity) + Resting HR
    const zones = [
      {
        name: 'Warm Up',
        range: `${Math.round(restingHRNum + reserveHR * 0.5)} - ${Math.round(restingHRNum + reserveHR * 0.6)}`,
        percentage: '50-60%',
        description: 'Light activity for warming up muscles'
      },
      {
        name: 'Fat Burn',
        range: `${Math.round(restingHRNum + reserveHR * 0.6)} - ${Math.round(restingHRNum + reserveHR * 0.7)}`,
        percentage: '60-70%',
        description: 'Optimal for fat burning and endurance'
      },
      {
        name: 'Cardio',
        range: `${Math.round(restingHRNum + reserveHR * 0.7)} - ${Math.round(restingHRNum + reserveHR * 0.8)}`,
        percentage: '70-80%',
        description: 'Improves cardiovascular fitness'
      },
      {
        name: 'Peak',
        range: `${Math.round(restingHRNum + reserveHR * 0.8)} - ${Math.round(restingHRNum + reserveHR * 0.85)}`,
        percentage: '80-85%',
        description: 'High-intensity training for performance'
      },
      {
        name: 'Anaerobic',
        range: `${Math.round(restingHRNum + reserveHR * 0.85)} - ${Math.round(restingHRNum + reserveHR * 0.9)}`,
        percentage: '85-90%',
        description: 'Short bursts for speed and power'
      },
      {
        name: 'Red Line',
        range: `${Math.round(restingHRNum + reserveHR * 0.9)} - ${maxHR}`,
        percentage: '90-100%',
        description: 'Maximum effort for very short periods'
      }
    ];

    setResult({
      maxHR,
      reserveHR,
      zones
    });
  }, [age, restingHR]);

  const reset = useCallback(() => {
    setAge('');
    setRestingHR('');
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
          <div className="text-3xl sm:text-4xl mb-2">❤️</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Heart Rate Zone Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Calculate your target heart rate zones for different types of exercise
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
              Resting Heart Rate (bpm)
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              placeholder="60"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <button
            onClick={calculateHeartRateZones}
            disabled={!age || !restingHR}
            className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate Heart Rate Zones
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
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="text-2xl font-bold text-blue-600">{result.maxHR}</div>
                  <div className="text-sm text-blue-700">Max Heart Rate (bpm)</div>
                </div>
                <div className="bg-green-50 p-4 rounded-md">
                  <div className="text-2xl font-bold text-green-600">{result.reserveHR}</div>
                  <div className="text-sm text-green-700">Heart Rate Reserve</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Target Heart Rate Zones</h3>
              
              {result.zones.map((zone, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-md border ${
                    index === 0 ? 'border-blue-200 bg-blue-50' :
                    index === 1 ? 'border-green-200 bg-green-50' :
                    index === 2 ? 'border-yellow-200 bg-yellow-50' :
                    index === 3 ? 'border-orange-200 bg-orange-50' :
                    index === 4 ? 'border-red-200 bg-red-50' :
                    'border-purple-200 bg-purple-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                      <p className="text-sm text-gray-600">{zone.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{zone.range} bpm</div>
                      <div className="text-sm text-gray-600">{zone.percentage}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">How to Use These Zones</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Measure your heart rate during exercise using a wearable device</li>
                <li>Adjust workout intensity to stay within desired zones</li>
                <li>Beginners should spend more time in lower zones</li>
                <li>Advanced athletes can incorporate higher intensity intervals</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> These calculations provide estimates based on commonly used formulas. 
            Individual heart rate responses may vary. Consult with a healthcare professional before starting 
            any new exercise program, especially if you have heart conditions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeartRateZoneCalculator;