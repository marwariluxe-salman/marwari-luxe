'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const HeartRateZoneCalculator = () => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [method, setMethod] = useState<'age' | 'karvonen'>('karvonen');
  const [result, setResult] = useState<{
    maxHR: number;
    zones: {
      name: string;
      description: string;
      range: [number, number];
      color: string;
      benefits: string;
    }[];
  } | null>(null);

  const calculateHeartRateZones = () => {
    if (!age) return;

    const ageNum = parseInt(age);
    const restingHRNum = restingHR ? parseInt(restingHR) : 60;
    
    // Calculate maximum heart rate
    const maxHR = 220 - ageNum;
    
    let zones: {
      name: string;
      description: string;
      range: [number, number];
      color: string;
      benefits: string;
    }[] = [];

    if (method === 'age') {
      // Age-based method (simpler)
      zones = [
        {
          name: 'Active Recovery',
          description: 'Zone 1 (50-60%)',
          range: [Math.round(maxHR * 0.5), Math.round(maxHR * 0.6)],
          color: 'text-gray-600 bg-gray-50',
          benefits: 'Recovery, warm-up, cool-down'
        },
        {
          name: 'Base Training',
          description: 'Zone 2 (60-70%)',
          range: [Math.round(maxHR * 0.6), Math.round(maxHR * 0.7)],
          color: 'text-blue-600 bg-blue-50',
          benefits: 'Fat burning, aerobic base building'
        },
        {
          name: 'Aerobic',
          description: 'Zone 3 (70-80%)',
          range: [Math.round(maxHR * 0.7), Math.round(maxHR * 0.8)],
          color: 'text-green-600 bg-green-50',
          benefits: 'Cardiovascular fitness, endurance'
        },
        {
          name: 'Threshold',
          description: 'Zone 4 (80-90%)',
          range: [Math.round(maxHR * 0.8), Math.round(maxHR * 0.9)],
          color: 'text-yellow-600 bg-yellow-50',
          benefits: 'Lactate threshold, performance'
        },
        {
          name: 'VO2 Max',
          description: 'Zone 5 (90-100%)',
          range: [Math.round(maxHR * 0.9), maxHR],
          color: 'text-red-600 bg-red-50',
          benefits: 'Maximum power, anaerobic capacity'
        }
      ];
    } else {
      // Karvonen method (more accurate)
      const hrReserve = maxHR - restingHRNum;
      
      zones = [
        {
          name: 'Active Recovery',
          description: 'Zone 1 (50-60%)',
          range: [
            Math.round((hrReserve * 0.5) + restingHRNum),
            Math.round((hrReserve * 0.6) + restingHRNum)
          ],
          color: 'text-gray-600 bg-gray-50',
          benefits: 'Recovery, warm-up, cool-down'
        },
        {
          name: 'Base Training',
          description: 'Zone 2 (60-70%)',
          range: [
            Math.round((hrReserve * 0.6) + restingHRNum),
            Math.round((hrReserve * 0.7) + restingHRNum)
          ],
          color: 'text-blue-600 bg-blue-50',
          benefits: 'Fat burning, aerobic base building'
        },
        {
          name: 'Aerobic',
          description: 'Zone 3 (70-80%)',
          range: [
            Math.round((hrReserve * 0.7) + restingHRNum),
            Math.round((hrReserve * 0.8) + restingHRNum)
          ],
          color: 'text-green-600 bg-green-50',
          benefits: 'Cardiovascular fitness, endurance'
        },
        {
          name: 'Threshold',
          description: 'Zone 4 (80-90%)',
          range: [
            Math.round((hrReserve * 0.8) + restingHRNum),
            Math.round((hrReserve * 0.9) + restingHRNum)
          ],
          color: 'text-yellow-600 bg-yellow-50',
          benefits: 'Lactate threshold, performance'
        },
        {
          name: 'VO2 Max',
          description: 'Zone 5 (90-100%)',
          range: [
            Math.round((hrReserve * 0.9) + restingHRNum),
            Math.round(hrReserve + restingHRNum)
          ],
          color: 'text-red-600 bg-red-50',
          benefits: 'Maximum power, anaerobic capacity'
        }
      ];
    }

    setResult({
      maxHR,
      zones
    });
  };

  const reset = () => {
    setAge('');
    setRestingHR('');
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
          <div className="text-4xl mb-2">❤️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Heart Rate Zone Calculator</h2>
          <p className="text-gray-600">
            Calculate your target heart rate zones for different types of exercise
          </p>
        </div>

        {/* Method Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setMethod('karvonen')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                method === 'karvonen' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
              }`}
            >
              Karvonen Method
            </button>
            <button
              onClick={() => setMethod('age')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                method === 'age' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
              }`}
            >
              Age-Based
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age (years) *
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
              Resting Heart Rate (bpm) {method === 'karvonen' && '*'}
            </label>
            <input
              type="number"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              placeholder="60"
              disabled={method === 'age'}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                method === 'age' ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">
              {method === 'age' 
                ? 'Not required for age-based method' 
                : 'Measure when completely relaxed, ideally in the morning'
              }
            </p>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={calculateHeartRateZones}
            disabled={!age || (method === 'karvonen' && !restingHR)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Calculate Heart Rate Zones
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
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                Maximum Heart Rate: {result.maxHR} bpm
              </div>
              <p className="text-gray-600">
                Based on {method === 'karvonen' ? 'Karvonen formula (more accurate)' : 'age-based formula'}
              </p>
            </div>

            {/* Heart Rate Zones */}
            <div className="space-y-4">
              {result.zones.map((zone, index) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${zone.color}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-2 md:mb-0">
                      <h3 className="font-semibold text-lg">{zone.name}</h3>
                      <p className="text-sm opacity-75">{zone.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">
                        {zone.range[0]} - {zone.range[1]} bpm
                      </div>
                      <p className="text-sm">{zone.benefits}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Training Guidelines */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🏃‍♂️ Training Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium mb-2">Zone 1-2 (Recovery & Base)</h4>
                  <p>60-80% of total training time. Build aerobic base and promote recovery.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Zone 3 (Aerobic)</h4>
                  <p>15-25% of training time. Improve cardiovascular efficiency.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Zone 4 (Threshold)</h4>
                  <p>5-15% of training time. Increase lactate threshold and speed.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Zone 5 (VO2 Max)</h4>
                  <p>5-10% of training time. Develop maximum power and speed.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> These are general guidelines. Individual responses to exercise vary. 
            Consult with a healthcare provider before starting any new exercise program, especially if you have 
            cardiovascular conditions or take medications that affect heart rate.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeartRateZoneCalculator;