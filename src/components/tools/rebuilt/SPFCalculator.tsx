'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const SPFCalculator = () => {
  const [skinType, setSkinType] = useState('');
  const [uvIndex, setUvIndex] = useState('');
  const [exposureTime, setExposureTime] = useState('');
  const [currentSPF, setCurrentSPF] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateSPF = useCallback(() => {
    if (!skinType || !uvIndex || !exposureTime) return;

    // Determine baseline burn time based on skin type
    const burnTimeMinutes = getBurnTime(skinType);
    
    // Calculate UV index factor (higher UV index means shorter safe exposure)
    const uvFactor = parseFloat(uvIndex) / 3; // Baseline UV index of 3
    
    // Calculate adjusted burn time
    const adjustedBurnTime = burnTimeMinutes / uvFactor;
    
    // Calculate safe exposure time with current SPF
    const currentSafeTime = adjustedBurnTime * (parseInt(currentSPF) || 1);
    
    // Determine recommended SPF
    const recommendedSPF = getRecommendedSPF(
      parseFloat(exposureTime), 
      adjustedBurnTime,
      skinType
    );
    
    // Calculate safe exposure time with recommended SPF
    const recommendedSafeTime = adjustedBurnTime * recommendedSPF;
    
    // Calculate protection percentage
    const currentProtection = getCurrentProtection(parseInt(currentSPF) || 1);
    const recommendedProtection = getCurrentProtection(recommendedSPF);
    
    // Provide sun safety tips
    const safetyTips = getSafetyTips(skinType, parseInt(uvIndex));

    setResult({
      burnTime: Math.round(adjustedBurnTime),
      currentSafeTime: Math.round(currentSafeTime),
      recommendedSPF,
      recommendedSafeTime: Math.round(recommendedSafeTime),
      currentProtection,
      recommendedProtection,
      safetyTips
    });
  }, [skinType, uvIndex, exposureTime, currentSPF]);

  // Helper functions
  function getBurnTime(skinType: string) {
    switch (skinType) {
      case 'type1': // Very fair
        return 10;
      case 'type2': // Fair
        return 15;
      case 'type3': // Medium
        return 20;
      case 'type4': // Olive
        return 30;
      case 'type5': // Brown
        return 45;
      case 'type6': // Black
        return 60;
      default:
        return 20;
    }
  }

  function getRecommendedSPF(exposureTime: number, burnTime: number, skinType: string) {
    // Calculate minimum SPF needed
    const minSPF = exposureTime / burnTime;
    
    // Adjust based on skin type (more protection for fairer skin)
    let adjustment = 1;
    if (skinType === 'type1') adjustment = 2;
    if (skinType === 'type2') adjustment = 1.5;
    
    // Ensure minimum SPF of 30
    const recommendedSPF = Math.max(30, Math.ceil(minSPF * adjustment));
    
    // Cap at SPF 50+ for practicality
    return Math.min(50, recommendedSPF);
  }

  function getCurrentProtection(spf: number) {
    // SPF protection formula: (SPF-1)/SPF * 100
    return Math.round(((spf - 1) / spf) * 100);
  }

  function getSafetyTips(skinType: string, uvIndex: number) {
    const tips = [
      'Apply sunscreen 15-30 minutes before sun exposure',
      'Reapply every 2 hours or after swimming/sweating',
      'Seek shade during peak UV hours (10am-4pm)',
      'Wear protective clothing, hats, and sunglasses'
    ];
    
    if (skinType === 'type1' || skinType === 'type2') {
      tips.push('Consider wearing UPF clothing for additional protection');
      tips.push('Avoid direct sun exposure during high UV index days');
    }
    
    if (uvIndex > 6) {
      tips.push('UV index is high today - take extra precautions');
      tips.push('Limit outdoor activities during midday hours');
    }
    
    return tips;
  }

  const reset = useCallback(() => {
    setSkinType('');
    setUvIndex('');
    setExposureTime('');
    setCurrentSPF('');
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
          <div className="text-3xl sm:text-4xl mb-2">🌞</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">SPF Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Calculate how long you can stay in the sun based on your skin type and SPF
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your skin type?
                  </label>
                  <div className="space-y-3">
                    {[
                      { id: 'type1', label: 'Type 1: Very fair skin (always burns, never tans)' },
                      { id: 'type2', label: 'Type 2: Fair skin (burns easily, tans minimally)' },
                      { id: 'type3', label: 'Type 3: Medium skin (burns moderately, tans gradually)' },
                      { id: 'type4', label: 'Type 4: Olive skin (burns minimally, tans easily)' },
                      { id: 'type5', label: 'Type 5: Brown skin (rarely burns, tans easily)' },
                      { id: 'type6', label: 'Type 6: Black skin (never burns, tans easily)' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSkinType(type.id)}
                        className={`w-full text-left p-3 rounded-md font-medium transition-colors text-sm ${
                          skinType === type.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current UV Index (check your local weather)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={uvIndex}
                    onChange={(e) => setUvIndex(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    UV Index scale: 0-2 (Low), 3-5 (Moderate), 6-7 (High), 8-10 (Very High), 11+ (Extreme)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How long do you plan to be in the sun? (minutes)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={exposureTime}
                    onChange={(e) => setExposureTime(e.target.value)}
                    placeholder="e.g., 120"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current SPF you're using (if any)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={currentSPF}
                    onChange={(e) => setCurrentSPF(e.target.value)}
                    placeholder="e.g., 30"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave blank if not using sunscreen
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={calculateSPF}
                disabled={!skinType || !uvIndex || !exposureTime}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Calculate SPF Needs
              </button>
              <button
                onClick={reset}
                className="mobile-btn w-full px-4 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-t pt-6"
          >
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                Sun Protection Analysis
              </div>
              <p className="text-gray-600">
                Based on your skin type and sun exposure plans
              </p>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-blue-600">{result.burnTime} min</div>
                <div className="text-sm text-blue-700">Time to burn without protection</div>
              </div>
              <div className="bg-green-50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-green-600">{result.recommendedSPF}+</div>
                <div className="text-sm text-green-700">Recommended SPF</div>
              </div>
            </div>
            
            {/* Current Protection */}
            <div className="mb-6 p-4 bg-yellow-50 rounded-md">
              <h3 className="font-semibold text-yellow-800 mb-2">With Your Current SPF ({currentSPF || 'None'})</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-yellow-700">Safe exposure time:</span>
                <span className="font-medium text-yellow-800">{result.currentSafeTime} minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-700">Protection level:</span>
                <span className="font-medium text-yellow-800">{result.currentProtection}%</span>
              </div>
            </div>
            
            {/* Recommended Protection */}
            <div className="mb-6 p-4 bg-green-50 rounded-md">
              <h3 className="font-semibold text-green-800 mb-2">With Recommended SPF {result.recommendedSPF}+</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-700">Safe exposure time:</span>
                <span className="font-medium text-green-800">{result.recommendedSafeTime} minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700">Protection level:</span>
                <span className="font-medium text-green-800">{result.recommendedProtection}%</span>
              </div>
            </div>
            
            {/* Safety Tips */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Sun Safety Tips</h3>
              <ul className="space-y-2">
                {result.safetyTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">✓</div>
                    <p className="ml-2 text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Additional Information */}
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Important Notes</h3>
              <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
                <li>No sunscreen provides 100% protection - seek shade too</li>
                <li>SPF only measures UVB protection - look for broad spectrum</li>
                <li>Reapply every 2 hours regardless of SPF level</li>
                <li>Water resistant does not mean waterproof</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Recalculate
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides estimates based on general guidelines. 
            Individual sensitivity to sun exposure varies. Always consult with a dermatologist for 
            personalized skin care advice, especially if you have a history of skin cancer or sun sensitivity.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SPFCalculator;