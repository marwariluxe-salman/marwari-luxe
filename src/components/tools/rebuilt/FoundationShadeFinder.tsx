'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const FoundationShadeFinder = () => {
  const [undertone, setUndertone] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [veinColor, setVeinColor] = useState('');
  const [jewelryPreference, setJewelryPreference] = useState('');
  const [result, setResult] = useState<any>(null);

  const findShade = useCallback(() => {
    if (!undertone || !skinTone) return;

    // Determine undertone based on multiple factors
    const determinedUndertone = determineUndertone(undertone, veinColor, jewelryPreference);
    
    // Recommend foundation shades based on skin tone and undertone
    const shadeRecommendations = getShadeRecommendations(determinedUndertone, skinTone);
    
    // Provide application tips
    const applicationTips = getApplicationTips(determinedUndertone, skinTone);

    setResult({
      undertone: determinedUndertone,
      shadeRecommendations,
      applicationTips
    });
  }, [undertone, skinTone, veinColor, jewelryPreference]);

  // Helper functions
  function determineUndertone(primary: string, vein: string, jewelry: string) {
    // If user directly selected undertone, use that
    if (primary === 'cool' || primary === 'warm' || primary === 'neutral') {
      return primary;
    }
    
    // Otherwise, determine from other factors
    const coolVotes = [vein === 'blue', jewelry === 'silver'].filter(Boolean).length;
    const warmVotes = [vein === 'green', jewelry === 'gold'].filter(Boolean).length;
    
    if (coolVotes > warmVotes) return 'cool';
    if (warmVotes > coolVotes) return 'warm';
    return 'neutral';
  }

  function getShadeRecommendations(undertone: string, skinTone: string) {
    const recommendations: any = {
      cool: {
        fair: {
          description: 'Fair skin with cool undertones',
          brands: [
            { name: 'MAC', shades: ['NW10', 'NC15'] },
            { name: 'Fenty Beauty', shades: ['100', '110'] },
            { name: 'NARS', shades: ['Mont Blanc', 'Gobi'] },
            { name: 'Estée Lauder', shades: ['1W1', '1C0'] },
            { name: 'Maybelline', shades: ['Ivory', 'Cream'] }
          ]
        },
        light: {
          description: 'Light skin with cool undertones',
          brands: [
            { name: 'MAC', shades: ['NW15', 'NC20'] },
            { name: 'Fenty Beauty', shades: ['120', '130'] },
            { name: 'NARS', shades: ['Siberia', 'Barcelona'] },
            { name: 'Estée Lauder', shades: ['1W2', '2C0'] },
            { name: 'Revlon', shades: ['Shell Pink', 'Taffy'] }
          ]
        },
        medium: {
          description: 'Medium skin with cool undertones',
          brands: [
            { name: 'MAC', shades: ['NW20', 'NC25'] },
            { name: 'Fenty Beauty', shades: ['140', '150'] },
            { name: 'NARS', shades: ['Zug', 'Cayman'] },
            { name: 'Estée Lauder', shades: ['2W1', '3C0'] },
            { name: 'CoverGirl', shades: ['Natural Beige', 'Warm Ivory'] }
          ]
        },
        tan: {
          description: 'Tan skin with cool undertones',
          brands: [
            { name: 'MAC', shades: ['NW25', 'NC30'] },
            { name: 'Fenty Beauty', shades: ['160', '170'] },
            { name: 'NARS', shades: ['New Orleans', 'Bali'] },
            { name: 'Estée Lauder', shades: ['3W1', '4C0'] },
            { name: 'L\'Oréal', shades: ['Buff', 'Sun Beige'] }
          ]
        },
        deep: {
          description: 'Deep skin with cool undertones',
          brands: [
            { name: 'MAC', shades: ['NW30', 'NC35'] },
            { name: 'Fenty Beauty', shades: ['180', '190'] },
            { name: 'NARS', shades: ['Cuzco', 'Macao'] },
            { name: 'Estée Lauder', shades: ['4W1', '5C0'] },
            { name: 'Bobbi Brown', shades: ['Warm Almond', 'Caramel'] }
          ]
        }
      },
      warm: {
        fair: {
          description: 'Fair skin with warm undertones',
          brands: [
            { name: 'MAC', shades: ['NC15', 'NW15'] },
            { name: 'Fenty Beauty', shades: ['115', '125'] },
            { name: 'NARS', shades: ['Gobi', 'Mont Blanc'] },
            { name: 'Estée Lauder', shades: ['1C0', '1W1'] },
            { name: 'Maybelline', shades: ['Cream', 'Ivory'] }
          ]
        },
        light: {
          description: 'Light skin with warm undertones',
          brands: [
            { name: 'MAC', shades: ['NC20', 'NW20'] },
            { name: 'Fenty Beauty', shades: ['135', '145'] },
            { name: 'NARS', shades: ['Barcelona', 'Siberia'] },
            { name: 'Estée Lauder', shades: ['2C0', '1W2'] },
            { name: 'Revlon', shades: ['Taffy', 'Shell Pink'] }
          ]
        },
        medium: {
          description: 'Medium skin with warm undertones',
          brands: [
            { name: 'MAC', shades: ['NC25', 'NW25'] },
            { name: 'Fenty Beauty', shades: ['155', '165'] },
            { name: 'NARS', shades: ['Cayman', 'Zug'] },
            { name: 'Estée Lauder', shades: ['3C0', '2W1'] },
            { name: 'CoverGirl', shades: ['Warm Ivory', 'Natural Beige'] }
          ]
        },
        tan: {
          description: 'Tan skin with warm undertones',
          brands: [
            { name: 'MAC', shades: ['NC30', 'NW30'] },
            { name: 'Fenty Beauty', shades: ['175', '185'] },
            { name: 'NARS', shades: ['Bali', 'New Orleans'] },
            { name: 'Estée Lauder', shades: ['4C0', '3W1'] },
            { name: 'L\'Oréal', shades: ['Sun Beige', 'Buff'] }
          ]
        },
        deep: {
          description: 'Deep skin with warm undertones',
          brands: [
            { name: 'MAC', shades: ['NC35', 'NW35'] },
            { name: 'Fenty Beauty', shades: ['195', '200'] },
            { name: 'NARS', shades: ['Macao', 'Cuzco'] },
            { name: 'Estée Lauder', shades: ['5C0', '4W1'] },
            { name: 'Bobbi Brown', shades: ['Caramel', 'Warm Almond'] }
          ]
        }
      },
      neutral: {
        fair: {
          description: 'Fair skin with neutral undertones',
          brands: [
            { name: 'MAC', shades: ['NC15/NW15'] },
            { name: 'Fenty Beauty', shades: ['110/115'] },
            { name: 'NARS', shades: ['Mont Blanc/Gobi'] },
            { name: 'Estée Lauder', shades: ['1C0/1W1'] },
            { name: 'Maybelline', shades: ['Ivory/Cream'] }
          ]
        },
        light: {
          description: 'Light skin with neutral undertones',
          brands: [
            { name: 'MAC', shades: ['NC20/NW20'] },
            { name: 'Fenty Beauty', shades: ['130/135'] },
            { name: 'NARS', shades: ['Siberia/Barcelona'] },
            { name: 'Estée Lauder', shades: ['2C0/1W2'] },
            { name: 'Revlon', shades: ['Shell Pink/Taffy'] }
          ]
        },
        medium: {
          description: 'Medium skin with neutral undertones',
          brands: [
            { name: 'MAC', shades: ['NC25/NW25'] },
            { name: 'Fenty Beauty', shades: ['150/155'] },
            { name: 'NARS', shades: ['Zug/Cayman'] },
            { name: 'Estée Lauder', shades: ['3C0/2W1'] },
            { name: 'CoverGirl', shades: ['Natural Beige/Warm Ivory'] }
          ]
        },
        tan: {
          description: 'Tan skin with neutral undertones',
          brands: [
            { name: 'MAC', shades: ['NC30/NW30'] },
            { name: 'Fenty Beauty', shades: ['170/175'] },
            { name: 'NARS', shades: ['New Orleans/Bali'] },
            { name: 'Estée Lauder', shades: ['4C0/3W1'] },
            { name: 'L\'Oréal', shades: ['Buff/Sun Beige'] }
          ]
        },
        deep: {
          description: 'Deep skin with neutral undertones',
          brands: [
            { name: 'MAC', shades: ['NC35/NW35'] },
            { name: 'Fenty Beauty', shades: ['190/195'] },
            { name: 'NARS', shades: ['Cuzco/Macao'] },
            { name: 'Estée Lauder', shades: ['5C0/4W1'] },
            { name: 'Bobbi Brown', shades: ['Warm Almond/Caramel'] }
          ]
        }
      }
    };

    return recommendations[undertone][skinTone] || recommendations.cool.fair;
  }

  function getApplicationTips(undertone: string, skinTone: string) {
    return [
      'Test foundation on your jawline in natural light for the most accurate match',
      'Apply a small amount and blend well - you can always add more coverage',
      'Consider your neck and chest when choosing a shade to avoid harsh lines',
      'Foundation should disappear into your skin, not sit on top of it',
      'Match your foundation to your face, not your hand which is typically lighter'
    ];
  }

  const reset = useCallback(() => {
    setUndertone('');
    setSkinTone('');
    setVeinColor('');
    setJewelryPreference('');
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
          <div className="text-3xl sm:text-4xl mb-2">💄</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Foundation Shade Finder</h2>
          <p className="mobile-text-sm text-gray-600">
            Find your perfect foundation shade match across different brands
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your skin tone? (Light to Dark)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { id: 'fair', label: 'Fair' },
                      { id: 'light', label: 'Light' },
                      { id: 'medium', label: 'Medium' },
                      { id: 'tan', label: 'Tan' },
                      { id: 'deep', label: 'Deep' }
                    ].map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => setSkinTone(tone.id)}
                        className={`py-3 rounded-md font-medium transition-colors text-sm ${
                          skinTone === tone.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your undertone?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setUndertone('cool')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        undertone === 'cool'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Cool (Pink/Red)
                    </button>
                    <button
                      onClick={() => setUndertone('warm')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        undertone === 'warm'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Warm (Yellow/Golden)
                    </button>
                    <button
                      onClick={() => setUndertone('neutral')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        undertone === 'neutral'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Neutral
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-2">
                    Not sure? Answer the questions below to help determine your undertone.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What color are the veins on the inside of your wrist?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setVeinColor('blue')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        veinColor === 'blue'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Blue/Purple
                    </button>
                    <button
                      onClick={() => setVeinColor('green')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        veinColor === 'green'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Green
                    </button>
                    <button
                      onClick={() => setVeinColor('both')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        veinColor === 'both'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Both
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Which jewelry looks better on you?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setJewelryPreference('silver')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        jewelryPreference === 'silver'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Silver
                    </button>
                    <button
                      onClick={() => setJewelryPreference('gold')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        jewelryPreference === 'gold'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Gold
                    </button>
                    <button
                      onClick={() => setJewelryPreference('both')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        jewelryPreference === 'both'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Both
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={findShade}
                disabled={!skinTone}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Find My Foundation Shade
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
                Foundation Shade Recommendations
              </div>
              <p className="text-gray-600">
                For {result.undertone} undertones and {skinTone} skin tone
              </p>
            </div>
            
            {/* Undertone Information */}
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Your Undertone: {result.undertone.charAt(0).toUpperCase() + result.undertone.slice(1)}</h3>
              <p className="text-blue-700 text-sm">
                {result.undertone === 'cool' && 'Cool undertones have pink, red, or bluish hues. Your skin may burn easily in the sun.'}
                {result.undertone === 'warm' && 'Warm undertones have yellow, golden, or peachy hues. Your skin tans easily in the sun.'}
                {result.undertone === 'neutral' && 'Neutral undertones have a balance of warm and cool tones. Your skin may tan moderately in the sun.'}
              </p>
            </div>
            
            {/* Shade Recommendations */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Recommended Shades</h3>
              <p className="text-gray-600 mb-4">{result.shadeRecommendations.description}</p>
              
              <div className="space-y-4">
                {result.shadeRecommendations.brands.map((brand: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-gray-900">{brand.name}</h4>
                    <p className="text-gray-700 text-sm">Shades: {brand.shades.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Application Tips */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Application Tips</h3>
              <ul className="space-y-2">
                {result.applicationTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
                    <p className="ml-2 text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Testing Advice */}
            <div className="p-4 bg-yellow-50 rounded-md">
              <h3 className="font-semibold text-yellow-800 mb-2">Before You Buy</h3>
              <ul className="text-yellow-700 list-disc pl-5 space-y-1 text-sm">
                <li>Test foundation on your jawline in natural light</li>
                <li>Try 2-3 shades to find the perfect match</li>
                <li>Consider seasonal changes in your skin tone</li>
                <li>Many brands offer samples or return policies</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Find Different Shade
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> These recommendations are based on general guidelines and may not 
            perfectly match your exact shade. Individual results may vary. Always test foundation in natural 
            light before purchasing, and consider visiting a beauty counter for professional shade matching.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FoundationShadeFinder;